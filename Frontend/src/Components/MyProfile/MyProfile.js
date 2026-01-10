import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav';
import './MyProfile.css';

function MyProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Delete profile with confirmation
  const deleteHandler = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account?\nThis action cannot be undone.'
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/users/${user._id}`);
      setUser(null);
      navigate('/mainhome');
    } catch (error) {
      console.error('Error deleting profile:', error);
      alert('Failed to delete profile.');
    }
  };

  // Fetch latest profile
  useEffect(() => {
    const fetchLatestProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/users');
        const users = res.data.users || res.data;

        if (users && users.length > 0) {
          setUser(users[users.length - 1]);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchLatestProfile();
  }, []);

  if (!user) return <p className="loading-text">Loading profile...</p>;

  return (
    <>
      <Nav />

      <div className="mprofile-wrapper">
        <div className="mprofile-card">

          <div className="mprofile-header">
            <div className="mprofile-avatar">
              {user.firstname.charAt(0)}
            </div>
            <h2>{user.firstname} {user.lastname}</h2>
            <span className="mprofile-email">{user.email}</span>
          </div>

          <div className="mprofile-details">
            <div className="mdetail-item">
              <span>Address</span>
              <p>{user.address}</p>
            </div>

            <div className="mdetail-item">
              <span>Phone</span>
              <p>{user.phone}</p>
            </div>
          </div>

          <div className="mprofile-actions">
            <Link to={`/settings/${user._id}`} className="btn edit-btn">
              Edit Profile
            </Link>

            <button onClick={deleteHandler} className="btn delete-btn">
              Delete Account
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default MyProfile;
