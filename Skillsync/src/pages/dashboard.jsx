import React from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/Projectcard";

export default function Dashboard() {
  return (
    <div>

      {/* Navbar */}
      <Navbar />

     <div className="container mt-5 pt-4">

        {/* 🔹 EXPLORE SECTION */}
        <div id="explore" className="hero-section p-4 mb-5">
          <h1 className="hero-title">Find Your Dream Team 🚀</h1>
          <p className="text-secondary">
            Collaborate, build projects, and grow your skills.
          </p>
          <button className="btn login-btn mt-3">+ Create Project</button>
        </div>

        {/* 🔹 PROJECTS SECTION */}
        <div id="projects" className="mt-5">
         <h2 className="dashboard-title mb-4">🔥 Trending Projects</h2>

          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <ProjectCard 
                title="AI Chatbot"
                description="Looking for NLP expert"
                tech={["Python", "AI", "NLP"]}
              />
            </div>

            <div className="col-md-6 col-lg-4">
              <ProjectCard 
                title="E-Commerce App"
                description="Need frontend developer"
                tech={["React", "CSS", "API"]}
              />
            </div>

            <div className="col-md-6 col-lg-4">
              <ProjectCard 
                title="Mobile App"
                description="React Native developers required"
                tech={["React Native", "UI/UX"]}
              />
            </div>
          </div>
        </div>

        {/* 🔹 TEAMS SECTION */}
        <div id="teams" className="mt-5 pt-4">
        <h2 className="dashboard-title">👥 Active Teams</h2>
          <p className="text-secondary">
            Join teams and collaborate with developers.
          </p>

          <div className="project-card mt-3">
            <h3 className="card-title">Team Alpha</h3>
            <p className="text-secondary small">
              Working on AI based recommendation system
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}