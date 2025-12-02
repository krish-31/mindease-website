from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import httpx

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()
api_router = APIRouter(prefix="/api")

# Define Models
class MentalHealthCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    feelings: str
    mood_level: int
    stress_level: int
    anxiety_level: int
    additional_notes: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class MentalHealthCheckCreate(BaseModel):
    feelings: str
    mood_level: int
    stress_level: int
    anxiety_level: int
    additional_notes: Optional[str] = None

class CallRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: Optional[str] = None
    contact: str
    preferred_time: str
    reason: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CallRequestCreate(BaseModel):
    name: Optional[str] = None
    contact: str
    preferred_time: str
    reason: Optional[str] = None

class Feedback(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    message: str
    is_testimonial: bool = False
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class FeedbackCreate(BaseModel):
    message: str
    is_testimonial: bool = False

class ChatMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    user_message: str
    bot_response: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ChatRequest(BaseModel):
    session_id: str
    message: str

class EmergencyReport(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    report_type: str
    description: str
    contact_info: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class EmergencyReportCreate(BaseModel):
    report_type: str
    description: str
    contact_info: Optional[str] = None

# Routes
@api_router.get("/")
async def root():
    return {"message": "MindEase API is running"}

@api_router.post("/mental-health-check", response_model=MentalHealthCheck)
async def create_mental_health_check(input: MentalHealthCheckCreate):
    check_dict = input.model_dump()
    check_obj = MentalHealthCheck(**check_dict)
    
    doc = check_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.mental_health_checks.insert_one(doc)
    
    return check_obj

@api_router.post("/call-request", response_model=CallRequest)
async def create_call_request(input: CallRequestCreate):
    request_dict = input.model_dump()
    request_obj = CallRequest(**request_dict)
    
    doc = request_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.call_requests.insert_one(doc)
    
    logging.info(f"New call request from {request_obj.contact} at {request_obj.preferred_time}")
    
    return request_obj

@api_router.post("/feedback", response_model=Feedback)
async def create_feedback(input: FeedbackCreate):
    feedback_dict = input.model_dump()
    feedback_obj = Feedback(**feedback_dict)
    
    doc = feedback_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.feedbacks.insert_one(doc)
    return feedback_obj

@api_router.get("/testimonials", response_model=List[Feedback])
async def get_testimonials():
    testimonials = await db.feedbacks.find(
        {"is_testimonial": True}, 
        {"_id": 0}
    ).sort("timestamp", -1).limit(10).to_list(10)
    
    for t in testimonials:
        if isinstance(t['timestamp'], str):
            t['timestamp'] = datetime.fromisoformat(t['timestamp'])
    
    return testimonials

@api_router.post("/chat")
async def chat_with_bot(request: ChatRequest):
    try:
        # Get chat history for this session
        history = await db.chat_history.find(
            {"session_id": request.session_id},
            {"_id": 0}
        ).sort("timestamp", 1).limit(10).to_list(10)
        
        # Build messages for Groq API
        messages = [
            {
                "role": "system",
                "content": "You are CalmiBot, a compassionate mental health support assistant. Provide empathetic, supportive responses and helpful coping strategies. Always encourage professional help for serious issues. Keep responses concise and warm (2-3 sentences maximum)."
            }
        ]
        
        # Add history
        for msg in history:
            messages.append({"role": "user", "content": msg["user_message"]})
            messages.append({"role": "assistant", "content": msg["bot_response"]})
        
        # Add current message
        messages.append({"role": "user", "content": request.message})
        
        # Call Groq API
        groq_api_key = os.environ.get('GROQ_API_KEY')
        
        async with httpx.AsyncClient() as client_http:
            response = await client_http.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {groq_api_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "llama-3.1-8b-instant",
                    "messages": messages,
                    "max_tokens": 200,
                    "temperature": 0.7
                },
                timeout=30.0
            )
            response.raise_for_status()
            result = response.json()
            bot_response = result["choices"][0]["message"]["content"]
        
        # Save to database
        chat_msg = ChatMessage(
            session_id=request.session_id,
            user_message=request.message,
            bot_response=bot_response
        )
        
        doc = chat_msg.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        await db.chat_history.insert_one(doc)
        
        return {"response": bot_response, "session_id": request.session_id}
    except Exception as e:
        logging.error(f"Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Chat service unavailable: {str(e)}")

@api_router.get("/chat/history/{session_id}")
async def get_chat_history(session_id: str):
    history = await db.chat_history.find(
        {"session_id": session_id},
        {"_id": 0}
    ).sort("timestamp", 1).to_list(100)
    
    for msg in history:
        if isinstance(msg['timestamp'], str):
            msg['timestamp'] = datetime.fromisoformat(msg['timestamp'])
    
    return history

@api_router.post("/emergency-report", response_model=EmergencyReport)
async def create_emergency_report(input: EmergencyReportCreate):
    report_dict = input.model_dump()
    report_obj = EmergencyReport(**report_dict)
    
    doc = report_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.emergency_reports.insert_one(doc)
    
    logging.warning(f"Emergency report received: {report_obj.report_type}")
    
    return report_obj

@api_router.get("/resources")
async def get_resources():
    resources = [
        {
            "id": "1",
            "title": "Understanding Anxiety",
            "description": "Learn about anxiety symptoms and management techniques",
            "category": "article",
            "url": "#"
        },
        {
            "id": "2",
            "title": "Breathing Techniques for Stress",
            "description": "Simple breathing exercises to reduce stress instantly",
            "category": "video",
            "url": "#"
        },
        {
            "id": "3",
            "title": "Building Resilience",
            "description": "Strategies to build mental resilience and cope with challenges",
            "category": "article",
            "url": "#"
        },
        {
            "id": "4",
            "title": "Mindfulness Meditation Guide",
            "description": "A beginner's guide to mindfulness meditation",
            "category": "audio",
            "url": "#"
        }
    ]
    return resources

# Include router
app.include_router(api_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()