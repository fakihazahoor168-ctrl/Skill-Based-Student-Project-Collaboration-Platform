import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// Pages
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import CreateProject from "./pages/CreateProject";
import RequestPage from "./pages/Requests";
import Profile from "./pages/Profile";
import MyProjects from "./pages/MyProjects";
import ProjectDetails from "./pages/ProjectDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import FindTalent from "./pages/FindTalent";
import EditProject from "./pages/EditProject";


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
        <Route path="/find-talent" element={<Layout><FindTalent /></Layout>} />

        {/* NEW FEATURES */}
        <Route path="/my-projects" element={<Layout><MyProjects /></Layout>} />
        <Route path="/projects/:id" element={<Layout><ProjectDetails /></Layout>} />
        <Route path="/edit/:id" element={<Layout><EditProject /></Layout>} />

      </Routes>
    </Router>
  );
}

export default App;