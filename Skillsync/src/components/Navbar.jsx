import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="navbar-custom px-4 py-3 d-flex justify-content-between align-items-center">

      {/* LEFT: LOGO */}
      <div className="d-flex align-items-center gap-2">
        <span className="logo-icon">🚀</span>
        <h3 className="brand-title m-0">TeamUp</h3>
      </div>

      {/* CENTER: NAV LINKS */}
      <div className="nav-links d-none d-md-flex gap-4">
        <span className="nav-link" onClick={() => window.scrollTo(0, 300)}>Explore</span>
        <span className="nav-link" onClick={() => window.scrollTo(0, 800)}>My Projects</span>
        <span className="nav-link" onClick={() => window.scrollTo(0, 1200)}>Teams</span>
      </div>

      {/* RIGHT SIDE */}
      <div className="d-flex align-items-center gap-3">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search projects..."
          className="search-input"
        />

        {/* NOTIFICATION */}
        <div className="notification">
          🔔
          <span className="badge">3</span>
        </div>

        {/* PROFILE */}
        <div className="profile" onClick={() => setOpen(!open)}>
          <span className="user-avatar">FZ</span>

          {open && (
            <div className="dropdown-menu-custom">
              <p>Profile</p>
              <p>Settings</p>
              <p onClick={handleLogout}>Logout</p>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}