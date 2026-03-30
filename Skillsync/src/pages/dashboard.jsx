import React from "react";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

import { FaBolt, FaFire, FaUsers } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { MdTrendingUp } from "react-icons/md";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">

<Navbar />
 <Sidebar />
      {/* 🔷 MAIN CONTENT */}
      <div className="main-content">
      <div className="container mt-4">

        {/* HERO SECTION */}
        <div className="hero-card">
          <div>
            <h1>Welcome back, Fakiha 👋</h1>
            <p>Let’s build something amazing today 🚀</p>
          </div>

          <button
            className="btn login-btn"
            onClick={() => navigate("/create")}
          >
            + Create Project
          </button>
        </div>

        {/* STATS CARDS */}
        <div className="card-grid">

          <div className="stat-card">
            <h3>5</h3>
            <p>Projects Created</p>
          </div>

          <div className="stat-card">
            <h3>3</h3>
            <p>Join Requests</p>
          </div>

          <div className="stat-card">
            <h3>2</h3>
            <p>Active Teams</p>
          </div>

        </div>

        {/* QUICK ACTIONS */}
        <div className="section">
       <h2><FaBolt className="section-icon" /> Quick Actions</h2>

          <div className="action-grid">
            <button onClick={() => navigate("/Explore")}>Explore Projects</button>
            <button onClick={() => navigate("/profile")}>View Profile</button>
            <button onClick={() => navigate("/requests")}>Join Requests</button>
          </div>
        </div>

        {/* TRENDING PROJECTS */}
        <div className="section">
       <h2><MdTrendingUp className="section-icon" /> Trending Projects</h2>

          <div className="card-grid">
            <ProjectCard
              title="AI Chatbot      "
              description="Looking for NLP expert and MERN "
              tech={["Python ", "AI ", "NLP"]}
            />

            <ProjectCard
              title="E-Commerce App"
              description="Need frontend and backend developer"
              tech={["React ", "CSS ", "API"]}
            />

            <ProjectCard
              title="Mobile App"
              description="React Native developers required"
              tech={["React Native", "UI/UX"]}
            />
        
          </div>
        </div>

        {/* SUGGESTED TEAMMATES */}
        <div className="section">
         <h2><FaUsers className="section-icon" /> Suggested Teammates</h2>

          <div className="card-grid">

            <div className="team-card">
              <h4>Ahmed</h4>
              <p>React + AI</p>
              <button>Invite</button>
            </div>

            <div className="team-card">
              <h4>Ali</h4>
              <p>Node + Backend</p>
              <button>Invite</button>
            </div>

            <div className="team-card">
              <h4>Sara</h4>
              <p>UI/UX Designer</p>
              <button>Invite</button>
            </div>

          </div>
        </div>

      </div>

      {/* FOOTER */}
      <Footer />

    </div>
    </div>
  );
}