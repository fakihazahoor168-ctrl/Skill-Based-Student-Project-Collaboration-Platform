import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landing.css";
import logo from "../assets/logo.png";
import Footer from "../components/footer";
import {
  FaRocket, FaUsers, FaCode, FaShieldAlt,
  FaGithub, FaTwitter, FaLinkedin,
  FaStar, FaCheckCircle, FaArrowRight, FaBolt,
  FaLightbulb, FaHandshake
} from "react-icons/fa";
import { FiZap, FiArrowRight } from "react-icons/fi";

export default function Landing() {
  const navigate = useNavigate();
  const [activeFAQ, setActiveFAQ] = useState(null);

  const features = [
    {
      icon: <FaRocket />,
      color: "#06b6d4",
      title: "Launch Projects Fast",
      desc: "Go from idea to team in minutes. Post your project and get matched with the right collaborators instantly."
    },
    {
      icon: <FaUsers />,
      color: "#a78bfa",
      title: "Build Dream Teams",
      desc: "Connect with skilled developers, designers, and creators who share your vision and work style."
    },
    {
      icon: <FaCode />,
      color: "#10b981",
      title: "Skill-Based Matching",
      desc: "Our smart algorithm matches you based on your tech stack, experience, and project goals."
    },
    {
      icon: <FaShieldAlt />,
      color: "#f59e0b",
      title: "Verified Profiles",
      desc: "Every member is reviewed. Work with confidence knowing your teammates are vetted professionals."
    }
  ];

  const stats = [
    { value: "500+", label: "Projects Launched", icon: <FaRocket /> },
    { value: "1,200+", label: "Developers Joined", icon: <FaUsers /> },
    { value: "300+", label: "Teams Formed", icon: <FaHandshake /> },
    { value: "4.9★", label: "Avg. Rating", icon: <FaStar /> }
  ];

  const steps = [
    { num: "01", title: "Create Account", desc: "Sign up free in seconds — no credit card needed." },
    { num: "02", title: "Explore Projects", desc: "Browse hundreds of projects looking for your exact skillset." },
    { num: "03", title: "Join & Collaborate", desc: "Send a request, get accepted, and start building together." }
  ];

  const testimonials = [
    { quote: "SkillSync is the best place to find serious collaborators. Found my co-founder here!", name: "Ahmed K.", role: "Full-Stack Dev", initials: "AK" },
    { quote: "I joined three incredible teams through SkillSync. The skill-matching is incredibly accurate.", name: "Sara M.", role: "UI/UX Designer", initials: "SM" },
    { quote: "As a freelancer, this platform gave me a community. I ship better products with better people.", name: "Ali R.", role: "Backend Engineer", initials: "AR" }
  ];

  const faqs = [
    { q: "Is SkillSync free to use?", a: "Yes, completely free for students and developers. No hidden fees." },
    { q: "Can I create multiple projects?", a: "Absolutely — you can create and manage unlimited projects from your dashboard." },
    { q: "How do I join a project?", a: "Browse the Explore page, find a project you like, and click 'Join Project' to send a request." },
    { q: "Is my profile public?", a: "Your profile is visible to other members so they can find and invite you to projects." }
  ];

  return (
    <div className="landing-page">

      {/* ─── NAVBAR ─── */}
      <nav className="landing-navbar">
        <div className="landing-logo-group">
          <img src={logo} alt="SkillSync" className="landing-logo" />
          <span className="landing-brand">SkillSync</span>
        </div>
        <div className="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#how">How it Works</a>
          <a href="#testimonials">Reviews</a>
        </div>
        <div className="landing-nav-actions">
          <button className="btn-nav-ghost" onClick={() => navigate("/login")}>Login</button>
          <button className="btn-nav-solid" onClick={() => navigate("/register")}>Get Started <FiArrowRight /></button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="landing-hero">
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>


        <h1 className="hero-title">
          Find Projects. <span className="hero-gradient">Build Teams,</span>Ship Faster.
        </h1>

        <p className="hero-subtitle">
          The collaboration platform built for developers, creators.<br />
          Turn your ideas into shipped products — with the right team.
        </p>

        <div className="hero-actions">
          <button className="btn-hero-primary" onClick={() => navigate("/login")}>
            <FaRocket /> Explore Projects
          </button>
          <button className="btn-hero-secondary" onClick={() => navigate("/register")}>
            Create Project <FiArrowRight />
          </button>
        </div>

        <div className="hero-social-proof">
          <div className="avatar-stack">
            {["MH", "ZK", "AR", "FZ", "SA"].map((initials, i) => (
              <div key={i} className="avatar-mini" style={{ zIndex: 5 - i }}>{initials}</div>
            ))}
          </div>
          <p>Joined by <strong>1,200+</strong> developers this month</p>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="stats-strip" id="stats">
        {stats.map((s, i) => (
          <div key={i} className="stat-pill">
            <div className="stat-pill-icon">{s.icon}</div>
            <div>
              <span className="stat-pill-value">{s.value}</span>
              <span className="stat-pill-label">{s.label}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ─── FEATURES ─── */}
      <section className="features-section" id="features">
        <div className="section-header-center">
          <div className="section-eyebrow">Why SkillSync</div>
          <h2>Everything you need to<br /><span className="text-gradient">build & ship together</span></h2>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon-wrap" style={{ background: `${f.color}18`, color: f.color }}>
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="how-section" id="how">
        <div className="section-header-center">
          <div className="section-eyebrow">The Process</div>
          <h2>Up and running in<br /><span className="text-gradient">3 simple steps</span></h2>
        </div>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div key={i} className="step-card">
              <div className="step-number">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {i < steps.length - 1 && <div className="step-arrow"><FaArrowRight /></div>}
            </div>
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="testimonials-section" id="testimonials">
        <div className="section-header-center">
          <div className="section-eyebrow">Community Love</div>
          <h2>What our members <span className="text-gradient">say about us</span></h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, si) => <FaStar key={si} />)}
              </div>
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="faq-section" id="faq">
        <div className="section-header-center">
          <div className="section-eyebrow">Got Questions?</div>
          <h2>Frequently Asked <span className="text-gradient">Questions</span></h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-item ${activeFAQ === i ? "open" : ""}`}
              onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
            >
              <div className="faq-question">
                <span>{faq.q}</span>
                <div className="faq-toggle">{activeFAQ === i ? "−" : "+"}</div>
              </div>
              {activeFAQ === i && <p className="faq-answer">{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="cta-banner">
        <div className="cta-glow"></div>
        <h2>Ready to build something <span className="text-gradient">amazing?</span></h2>
        <p>Join thousands of developers who are already collaborating on SkillSync.</p>
        <button className="btn-hero-primary" onClick={() => navigate("/register")}>
          <FaBolt /> Start for Free
        </button>
      </section>

      <Footer />
    </div>
  );
}

function FiBolt(props) {
  return <FaLightbulb {...props} />;
}