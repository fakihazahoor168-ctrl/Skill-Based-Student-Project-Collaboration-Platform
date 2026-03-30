import React, { useState } from "react";
import "../styles/request.css";

export default function RequestPage() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Request Sent!");
  };

  return (
    <div className="request-page">

      <div className="request-card">

        <h2>Send Join Request</h2>
        <p>Tell the project owner why you want to join</p>

        <form onSubmit={handleSubmit}>

          <label>Your Message</label>
          <textarea
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button type="submit">Send Request</button>

        </form>

      </div>

    </div>
  );
}