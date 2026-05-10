import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/footer";
import "../styles/profile.css";
import { 
  FaEdit, FaEnvelope, FaMapMarkerAlt, 
  FaBriefcase, FaGithub, 
  FaLinkedin, FaRocket, FaCode, FaCheckCircle, FaAward
} from "react-icons/fa";
import { FiEdit3, FiShare2, FiSave, FiX } from "react-icons/fi";
import profilePic from "../assets/logo.png"; 

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    skills: "",
    github: "",
    linkedin: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { "x-auth-token": token }
      });
      setUser(res.data);
      setFormData({
        name: res.data.name || "",
        bio: res.data.bio || "",
        skills: res.data.skills ? res.data.skills.join(", ") : "",
        github: res.data.github || "",
        linkedin: res.data.linkedin || ""
      });
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("http://localhost:5000/api/auth/profile", formData, {
        headers: { "x-auth-token": token }
      });
      setUser(res.data);
      setIsEditing(false);
      alert("Profile updated successfully! ✨");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <div className="loading">Loading Profile...</div>;

  return (
    <div className="profile-page-wrapper">
      <Sidebar />
      
      <div className="profile-main-content">
        <Navbar />
        
        <div className="profile-container">
          
          {/* PROFILE HEADER SECTION */}
          <div className="profile-header-section">
            <div className="profile-banner">
              <div className="banner-glass-overlay"></div>
            </div>
            
            <div className="profile-identity-card">
              <div className="profile-avatar-container">
                <div className="profile-avatar-wrapper">
                  <img src={profilePic} alt={user?.name} className="profile-avatar-main" />
                  <div className="status-ring"></div>
                </div>
              </div>
              
              <div className="profile-info-text">
                <h1>{user?.name}</h1>
                <p>{user?.bio || "No bio added yet."}</p>
                
                <div className="profile-badges">
                  <div className="badge-item">
                    <FaEnvelope /> {user?.email}
                  </div>
                  <div className="badge-item">
                    <FaCheckCircle style={{ color: '#10b981' }} /> Verified Member
                  </div>
                </div>
              </div>
            </div>

            <div className="header-actions">
              <button className="btn-secondary-glass"><FiShare2 /> Share</button>
              <button 
                className="btn-primary-glass"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <><FiX /> Cancel</> : <><FiEdit3 /> Edit Profile</>}
              </button>
            </div>
          </div>

          <div className="profile-content-layout">
            
            {/* LEFT COLUMN */}
            <div className="profile-left-col">
              
              {/* EDIT FORM (Visible when isEditing is true) */}
              {isEditing && (
                <div className="glass-card edit-form-card">
                  <h3 className="card-title"><FaEdit /> Update Profile</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label>Bio</label>
                      <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Tell us about yourself..." />
                    </div>
                    <div className="form-group">
                      <label>Skills (Comma separated)</label>
                      <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="React, Node, CSS..." />
                    </div>
                    <div className="form-group">
                      <label>GitHub URL</label>
                      <input type="text" name="github" value={formData.github} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label>LinkedIn URL</label>
                      <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} />
                    </div>
                    <button type="submit" className="save-btn"><FiSave /> Save Changes</button>
                  </form>
                </div>
              )}

              {/* SKILLS */}
              <div className="glass-card skills-card">
                <h3 className="card-title">
                  <div className="icon-box"><FaCode /></div>
                  Your Skills
                </h3>
                
                <div className="skills-list">
                  {user?.skills?.length > 0 ? user.skills.map((skill, index) => (
                    <div key={index} className="skill-tag">
                      {skill}
                    </div>
                  )) : <p>No skills added yet.</p>}
                </div>
              </div>

              {/* SOCIALS */}
              <div className="glass-card social-card" style={{ textAlign: 'center' }}>
                <h3 className="card-title">Connect</h3>
                <div className="social-strip" style={{ justifyContent: 'center' }}>
                  {user?.github && <a href={user.github} target="_blank" rel="noreferrer" className="social-circle-btn"><FaGithub /></a>}
                  {user?.linkedin && <a href={user.linkedin} target="_blank" rel="noreferrer" className="social-circle-btn"><FaLinkedin /></a>}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="profile-right-col">
              <div className="glass-card about-card">
                <h3 className="card-title">
                  <div className="icon-box"><FaRocket /></div>
                  About Me
                </h3>
                <p style={{ lineHeight: '1.8', color: '#94a3b8' }}>
                  {user?.bio || "You haven't written a bio yet. Click Edit Profile to tell the community about your expertise and interests!"}
                </p>
              </div>

              {/* STATS */}
              <div className="glass-card stats-bar-card">
                <div className="stats-grid">
                  <div className="stat-box">
                    <span className="stat-value">Active</span>
                    <span className="stat-label">Member</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-value">{user?.skills?.length || 0}</span>
                    <span className="stat-label">Skills</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        
        <Footer />
      </div>

      <style jsx>{`
        .skill-tag {
          display: inline-block;
          background: rgba(34, 211, 238, 0.1);
          color: #22d3ee;
          padding: 8px 15px;
          border-radius: 20px;
          margin: 5px;
          font-size: 14px;
          border: 1px solid rgba(34, 211, 238, 0.2);
        }
        .edit-form-card form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-top: 20px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .form-group label {
          font-size: 13px;
          color: #94a3b8;
        }
        .form-group input, .form-group textarea {
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 10px;
          color: white;
          outline: none;
        }
        .save-btn {
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          border: none;
          padding: 12px;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 10px;
        }
        .loading {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0f172a;
          color: white;
          font-size: 20px;
        }
      `}</style>
    </div>
  );
}