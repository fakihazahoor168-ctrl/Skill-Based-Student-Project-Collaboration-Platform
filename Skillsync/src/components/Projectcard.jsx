import React from "react";

export default function ProjectCard({ title, description, tech, onClick }) {
  return (
    <div className="project-card">

      {/* Title */}
      <h3 className="card-title">{title}</h3>

      {/* Description */}
      <p className="text-secondary small">{description?.substring(0, 100)}...</p>

      {/* Tech Tags */}
      <div className="tech-tags">
        {tech && Array.isArray(tech) && tech.map((item, index) => (
          <span key={index} className="tag">
            {item}
          </span>
        ))}
      </div>

      {/* Button */}
      <button className="btn login-btn w-100 mt-3" onClick={onClick}>
        View Details
      </button>
    </div>
  );
}