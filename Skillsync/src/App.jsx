import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";

// Pages
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import CreateProject from "./pages/CreateProject";
import RequestPage from "./pages/Requests";
import Profile from "./pages/Profile";
import MyProjects from "./pages/MyProjects";
import ProjectDetails from "./pages/ProjectDetails";

// Layout
import Layout from "./Layout";

// Global CSS
import "./styles/global.css";
import "./styles/auth.css";
import "./styles/navbar.css";
import "./styles/cards.css";
import "./styles/dashboard.css";
import "./styles/buttons.css";

function App() {
  return (
    <Router>
      <Routes>

        {/* ================= AUTH (NO SIDEBAR) ================= */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= APP (WITH SIDEBAR) ================= */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/explore" element={<Layout><Explore /></Layout>} />
        <Route path="/create" element={<Layout><CreateProject /></Layout>} />
        <Route path="/request" element={<Layout><RequestPage /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />

        {/* NEW FEATURES */}
        <Route path="/my-projects" element={<Layout><MyProjects /></Layout>} />
        <Route path="/projects/:id" element={<Layout><ProjectDetails /></Layout>} />

      </Routes>
    </Router>
  );
}

export default App;