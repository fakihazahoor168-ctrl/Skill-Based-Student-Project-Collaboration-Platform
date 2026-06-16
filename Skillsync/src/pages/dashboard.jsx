import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/footer";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

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
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [myProjects, setMyProjects] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    } 
    setUser(JSON.parse(storedUser));

    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const config = { headers: { "x-auth-token": token } };

      try {
        // Fetch All Projects
        const resAll = await axios.get("http://localhost:5000/api/projects");
        setProjects(resAll.data);

        // Fetch My Projects
        const resMe = await axios.get("http://localhost:5000/api/projects/me", config);
        setMyProjects(resMe.data);

        // Fetch Recommended
        const resRec = await axios.get("http://localhost:5000/api/projects/recommended", config);
        setRecommended(resRec.data);

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/projects/${id}`, {
          headers: { "x-auth-token": token }
        });
        setMyProjects(myProjects.filter(p => p._id !== id));
        setProjects(projects.filter(p => p._id !== id));
      } catch (err) {
        console.error("Error deleting project:", err);
        alert("Failed to delete project");
      }
    }
  };

  return (
    <div className="dashboard-page">
      <div className="main-content">
        <div className="dashboard-container">

          {/* HERO SECTION */}
          <div className="hero-card">
            <div className="hero-text">
                <h1>
                  <span className="welcome-text">Welcome back,</span>{" "}
                  <span className="page-title">{user?.name || "User"}</span>
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
                <h3>{myProjects.length.toString().padStart(2, '0')}</h3>
              </div>
              <div className="stat-trend trend-up">
                <FiTrendingUp /> Active contribution
              </div>
            </div>

            <div className="stat-card">
              <div>
                <p>Recommended</p>
                <h3>{recommended.length.toString().padStart(2, '0')}</h3>
              </div>
              <div className="stat-trend trend-up">
                <FiTrendingUp /> Matches your skills
              </div>
            </div>

            <div className="stat-card">
              <div>
                <p>Total Projects</p>
                <h3>{projects.length.toString().padStart(2, '0')}</h3>
              </div>
              <div className="stat-trend">
                <FiCheck /> Global community
              </div>
            </div>
          </div>

          {/* RECOMMENDED PROJECTS SECTION */}
          <div className="section">
            <h2><FaFire className="section-icon" style={{color: '#f59e0b'}} /> Recommended For You</h2>
            <p style={{color: '#94a3b8', marginBottom: '20px', fontSize: '14px'}}>Based on your skills: {user?.skills?.join(", ")}</p>
            <div className="card-grid">
              {loading ? (
                <p>Loading...</p>
              ) : recommended.length > 0 ? (
                recommended.slice(0, 3).map((project) => (
                  <ProjectCard
                    key={project._id}
                    title={project.title}
                    description={project.description}
                    tech={project.tech}
                    onClick={() => navigate(`/projects/${project._id}`)}
                  />
                ))
              ) : (
                <p>Add more skills to your profile to get personalized recommendations!</p>
              )}
            </div>
          </div>

          {/* MY PROJECTS */}
          <div className="section">
            <h2>📁 My Current Projects</h2>
            <div className="card-grid">
              {loading ? (
                <p>Loading...</p>
              ) : myProjects.length > 0 ? (
                myProjects.map((project) => (
                  <div key={project._id} className="project-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '15px', marginBottom: '10px' }}>
                        <h3 style={{ fontSize: '18px', margin: 0, wordBreak: 'break-word', flex: 1 }}>{project.title}</h3>
                        <span className="badge" style={{ flexShrink: 0, alignSelf: 'flex-start', background: 'linear-gradient(135deg, #06B6D4, #0891B2)', color: '#FFFFFF', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '800', boxShadow: '0 4px 15px rgba(6, 182, 212, 0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{project.status || 'ACTIVE'}</span>
                      </div>
                      <p style={{ color: '#94A3B8', fontSize: '13px' }}>{project.description?.substring(0, 100)}...</p>
                    </div>
                    <div className="btn-row" style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
                      <button onClick={() => navigate(`/projects/${project._id}`)} style={{ flex: '1' }}>View</button>
                      <button className="danger" onClick={() => handleDelete(project._id)} style={{ flex: '1' }}>Delete</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>You haven't created any projects yet.</p>
              )}
            </div>
          </div>

          {/* TRENDING PROJECTS */}
          <div className="section" style={{ marginBottom: '100px' }}>
            <h2><MdTrendingUp className="section-icon" /> Explore All Projects</h2>
            <div className="card-grid">
              {loading ? (
                <p>Loading projects...</p>
              ) : projects.length > 0 ? (
                projects.slice(0, 6).map((project) => (
                  <ProjectCard
                    key={project._id}
                    title={project.title}
                    description={project.description}
                    tech={project.tech}
                    onClick={() => navigate(`/projects/${project._id}`)}
                  />
                ))
              ) : (
                <p>No projects found. Be the first to create one!</p>
              )}
            </div>
          </div>

        </div>

        <Footer />
      </div>
    </div>
  );
}