import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavHero from '../NavHero/NavHero'
import './Login.css';

function Login() {

     const history = useNavigate();
  const [user, setUser] = useState({
    name: "",
    gmail: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setUser((prevUser) => ({...prevUser,
      [name]: value}));
  }

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await sendRequest();

    if (response.status === "ok") {
      alert("Login success");
      history("/mainhome");
    } else {
      alert("Login error");
    }

  } catch (err) {
    if (err.response && err.response.data) {
      alert(err.response.data.err); // 👈 THIS shows "User not found"
    } else {
      alert("Server error");
    }
  }
};

const sendRequest = async () => {
  const res = await axios.post("http://localhost:5000/login", {
    gmail: user.gmail,
    password: user.password
  });
  return res.data;
};

    return (
    <div>
      <NavHero/>

        <form className="register-form" onSubmit={handleSubmit}>
        <h2>User Login</h2>

        <div>
          <label>Email</label>
          <input
            type="text"
            name="gmail"
            value={user.gmail}
            onChange={handleInputChange}
            required
          />
        </div>

          <div>
          <label>Password</label>
          <input
  type="password"
  name="password"
  value={user.password}
  onChange={handleInputChange}
  required
/>

        </div>

        <button type="submit">Login</button>
      </form>
      
    </div>
  )
}

export default Login
