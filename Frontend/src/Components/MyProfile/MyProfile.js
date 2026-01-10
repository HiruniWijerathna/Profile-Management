import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav';
import './MyProfile.css';

function MyProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // for redirect after delete

  // Delete profile handler
  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5000/users/${user._id}`);
      setUser(null);

      // Redirect to home page after delete
      navigate('/mainhome'); // change '/' if your home route is different
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
      <div className="profile-wrapper">
        <div className="profile-card">
          
          <div className="profile-header">
            <div className="profile-avatar">
              {user.firstname.charAt(0)}
            </div>
            <h2>{user.firstname} {user.lastname}</h2>
            <span className="profile-email">{user.email}</span>
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <span>Address</span>
              <p>{user.address}</p>
            </div>

            <div className="detail-item">
              <span>Phone</span>
              <p>{user.phone}</p>
            </div>
          </div>

          <div className="profile-actions">
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
