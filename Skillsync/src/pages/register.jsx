import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skills: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
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

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger text-center mb-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-secondary">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-secondary">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-secondary">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-secondary">Skills</label>
            <input
              type="text"
              name="skills"
              className="form-control"
              placeholder="e.g. React, Node, UI Design"
              value={formData.skills}
              onChange={handleChange}
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