import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export default function Layout({ children }) {
  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-area">

        <Navbar />

        <div className="page-content">
          {children}
        </div>

      </div>

    </div>
  );
}