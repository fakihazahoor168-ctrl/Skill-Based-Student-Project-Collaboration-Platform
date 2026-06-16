import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/CreateProject.css";

export default function CreateProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech: "",
    githubRepo: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!formData.title || !formData.description || !formData.tech) {
      setError("⚠ Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      console.log("Using token:", token);
      
      const res = await axios.post("http://localhost:5000/api/projects", formData, {
        headers: {
          "x-auth-token": token
        }
      });
      alert("Project Created Successfully 🚀");
      navigate("/dashboard");
    } catch (err) {
      console.error("Create Project Error:", err);
      const msg = err.response?.data?.message || err.message || "Failed to create project";
      setError(msg);
    } finally {
      setLoading(false);
    }
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

          <label>GitHub Repository (Optional)</label>
          <input
            type="text"
            name="githubRepo"
            placeholder="e.g. facebook/react"
            value={formData.githubRepo}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Project"}
          </button>

        </form>

      </div>
    </div>
  );
}