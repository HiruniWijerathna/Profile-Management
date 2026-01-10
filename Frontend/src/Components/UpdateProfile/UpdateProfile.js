import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './UpdateProfile.css';

function UpdateProfile() {

  const[input, setInput] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios.get(`http://localhost:5000/users/${id}`)
      .then((res) => res.data)
      .then(data => setInput(data.users));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async() => {
    await axios.put(`http://localhost:5000/users/${id}`, {
      firstname: String(input.firstname),
      lastname: String(input.lastname),
      email: String(input.email),
      address: String(input.address),
      phone: Number(input.phone)
    }).then(res => res.data);
  };

  // Handle input change
  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

    // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    sendRequest().then(() => history('/myprofile'));
  };



  return (
    <div>
      <Nav/>
      <div className="update-profile-page">
        <form className="profile-form" onSubmit={handleSubmit}>
        <h2>Update Profile</h2>

        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            onChange={handleChange}
            value={input.firstname}
            
            required
          />
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            value={input.lastname}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={input.address}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Phone</label>
          <input
            type="number"
            name="phone"
            value={input.phone}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
      </div>
      
    </div>
  )
}

export default UpdateProfile
