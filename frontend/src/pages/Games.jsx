import { useState, useEffect } from 'react';
import { Circle, Sparkles, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

function Games() {
  const [activeGame, setActiveGame] = useState(null);
  const [bubbles, setBubbles] = useState([]);
  const [bubblesPopped, setBubblesPopped] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [quote, setQuote] = useState('');
  const [memoryCards, setMemoryCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const quotes = [
    "You are stronger than you think.",
    "Every day is a fresh start.",
    "Your feelings are valid.",
    "Progress, not perfection.",
    "You deserve peace and happiness.",
    "Be kind to yourself today.",
    "This too shall pass.",
    "You are worthy of love.",
    "Breathe. You've got this.",
    "Small steps lead to big changes."
  ];

  const emojis = ['💚', '🌸', '☀️', '🌙', '⭐', '🦋', '🌈', '🌺'];

  // Bubble Popper Game
  const startBubbleGame = () => {
    const newBubbles = [];
    for (let i = 0; i < 20; i++) {
      newBubbles.push({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        size: Math.random() * 40 + 40
      });
    }
    setBubbles(newBubbles);
    setBubblesPopped(0);
    setActiveGame('bubble');
  };

  const popBubble = (id) => {
    setBubbles(bubbles.filter(b => b.id !== id));
    setBubblesPopped(prev => prev + 1);
    if (bubbles.length === 1) {
      toast.success('All bubbles popped! Great job! 🎉');
    }
  };

  // Breathing Guide
  useEffect(() => {
    if (activeGame === 'breathing') {
      const interval = setInterval(() => {
        setBreathingPhase(prev => {
          if (prev === 'inhale') return 'hold';
          if (prev === 'hold') return 'exhale';
          return 'inhale';
        });
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [activeGame]);

  // Quote Spinner
  const spinQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  };

  // Memory Game
  const startMemoryGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, flipped: false }));
    setMemoryCards(shuffled);
    setFlippedCards([]);
    setMatchedCards([]);
    setActiveGame('memory');
  };

  const flipCard = (id) => {
    if (flippedCards.length === 2 || flippedCards.includes(id) || matchedCards.includes(id)) return;
    
    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (memoryCards[first].emoji === memoryCards[second].emoji) {
        setMatchedCards([...matchedCards, first, second]);
        setFlippedCards([]);
        if (matchedCards.length + 2 === memoryCards.length) {
          setTimeout(() => toast.success('All matched! Excellent memory! 🎉'), 500);
        }
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  return (
    <div className="page-container">
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }} data-testid="games-title">
        Relaxation Games
      </h1>
      <p style={{ color: '#4a5568', marginBottom: '3rem', maxWidth: '700px' }} data-testid="games-description">
        Take a moment to relax and unwind with these calming interactive games.
      </p>

      {!activeGame && (
        <div className="card-grid">
          <div className="card" onClick={startBubbleGame} style={{ cursor: 'pointer' }} data-testid="bubble-game-card">
            <div className="card-icon">
              <Circle size={32} />
            </div>
            <h3 className="card-title">Bubble Popper</h3>
            <p className="card-description">Pop floating bubbles to release stress and tension.</p>
          </div>

          <div className="card" onClick={() => setActiveGame('breathing')} style={{ cursor: 'pointer' }} data-testid="breathing-game-card">
            <div className="card-icon">🌬️</div>
            <h3 className="card-title">Breathing Guide</h3>
            <p className="card-description">Follow the circle to practice mindful breathing.</p>
          </div>

          <div className="card" onClick={() => { setActiveGame('quote'); spinQuote(); }} style={{ cursor: 'pointer' }} data-testid="quote-game-card">
            <div className="card-icon">
              <Sparkles size={32} />
            </div>
            <h3 className="card-title">Quote Spinner</h3>
            <p className="card-description">Reveal inspiring and uplifting quotes.</p>
          </div>

          <div className="card" onClick={startMemoryGame} style={{ cursor: 'pointer' }} data-testid="memory-game-card">
            <div className="card-icon">🎴</div>
            <h3 className="card-title">Memory Match</h3>
            <p className="card-description">Match positive emoji pairs to train your mind.</p>
          </div>
        </div>
      )}

      {activeGame === 'bubble' && (
        <div data-testid="bubble-game">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem' }} data-testid="bubble-game-title">Bubble Popper - Popped: {bubblesPopped}</h2>
            <button onClick={() => setActiveGame(null)} className="btn-secondary" data-testid="back-to-menu-btn">Back to Menu</button>
          </div>
          <div
            style={{
              position: 'relative',
              height: '500px',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(99, 102, 241, 0.08) 100%)',
              borderRadius: '20px',
              overflow: 'hidden'
            }}
            data-testid="bubble-container"
          >
            {bubbles.map(bubble => (
              <div
                key={bubble.id}
                onClick={() => popBubble(bubble.id)}
                style={{
                  position: 'absolute',
                  left: `${bubble.x}%`,
                  top: `${bubble.y}%`,
                  width: `${bubble.size}px`,
                  height: `${bubble.size}px`,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.3), rgba(99, 102, 241, 0.6))',
                  border: '3px solid rgba(139, 92, 246, 0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  animation: 'float 3s ease-in-out infinite'
                }}
                data-testid={`bubble-${bubble.id}`}
              />
            ))}
          </div>
        </div>
      )}

      {activeGame === 'breathing' && (
        <div data-testid="breathing-game">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem' }} data-testid="breathing-game-title">Breathing Guide</h2>
            <button onClick={() => setActiveGame(null)} className="btn-secondary" data-testid="back-to-menu-breathing-btn">Back to Menu</button>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4rem',
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '20px'
            }}
            data-testid="breathing-container"
          >
            <div
              style={{
                width: breathingPhase === 'inhale' ? '200px' : breathingPhase === 'hold' ? '200px' : '100px',
                height: breathingPhase === 'inhale' ? '200px' : breathingPhase === 'hold' ? '200px' : '100px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                transition: 'all 4s ease-in-out',
                marginBottom: '2rem'
              }}
              data-testid="breathing-circle"
            />
            <h3 style={{ fontSize: '2rem', color: '#8b5cf6' }} data-testid="breathing-instruction">
              {breathingPhase === 'inhale' && 'Breathe In'}
              {breathingPhase === 'hold' && 'Hold'}
              {breathingPhase === 'exhale' && 'Breathe Out'}
            </h3>
          </div>
        </div>
      )}

      {activeGame === 'quote' && (
        <div data-testid="quote-game">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem' }} data-testid="quote-game-title">Quote Spinner</h2>
            <button onClick={() => setActiveGame(null)} className="btn-secondary" data-testid="back-to-menu-quote-btn">Back to Menu</button>
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '20px',
              padding: '4rem',
              textAlign: 'center',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem'
            }}
            data-testid="quote-container"
          >
            {quote ? (
              <p style={{ fontSize: '2rem', fontFamily: 'Playfair Display', color: '#8b5cf6', lineHeight: '1.6' }} data-testid="quote-text">
                "{quote}"
              </p>
            ) : (
              <p style={{ fontSize: '1.5rem', color: '#718096' }} data-testid="quote-placeholder">Click below to reveal a quote</p>
            )}
            <button onClick={spinQuote} className="btn-primary" data-testid="spin-quote-btn">
              <RotateCcw size={20} style={{ marginRight: '0.5rem', display: 'inline' }} />
              Get New Quote
            </button>
          </div>
        </div>
      )}

      {activeGame === 'memory' && (
        <div data-testid="memory-game">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem' }} data-testid="memory-game-title">Memory Match - Matched: {matchedCards.length / 2}/{emojis.length}</h2>
            <button onClick={() => setActiveGame(null)} className="btn-secondary" data-testid="back-to-menu-memory-btn">Back to Menu</button>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1rem',
              maxWidth: '500px',
              margin: '0 auto'
            }}
            data-testid="memory-cards-container"
          >
            {memoryCards.map((card) => (
              <div
                key={card.id}
                onClick={() => flipCard(card.id)}
                style={{
                  aspectRatio: '1',
                  background: flippedCards.includes(card.id) || matchedCards.includes(card.id)
                    ? 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)'
                    : 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  cursor: matchedCards.includes(card.id) ? 'default' : 'pointer',
                  transition: 'all 0.3s',
                  border: '2px solid rgba(139, 92, 246, 0.2)',
                  opacity: matchedCards.includes(card.id) ? 0.5 : 1
                }}
                data-testid={`memory-card-${card.id}`}
              >
                {(flippedCards.includes(card.id) || matchedCards.includes(card.id)) ? card.emoji : '?'}
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}

export default Games;