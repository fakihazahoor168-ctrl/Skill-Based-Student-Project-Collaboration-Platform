import React, { useEffect, useState } from "react";
import "../styles/request.css";

export default function RequestPage() {

  const [incoming, setIncoming] = useState([]);
  const [invites, setInvites] = useState([]);

  const currentUser = "Ahmed"; // 🔥 replace later with login user

  useEffect(() => {
    const allRequests = JSON.parse(localStorage.getItem("requests")) || [];

    // 🔹 Incoming (people applied to MY projects)
    const incomingRequests = allRequests.filter(
      (req) => req.type === "join" && req.owner === currentUser
    );

    // 🔹 Invitations (someone invited ME)
    const inviteRequests = allRequests.filter(
      (req) => req.type === "invite" && req.receiver === currentUser
    );

    setIncoming(incomingRequests);
    setInvites(inviteRequests);
  }, []);

  return (
    <div className="requests-page">

      <h2>Requests Dashboard</h2>

      {/* ================= INCOMING ================= */}
      <div className="section">
        <h3>📥 Incoming Requests (Your Projects)</h3>

        {incoming.length === 0 ? (
          <p>No one has applied yet</p>
        ) : (
          incoming.map((req, index) => (
            <div key={index} className="request-card">

              <h4>{req.projectTitle}</h4>
              <p><strong>Applicant:</strong> {req.sender}</p>
              <p>{req.message}</p>

              <div className="actions">
                <button className="accept">Accept</button>
                <button className="reject">Reject</button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* ================= INVITES ================= */}
      <div className="section">
        <h3>📨 Invitations (You are invited)</h3>

        {invites.length === 0 ? (
          <p>No invitations yet</p>
        ) : (
          invites.map((req, index) => (
            <div key={index} className="request-card">

              <h4>{req.projectTitle}</h4>
              <p><strong>From:</strong> {req.owner}</p>
              <p>{req.message}</p>

              <div className="actions">
                <button className="accept">Accept</button>
                <button className="reject">Reject</button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}