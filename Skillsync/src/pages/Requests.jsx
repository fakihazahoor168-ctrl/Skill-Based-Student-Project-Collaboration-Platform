import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/request.css";
import { FaInbox, FaPaperPlane, FaCheck, FaTimes } from "react-icons/fa";

export default function RequestPage() {
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { "x-auth-token": token } };

    try {
      const resReceived = await axios.get("http://localhost:5000/api/applications/received", config);
      const resSent = await axios.get("http://localhost:5000/api/applications/me", config);

      setReceived(resReceived.data);
      setSent(resSent.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/applications/${id}`, 
        { status }, 
        { headers: { "x-auth-token": token } }
      );
      alert(`Application ${status}!`);
      fetchRequests(); // Refresh list
    } catch (err) {
      alert("Failed to update application status.");
    }
  };

  if (loading) return <div className="loading">Loading requests...</div>;

  return (
    <div className="requests-page" style={{ padding: '20px', color: 'white' }}>
      <h1>Requests Dashboard</h1>
      <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Manage your incoming applications and track your own requests.</p>

      <div className="requests-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        
        {/* RECEIVED APPLICATIONS */}
        <div className="request-section">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaInbox style={{ color: '#22d3ee' }} /> Incoming Applications
          </h2>
          {received.length === 0 ? (
            <p className="empty-msg">No one has applied to your projects yet.</p>
          ) : (
            received.map((req) => (
              <div key={req._id} className="request-card glass-card">
                <div className="card-header">
                  <h4>{req.project?.title}</h4>
                  <span className={`status-pill ${req.status}`}>{req.status}</span>
                </div>
                <div className="applicant-info">
                  <p><strong>Applicant:</strong> {req.applicant?.name}</p>
                  <p className="message">"{req.message}"</p>
                  <div className="skills-wrap">
                    {req.applicant?.skills?.map((s, i) => (
                      <span key={i} className="mini-skill">{s}</span>
                    ))}
                  </div>
                </div>
                {req.status === 'pending' && (
                  <div className="card-actions">
                    <button className="accept-btn" onClick={() => handleStatusUpdate(req._id, 'accepted')}>
                      <FaCheck /> Accept
                    </button>
                    <button className="reject-btn" onClick={() => handleStatusUpdate(req._id, 'rejected')}>
                      <FaTimes /> Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* SENT APPLICATIONS */}
        <div className="request-section">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaPaperPlane style={{ color: '#818cf8' }} /> Applications You Sent
          </h2>
          {sent.length === 0 ? (
            <p className="empty-msg">You haven't applied to any projects yet.</p>
          ) : (
            sent.map((req) => (
              <div key={req._id} className="request-card glass-card">
                <div className="card-header">
                  <h4>{req.project?.title}</h4>
                  <span className={`status-pill ${req.status}`}>{req.status}</span>
                </div>
                <p className="message">"{req.message}"</p>
                <div className="info-row">
                  <span>Sent on: {new Date(req.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      <style jsx>{`
        .requests-page h1 { font-size: 2.5rem; margin-bottom: 10px; }
        .request-section h2 { font-size: 1.5rem; margin-bottom: 20px; border-bottom: 1px solid #334155; padding-bottom: 10px; }
        .request-card { padding: 20px; margin-bottom: 15px; border: 1px solid #334155; }
        .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px; }
        .card-header h4 { font-size: 1.2rem; color: #22d3ee; margin: 0; }
        .status-pill { padding: 4px 10px; border-radius: 5px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
        .status-pill.pending { background: #f59e0b22; color: #f59e0b; }
        .status-pill.accepted { background: #10b98122; color: #10b981; }
        .status-pill.rejected { background: #ef444422; color: #ef4444; }
        .message { font-style: italic; color: #94a3b8; margin: 10px 0; font-size: 14px; }
        .skills-wrap { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 10px; }
        .mini-skill { font-size: 10px; background: #334155; padding: 2px 8px; border-radius: 4px; }
        .card-actions { display: flex; gap: 10px; margin-top: 20px; }
        .accept-btn { flex: 1; background: #10b981; border: none; padding: 8px; border-radius: 5px; color: white; cursor: pointer; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 5px; }
        .reject-btn { flex: 1; background: #ef4444; border: none; padding: 8px; border-radius: 5px; color: white; cursor: pointer; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 5px; }
        .empty-msg { color: #64748b; font-style: italic; }
        @media (max-width: 900px) { .requests-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}