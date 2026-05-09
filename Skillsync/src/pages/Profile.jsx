import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/footer";
import "../styles/profile.css";
import { 
  FaEdit, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaBriefcase, FaGraduationCap, FaGithub, 
  FaLinkedin, FaTwitter, FaAward, FaUsers, 
  FaRocket, FaCode, FaCheckCircle, FaStar
} from "react-icons/fa";
import { FiMail, FiEdit3, FiShare2, FiMoreHorizontal } from "react-icons/fi";
import profilePic from "../assets/logo.png"; 

export default function Profile() {
  const skills = [
    { name: "React.js", perc: 90 },
    { name: "Node.js", perc: 85 },
    { name: "UI/UX Design", perc: 95 },
    { name: "MongoDB", perc: 75 },
    { name: "Python", perc: 60 },
    { name: "Tailwind CSS", perc: 80 }
  ];

  return (
    <div className="profile-page-wrapper">
      <Sidebar />
      
      <div className="profile-main-content">
        <Navbar />
        
        <div className="profile-container">
          
          {/* PROFILE HEADER SECTION */}
          <div className="profile-header-section">
            <div className="profile-banner">
              <div className="banner-glass-overlay"></div>
            </div>
            
            <div className="profile-identity-card">
              <div className="profile-avatar-container">
                <div className="profile-avatar-wrapper">
                  <img src={profilePic} alt="Fakiha Zahoor" className="profile-avatar-main" />
                  <div className="status-ring"></div>
                </div>
              </div>
              
              <div className="profile-info-text">
                <h1>Fakiha Zahoor</h1>
                <p>Full Stack Developer & UI Enthusiast</p>
                
                <div className="profile-badges">
                  <div className="badge-item">
                    <FaMapMarkerAlt /> Islamabad, PK
                  </div>
                  <div className="badge-item">
                    <FaBriefcase /> Available for Hire
                  </div>
                  <div className="badge-item">
                    <FaCheckCircle style={{ color: '#10b981' }} /> Verified Developer
                  </div>
                </div>
              </div>
            </div>

            <div className="header-actions">
              <button className="btn-secondary-glass"><FiShare2 /> Share</button>
              <button className="btn-primary-glass"><FiEdit3 /> Edit Profile</button>
            </div>
          </div>

          <div className="profile-content-layout">
            
            {/* LEFT COLUMN: ABOUT & SKILLS */}
            <div className="profile-left-col">
              
              {/* STATS BAR */}
              <div className="glass-card stats-bar-card">
                <div className="stats-grid">
                  <div className="stat-box">
                    <span className="stat-value">12</span>
                    <span className="stat-label">Projects</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-value">4.9</span>
                    <span className="stat-label">Rating</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-value">250+</span>
                    <span className="stat-label">Followers</span>
                  </div>
                </div>
              </div>

              {/* EXPERTISE */}
              <div className="glass-card skills-card">
                <h3 className="card-title">
                  <div className="icon-box"><FaCode /></div>
                  Top Expertise
                </h3>
                
                <div className="skills-list">
                  {skills.map((skill, index) => (
                    <div key={index} className="skill-row">
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-perc">{skill.perc}%</span>
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${skill.perc}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SOCIALS */}
              <div className="glass-card social-card" style={{ textAlign: 'center' }}>
                <h3 className="card-title">Connect with me</h3>
                <div className="social-strip" style={{ justifyContent: 'center' }}>
                  <button className="social-circle-btn"><FaGithub /></button>
                  <button className="social-circle-btn"><FaLinkedin /></button>
                  <button className="social-circle-btn"><FaTwitter /></button>
                  <button className="social-circle-btn"><FaEnvelope /></button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: WORK & ACTIVITY */}
            <div className="profile-right-col">
              
              {/* PROFESSIONAL BIO */}
              <div className="glass-card about-card">
                <h3 className="card-title">
                  <div className="icon-box"><FaRocket /></div>
                  Elevator Pitch
                </h3>
                <p style={{ lineHeight: '1.8', color: '#94a3b8' }}>
                  A developer at heart and a designer by choice. I specialize in building zero-to-one products that 
                  not only solve user problems but also provide a delightful visual experience. With 3+ years in 
                  Web3 and AI tool development, I thrive in fast-paced collaborative environments.
                  <br /><br />
                  Love experimenting with new CSS frameworks and motion libraries to push the boundaries of 
                  what's possible in the browser.
                </p>
              </div>

              {/* RECENT PROJECTS */}
              <div className="glass-card projects-showcase">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                  <h3 className="card-title" style={{ marginBottom: 0 }}>
                    <div className="icon-box"><FaAward /></div>
                    Featured Projects
                  </h3>
                  <button style={{ background: 'transparent', border: 'none', color: '#38bdf8', fontWeight: '600', cursor: 'pointer' }}>View Gallery</button>
                </div>

                <div className="project-visual-card">
                  <div className="project-thumb">
                    <FaCode />
                  </div>
                  <div className="project-details">
                    <h4>SkillSync Platform</h4>
                    <p>The very tool you are using right now. Built with passion.</p>
                    <div className="project-tags">
                      <span className="mini-tag">React</span>
                      <span className="mini-tag">MERN</span>
                      <span className="mini-tag">AI Integration</span>
                    </div>
                  </div>
                </div>

                <div className="project-visual-card">
                  <div className="project-thumb">
                    <FaStar />
                  </div>
                  <div className="project-details">
                    <h4>Nebula Dashboard</h4>
                    <p>A data visualization suite for crypto asset management.</p>
                    <div className="project-tags">
                      <span className="mini-tag">TypeScript</span>
                      <span className="mini-tag">D3.js</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TIMELINE (EDUCATION & EXPERIENCE) */}
              <div className="glass-card timeline-card">
                <h3 className="card-title">
                  <div className="icon-box"><FaGraduationCap /></div>
                  Timeline
                </h3>
                
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h4>Senior Frontend Lead</h4>
                      <span>CodeCanvas Studio • 2024 - Present</span>
                      <p>Leading a team of 5 developers building high-end SaaS marketing pages and component libraries.</p>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h4>BS Computer Science</h4>
                      <span>NUST University • 2020 - 2024</span>
                      <p>Focused on Human-Computer Interaction and Advanced Algorithms. Graduated with Honors.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}