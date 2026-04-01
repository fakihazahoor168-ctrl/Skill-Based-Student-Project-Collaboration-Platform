import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";

export default function Explore() {

  const [search, setSearch] = useState("");

  const projects = [
    {
      title: "AI Chatbot",
      description: "Looking for NLP expert and MERN ",
      tech: ["Python ", "AI ", "NLP"]
    },
    {
      title: "E-Commerce App",
      description: "Need frontend and backend developer",
      tech: ["React ", "CSS ", "API"]
    },
    {
      title: "Portfolio Website",
      description: "Looking for UI designer",
      tech: ["HTML", "CSS", "UI/UX"]
    }
  ];

  // 🔍 Filter logic
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-page">

      <div className="main-content">

        <div className="container">

          <h2 className="mb-4">🔍 Explore Projects</h2>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search projects..."
            className="search-input mb-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* PROJECT LIST */}
          <div className="card-grid">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}