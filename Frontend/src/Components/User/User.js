import React from 'react';
import './User.css';

function User(props) {
  const { _id, firstname, lastname, email, address, phone } = props.user;

  return (
    <div className="detail table-grid">
      <div className='user'>
        <h3 className="name">{firstname} {lastname}</h3>
      <h3 className="id">{_id}</h3>
      
      </div>
      <h3 className="email">{email}</h3>
      <h3 className="address">{address}</h3>
      <h3 className="phone center">{phone}</h3>

      <div className="actions">
        <button className="edit">Edit</button>
        <button className="delete">Delete</button>
      </div>
    </div>
  );
}

export default User;
