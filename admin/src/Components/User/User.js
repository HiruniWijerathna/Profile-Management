import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./User.css";

function User(props) {
  const { _id, firstname, lastname, email, address, phone, profilePhoto } = props.user;
  const navigate = useNavigate();

  const deleteHandler = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${firstname} ${lastname}?`
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/users/${_id}`);
      alert("User deleted successfully!");
      window.location.reload();
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Failed to delete user.");
    }
  };

  const editHandler = () => {
    navigate(`/settings/${_id}`);
  };

  const imageUrl = profilePhoto
    ? `http://localhost:5000/uploads/${profilePhoto}`
    : null;

  return (
    <div className="detail table-grid">

      {/* Profile Photo */}
      <div className="user">
        {imageUrl ? (
          <img src={imageUrl} alt="Profile" className="user-avatar" />
        ) : (
          <div className="user-avatar-fallback">
            {firstname.charAt(0)}
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="name">
        {firstname} {lastname}
      </h3>

      {/* Email */}
      <h3 className="email">{email}</h3>

      {/* Address */}
      <h3 className="address">{address}</h3>

      {/* Phone */}
      <h3 className="phone center">{phone}</h3>

      {/* Actions */}
      <div className="actions">
        <FaEdit className="icon edit-icon" onClick={editHandler} title="Edit" />
        <FaTrash className="icon delete-icon" onClick={deleteHandler} title="Delete" />
      </div>

    </div>
  );
}

export default User;
