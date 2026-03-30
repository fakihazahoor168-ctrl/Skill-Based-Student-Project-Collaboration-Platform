import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!formData.title || !formData.description || !formData.tech) {
      setError("⚠ Please fill all fields");
      return;
    }

    setError("");

    console.log("Project Created:", formData);

    alert("Project Created Successfully 🚀");

    navigate("/dashboard");
  };

  return (
    <div className="create-page">
      <div className="create-card">

        <h1>Create New Project</h1>
        <p>Share your idea and find the right teammates 🚀</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>

          <label>Project Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. AI Chatbot"
            value={formData.title}
            onChange={handleChange}
          />

          <label>Description</label>
          <textarea
            name="description"
            placeholder="Describe your project..."
            value={formData.description}
            onChange={handleChange}
          />

          <label>Tech Stack</label>
          <input
            type="text"
            name="tech"
            placeholder="e.g. React, Node, AI"
            value={formData.tech}
            onChange={handleChange}
          />

          <button type="submit">
            Create Project
          </button>

        </form>

      </div>
    </div>
  );
}