import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/v1/login", {
        email,
        password,
      });

      const { role, token } = {
        role: response.data.data.user.role,
        token: response.data.data.token,
      };

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      navigate("/airlines"); // 🚀 Both admin & user go here
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-login-container">
      <div className="auth-login-form">
        <h2 className="auth-login-title">Login</h2>
        {error && <div className="auth-login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-form-group auth-email-group">
            <label htmlFor="auth-email">Email</label>
            <input
              type="email"
              id="auth-email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-form-group auth-password-group">
            <label htmlFor="auth-password">Password</label>
            <input
              type="password"
              id="auth-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-login-button"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
