import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/CreateProject.css";

export default function EditProject() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech: "",
    status: "",
    difficulty: "",
    githubRepo: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects/${id}`);
        const project = res.data;
        setFormData({
          title: project.title || "",
          description: project.description || "",
          tech: project.tech ? project.tech.join(", ") : "",
          status: project.status || "open",
          difficulty: project.difficulty || "Beginner",
          githubRepo: project.githubRepo || ""
        });
      } catch (err) {
        setError("Failed to fetch project details");
        console.error(err);
      } finally {
        setFetching(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.tech) {
      setError("⚠ Please fill all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      
      await axios.put(`http://localhost:5000/api/projects/${id}`, formData, {
        headers: {
          "x-auth-token": token
        }
      });
      alert("Project Updated Successfully 🚀");
      navigate(`/projects/${id}`);
    } catch (err) {
      console.error("Edit Project Error:", err);
      const msg = err.response?.data?.message || err.response?.data?.msg || err.message || "Failed to update project";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="create-page"><div className="create-card"><p>Loading project details...</p></div></div>;

  return (
    <div className="create-page">
      <div className="create-card">
        <h1>Edit Project</h1>
        <p>Update your project details and requirements</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Project Title *</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. AI Chatbot"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Description *</label>
          <textarea
            name="description"
            placeholder="Describe your project..."
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label>Tech Stack (comma separated) *</label>
          <input
            type="text"
            name="tech"
            placeholder="e.g. React, Node, AI"
            value={formData.tech}
            onChange={handleChange}
            required
          />

          <label>GitHub Repository (Optional)</label>
          <input
            type="text"
            name="githubRepo"
            placeholder="e.g. facebook/react"
            value={formData.githubRepo}
            onChange={handleChange}
          />

          <label>Difficulty</label>
          <select name="difficulty" value={formData.difficulty} onChange={handleChange} style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', background: '#0f172a', color: 'white', border: '1px solid #334155' }}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange} style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', background: '#0f172a', color: 'white', border: '1px solid #334155' }}>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
