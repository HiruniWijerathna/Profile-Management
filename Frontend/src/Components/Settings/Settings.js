import React, { useEffect, useState } from "react";
import axios from "axios";
import User from "../User/User";
import Nav from "../Nav/Nav";
import "./Settings.css";

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Settings() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  // 🔍 Filter users by NAME only
  const filteredUsers = users.filter((user) => {
    const fullName =
      `${user.firstname || ""} ${user.lastname || ""}`.toLowerCase();

    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <Nav />

      <h2 className="table-title">
        Users ({filteredUsers.length})
      </h2>

      {/* 🔍 SEARCH BAR */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button onClick={() => setSearchTerm("")}>Reset</button>
      </div>

      <div className="profiles-container">
        {/* HEADER */}
        <div className="table-header table-grid">
          <span>Name</span>
          <span>Email</span>
          <span>Address</span>
          <span className="center">Phone</span>
        </div>

        {/* ROWS */}
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <User key={user._id} user={user} />
          ))
        ) : (
          <p className="status-text">No users found.</p>
        )}
      </div>
    </div>
  );
}

export default Settings;
