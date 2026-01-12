import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Nav from '../Nav/Nav';
import './MyProfile.css';

function MyProfile() {
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // ------------------- PROFILE HANDLERS -------------------
  const deleteHandler = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return;
    try {
      await axios.delete(`http://localhost:5000/users/${user._id}`);
      setUser(null);
      alert('Profile deleted successfully!');
      navigate('/mainhome');
    } catch (err) {
      console.error('Error deleting profile:', err);
      alert('Failed to delete profile.');
    }
  };

  const editHandler = () => {
    navigate(`/settings/${user._id}`);
  };

  // ------------------- IMAGE HANDLERS -------------------
  const deleteImage = async (imgId) => {
    if (!window.confirm('Delete this image?')) return;
    try {
      await axios.delete(`http://localhost:5000/images/${imgId}`);
      setImages((prev) => prev.filter((img) => img._id !== imgId));
      alert('Image deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to delete image');
    }
  };

  const editImage = (imgId) => {
    navigate(`/all-images/${imgId}`);
  };

  // ------------------- FETCH USER & IMAGES -------------------
  useEffect(() => {
    const fetchProfileAndImages = async () => {
      try {
        setLoading(true);

        // Fetch all users
        const res = await axios.get('http://localhost:5000/users');
        const users = res.data.users || res.data;
        if (!users || users.length === 0) {
          setError('No user found');
          return;
        }

        // For demo: latest user
        const latestUser = users[users.length - 1];
        setUser(latestUser);

        // Fetch all images
        const imgRes = await axios.get('http://localhost:5000/getImage');
        const allImages = imgRes.data.data || [];

        // Filter images uploaded by this user
        const userImages = allImages.filter(
          (img) =>
            img.email &&
            latestUser.email &&
            img.email.toLowerCase() === latestUser.email.toLowerCase()
        );

        setImages(userImages);
        if (userImages.length === 0) setError('No images uploaded by this user');
      } catch (err) {
        console.error(err);
        setError('Failed to fetch profile or images');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndImages();
  }, []);

  // ------------------- RENDER -------------------
  if (loading) return <p className="loading-text">Loading profile...</p>;
  if (!user) return <p className="loading-text">{error || 'User not found'}</p>;

  const imageUrl = user.profilePhoto
    ? `http://localhost:5000/uploads/${user.profilePhoto}`
    : null;

  return (
    <>
      <Nav />

      <div className="mprofile-wrapper">
        <div className="profile-images-layout">

          {/* ------------------- LEFT SIDEBAR ------------------- */}
          <div className="profile-sidebar">
            <div className="profile-photor">
              {imageUrl ? (
                <img src={imageUrl} alt="Profile" />
              ) : (
                <div className="photor-placeholder">{user.firstname.charAt(0)}</div>
              )}
            </div>
            <h2>{user.firstname} {user.lastname}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            {user.age && <p><strong>Age:</strong> {user.age}</p>}

            <div className="mprofile-actions">
              <button onClick={editHandler} className="btn edit-btn">Edit Profile</button>
              <button onClick={deleteHandler} className="btn delete-btn">Delete Account</button>
            </div>
          </div>

          {/* ------------------- RIGHT: UPLOADED IMAGES ------------------- */}
          <div className="uploaded-images">
            <h3>Uploaded Images</h3>
            {images.length === 0 ? (
              <p className="status-text">{error}</p>
            ) : (
              <div className="image-grid">
                {images.map((img, index) => (
                  <div key={img._id} className="image-card">
                    <h4 className="image-title">{img.title || "Untitled"}</h4>
                    <img
                      src={`http://localhost:5000/uploads/${img.image}`}
                      alt={img.title || `uploaded ${index + 1}`}
                    />
                    <div className="image-actions">
                      {/* Edit Image */}
                      <FaEdit
                        className="icon edit-icon"
                        title="Edit Image"
                        onClick={() => editImage(img._id)}
                      />

                      {/* Delete Image */}
                      <FaTrash
                        className="icon delete-icon"
                        title="Delete Image"
                        onClick={() => deleteImage(img._id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default MyProfile;
