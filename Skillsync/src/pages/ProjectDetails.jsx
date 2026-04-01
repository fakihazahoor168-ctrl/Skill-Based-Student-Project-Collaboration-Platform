import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // dummy data (later backend se aayega)
  const project = {
    id,
    title: "AI Chatbot",
    description: "Building NLP chatbot",
    owner: "Fakiha",
    tech: ["Python", "AI"],
  };

  const currentUser = "Fakiha"; // later auth se aayega

  const isOwner = currentUser === project.owner;

  return (
    <div className="project-details-page">

      <div className="details-card">

        <h1>{project.title}</h1>
        <p>{project.description}</p>

        <h3>Tech</h3>
        <div className="tech-tags">
          {project.tech.map((t, i) => (
            <span key={i} className="tag">{t}</span>
          ))}
        </div>

        <p>Owner: {project.owner}</p>

        {/* ONLY OWNER CAN EDIT */}
        {isOwner && (
          <button onClick={() => navigate(`/edit/${project.id}`)}>
            Edit Project
          </button>
        )}

        {/* PUBLIC ACTION */}
        {!isOwner && (
          <button>
            Send Join Request
          </button>
        )}

        <button onClick={() => navigate(-1)}>
          Back
        </button>

      </div>
    </div>
  );
}