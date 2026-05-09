import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
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
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
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