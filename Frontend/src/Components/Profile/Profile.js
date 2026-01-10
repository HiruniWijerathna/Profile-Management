import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phone: '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Send data to backend
  const sendRequest = async () => {
    await axios.post('http://localhost:5000/users', {
      firstname: input.firstname,
      lastname: input.lastname,
      email: input.email,
      address: input.address,
      phone: Number(input.phone),
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest();
      console.log('Profile saved:', input);
      navigate('/myprofile');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Email already exists or server error');
    }
  };

  return (
    <div>
     <Nav />
    <div className="profile-page">
     

      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>Create Profile</h2>

        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            value={input.firstname}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            value={input.lastname}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={input.address}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Phone</label>
          <input
            type="number"
            name="phone"
            value={input.phone}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Save Profile</button>
      </form>
    </div>
    </div>
  );
}

export default Profile;
