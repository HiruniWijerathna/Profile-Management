import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav';
import './Profile.css';
import profileImg from '../../assets/pcreate.jpg';

function Profile() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phone: '',
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Send request
  const sendRequest = async () => {
    const formData = new FormData();

    formData.append('firstname', input.firstname);
    formData.append('lastname', input.lastname);
    formData.append('email', input.email);
    formData.append('address', input.address);
    formData.append('phone', Number(input.phone));

    if (profilePhoto) {
      formData.append('profilePhoto', profilePhoto);
    }

    await axios.post('http://localhost:5000/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
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

            {/* Profile Photo Upload */}
            <div className="photo-upload">

              <label>Profile Photo</label>

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="photo-preview"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              
            </div>

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
