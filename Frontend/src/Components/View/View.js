import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './View.css';

function View() {
  const [input, setInput] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phone: '',
  });

  const [profilePhoto, setProfilePhoto] = useState(null); // For current profile photo

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${id}`);
        const user = res.data.users;
        setInput(user);

        if (user.profilePhoto) {
          setProfilePhoto(`http://localhost:5000/uploads/${user.profilePhoto}`);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchHandler();
  }, [id]);

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // We keep sendRequest for form submission if you want to edit from here
  const sendRequest = async () => {
    await axios.put(`http://localhost:5000/users/${id}`, {
      firstname: input.firstname,
      lastname: input.lastname,
      email: input.email,
      address: input.address,
      phone: Number(input.phone),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
    navigate('/myprofile');
  };

  return (
    <div>
      <Nav />

      <div className="view-profile-page">
        <form className="viewprofile-form" onSubmit={handleSubmit}>

          {/* Back button */}
          <button
            type="button"
            className="back-btn top-back"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          {/* Profile Photo */}
          <div className="view-profile-photo">
            {profilePhoto ? (
              <img src={profilePhoto} alt="Profile" />
            ) : (
              <div className="photo-placeholder">
                {input.firstname ? input.firstname.charAt(0) : "U"}
              </div>
            )}
          </div>

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

        </form>
      </div>
    </div>
  );
}

export default View;
