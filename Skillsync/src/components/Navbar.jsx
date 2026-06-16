import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import { FaBell } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef();
  const notifRef = useRef();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get("http://localhost:5000/api/notifications", {
          headers: { "x-auth-token": token }
        });
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/notifications/read-all", {}, {
        headers: { "x-auth-token": token }
      });
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="navbar-custom px-4 py-3 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-2" onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>
        <img src={logo} alt="SkillSync Logo" className="navbar-logo" />
        <h3 className="brand-title m-0">SkillSync</h3>
      </div>

      <div className="nav-links d-none d-md-flex gap-4">
        <Link className={`nav-link ${location.pathname === "/explore" ? "active-link" : ""}`} to="/explore">Explore</Link>
        <Link className={`nav-link ${location.pathname === "/dashboard" ? "active-link" : ""}`} to="/dashboard">Dashboard</Link>
        <Link className={`nav-link ${location.pathname === "/request" ? "active-link" : ""}`} to="/request">Requests</Link>
      </div>

      <div className="d-flex align-items-center gap-3">
        {/* NOTIFICATION BELL */}
        <div className="notification-container" ref={notifRef} style={{ position: 'relative' }}>
          <div className="notification-icon" onClick={() => setNotifOpen(!notifOpen)} style={{ cursor: 'pointer', position: 'relative', fontSize: '22px' }}>
            <FaBell style={{ color: '#FACC15', filter: 'drop-shadow(0 0 8px rgba(250, 204, 21, 0.8))', transition: '0.3s' }} />
            {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
          </div>
          
          {notifOpen && (
            <div className="notif-dropdown">
              <div className="notif-header">
                <span>Notifications</span>
                <button onClick={markAllRead}>Mark all read</button>
              </div>
              <div className="notif-list">
                {notifications.length > 0 ? notifications.map(n => (
                  <div key={n._id} className={`notif-item ${n.read ? 'read' : 'unread'}`} onClick={() => navigate(n.project ? `/projects/${n.project._id}` : '#')}>
                    <p>{n.message}</p>
                    <span>{new Date(n.createdAt).toLocaleTimeString()}</span>
                  </div>
                )) : <p className="empty-msg">No notifications</p>}
              </div>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div className="profile" ref={dropdownRef}>
          <span className="user-avatar" onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>
            {JSON.parse(localStorage.getItem("user"))?.name?.[0]?.toUpperCase() || 'U'}
          </span>
          {open && (
            <div className="dropdown-menu-custom">
              <p onClick={() => navigate("/profile")}>Profile</p>
              <p onClick={handleLogout}>Logout</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .notif-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #ef4444;
          color: white;
          font-size: 10px;
          padding: 2px 5px;
          border-radius: 50%;
        }
        .notif-dropdown {
          position: absolute;
          top: 40px;
          right: 0;
          width: 300px;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
          z-index: 1000;
          overflow: hidden;
        }
        .notif-header {
          display: flex;
          justify-content: space-between;
          padding: 10px 15px;
          border-bottom: 1px solid #334155;
          background: #0f172a;
        }
        .notif-header button {
          background: none;
          border: none;
          color: #22d3ee;
          font-size: 12px;
          cursor: pointer;
        }
        .notif-list { max-height: 400px; overflow-y: auto; }
        .notif-item { padding: 12px 15px; border-bottom: 1px solid #334155; cursor: pointer; transition: 0.2s; }
        .notif-item:hover { background: #334155; }
        .notif-item.unread { border-left: 3px solid #22d3ee; background: rgba(34, 211, 238, 0.05); }
        .notif-item p { margin: 0; font-size: 13px; color: #e2e8f0; }
        .notif-item span { font-size: 10px; color: #94a3b8; }
        .empty-msg { padding: 20px; text-align: center; color: #64748b; font-style: italic; }
      `}</style>
    </nav>
  );
}