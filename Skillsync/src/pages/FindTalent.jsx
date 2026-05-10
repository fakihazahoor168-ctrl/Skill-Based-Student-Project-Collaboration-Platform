import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/footer";
import { FaSearch, FaUserPlus, FaGithub, FaLinkedin, FaCode } from "react-icons/fa";

export default function FindTalent() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/auth/users/search?query=${query}`, {
        headers: { "x-auth-token": token }
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="container" style={{ padding: '30px', color: 'white' }}>
          
          <h2 className="mb-4">🔍 <span className="page-title">Find Talent</span></h2>
          <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Search for developers by name or skills (e.g. "React", "Python").</p>

          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
            <input 
              type="text" 
              placeholder="Search by name or skills..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                flex: 1,
                padding: '15px',
                borderRadius: '12px',
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                outline: 'none'
              }}
            />
            <button type="submit" style={{
              padding: '0 30px',
              borderRadius: '12px',
              background: '#22d3ee',
              color: '#0f172a',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Search
            </button>
          </form>

          {loading ? (
            <p>Searching...</p>
          ) : (
            <div className="talent-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {users.length > 0 ? users.map(user => (
                <div key={user._id} className="glass-card talent-card" style={{ padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                    <div className="avatar" style={{ width: '50px', height: '50px', background: '#334155', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', border: '2px solid #22d3ee' }}>
                      {user.name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <h4 style={{ margin: 0 }}>{user.name}</h4>
                      <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>{user.email}</p>
                    </div>
                  </div>
                  
                  <p style={{ fontSize: '13px', color: '#cbd5e1', height: '40px', overflow: 'hidden' }}>{user.bio || "No bio available."}</p>
                  
                  <div className="skills-wrap" style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', margin: '15px 0' }}>
                    {user.skills?.map((s, i) => (
                      <span key={i} style={{ fontSize: '10px', background: 'rgba(34, 211, 238, 0.1)', color: '#22d3ee', padding: '2px 8px', borderRadius: '4px' }}>{s}</span>
                    ))}
                  </div>

                  <div className="card-actions" style={{ display: 'flex', gap: '10px' }}>
                    <button style={{ flex: 1, padding: '8px', borderRadius: '6px', background: '#334155', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                      <FaUserPlus /> Invite
                    </button>
                    {user.github && <a href={user.github} target="_blank" rel="noreferrer" style={{ color: 'white' }}><FaGithub /></a>}
                    {user.linkedin && <a href={user.linkedin} target="_blank" rel="noreferrer" style={{ color: 'white' }}><FaLinkedin /></a>}
                  </div>
                </div>
              )) : query && !loading && <p>No users found matching your search.</p>}
            </div>
          )}

        </div>
        <Footer />
      </div>
    </div>
  );
}
