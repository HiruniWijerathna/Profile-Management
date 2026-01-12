import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './User.css';

function User(props) {
  const { _id, firstname, lastname, email, address, phone, profilePhoto } = props.user;
  const history = useNavigate();

  const deleteHandler = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${firstname} ${lastname}?`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/users/${_id}`);
      alert("User deleted successfully!");
      history('/settings');
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Failed to delete user. Check console for details.");
    }
  };

  const imageUrl = profilePhoto 
    ? `http://localhost:5000/uploads/${profilePhoto}` 
    : null;

  return (
    <div className="detail table-grid">
      {/* Profile Photo + Name */}
      <div className="user">
        {imageUrl ? (
          <img src={imageUrl} alt="Profile" className="user-avatar" />
        ) : (
          <div className="user-avatar-fallback">{firstname.charAt(0)}</div>
        )}
        <h3 className="name">{firstname} {lastname}</h3>
      </div>

      <h3 className="email">{email}</h3>
      <h3 className="address">{address}</h3>
      <h3 className="phone center">{phone}</h3>

      <div className="actions">
        {/*<Link to={`/view/${_id}`} className="edit-btn">View Profile</Link>*/}

        {/* ✅ NEW BUTTON: View User's Images */}
        <Link to={`/view-images/${email}`} className="edit-btn images-btn">
          View Profile
        </Link>

        <button className='delete' onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
}

export default User;
