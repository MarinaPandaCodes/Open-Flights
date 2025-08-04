import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title"><span className="gradient-text">Elevate</span> Your Travel Experience</h1>
          <p className="hero-subtitle">Harness AI-powered insights to navigate the skies with confidence</p>
          <div className="cta-container">
            <Link to="/airlines" className="cta-button pulse">
              Explore Airlines <span className="arrow">→</span>
            </Link>
            <div className="tech-circle"></div>
          </div>
        </div>
        <div className="particles" id="particles-js"></div>
      </header>

      <section className="features-section">
        <h2 className="section-title">Why <span className="highlight">SkyMetrics</span></h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon holographic">🛰️</div>
            <h3>Neural Reviews</h3>
            <p>AI-curated insights from millions of traveler experiences</p>
            <div className="tech-underline"></div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon holographic">📊</div>
            <h3>Quantum Rating</h3>
            <p>Our 7-dimensional scoring matrix reveals true quality</p>
            <div className="tech-underline"></div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon holographic">🌌</div>
            <h3>Orbital Coverage</h3>
            <p>Tracking airlines across 6 continents in real-time</p>
            <div className="tech-underline"></div>
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="hologram-display">
          <div className="hologram-content">
            <h2>Traveler <span className="highlight">Holograms</span></h2>
            <div className="testimonial-card floating">
              <div className="user-avatar"></div>
              <p>"The predictive analytics saved me from a 3-star airline and found me a perfect 5-star alternative!"</p>
              <div className="user-info">- Soumadip Majila, Quantum Traveler</div>
              <div className="rating-stars">
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-grid">
          <div className="footer-nav">
            <Link to="/airlines" className="nav-link">Airlines</Link>
            <Link to="/reviews" className="nav-link">Reviews</Link>
            <Link to="/analytics" className="nav-link">Analytics</Link>
          </div>
          <div className="footer-cta-container">
            <Link to="/airlines" className="footer-cta glow">
              Launch Dashboard <span className="arrow">↗</span>
            </Link>
          </div>
          <div className="tech-lines"></div>
        </div>
      </footer>
    </div>
  );
}

export default Home;