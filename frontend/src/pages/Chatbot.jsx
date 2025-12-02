import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API } from '../App';
import { Send, Bot, User } from 'lucide-react';
import { toast } from 'sonner';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(`session-${Date.now()}`);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Welcome message
    setMessages([{
      type: 'bot',
      text: "Hello! I'm CalmiBot, your mental health companion. How are you feeling today? Feel free to share what's on your mind.",
      timestamp: new Date()
    }]);
    
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      type: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(`${API}/chat`, {
        session_id: sessionId,
        message: input
      });

      const botMessage = {
        type: 'bot',
        text: response.data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      toast.error('Failed to get response. Please try again.');
      
      const errorMessage = {
        type: 'bot',
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      // Re-focus input after sending
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="page-container">
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }} data-testid="chatbot-title">
          CalmiBot - Your Support Companion
        </h1>
        <p style={{ color: '#4a5568', marginBottom: '2rem' }} data-testid="chatbot-description">
          Share your thoughts and feelings in a safe, judgment-free space.
        </p>

        <div
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            height: '600px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid rgba(139, 92, 246, 0.1)'
          }}
          data-testid="chat-container"
        >
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
            data-testid="messages-container"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                  flexDirection: message.type === 'user' ? 'row-reverse' : 'row'
                }}
                data-testid={`message-${index}`}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: message.type === 'user'
                      ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)'
                      : 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    flexShrink: 0
                  }}
                >
                  {message.type === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div
                  style={{
                    background: message.type === 'user'
                      ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)'
                      : 'rgba(139, 92, 246, 0.08)',
                    color: message.type === 'user' ? 'white' : '#2d3748',
                    padding: '1rem 1.25rem',
                    borderRadius: '15px',
                    maxWidth: '70%',
                    lineHeight: '1.5'
                  }}
                  data-testid={`message-bubble-${index}`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {loading && (
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start'
                }}
                data-testid="loading-indicator"
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                >
                  <Bot size={20} />
                </div>
                <div
                  style={{
                    background: 'rgba(139, 92, 246, 0.08)',
                    padding: '1rem 1.25rem',
                    borderRadius: '15px'
                  }}
                >
                  <span style={{ animation: 'pulse 1.5s ease-in-out infinite' }}>Typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div
            style={{
              padding: '1.5rem',
              borderTop: '1px solid rgba(139, 92, 246, 0.1)',
              background: 'rgba(255, 255, 255, 0.5)'
            }}
            data-testid="input-container"
          >
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: '0.875rem 1.25rem',
                  border: '2px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
                disabled={loading}
                data-testid="chat-input"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '15px',
                  padding: '0.875rem 1.5rem',
                  cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                  opacity: loading || !input.trim() ? 0.5 : 1,
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                data-testid="send-button"
              >
                <Send size={20} />
                Send
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    </div>
  );
}

export default Chatbot;