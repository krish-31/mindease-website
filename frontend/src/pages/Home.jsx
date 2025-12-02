import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Shield, Gamepad2, BookOpen, Phone } from 'lucide-react';

function Home() {
  return (
    <div className="page-container">
      <div className="floating-shape shape-1"></div>
      <div className="floating-shape shape-2"></div>
      
      <div className="hero-section" data-testid="hero-section">
        <div className="hero-content">
          <h1 className="hero-title" data-testid="hero-title">MindEase</h1>
          <p className="hero-subtitle" data-testid="hero-subtitle">
            Your compassionate companion for mental wellness. Find support, guidance, and peace in a safe, understanding environment.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', animation: 'fadeInUp 0.8s ease-out 0.4s both' }}>
            <Link to="/mental-health-check" className="btn-primary" data-testid="get-started-btn">
              Get Started
            </Link>
            <Link to="/chatbot" className="btn-secondary" data-testid="talk-to-calmibot-btn">
              Talk to CalmiBot
            </Link>
          </div>
        </div>
      </div>

      <div className="card-grid">
        <div className="card" data-testid="mental-health-check-card">
          <div className="card-icon">
            <Heart size={32} />
          </div>
          <h3 className="card-title">Mental Health Check</h3>
          <p className="card-description">
            Share how you're feeling and receive personalized wellness tips and guidance.
          </p>
          <Link to="/mental-health-check" className="btn-secondary" data-testid="check-wellness-btn">
            Check Your Wellness
          </Link>
        </div>

        <div className="card" data-testid="calmibot-card">
          <div className="card-icon">
            <MessageCircle size={32} />
          </div>
          <h3 className="card-title">CalmiBot Support</h3>
          <p className="card-description">
            Chat with our AI companion for 24/7 emotional support and coping strategies.
          </p>
          <Link to="/chatbot" className="btn-secondary" data-testid="start-chat-btn">
            Start Chatting
          </Link>
        </div>

        <div className="card" data-testid="support-card">
          <div className="card-icon">
            <Shield size={32} />
          </div>
          <h3 className="card-title">Safe Support Zone</h3>
          <p className="card-description">
            Access emergency resources, helplines, and confidential support services.
          </p>
          <Link to="/support" className="btn-secondary" data-testid="get-support-btn">
            Get Support
          </Link>
        </div>

        <div className="card" data-testid="games-card">
          <div className="card-icon">
            <Gamepad2 size={32} />
          </div>
          <h3 className="card-title">Relaxation Games</h3>
          <p className="card-description">
            Play calming mini-games designed to reduce stress and promote mindfulness.
          </p>
          <Link to="/games" className="btn-secondary" data-testid="play-games-btn">
            Play Games
          </Link>
        </div>

        <div className="card" data-testid="resources-card">
          <div className="card-icon">
            <BookOpen size={32} />
          </div>
          <h3 className="card-title">Resources & Articles</h3>
          <p className="card-description">
            Explore helpful articles, videos, and wellness resources for mental health.
          </p>
          <Link to="/resources" className="btn-secondary" data-testid="explore-resources-btn">
            Explore Resources
          </Link>
        </div>

        <div className="card" data-testid="contact-card">
          <div className="card-icon">
            <Phone size={32} />
          </div>
          <h3 className="card-title">Contact Counselor</h3>
          <p className="card-description">
            Request a callback from our professional counselors at your convenience.
          </p>
          <Link to="/contact" className="btn-secondary" data-testid="contact-counselor-btn">
            Request Callback
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;