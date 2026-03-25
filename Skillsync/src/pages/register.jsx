import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 position-relative">

      {/* Glow Effects */}
      <div className="bg-glow"></div>
      <div className="bg-glow2"></div>

      {/* Register Card */}
      <div className="login-card position-relative">

        {/* Logo + Title */}
        <h2 className="text-center mb-2 fw-bold brand-title d-flex justify-content-center align-items-center gap-2">
          TeamUp
        </h2>

        <p className="text-center text-secondary mb-4">
          Create your account
        </p>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label text-secondary">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label text-secondary">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label text-secondary">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Create password"
            />
          </div>

          {/* Skills (IMPORTANT for your project) */}
          <div className="mb-3">
            <label className="form-label text-secondary">Skills</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. React, Node, UI Design"
            />
          </div>

          {/* Button */}
          <button type="submit" className="btn login-btn w-100 py-2 mb-3">
            Register
          </button>

        </form>

        {/* Divider */}
        <div className="text-center text-secondary mb-3">OR</div>

        {/* Google */}
        <button className="btn btn-outline-light w-100 mb-3">
          Continue with Google
        </button>

        {/* Login Link */}
        <p className="text-center text-secondary">
          Already have an account?{" "}
       <Link to="/" className="link-text">
  Login
</Link>
        </p>

      </div>
    </div>
  );
}