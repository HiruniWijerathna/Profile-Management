import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateProfile.css';

function UpdateProfile() {
  const [input, setInput] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phone: '',
  });

  const [profilePhoto, setProfilePhoto] = useState(null); // ⭐ NEW
  const [currentPhoto, setCurrentPhoto] = useState(null); // ⭐ SHOW CURRENT PHOTO

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch user data
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${id}`);
        setInput(res.data.users);

        if (res.data.users.profilePhoto) {
          setCurrentPhoto(`http://localhost:5000/uploads/${res.data.users.profilePhoto}`);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchHandler();
  }, [id]);

  // Handle text input changes
  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle profile photo change
  const handlePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('firstname', input.firstname);
      formData.append('lastname', input.lastname);
      formData.append('email', input.email);
      formData.append('address', input.address);
      formData.append('phone', input.phone);
      if (profilePhoto) {
        formData.append('profilePhoto', profilePhoto); // ⭐ new photo
      }

      await axios.put(`http://localhost:5000/users/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/myprofile');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    }
  };

  return (
    <div>
      <Nav />

      <div className="update-profile-page">
        <div className="uprofile-card">

    <div className="uprofile-image">
  {profilePhoto ? (
    <img src={URL.createObjectURL(profilePhoto)} alt="New Profile" />
  ) : currentPhoto ? (
    <img src={currentPhoto} alt="Current Profile" />
  ) : (
    <div className="photo-placeholderr">No Photo</div>
  )}

  {/* Hidden file input */}
  <input
    type="file"
    id="upload-photo"
    accept="image/*"
    onChange={handlePhotoChange}
    hidden
  />

  {/* Custom button */}
  <label htmlFor="upload-photo" className="upload-btn">
    Change Photo
  </label>
</div>

          {/* Right Form */}
          <form className="uprofile-form" onSubmit={handleSubmit}>
            <h2>Update Profile</h2>

            <div>
              <label>First Name</label>
              <input
                type="text"
                name="firstname"
                value={input.firstname}
                onChange={handleChange}
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
    </div>
  );
}

export default UpdateProfile;
