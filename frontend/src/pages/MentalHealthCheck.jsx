import { useState } from 'react';
import axios from 'axios';
import { API } from '../App';
import { toast } from 'sonner';
import { Sparkles } from 'lucide-react';

function MentalHealthCheck() {
  const [formData, setFormData] = useState({
    feelings: '',
    mood_level: 5,
    stress_level: 5,
    anxiety_level: 5,
    additional_notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [tips, setTips] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(`${API}/mental-health-check`, formData);
      
      // Generate tips based on levels
      const generatedTips = [];
      if (formData.stress_level >= 7) {
        generatedTips.push('🌬️ High stress detected. Try deep breathing: Inhale for 4 counts, hold for 4, exhale for 4.');
      }
      if (formData.anxiety_level >= 7) {
        generatedTips.push('🧘 Consider progressive muscle relaxation: Tense and release each muscle group for 5 seconds.');
      }
      if (formData.mood_level <= 3) {
        generatedTips.push('💚 Reach out to someone you trust or engage in an activity that brings you joy.');
      }
      if (formData.stress_level >= 5 || formData.anxiety_level >= 5) {
        generatedTips.push('🎵 Listen to calming music or nature sounds for 10 minutes.');
      }
      generatedTips.push('📝 Remember: It\'s okay to not be okay. Consider speaking with a professional counselor.');
      
      setTips(generatedTips);
      toast.success('Assessment completed! Here are your personalized tips.');
      
      // Scroll to tips
      setTimeout(() => {
        document.getElementById('tips-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Error submitting mental health check:', error);
      toast.error('Failed to submit assessment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container" data-testid="mental-health-check-form">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }} data-testid="form-title">
          Mental Health Check
        </h1>
        <p style={{ color: '#4a5568', marginBottom: '2rem' }} data-testid="form-description">
          Share how you're feeling today. Your responses will help us provide personalized wellness guidance.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="feelings" data-testid="feelings-label">
              How are you feeling today? *
            </label>
            <textarea
              id="feelings"
              className="form-textarea"
              value={formData.feelings}
              onChange={(e) => setFormData({ ...formData, feelings: e.target.value })}
              placeholder="Describe your current emotional state..."
              required
              data-testid="feelings-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" data-testid="mood-label">
              Mood Level: {formData.mood_level}/10
            </label>
            <div className="slider-label">
              <span>Very Low</span>
              <span>Excellent</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.mood_level}
              onChange={(e) => setFormData({ ...formData, mood_level: parseInt(e.target.value) })}
              className="slider"
              data-testid="mood-slider"
            />
          </div>

          <div className="form-group">
            <label className="form-label" data-testid="stress-label">
              Stress Level: {formData.stress_level}/10
            </label>
            <div className="slider-label">
              <span>No Stress</span>
              <span>Very High</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.stress_level}
              onChange={(e) => setFormData({ ...formData, stress_level: parseInt(e.target.value) })}
              className="slider"
              data-testid="stress-slider"
            />
          </div>

          <div className="form-group">
            <label className="form-label" data-testid="anxiety-label">
              Anxiety Level: {formData.anxiety_level}/10
            </label>
            <div className="slider-label">
              <span>No Anxiety</span>
              <span>Very High</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.anxiety_level}
              onChange={(e) => setFormData({ ...formData, anxiety_level: parseInt(e.target.value) })}
              className="slider"
              data-testid="anxiety-slider"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="additional_notes" data-testid="notes-label">
              Additional Notes (Optional)
            </label>
            <textarea
              id="additional_notes"
              className="form-textarea"
              value={formData.additional_notes}
              onChange={(e) => setFormData({ ...formData, additional_notes: e.target.value })}
              placeholder="Any other thoughts or concerns..."
              data-testid="notes-input"
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
            style={{ width: '100%' }}
            data-testid="submit-assessment-btn"
          >
            {loading ? 'Submitting...' : 'Submit Assessment'}
          </button>
        </form>
      </div>

      {tips.length > 0 && (
        <div 
          id="tips-section" 
          className="form-container" 
          style={{ marginTop: '2rem', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)' }}
          data-testid="tips-section"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Sparkles size={28} style={{ color: '#8b5cf6' }} />
            <h2 style={{ fontSize: '2rem', margin: 0 }} data-testid="tips-title">Personalized Tips for You</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {tips.map((tip, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  padding: '1.25rem',
                  borderRadius: '15px',
                  border: '2px solid rgba(139, 92, 246, 0.1)',
                  fontSize: '1rem',
                  lineHeight: '1.6'
                }}
                data-testid={`tip-${index}`}
              >
                {tip}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MentalHealthCheck;