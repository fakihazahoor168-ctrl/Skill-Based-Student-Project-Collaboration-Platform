import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/projects");
        // Filter projects belonging to this user
        const userProjects = res.data.filter(p => (p.owner?._id || p.owner) === parsedUser.id);
        setProjects(userProjects);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [navigate]);

  return (
    <div>

      <h2 className="mb-4">📁 <span className="page-title">My Projects</span></h2>

      <div className="card-grid">

        {loading ? (
          <p>Loading your projects...</p>
        ) : projects.length > 0 ? (
          projects.map((p) => (
            <div key={p._id} className="project-card">
              <h3>{p.title}</h3>
              <p style={{ color: '#94A3B8', fontSize: '14px', margin: '10px 0' }}>
                {p.description ? p.description.substring(0, 80) + '...' : ''}
              </p>
              <div className="btn-row">
                <button onClick={() => navigate(`/projects/${p._id}`)}>View</button>
                <button onClick={() => navigate(`/edit/${p._id}`)}>Edit</button>
                <button className="danger">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No projects found. Go ahead and create one!</p>
        )}

      </div>

    </div>
  );
}