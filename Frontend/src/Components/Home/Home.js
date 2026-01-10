import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import './Home.css';

function Home() {
  return (
    <div>
      <Nav />

      {/* Hero Section */}
      <section className="hero">
        <h1>Sharefolio</h1>
        <p className="tagline">Where Profiles Become Portfolios</p>
        <p className="description">
          Create your profile, share PDFs and images, and explore what others are creating.
        </p>

        <div className="hero-buttons">
          
          <Link to="/profile" className="btn secondary">Explore Profiles</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Sharefolio?</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Create Your Profile</h3>
            <p>Build a personal profile to showcase who you are.</p>
          </div>

          <div className="feature-card">
            <h3>Share PDFs</h3>
            <p>Upload documents like notes, projects, and resumes.</p>
          </div>

          <div className="feature-card">
            <h3>Share Images</h3>
            <p>Post images to visually express your ideas.</p>
          </div>

          <div className="feature-card">
            <h3>Explore & Connect</h3>
            <p>View other profiles and discover shared content.</p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="cta">
        <h2>Ready to share your story?</h2>
        <Link to="/profile" className="btn primary">Start Sharefolio Today</Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Sharefolio. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
