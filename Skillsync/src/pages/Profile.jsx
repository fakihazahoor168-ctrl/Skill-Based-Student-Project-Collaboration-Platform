import React from "react";
import "../styles/profile.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import profilePic from "../assets/logo.png";

export default function Profile() {
  return (
    <div className="profile-layout">

      {/* SIDEBAR */}
      <Sidebar />

      {/* RIGHT SIDE (NAVBAR + CONTENT) */}
      <div className="profile-right">

        {/* NAVBAR */}
        <Navbar />

        {/* MAIN CONTENT */}
        <div className="profile-main">

          <h2 className="page-title">My Profile</h2>

          <div className="profile-grid">

            {/* LEFT PROFILE CARD */}
            <div className="profile-card">

              <img src={profilePic} alt="profile" />

              <h3>Fakiha Zahoor</h3>
              <p className="sub">Frontend Developer</p>

              <div className="info">
                <p><b>Email:</b> fakiha@email.com</p>
                <p><b>Phone:</b> +92 300 1234567</p>
              </div>

              <button className="save-btn">Save</button>

            </div>

            {/* RIGHT SIDE */}
            <div className="right-cards">

              <div className="small-card">
                <h4>My Projects</h4>

                <div className="row">
                  <span>Portfolio Website</span>
                  <button className="view-btn">View</button>
                </div>

                <div className="row">
                  <span>Team Finder App</span>
                  <button className="view-btn">View</button>
                </div>
              </div>

              <div className="small-card">
                <h4>Team Activity</h4>

                <div className="row">
                  <span>Ahmed joined your project</span>
                  <span className="green-dot"></span>
                </div>

                <div className="row">
                  <span>Request accepted</span>
                  <span className="green-dot"></span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}