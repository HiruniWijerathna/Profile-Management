import React from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav/Nav";
import "./Home.css";

import profileImg from "../../assets/cp.png";
import pdfImg from "../../assets/si.png";
import uploadImg from "../../assets/ui.png";
import exploreImg from "../../assets/cc.png";

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
          <Link to="/profile" className="btn secondary">
            Explore Profiles
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
         {/* <h2>Why Sharefolio?</h2> */}

        <div className="feature-grid">
          <div className="feature-card">
            <img src={profileImg} alt="Create Profile" />
            <h3>Create Your Profile</h3>
            <p>Build a personal profile to showcase who you are.</p>
          </div>

          <div className="feature-card">
            <img src={pdfImg} alt="Share PDFs" />
            <h3>Share PDFs</h3>
            <p>Upload documents like notes, projects, and resumes.</p>
          </div>

          <div className="feature-card">
            <img src={uploadImg} alt="Share Images" />
            <h3>Share Images</h3>
            <p>Post images to visually express your ideas.</p>
          </div>

          <div className="feature-card">
            <img src={exploreImg} alt="Explore" />
            <h3>Explore & Connect</h3>
            <p>View other profiles and discover shared content.</p>
          </div>
        </div>
      </section>

      
      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Sharefolio. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
