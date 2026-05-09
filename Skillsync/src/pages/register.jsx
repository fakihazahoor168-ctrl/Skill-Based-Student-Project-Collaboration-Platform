import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);

    // Redirect to login after 2 seconds
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 position-relative">

      {/* Glow Effects */}
      <div className="bg-glow"></div>
      <div className="bg-glow2"></div>

      {/* Register Card */}
      <div className="login-card position-relative">
        <h2 className="text-center mb-2 fw-bold brand-title d-flex justify-content-center align-items-center gap-2">
          TeamUp
        </h2>

        <p className="text-center text-secondary mb-4">
          Create your account
        </p>

        {/* Success Message */}
        {success && (
          <div className="alert alert-success text-center mb-3">
            Registration successful! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-secondary">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              required
            />
          </div>

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
              placeholder="Create password"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-secondary">Skills</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. React, Node, UI Design"
              required
            />
          </div>

          <button type="submit" className="btn login-btn w-100 py-2 mb-3">
            Register
          </button>
        </form>

        <div className="text-center text-secondary mb-3">OR</div>

        <button className="btn btn-outline-light w-100 mb-3">
          Continue with Google
        </button>

        <p className="text-center text-secondary">
          Already have an account?{" "}
          <Link to="/login" className="link-text">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}