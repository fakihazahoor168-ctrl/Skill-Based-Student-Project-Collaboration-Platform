import React from "react";
import "../styles/profile.css";
import profilePic from "../assets/logo.png"; // replace later with user image

export default function Profile() {

  // 🔥 Dummy data (later replace with backend)
  const user = {
    name: "Fakiha Zahoor",
    bio: "Frontend Developer passionate about building modern UI/UX.",
    skills: ["React", "JavaScript", "CSS", "Node.js"],
    createdProjects: ["AI Chat App", "E-commerce Website"],
    joinedProjects: ["Portfolio Builder", "Task Manager"]
  };

  return (
    <div className="profile-page">

      {/* HEADER */}
      <div className="profile-header">

        <img src={profilePic} alt="profile" className="profile-pic" />

        <h2>{user.name}</h2>
        <p className="bio">{user.bio}</p>

        <button className="edit-btn">Edit Profile</button>

      </div>

      {/* SKILLS */}
      <div className="profile-section">
        <h3>Skills</h3>

        <div className="skills">
          {user.skills.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>

      {/* CREATED PROJECTS */}
      <div className="profile-section">
        <h3>Projects Created</h3>

        {user.createdProjects.map((proj, index) => (
          <div key={index} className="project-card">
            {proj}
          </div>
        ))}
      </div>

      {/* JOINED PROJECTS */}
      <div className="profile-section">
        <h3>Joined Projects</h3>

        {user.joinedProjects.map((proj, index) => (
          <div key={index} className="project-card">
            {proj}
          </div>
        ))}
      </div>

    </div>
  );
}