import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/sidebar.css";
import { FaFolder } from "react-icons/fa";
import { 
  FaHome, 
  FaSearch, 
  FaPlus, 
  FaEnvelope, 
  FaUser 
} from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
  { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { name: "Explore", path: "/explore", icon: <FaSearch /> },
  { name: "Create Project", path: "/create", icon: <FaPlus /> },
  { name: "My Projects", path: "/my-projects", icon: <FaFolder /> },
  { name: "Requests", path: "/request", icon: <FaEnvelope /> },
  { name: "Find Talent", path: "/find-talent", icon: <FaSearch /> },
  { name: "Profile", path: "/profile", icon: <FaUser /> }
];

  return (
    <div className="sidebar">

      <div className="sidebar-logo">TeamUp</div>

      <div className="sidebar-menu">
        {menu.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={location.pathname === item.path ? "active" : ""}
          >
            <span className="icon">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </div>

    </div>
  );
}