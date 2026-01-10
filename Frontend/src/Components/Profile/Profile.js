import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav';
import './Profile.css';
import profileImg from '../../assets/pcreate.jpg'; // your image

function Profile() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const sendRequest = async () => {
    await axios.post('http://localhost:5000/users', {
      ...input,
      phone: Number(input.phone),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest();
      navigate('/myprofile');
    } catch (error) {
      alert('Email already exists or server error');
    }
  };

  return (
    <>
      <Nav />
      <div className="cprofile-container">
        <div className="cprofile-card">
          
          {/* Left Image Section */}
          <div className="cprofile-image">
            <img src={profileImg} alt="Create Profile" />
          </div>

          {/* Right Form Section */}
          <form className="cprofile-form" onSubmit={handleSubmit}>
            <h2>Create Profile</h2>

            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={input.firstname}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={input.lastname}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={input.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={input.address}
              onChange={handleChange}
            />

            <input
              type="number"
              name="phone"
              placeholder="Phone"
              value={input.phone}
              onChange={handleChange}
            />

            <button type="submit">Save Profile</button>
          </form>

        </div>
      </div>
    </>
  );
}

export default Profile;
