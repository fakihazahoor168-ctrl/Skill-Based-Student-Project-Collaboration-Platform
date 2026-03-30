import React from "react";

export default function Footer() {
  return (
    <footer className="modern-footer">

      {/* LEFT BRAND */}
      <div className="footer-brand">
        <h2>ProjectHub</h2>
        <p>Build. Collaborate. Grow. 🚀</p>
      </div>

      {/* LINKS SECTION */}
      <div className="footer-links">
        <div>
          <h4>Platform</h4>
          <a href="#">Dashboard</a>
          <a href="#">Projects</a>
          <a href="#">Teams</a>
        </div>

        <div>
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Careers</a>
          <a href="#">Contact</a>
        </div>

        <div>
          <h4>Support</h4>
          <a href="#">Help Center</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>

    </footer>
  );
}