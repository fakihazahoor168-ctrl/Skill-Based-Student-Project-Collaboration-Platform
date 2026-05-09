import React from "react";
import { useNavigate } from "react-router-dom";

export default function MyProjects() {
  const navigate = useNavigate();

  const projects = [
    { id: 1, title: "AI Chatbot" },
    { id: 2, title: "E-Commerce App" },
  ];

  return (
    <div>

      <h2 className="mb-4">📁 <span className="page-title">My Projects</span></h2>

      <div className="card-grid">

        {projects.map((p) => (
          <div key={p.id} className="project-card">

            <h3>{p.title}</h3>

            <div className="btn-row">

              <button onClick={() => navigate(`/projects/${p.id}`)}>
                View
              </button>

              <button onClick={() => navigate(`/edit/${p.id}`)}>
                Edit
              </button>

              <button className="danger">
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}