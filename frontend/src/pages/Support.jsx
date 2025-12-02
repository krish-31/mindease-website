import { useState, useRef } from 'react';
import { AlertCircle, Phone, Mail, Shield, FileText, X, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { API } from '../App';
import { toast } from 'sonner';

function Support() {
  const [showReportForm, setShowReportForm] = useState(false);
  const [showPanicModal, setShowPanicModal] = useState(false);
  const [reportData, setReportData] = useState({
    report_type: 'physical',
    description: '',
    contact_info: ''
  });
  const [loading, setLoading] = useState(false);
  const reportSectionRef = useRef(null);

  const handleEmergency = () => {
    setShowPanicModal(true);
  };

  const handleReport = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post(`${API}/emergency-report`, reportData);
      toast.success('Report submitted securely. Our team will reach out to you.');
      setReportData({ report_type: 'physical', description: '', contact_info: '' });
      setShowReportForm(false);
    } catch (error) {
      console.error('Error submitting report:', error);
      toast.error('Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const helplines = [
    { name: 'National Crisis Hotline', number: '112', description: '24/7 Crisis Support' },
    { name: 'Suicide Prevention', number: '9152987821', description: 'Immediate Help' },
    { name: 'Domestic Violence', number: '7827170170', description: 'Safe Support' },
    { name: 'Sexual Assault Hotline', number: '181', description: '24/7 Support' }
  ];

  return (
    <div className="page-container">
      {/* Panic Modal */}
      {showPanicModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}
          onClick={() => setShowPanicModal(false)}
        >
          <div 
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              maxWidth: '500px',
              width: '100%',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPanicModal(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#718096'
              }}
            >
              <X size={24} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                animation: 'pulse 2s infinite'
              }}>
                <AlertTriangle size={40} color="white" />
              </div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#dc2626' }}>
                Emergency Help
              </h2>
              <p style={{ color: '#718096' }}>
                Choose an option below for immediate assistance
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Emergency Call Buttons */}
              <a
                href="tel:112"
                style={{
                  background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                  color: 'white',
                  padding: '1rem',
                  borderRadius: '15px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <Phone size={20} />
                Call Emergency Services (112)
              </a>

              <a
                href="tel:9152987821"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                  color: 'white',
                  padding: '1rem',
                  borderRadius: '15px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <Phone size={20} />
                Suicide Prevention Helpline
              </a>

              <a
                href="tel:7827170170"
                style={{
                  background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
                  color: 'white',
                  padding: '1rem',
                  borderRadius: '15px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 15px rgba(236, 72, 153, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <Phone size={20} />
                Domestic Violence Support
              </a>

              <button
                onClick={() => {
                  setShowPanicModal(false);
                  setShowReportForm(true);
                  setTimeout(() => {
                    reportSectionRef.current?.scrollIntoView({ 
                      behavior: 'smooth', 
                      block: 'center' 
                    });
                  }, 100);
                }}
                style={{
                  background: '#f3f4f6',
                  color: '#374151',
                  padding: '1rem',
                  borderRadius: '15px',
                  border: '2px solid #e5e7eb',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#f3f4f6';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <FileText size={20} />
                Submit Anonymous Report
              </button>
            </div>

            <p style={{ 
              marginTop: '1.5rem', 
              textAlign: 'center', 
              color: '#9ca3af', 
              fontSize: '0.875rem' 
            }}>
              Your safety is our priority. All calls are confidential.
            </p>
          </div>
        </div>
      )}

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div 
          style={{
            background: 'rgba(220, 38, 38, 0.08)',
            border: '2px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '3rem'
          }}
          data-testid="emergency-alert"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <AlertCircle size={32} style={{ color: '#dc2626' }} />
            <h2 style={{ fontSize: '1.8rem', margin: 0, color: '#dc2626' }} data-testid="emergency-title">
              Emergency Support
            </h2>
          </div>
          <p style={{ color: '#991b1b', marginBottom: '1.5rem' }} data-testid="emergency-description">
            If you are in immediate danger, please call emergency services (911) or use the panic button below.
          </p>
          <button 
            onClick={handleEmergency}
            className="btn-primary"
            style={{ 
              background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
              boxShadow: '0 4px 20px rgba(220, 38, 38, 0.3)'
            }}
            data-testid="panic-button"
          >
            <Shield size={20} style={{ marginRight: '0.5rem', display: 'inline' }} />
            Panic Button - Get Help Now
          </button>
        </div>

        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }} data-testid="support-title">
          Support & Help Resources
        </h1>
        <p style={{ color: '#4a5568', marginBottom: '3rem' }} data-testid="support-description">
          You are not alone. Access confidential support services and resources.
        </p>

        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }} data-testid="helplines-title">
            24/7 Helplines
          </h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {helplines.map((helpline, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  border: '1px solid rgba(139, 92, 246, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
                data-testid={`helpline-${index}`}
              >
                <div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{helpline.name}</h4>
                  <p style={{ color: '#718096', fontSize: '0.9rem', margin: 0 }}>{helpline.description}</p>
                </div>
                <a
                  href={`tel:${helpline.number}`}
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '20px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  data-testid={`call-${index}`}
                >
                  <Phone size={18} />
                  {helpline.number}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={reportSectionRef}
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '3rem'
          }}
          data-testid="anonymous-report-section"
        >
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }} data-testid="report-title">
            Anonymous Reporting
          </h3>
          <p style={{ color: '#4a5568', marginBottom: '1.5rem' }} data-testid="report-description">
            Submit a confidential report about assault or abuse. Your information is secure.
          </p>
          
          {!showReportForm ? (
            <button
              onClick={() => setShowReportForm(true)}
              className="btn-secondary"
              data-testid="show-report-form-btn"
            >
              <FileText size={20} style={{ marginRight: '0.5rem', display: 'inline' }} />
              Submit Anonymous Report
            </button>
          ) : (
            <form onSubmit={handleReport} data-testid="report-form">
              <div className="form-group">
                <label className="form-label" htmlFor="report_type" data-testid="report-type-label">
                  Type of Incident *
                </label>
                <select
                  id="report_type"
                  className="form-select"
                  value={reportData.report_type}
                  onChange={(e) => setReportData({ ...reportData, report_type: e.target.value })}
                  required
                  data-testid="report-type-select"
                >
                  <option value="physical">Physical Assault</option>
                  <option value="sexual">Sexual Assault</option>
                  <option value="mental">Mental/Emotional Abuse</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="description" data-testid="description-label">
                  Description *
                </label>
                <textarea
                  id="description"
                  className="form-textarea"
                  value={reportData.description}
                  onChange={(e) => setReportData({ ...reportData, description: e.target.value })}
                  placeholder="Please describe the incident (anonymous)..."
                  required
                  data-testid="description-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact_info" data-testid="contact-label">
                  Contact Info (Optional - only if you want us to reach out)
                </label>
                <input
                  type="text"
                  id="contact_info"
                  className="form-input"
                  value={reportData.contact_info}
                  onChange={(e) => setReportData({ ...reportData, contact_info: e.target.value })}
                  placeholder="Email or phone (optional)"
                  data-testid="contact-input"
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={loading}
                  data-testid="submit-report-btn"
                >
                  {loading ? 'Submitting...' : 'Submit Securely'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowReportForm(false)}
                  className="btn-secondary"
                  data-testid="cancel-report-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        <div
          style={{
            background: 'rgba(139, 92, 246, 0.05)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(139, 92, 246, 0.2)'
          }}
          data-testid="legal-aid-section"
        >
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }} data-testid="legal-aid-title">
            Legal Aid & Resources
          </h3>
          <ul style={{ lineHeight: '2', color: '#4a5568' }}>
            <li>Free legal consultation available</li>
            <li>Connect with local support groups</li>
            <li>Anonymous online forums and communities</li>
            <li>Safety planning resources</li>
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
}

export default Support;