import { BookOpen, Video, Headphones, ExternalLink, FileText } from 'lucide-react';

function Resources() {
  const resources = [
    {
      id: 1,
      title: "Understanding Anxiety",
      description: "Learn about anxiety symptoms and management techniques",
      category: "Article",
      icon: <BookOpen size={24} />,
      url: "https://www.nimh.nih.gov/health/topics/anxiety-disorders",
      color: "#8b5cf6"
    },
    {
      id: 2,
      title: "Breathing Techniques for Stress",
      description: "Simple breathing exercises to reduce stress instantly",
      category: "Video",
      icon: <Video size={24} />,
      url: "https://www.youtube.com/watch?v=tybOi4hjZFQ",
      color: "#ec4899"
    },
    {
      id: 3,
      title: "Building Resilience",
      description: "Strategies to build mental resilience and cope with challenges",
      category: "Article",
      icon: <BookOpen size={24} />,
      url: "https://www.mayoclinic.org/tests-procedures/resilience-training/in-depth/resilience/art-20046311",
      color: "#8b5cf6"
    },
    {
      id: 4,
      title: "Mindfulness Meditation Guide",
      description: "A beginner's guide to mindfulness meditation",
      category: "Audio",
      icon: <Headphones size={24} />,
      url: "https://www.headspace.com/meditation/meditation-for-beginners",
      color: "#10b981"
    },
    {
      id: 5,
      title: "Depression: What You Need to Know",
      description: "Understanding depression and available treatments",
      category: "Article",
      icon: <BookOpen size={24} />,
      url: "https://www.nimh.nih.gov/health/topics/depression",
      color: "#8b5cf6"
    },
    {
      id: 6,
      title: "Coping with Stress",
      description: "Effective strategies for managing daily stress",
      category: "Article",
      icon: <FileText size={24} />,
      url: "https://www.who.int/news-room/questions-and-answers/item/stress",
      color: "#8b5cf6"
    },
    {
      id: 7,
      title: "Sleep and Mental Health",
      description: "How sleep affects your mental wellbeing",
      category: "Article",
      icon: <BookOpen size={24} />,
      url: "https://www.sleepfoundation.org/mental-health",
      color: "#8b5cf6"
    },
    {
      id: 8,
      title: "Guided Meditation for Anxiety",
      description: "10-minute guided meditation to calm anxiety",
      category: "Video",
      icon: <Video size={24} />,
      url: "https://www.youtube.com/watch?v=odADwWzHR24",
      color: "#ec4899"
    },
    {
      id: 9,
      title: "Self-Care Strategies",
      description: "Practical self-care tips for better mental health",
      category: "Article",
      icon: <FileText size={24} />,
      url: "https://www.nami.org/Your-Journey/Individuals-with-Mental-Illness/Taking-Care-of-Your-Body",
      color: "#8b5cf6"
    },
    {
      id: 10,
      title: "Relaxing Music for Stress Relief",
      description: "Calming music to help reduce stress and anxiety",
      category: "Audio",
      icon: <Headphones size={24} />,
      url: "https://www.youtube.com/watch?v=lFcSrYw-ARY",
      color: "#10b981"
    },
    {
      id: 11,
      title: "Managing Panic Attacks",
      description: "What to do when experiencing a panic attack",
      category: "Article",
      icon: <BookOpen size={24} />,
      url: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/anxiety-and-panic-attacks/panic-attacks/",
      color: "#8b5cf6"
    },
    {
      id: 12,
      title: "Yoga for Mental Health",
      description: "Gentle yoga practices for mental wellbeing",
      category: "Video",
      icon: <Video size={24} />,
      url: "https://www.youtube.com/watch?v=COp7BR_Dvps",
      color: "#ec4899"
    }
  ];

  const getCategoryStyle = (category) => {
    const styles = {
      'Article': { background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' },
      'Video': { background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' },
      'Audio': { background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }
    };
    return styles[category] || styles['Article'];
  };

  return (
    <div className="page-container">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }} data-testid="resources-title">
          Resources & Articles
        </h1>
        <p style={{ color: '#4a5568', marginBottom: '3rem', fontSize: '1.1rem' }} data-testid="resources-description">
          Explore curated resources to support your mental health journey. Click on any resource to learn more.
        </p>

        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          {resources.map((resource) => (
            <a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(12px)',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid rgba(139, 92, 246, 0.1)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              data-testid={`resource-${resource.id}`}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '15px',
                    background: `linear-gradient(135deg, ${resource.color} 0%, ${resource.color}dd 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    flexShrink: 0
                  }}
                >
                  {resource.icon}
                </div>
                <span
                  style={{
                    ...getCategoryStyle(resource.category),
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}
                >
                  {resource.category}
                </span>
              </div>

              <div>
                <h3 
                  style={{ 
                    fontSize: '1.3rem', 
                    marginBottom: '0.5rem',
                    color: '#1a202c',
                    fontWeight: '600'
                  }}
                >
                  {resource.title}
                </h3>
                <p style={{ color: '#718096', lineHeight: '1.6', margin: 0 }}>
                  {resource.description}
                </p>
              </div>

              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  color: resource.color,
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  marginTop: 'auto'
                }}
              >
                Learn More <ExternalLink size={16} />
              </div>
            </a>
          ))}
        </div>

        {/* Additional Help Section */}
        <div
          style={{
            background: 'rgba(139, 92, 246, 0.05)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            textAlign: 'center'
          }}
        >
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#8b5cf6' }}>
            Need More Help?
          </h3>
          <p style={{ color: '#4a5568', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            If you're experiencing a mental health crisis, please reach out to professional support services immediately.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="tel:112"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                color: 'white',
                padding: '0.875rem 2rem',
                borderRadius: '15px',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'inline-block'
              }}
            >
              Call Helpline: 112
            </a>
            <a
              href="/support"
              style={{
                background: 'white',
                color: '#8b5cf6',
                padding: '0.875rem 2rem',
                borderRadius: '15px',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'inline-block',
                border: '2px solid #8b5cf6'
              }}
            >
              View All Support Options
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resources;