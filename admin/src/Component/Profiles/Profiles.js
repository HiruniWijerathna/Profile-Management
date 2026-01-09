import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profiles.css';
import User from '../User/User';
import Nav from '../Nav/Nav';

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Profiles() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  return (
    <div>
      <Nav />

      <h2 className="table-title">
        Users ({users.length})
      </h2>

      <div className="profiles-container">

        {/* HEADER */}
        <div className="table-header table-grid">
          <span>ID</span>
          <span>Name</span>
          <span>Email</span>
          <span>Address</span>
          <span className="center">Phone</span>
          <span className="center">Actions</span>
        </div>

        {/* ROWS */}
        {users && users.map((user, i) => (
          <User key={i} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Profiles;
