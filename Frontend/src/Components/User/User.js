import React from 'react';
import { Link } from 'react-router-dom';
import './User.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function User(props) {
  const { _id, firstname, lastname, email, address, phone } = props.user;

  const history = useNavigate();

  const deleteHandler = async () => {
    // Confirmation dialog
    const confirmDelete = window.confirm(`Are you sure you want to delete ${firstname} ${lastname}?`);
    if (!confirmDelete) return; // Stop if user clicks "Cancel"

    try {
      const res = await axios.delete(`http://localhost:5000/users/${_id}`);
      console.log(res.data);
      alert("User deleted successfully!");
      history('/settings');
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Failed to delete user. Check console for details.");
    }
  };

  return (
    <div className="detail table-grid">
      <div className="user">
        <h3 className="name">{firstname} {lastname}</h3>
        <h3 className="id">{_id}</h3>
      </div>

      <h3 className="email">{email}</h3>
      <h3 className="address">{address}</h3>
      <h3 className="phone center">{phone}</h3>

      <div className="actions">
       
          <Link to={`/view/${_id}`} className="edit-btn">View</Link>
        
        <button className='delete' onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
}

export default User;
