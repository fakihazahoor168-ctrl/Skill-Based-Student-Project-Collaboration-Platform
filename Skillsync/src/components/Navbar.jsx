import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // 🔹 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar-custom px-4 py-3 d-flex justify-content-between align-items-center">

      {/* LEFT: LOGO */}
      <div 
  className="d-flex align-items-center gap-2"
  onClick={() => navigate("/")}
  style={{ cursor: "pointer" }}
>
  <img 
    src={logo} 
    alt="TeamUp Logo" 
    className="navbar-logo"
  />
  <h3 className="brand-title m-0">TeamUp</h3>
</div>

      {/* CENTER: NAV LINKS */}
      <div className="nav-links d-none d-md-flex gap-4">
        <Link 
          className={`nav-link ${location.pathname === "/Explore" ? "active-link" : ""}`} 
          to="/explore"
        >
          Explore
        </Link>

        <Link 
          className={`nav-link ${location.pathname === "/dashboard" ? "active-link" : ""}`} 
          to="/dashboard"
        >
          Dashboard
        </Link>

        <Link 
          className={`nav-link ${location.pathname === "/request" ? "active-link" : ""}`} 
          to="/request"
        >
          Requests
        </Link>
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
        <div className="profile" ref={dropdownRef}>
          <span 
            className="user-avatar"
            onClick={() => setOpen(!open)}
          >
            FZ
          </span>

          {open && (
            <div className="dropdown-menu-custom">
              <p onClick={() => navigate("/profile")}>Profile</p>
              <p>Settings</p>
              <p onClick={handleLogout}>Logout</p>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}