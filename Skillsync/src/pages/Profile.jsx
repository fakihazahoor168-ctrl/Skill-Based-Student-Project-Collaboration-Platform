import React from "react";
import "../styles/profile.css";
import profilePic from "../assets/logo.png";
import Sidebar from "../components/Sidebar";

export default function Profile() {

  const user = {
    name: "Fakiha Zahoor",
    bio: "Frontend Developer passionate about building modern UI/UX.",
    skills: ["React", "JavaScript", "CSS", "Node.js"],
    createdProjects: ["AI Chat App", "E-commerce Website"],
    joinedProjects: ["Portfolio Builder", "Task Manager"]
  };

  return (
    <div className="profile-layout">

     <div className="sidebar">
    <Sidebar />
  </div>

      {/* MAIN CONTENT */}
      <div className="profile-main">

        {/* HEADER */}
        <div className="profile-header">

          <img src={profilePic} alt="profile" />

          <div>
            <h2>{user.name}</h2>
            <p className="bio">{user.bio}</p>
            <p className="status">🟢 Online</p>
          </div>

          <button className="edit-btn">Edit Profile</button>

        </div>

        {/* STATS */}
        <div className="stats-row">

          <div className="stat-card">
            <h3>12</h3>
            <p>Projects</p>
          </div>

          <div className="stat-card">
            <h3>5</h3>
            <p>Teams</p>
          </div>

          <div className="stat-card">
            <h3>120</h3>
            <p>Connections</p>
          </div>

        </div>

        {/* CONTENT GRID */}
        <div className="profile-grid">

          <div className="card">
            <h3>Skills</h3>
            <div className="skills">
              {user.skills.map((skill, i) => (
                <span key={i}>{skill}</span>
              ))}
            </div>
          </div>

          <div className="card">
            <h3>Recent Activity</h3>
            <p>✔ Created AI Chat App</p>
            <p>✔ Joined Task Manager</p>
            <p>✔ Updated profile</p>
          </div>

          <div className="card full">
            <h3>Projects Created</h3>
            {user.createdProjects.map((p, i) => (
              <div key={i} className="item">{p}</div>
            ))}
          </div>

          <div className="card full">
            <h3>Joined Projects</h3>
            {user.joinedProjects.map((p, i) => (
              <div key={i} className="item">{p}</div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}