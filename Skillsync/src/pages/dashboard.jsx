import React from "react";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/footer";
import { useNavigate, Link } from "react-router-dom";

import {
  FaBolt, FaFire, FaUsers, FaChartLine, FaHistory,
  FaBell, FaRocket, FaStar, FaCode, FaCalendarCheck,
  FaGlobe, FaTrophy, FaLightbulb, FaCheckCircle,
  FaTasks, FaCommentDots
} from "react-icons/fa";
import { FiUserPlus, FiTrendingUp, FiCheckCircle as FiCheck, FiMail, FiActivity } from "react-icons/fi";
import { MdTrendingUp, MdOutlineTimeline, MdStars } from "react-icons/md";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">

      <div className="main-content">
        <div className="dashboard-container">

          {/* HERO SECTION */}
          <div className="hero-card">
            <div className="hero-text">
                <h1>
                  <span className="welcome-text">Welcome back,</span>{" "}
                  <span className="page-title">Fakiha</span>
                </h1>
              <p>Everything you need to manage your projects and collaborate with your team, all in one place.</p>
            </div>

            <button
              className="btn login-btn"
              onClick={() => navigate("/create")}
            >
              Create Project
            </button>
          </div>

          {/* QUICK ANALYTICS STATS */}
          <div className="card-grid">
            <div className="stat-card">
              <div>
                <p>Projects Created</p>
                <h3>05</h3>
              </div>
              <div className="stat-trend trend-up">
                <FiTrendingUp /> +12% performance
              </div>
            </div>

            <div className="stat-card">
              <div>
                <p>Join Requests</p>
                <h3>03</h3>
              </div>
              <div className="stat-trend trend-up">
                <FiTrendingUp /> +2 new this week
              </div>
            </div>

            <div className="stat-card">
              <div>
                <p>Active Teams</p>
                <h3>02</h3>
              </div>
              <div className="stat-trend">
                <FiCheck /> 68% milestone reach
              </div>
            </div>
          </div>

          {/*  SKILLS PROFICIENCY */}
          <div className="section">
            <h2><FaCode className="section-icon" /> My Skills Proficiency</h2>
            <div className="card-grid">
              <div className="feed-card">
                <p style={{ fontWeight: '600', marginBottom: '10px' }}>React.js Development</p>
                <div className="progress-mini" style={{ height: '10px', background: 'rgba(30,41,59,0.5)', borderRadius: '10px' }}>
                  <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, #06B6D4, #3B82F6)', borderRadius: '10px' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', color: '#94A3B8' }}>
                  <span>Expert</span>
                  <span>85%</span>
                </div>
              </div>
              <div className="feed-card">
                <p style={{ fontWeight: '600', marginBottom: '10px' }}>UI/UX Designing</p>
                <div className="progress-mini" style={{ height: '10px', background: 'rgba(30,41,59,0.5)', borderRadius: '10px' }}>
                  <div style={{ width: '70%', height: '100%', background: 'linear-gradient(90deg, #A78BFA, #6366F1)', borderRadius: '10px' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', color: '#94A3B8' }}>
                  <span>Intermediate</span>
                  <span>70%</span>
                </div>
              </div>
              <div className="feed-card">
                <p style={{ fontWeight: '600', marginBottom: '10px' }}>Backend (Node.js)</p>
                <div className="progress-mini" style={{ height: '10px', background: 'rgba(30,41,59,0.5)', borderRadius: '10px' }}>
                  <div style={{ width: '50%', height: '100%', background: 'linear-gradient(90deg, #FACC15, #F59E0B)', borderRadius: '10px' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', color: '#94A3B8' }}>
                  <span>Beginner</span>
                  <span>50%</span>
                </div>
              </div>
            </div>
          </div>

          {/* TASKS & MILESTONES */}
          <div className="section">
            <h2><FaTasks className="section-icon" /> Tasks & Milestones</h2>
            <div className="feed-card" style={{ padding: '0' }}>
              <div className="activity-item" style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <FaCheckCircle style={{ color: '#10B981', fontSize: '18px' }} />
                <div className="activity-details">
                  <p style={{ fontWeight: '600' }}>Fix Database Connection issues in AI Hub</p>
                  <span>Assigned: Today • Deadline: 10:00 PM</span>
                </div>
                <button className="login-btn" style={{ padding: '5px 10px', fontSize: '11px' }}>Mark Done</button>
              </div>
              <div className="activity-item" style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <FaCheckCircle style={{ color: '#94A3B8', fontSize: '18px' }} />
                <div className="activity-details">
                  <p style={{ fontWeight: '600' }}>Create responsive Navbar for Portfolio</p>
                  <span>Assigned: Yesterday • Deadline: Tomorrow</span>
                </div>
                <button className="login-btn" style={{ padding: '5px 10px', fontSize: '11px' }}>In Progress</button>
              </div>
              <div className="activity-item" style={{ padding: '20px' }}>
                <FaCheckCircle style={{ color: '#94A3B8', fontSize: '18px' }} />
                <div className="activity-details">
                  <p style={{ fontWeight: '600' }}>Team Review of the current UI trends</p>
                  <span>Assigned: 2 days ago • Friday, 4:00 PM</span>
                </div>
                <button className="login-btn" style={{ padding: '5px 10px', fontSize: '11px' }}>Scheduled</button>
              </div>
            </div>
          </div>

          {/*  MY PROJECTS */}
          <div className="section">
            <h2>📁 My Current Projects</h2>
            <div className="card-grid">
              <div className="project-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '18px' }}>Portfolio Website</h3>
                    <span className="badge" style={{ background: 'linear-gradient(135deg, #06B6D4, #0891B2)', color: '#FFFFFF', padding: '9px 15px', borderRadius: '8px', fontSize: '13px', fontWeight: '800', boxShadow: '0 4px 15px rgba(6, 182, 212, 0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ACTIVE</span>
                  </div>
                  <p style={{ color: '#94A3B8', fontSize: '13px' }}>A high-end personal portfolio built with React and advanced animations.</p>
                  <div className="progress-mini" style={{ height: '8px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '10px', margin: '20px 0', overflow: 'hidden' }}>
                    <div className="progress-bar" style={{ width: '75%', height: '100%', background: 'linear-gradient(90deg, #22d3ee, #06b6d4)', borderRadius: '10px' }}></div>
                  </div>
                </div>
                <div className="btn-row" style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
                  <button onClick={() => navigate("/edit")} style={{ flex: '1' }}>Edit</button>
                  <button className="danger" style={{ flex: '1' }}>Delete</button>
                </div>
              </div>

              <div className="project-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '18px' }}>Team Finder App</h3>
                    <span className="badge" style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)', color: '#FFFFFF', padding: '9px 15px', borderRadius: '8px', fontSize: '13px', fontWeight: '800', boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>PLANNING</span>
                  </div>
                  <p style={{ color: '#94A3B8', fontSize: '13px' }}>Helping developers find the perfect squad for their next hackathon project.</p>
                  <div className="progress-mini" style={{ height: '8px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '10px', margin: '20px 0', overflow: 'hidden' }}>
                    <div className="progress-bar" style={{ width: '30%', height: '100%', background: 'linear-gradient(90deg, #a78bfa, #6366f1)', borderRadius: '10px' }}></div>
                  </div>
                </div>
                <div className="btn-row" style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
                  <button onClick={() => navigate("/edit")} style={{ flex: '1' }}>Edit</button>
                  <button className="danger" style={{ flex: '1' }}>Delete</button>
                </div>
              </div>

              <div className="project-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '18px' }}>Chat Hub Pro</h3>
                    <span className="badge" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)', color: '#FFFFFF', padding: '9px 15px', borderRadius: '8px', fontSize: '13px', fontWeight: '800', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>DRAFT</span>
                  </div>
                  <p style={{ color: '#94A3B8', fontSize: '13px' }}>Real-time messaging platform with AI summarizing features.</p>
                  <div className="progress-mini" style={{ height: '8px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '10px', margin: '20px 0', overflow: 'hidden' }}>
                    <div className="progress-bar" style={{ width: '10%', height: '100%', background: 'linear-gradient(90deg, #facc15, #f59e0b)', borderRadius: '10px' }}></div>
                  </div>
                </div>
                <div className="btn-row" style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
                  <button onClick={() => navigate("/edit")} style={{ flex: '1' }}>Edit</button>
                  <button className="danger" style={{ flex: '1' }}>Delete</button>
                </div>
              </div>
            </div>
          </div>

          {/* TEAM CHAT & FEEDBACK  */}
          <div className="section">
            <h2><FaHistory className="section-icon" /> Recent Application Activity</h2>
            <div className="feed-card">
              <div className="activity-item">
                <div className="activity-avatar">AH</div>
                <div className="activity-details">
                  <p><b>Ahmed</b> applied to join your <b>Portfolio Hub</b> project.</p>
                  <span>2 hours ago • <Link to="/request" style={{ color: '#22D3EE', textDecoration: 'none' }}>View Request</Link></span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-avatar">SA</div>
                <div className="activity-details">
                  <p><b>Sara</b> sent a message in the <b>Team Finder</b> general chat.</p>
                  <span>5 hours ago • <Link to="/chat" style={{ color: '#22D3EE', textDecoration: 'none' }}>Open Chat</Link></span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-avatar">AL</div>
                <div className="activity-details">
                  <p><b>Ali</b> updated his status to: <i>"Focusing on the Backend refactor"</i></p>
                  <span>Yesterday</span>
                </div>
              </div>
            </div>
          </div>

          {/* WEEKLY PRODUCTIVITY CHART */}
          <div className="section">
            <h2><FaChartLine className="section-icon" /> Weekly Insights & Productivity</h2>
            <div className="feed-card" style={{ padding: '30px' }}>
              <p style={{ color: '#94A3B8', marginBottom: '20px' }}>Your daily project activity status over the last 7 days.</p>
              <div className="mini-chart" style={{ height: '150px', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 20px' }}>
                <div className="chart-bar" style={{ height: '50%', width: '40px', background: 'rgba(6,182,212,0.2)', borderRadius: '4px' }}></div>
                <div className="chart-bar" style={{ height: '30%', width: '40px', background: 'rgba(6,182,212,0.2)', borderRadius: '4px' }}></div>
                <div className="chart-bar" style={{ height: '70%', width: '40px', background: 'rgba(6,182,212,0.2)', borderRadius: '4px' }}></div>
                <div className="chart-bar active" style={{ height: '95%', width: '40px', background: 'linear-gradient(to top, #06B6D4, #22D3EE)', borderRadius: '4px' }}></div>
                <div className="chart-bar" style={{ height: '60%', width: '40px', background: 'rgba(6,182,212,0.2)', borderRadius: '4px' }}></div>
                <div className="chart-bar" style={{ height: '80%', width: '40px', background: 'rgba(6,182,212,0.2)', borderRadius: '4px' }}></div>
                <div className="chart-bar" style={{ height: '40%', width: '40px', background: 'rgba(6,182,212,0.2)', borderRadius: '4px' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 10px 0', color: '#94A3B8', fontSize: '11px' }}>
                <span>Mon</span><span>Tue</span><span>Wed</span><span style={{ color: '#22D3EE', fontWeight: 'bold' }}>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
              <div style={{ marginTop: '30px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                <p style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ fontSize: '24px', fontWeight: 'bold' }}>+15%</span>
                  <span style={{ color: '#10B981', display: 'flex', alignItems: 'center' }}><FiTrendingUp /> Increase in project engagement</span>
                </p>
              </div>
            </div>
          </div>

          {/* 👥 TEAM ONLINE STATUS */}
          <div className="section">
            <h2><FaUsers className="section-icon" /> Suggested Team Partners Online</h2>
            <div className="card-grid">
              <div className="team-card">
                <div className="activity-avatar" style={{ width: '50px', height: '50px', margin: '0 auto 10px', fontSize: '18px', border: '3px solid #10B981' }}>MH</div>
                <h4>Mohsin Hayat</h4>
                <p style={{ fontSize: '12px', color: '#94A3B8' }}>Full Stack Developer • Online</p>
                <button style={{ width: '100%', marginTop: '15px' }}>Invite to Project</button>
              </div>
              <div className="team-card">
                <div className="activity-avatar" style={{ width: '50px', height: '50px', margin: '0 auto 10px', fontSize: '18px', border: '3px solid #10B981' }}>ZK</div>
                <h4>Zunair Khan</h4>
                <p style={{ fontSize: '12px', color: '#94A3B8' }}>UI Specialist • Online</p>
                <button style={{ width: '100%', marginTop: '15px' }}>Invite to Project</button>
              </div>
              <div className="team-card">
                <div className="activity-avatar" style={{ width: '50px', height: '50px', margin: '0 auto 10px', fontSize: '18px', border: '3px solid #64748b' }}>AR</div>
                <h4>Anila R.</h4>
                <p style={{ fontSize: '12px', color: '#94A3B8' }}>Graphic Designer • Away</p>
                <button style={{ width: '100%', marginTop: '15px' }}>Invite to Project</button>
              </div>
            </div>
          </div>

          {/* COMMUNITY NEWS HUB */}
          <div className="section">
            <h2><FaGlobe className="section-icon" /> Developer Community News</h2>
            <div className="card-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <div className="feed-card" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <FaLightbulb style={{ fontSize: '32px', color: '#FACC15' }} />
                <div>
                  <p style={{ fontWeight: '700', fontSize: '16px' }}>React 19 Hooks Preview</p>
                  <p style={{ fontSize: '12px', color: '#94A3B8' }}>Learn about new features in the upcoming React 19 stable release.</p>
                </div>
              </div>
              <div className="feed-card" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <FaTrophy style={{ fontSize: '32px', color: '#6366F1' }} />
                <div>
                  <p style={{ fontWeight: '700', fontSize: '16px' }}>Upcoming Hackathon 2026</p>
                  <p style={{ fontSize: '12px', color: '#94A3B8' }}>Join the global hackathon and win up to $5000 in prizes!</p>
                </div>
              </div>
            </div>
          </div>

          {/* TRENDING PROJECTS */}
          <div className="section" style={{ marginBottom: '100px' }}>
            <h2><MdTrendingUp className="section-icon" /> People are joining these...</h2>
            <div className="card-grid">
              <ProjectCard
                title="AI Travel Planner"
                description="Planning your next trip with the power of modern LLMs like GPT-4o."
                tech={["Node.js", "AI", "React"]}
              />
              <ProjectCard
                title="SaaS Admin Panel"
                description="Clean, modern, and highly functional dashboard template for startups."
                tech={["Tailwind", "Next.js"]}
              />
            </div>
          </div>

        </div>

        <Footer />
      </div>

    </div>
  );
}