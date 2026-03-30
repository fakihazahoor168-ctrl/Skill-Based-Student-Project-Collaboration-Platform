import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import "./styles/global.css";
import "./styles/auth.css";
import "./styles/navbar.css";
import "./styles/cards.css";
import "./styles/dashboard.css";
import "./styles/buttons.css"; 
import Explore from "./pages/Explore";
import CreateProject from "./pages/CreateProject";
import Landing from "./pages/Landing";
import RequestPage from "./pages/Requests";

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/create" element={<CreateProject />} />
        <Route path="/request" element={<RequestPage />} />
      </Routes>
    </Router>
  
  );
}


export default App;