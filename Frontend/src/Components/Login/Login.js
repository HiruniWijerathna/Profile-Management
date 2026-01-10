import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    gmail: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const sendRequest = async () => {
    const res = await axios.post("http://localhost:5000/login", {
      gmail: user.gmail,
      password: user.password,
    });
    return res.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendRequest();

      if (response.status === "ok") {
        alert("Login success");
        navigate("/mainhome");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data.err);
      } else {
        alert("Server error");
      }
    }
  };

  return (
    <div>
        <div className="login-container">
        <div className="login-card">

          {/* Left Image */}
          <div className="login-image">
            <img src="/login.jpg" alt="Login" />
          </div>

          {/* Right Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>LOGIN</h2>
            <p className="subtitle">Welcome back</p>

            <label>Email</label>
            <input
              type="email"
              name="gmail"
              value={user.gmail}
              onChange={handleInputChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              required
            />

            <button type="submit">Login</button>

            <p className="register-link">
              Don’t have an account? <Link to="/register">Register</Link>
            </p>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;
