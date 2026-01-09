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

  const handlePrint = () => {
    window.print();
  };

  const[SearchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredUsers = data.users.filter((user) =>
        Object.values(user).some((field) =>
          field.toString().toLowerCase().includes(SearchQuery.toLowerCase())
        )
      );
      setUsers(filteredUsers);
      setNoResults(filteredUsers.length === 0);
    });
  }
        
  const handleSendReport = () => {
    //whatsapp
    const phoneNumber = "+94702555944";
    const message = "Select the Report";
    const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    //open new window
    window.open(whatsappUrl, "_blank");
  };
  

  return (
    <div>
      <Nav />

      <div className="search-container">
        <input
          type='text'
          name='search'
          placeholder='Search users...'
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} className='searchbar'>Search</button>

        {noResults && <p className="no-results">No users found.</p>}
      </div>



      

      <h2 className="table-title">
        Users ({users.length})
      </h2>

      

      <div className="profiles-container">

        {/* HEADER */}
        <div className="table-header table-grid">
         
          <span>Name</span>
          <span>Email</span>
          <span>Address</span>
          <span className="center">Phone</span>
          
        </div>

        {/* ROWS */}
        {users && users.map((user, i) => (
          <User key={i} user={user} />
        ))}
      </div>
      <button className="download-button" onClick={handlePrint}>Download Report</button>
      <button className="send-button" onClick={handleSendReport}>Send Whatsapp</button>
    </div>
  );
}

export default Profiles;
