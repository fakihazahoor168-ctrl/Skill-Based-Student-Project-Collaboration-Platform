import React from "react";

export default function Dashboard() {
  return (
    <div className="container py-5 mt-5">
      <div className="row">
        <div className="col-12">
          <h1 className="brand-title">Dashboard</h1>
          <p className="text-secondary">Welcome to SkillSync! Connect with others and build amazing projects.</p>
        </div>
      </div>

      <div className="row mt-4">
        {/* Project Cards */}
        <div className="col-md-4 mb-4">
          <div className="login-card w-100">
            <h3>Web Dev Project</h3>
            <p className="text-secondary small">Looking for a designer.</p>
            <button className="btn login-btn w-100">Join Team</button>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="login-card w-100">
            <h3>AI/ML Model</h3>
            <p className="text-secondary small">Need help with data cleaning.</p>
            <button className="btn login-btn w-100">Join Team</button>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="login-card w-100">
            <h3>Mobile App</h3>
            <p className="text-secondary small">React Native developers needed.</p>
            <button className="btn login-btn w-100">Join Team</button>
          </div>
        </div>
      </div>
    </div>
  );
}
