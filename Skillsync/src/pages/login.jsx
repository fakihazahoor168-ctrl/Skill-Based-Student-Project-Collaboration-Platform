import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // For demo, login always succeeds
    navigate("/dashboard");
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 position-relative">
      <div className="bg-glow"></div>
      <div className="bg-glow2"></div>

      <div className="login-card position-relative">
        <h2 className="text-center mb-2 fw-bold brand-title">TeamUp</h2>
        <p className="text-center text-secondary mb-4">
          Build teams. Build projects.
        </p>

        {error && (
          <div className="alert alert-danger text-center mb-3">
            Invalid credentials
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-secondary">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-secondary">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn login-btn w-100 py-2 mb-3">
            Login
          </button>
        </form>

        <div className="text-center text-secondary mb-3">OR</div>
        <button className="btn btn-outline-light w-100 mb-3">
          Continue with Google
        </button>

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