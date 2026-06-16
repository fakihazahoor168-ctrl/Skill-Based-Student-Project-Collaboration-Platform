import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/Projectcard";

export default function Explore() {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Filter logic
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase()) ||
    project.tech.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="dashboard-page">
      <div className="main-content">
        <div className="container" style={{ padding: '20px' }}>
          
          <h2 className="mb-4">🔍 <span className="page-title">Explore Projects</span></h2>
          <p style={{ color: '#94a3b8', marginBottom: '20px' }}>Discover amazing projects and join talented teams.</p>

          {/* SEARCH */}
          <div className="search-container" style={{ marginBottom: '30px' }}>
            <input
              type="text"
              placeholder="Search by title or technology (e.g. React)..."
              className="search-input"
              style={{
                width: '100%',
                padding: '15px 20px',
                borderRadius: '12px',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* PROJECT LIST */}
          {loading ? (
            <div className="loading">Loading projects...</div>
          ) : (
            <div className="card-grid">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <ProjectCard 
                    key={project._id} 
                    {...project} 
                    onClick={() => navigate(`/projects/${project._id}`)}
                  />
                ))
              ) : (
                <p style={{ color: '#64748b', textAlign: 'center', gridColumn: '1/-1', marginTop: '50px' }}>
                  No projects found matching your search.
                </p>
              )}
            </div>
          )}

        </div>
      </div>
      
      <style jsx>{`
        .search-input:focus {
          border-color: #22d3ee !important;
          box-shadow: 0 0 15px rgba(34, 211, 238, 0.3) !important;
        }
        .loading {
          color: white;
          text-align: center;
          font-size: 18px;
          margin-top: 50px;
        }
      `}</style>
    </div>
  );
}