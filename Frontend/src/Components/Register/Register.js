import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    gmail: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", user);
      alert("Register success");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        {/* Left Image */}
        <div className="register-image">
          <img src="/register.jpg" alt="Register" />
        </div>

        {/* Right Form */}
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>REGISTER</h2>
          <p className="subtitle">Create your account</p>

          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="gmail"
            value={user.gmail}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>

          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>

      </div>
    </div>
  );
}

export default Register;
