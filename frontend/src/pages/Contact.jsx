import { useState } from 'react';
import axios from 'axios';
import { API } from '../App';
import { toast } from 'sonner';
import { Phone, Mail, MessageCircle, Send } from 'lucide-react';

function Contact() {
  const [callRequestData, setCallRequestData] = useState({
    name: '',
    contact: '',
    preferred_time: '',
    reason: ''
  });
  const [feedbackData, setFeedbackData] = useState({
    message: '',
    is_testimonial: false
  });
  const [loadingCall, setLoadingCall] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  const handleCallRequest = async (e) => {
    e.preventDefault();
    setLoadingCall(true);

    try {
      await axios.post(`${API}/call-request`, callRequestData);
      toast.success('Request submitted! A counselor will contact you soon.');
      setCallRequestData({ name: '', contact: '', preferred_time: '', reason: '' });
    } catch (error) {
      console.error('Error submitting call request:', error);
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setLoadingCall(false);
    }
  };

  const handleFeedback = async (e) => {
    e.preventDefault();
    setLoadingFeedback(true);

    try {
      await axios.post(`${API}/feedback`, feedbackData);
      toast.success('Thank you for your feedback!');
      setFeedbackData({ message: '', is_testimonial: false });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setLoadingFeedback(false);
    }
  };

  return (
    <div className="page-container">
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }} data-testid="contact-title">
          Contact Us
        </h1>
        <p style={{ color: '#4a5568', marginBottom: '3rem' }} data-testid="contact-description">
          Request a callback from our professional counselors or share your feedback with us.
        </p>

        <div style={{ display: 'grid', gap: '2rem', marginBottom: '3rem' }}>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(12px)',
              borderRadius: '20px',
              padding: '1.5rem',
              border: '1px solid rgba(139, 92, 246, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
            data-testid="contact-info-phone"
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}
            >
              <Phone size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Phone</h4>
              <p style={{ color: '#718096', margin: 0 }}>99xxxxx901</p>
            </div>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(12px)',
              borderRadius: '20px',
              padding: '1.5rem',
              border: '1px solid rgba(139, 92, 246, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
            data-testid="contact-info-email"
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}
            >
              <Mail size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Email</h4>
              <p style={{ color: '#718096', margin: 0 }}>support@mindease.com</p>
            </div>
          </div>
        </div>

        <div className="form-container" style={{ marginBottom: '2rem' }} data-testid="call-request-form">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Phone size={28} style={{ color: '#8b5cf6' }} />
            <h2 style={{ fontSize: '2rem', margin: 0 }} data-testid="call-request-title">Request a Callback</h2>
          </div>
          
          <form onSubmit={handleCallRequest}>
            <div className="form-group">
              <label className="form-label" htmlFor="name" data-testid="call-name-label">
                Name (Optional)
              </label>
              <input
                type="text"
                id="name"
                className="form-input"
                value={callRequestData.name}
                onChange={(e) => setCallRequestData({ ...callRequestData, name: e.target.value })}
                placeholder="Your name"
                data-testid="call-name-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact" data-testid="call-contact-label">
                Contact (Email or Phone) *
              </label>
              <input
                type="text"
                id="contact"
                className="form-input"
                value={callRequestData.contact}
                onChange={(e) => setCallRequestData({ ...callRequestData, contact: e.target.value })}
                placeholder="your@email.com or phone number"
                required
                data-testid="call-contact-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="preferred_time" data-testid="call-time-label">
                Preferred Time *
              </label>
              <input
                type="text"
                id="preferred_time"
                className="form-input"
                value={callRequestData.preferred_time}
                onChange={(e) => setCallRequestData({ ...callRequestData, preferred_time: e.target.value })}
                placeholder="e.g., Tomorrow afternoon, Weekday mornings"
                required
                data-testid="call-time-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reason" data-testid="call-reason-label">
                Reason for Call (Optional)
              </label>
              <textarea
                id="reason"
                className="form-textarea"
                value={callRequestData.reason}
                onChange={(e) => setCallRequestData({ ...callRequestData, reason: e.target.value })}
                placeholder="Brief description of what you'd like to discuss..."
                data-testid="call-reason-input"
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loadingCall}
              style={{ width: '100%' }}
              data-testid="submit-call-request-btn"
            >
              {loadingCall ? 'Submitting...' : 'Request Callback'}
            </button>
          </form>
        </div>

        <div className="form-container" data-testid="feedback-form">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <MessageCircle size={28} style={{ color: '#8b5cf6' }} />
            <h2 style={{ fontSize: '2rem', margin: 0 }} data-testid="feedback-title">Share Feedback</h2>
          </div>
          
          <form onSubmit={handleFeedback}>
            <div className="form-group">
              <label className="form-label" htmlFor="feedback_message" data-testid="feedback-message-label">
                Your Message *
              </label>
              <textarea
                id="feedback_message"
                className="form-textarea"
                value={feedbackData.message}
                onChange={(e) => setFeedbackData({ ...feedbackData, message: e.target.value })}
                placeholder="Share your thoughts, suggestions, or testimonial..."
                required
                style={{ minHeight: '150px' }}
                data-testid="feedback-message-input"
              />
            </div>

            <div
              style={{
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <input
                type="checkbox"
                id="is_testimonial"
                checked={feedbackData.is_testimonial}
                onChange={(e) => setFeedbackData({ ...feedbackData, is_testimonial: e.target.checked })}
                style={{
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer'
                }}
                data-testid="testimonial-checkbox"
              />
              <label
                htmlFor="is_testimonial"
                style={{
                  cursor: 'pointer',
                  color: '#4a5568',
                  margin: 0
                }}
                data-testid="testimonial-label"
              >
                Share as testimonial (visible to others anonymously)
              </label>
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loadingFeedback}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              data-testid="submit-feedback-btn"
            >
              <Send size={20} />
              {loadingFeedback ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;