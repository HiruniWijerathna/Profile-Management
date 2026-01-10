import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavHero from '../NavHero/NavHero'
import './Register.css';

function Register() {

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

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => {
      alert("Register success");
      history("/login");
    }).catch((err) => {
      alert(err.message);
    });
  }

  const sendRequest= async()=>{
    await axios.post("http://localhost:5000/register",{
      name:String(user.name),
      gmail:String(user.gmail),
    password:String(user.password)
      }).then((res)=> res.data);
  }


  return (
    <div>
      <NavHero/>

        <form className="register-form" onSubmit={handleSubmit}>
        <h2>User Register</h2>

        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            required
          />
        </div>

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
            type="text"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
      
    </div>
  )
}

export default Register
