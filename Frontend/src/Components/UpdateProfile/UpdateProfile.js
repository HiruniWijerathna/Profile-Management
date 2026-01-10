import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateProfile.css';
import profileImg from '../../assets/uprofile.jpg';

function UpdateProfile() {
  const [input, setInput] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phone: ''
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${id}`);
        setInput(res.data.users);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios.put(`http://localhost:5000/users/${id}`, {
      firstname: String(input.firstname),
      lastname: String(input.lastname),
      email: String(input.email),
      address: String(input.address),
      phone: Number(input.phone)
    });
  };

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
    navigate('/myprofile');
  };

  return (
    <div>
      <Nav />

      <div className="update-profile-page">
        <div className="uprofile-card">

          {/* Left Image */}
          <div className="uprofile-image">
            <img src={profileImg} alt="Profile Illustration" />
          </div>

          {/* Right Form */}
          <form className="uprofile-form" onSubmit={handleSubmit}>
            <h2>Update Profile</h2>

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

            <button type="submit">Save Changes</button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
