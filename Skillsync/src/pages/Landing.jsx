import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landing.css";
import logo from "../assets/logo.png";
import Footer from "../components/footer";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">

      {/* NAVBAR */}
      <div className="landing-navbar">
       <div className="logo d-flex align-items-center gap-2">
  <img src={logo} alt="SkillSync Logo" className="landing-logo" />
  <span>SkillSync</span>
</div>

        <div className="nav-buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="landing-hero">
        <h1>
          Find Projects. <span>Build Teams.</span> Ship Faster.
        </h1>

        <div className="hero-buttons">
          <button onClick={() => navigate("/explore")}>
            Find Projects
          </button>

          <button onClick={() => navigate("/create")}>
            Create Project
          </button>
        </div>
      </div>

      {/* ABOUT */}
      <div className="about-section">
        <h2>About SkillSync</h2>
        <p>
          SkillSync is a platform designed to connect developers, designers, and creators.
          You can create projects, join teams, and collaborate in real-time.
        </p>
      </div>

      {/* STATS */}
      <div className="stats-section">

        <div className="stat">
          <h3>500+</h3>
          <p>Projects Created</p>
        </div>

        <div className="stat">
          <h3>1200+</h3>
          <p>Developers Joined</p>
        </div>

        <div className="stat">
          <h3>300+</h3>
          <p>Teams Formed</p>
        </div>

      </div>

      {/* HOW IT WORKS */}
      <div className="how-section">

        <h2>How It Works</h2>

        <div className="how-grid">

          <div className="how-card">
            <h3>1. Join Platform</h3>
            <p>Create your free account in seconds.</p>
          </div>

          <div className="how-card">
            <h3>2. Explore Projects</h3>
            <p>Find projects that match your skills.</p>
          </div>

          <div className="how-card">
            <h3>3. Collaborate</h3>
            <p>Work with talented teammates and build together.</p>
          </div>

        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="testimonials">

        <h2>What Users Say</h2>

        <div className="testimonial-grid">

          <div className="testimonial-card">
            <p>"Amazing platform for collaboration!"</p>
            <h4>- Ahmed</h4>
          </div>

          <div className="testimonial-card">
            <p>"Found my dream team here."</p>
            <h4>- Sara</h4>
          </div>

          <div className="testimonial-card">
            <p>"Very easy to use and powerful."</p>
            <h4>- Ali</h4>
          </div>

        </div>
      </div>

      {/* FAQ */}
      <div className="faq-section">

        <h2>Frequently Asked Questions</h2>

        <div className="faq">
          <h4>Is SkillSync free?</h4>
          <p>Yes, it is completely free for students and developers.</p>
        </div>

        <div className="faq">
          <h4>Can I create multiple projects?</h4>
          <p>Yes, you can create unlimited projects.</p>
        </div>

        <div className="faq">
          <h4>How do I join a project?</h4>
          <p>Click "Join Project" and send request.</p>
        </div>

      </div>
<Footer />

    </div>
  );
}