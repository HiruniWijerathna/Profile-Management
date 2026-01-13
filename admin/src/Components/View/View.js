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

  const [profilePhoto, setProfilePhoto] = useState(null);

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

  return (
    <div>
      <Nav />

      <div className="view-profile-page">
        <div className="viewprofile-form">

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
                {input.firstname ? input.firstname.charAt(0) : 'U'}
              </div>
            )}
          </div>

          {/* ✅ FULL NAME (COMBINED) */}
          <h2 className="full-name">
            {input.firstname} {input.lastname}
          </h2>

          {/* Details */}
          <div className="info-row">
            <span>Email</span>
            <p>{input.email}</p>
          </div>

          <div className="info-row">
            <span>Address</span>
            <p>{input.address}</p>
          </div>

          <div className="info-row">
            <span>Phone</span>
            <p>{input.phone}</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default View;
