import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login for now
    navigate("/dashboard");
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 position-relative">

      {/* Glow Effects */}
      <div className="bg-glow"></div>
      <div className="bg-glow2"></div>

      {/* Login Card */}
      <div className="login-card position-relative">

        <h2 className="text-center mb-2 fw-bold brand-title">TeamUp</h2>
        <p className="text-center text-secondary mb-4">
          Build teams. Build projects.
        </p>

        <form onSubmit={handleSubmit}>

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
              placeholder="Enter your password"
            />
          </div>

          {/* Forgot */}
          <div className="text-end mb-3 text-secondary">
            Forgot Password?
          </div>

          {/* Button */}
          <button type="submit" className="btn login-btn w-100 py-2 mb-3">
            Login
          </button>

        </form>

        {/* Divider */}
        <div className="text-center text-secondary mb-3">OR</div>

        {/* Google Button */}
        <button className="btn btn-outline-light w-100 mb-3">
          Continue with Google
        </button>

        {/* Register */}
        <p className="text-center text-secondary">
          Don’t have an account?{" "}
    <Link to="/register" className="link-text">
  Register
</Link>
        </p>

      </div>
    </div>
  );
}