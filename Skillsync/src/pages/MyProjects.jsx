import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaFolder, FaUsers } from "react-icons/fa";

export default function MyProjects() {
  const navigate = useNavigate();
  const [ownedProjects, setOwnedProjects] = useState([]);
  const [joinedProjects, setJoinedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("owned");

  useEffect(() => {
    const fetchAllMyProjects = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const config = { headers: { "x-auth-token": token } };

      try {
        const resOwned = await axios.get("http://localhost:5000/api/projects/me", config);
        const resJoined = await axios.get("http://localhost:5000/api/projects/joined", config);
        
        setOwnedProjects(resOwned.data);
        setJoinedProjects(resJoined.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMyProjects();
  }, [navigate]);

  return (
    <div className="dashboard-page">
      <div className="main-content">
        <div className="container" style={{ padding: '30px', color: 'white' }}>
          
          <h2 className="mb-4">📁 <span className="page-title">Workspace</span></h2>
          <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Manage projects you created and those you are collaborating on.</p>

          {/* TABS */}
          <div className="tabs-container" style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid #334155' }}>
            <button 
              onClick={() => setActiveTab("owned")}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === "owned" ? "#22d3ee" : "#64748b",
                padding: '10px 20px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                borderBottom: activeTab === "owned" ? "3px solid #22d3ee" : "none"
              }}
            >
              <FaFolder /> My Created Projects ({ownedProjects.length})
            </button>
            <button 
              onClick={() => setActiveTab("joined")}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === "joined" ? "#22d3ee" : "#64748b",
                padding: '10px 20px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                borderBottom: activeTab === "joined" ? "3px solid #22d3ee" : "none"
              }}
            >
              <FaUsers /> Joined Projects ({joinedProjects.length})
            </button>
          </div>

          <div className="card-grid">
            {loading ? (
              <p>Loading your workspace...</p>
            ) : (
              (activeTab === "owned" ? ownedProjects : joinedProjects).length > 0 ? (
                (activeTab === "owned" ? ownedProjects : joinedProjects).map((p) => (
                  <div key={p._id} className="project-card glass-card" style={{ padding: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                        <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{p.title}</h3>
                        <span className="badge" style={{ background: '#22d3ee22', color: '#22d3ee', padding: '4px 10px', borderRadius: '6px', fontSize: '12px' }}>{p.status || 'ACTIVE'}</span>
                      </div>
                      <p style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '20px' }}>
                        {p.description ? p.description.substring(0, 100) + '...' : ''}
                      </p>
                      {activeTab === "joined" && (
                        <p style={{ fontSize: '12px', color: '#22d3ee' }}>Owner: {p.owner?.name}</p>
                      )}
                    </div>
                    <div className="btn-row" style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        onClick={() => navigate(`/projects/${p._id}`)}
                        style={{ flex: 1, padding: '10px', borderRadius: '8px', background: 'linear-gradient(90deg, #06b6d4, #3b82f6)', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                      >
                        Open Workspace
                      </button>
                      {activeTab === "owned" && (
                        <button 
                          className="danger" 
                          style={{ padding: '10px 20px', borderRadius: '8px', background: '#ef444422', color: '#ef4444', border: '1px solid #ef444444', cursor: 'pointer' }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ gridColumn: '1/-1', textAlign: 'center', marginTop: '50px', color: '#64748b' }}>
                  {activeTab === "owned" ? "You haven't created any projects yet." : "You haven't joined any projects yet. Go to Explore to find one!"}
                </p>
              )
            )}
          </div>

        </div>
      </div>
    </div>
  );
}