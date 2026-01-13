import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Nav from '../Nav/Nav';
import './MyProfile.css';

function MyProfile() {
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('images'); // 'images' or 'pdfs'

  const navigate = useNavigate();
  const pdfThumbnail = '/pdf.jpg'; // public/pdf.jpg

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

  // ------------------- PDF HANDLERS -------------------
  const deletePdf = async (pdfId) => {
    if (!window.confirm('Delete this PDF?')) return;
    try {
      await axios.delete(`http://localhost:5000/pdfs/${pdfId}`);
      setPdfs((prev) => prev.filter((pdf) => pdf._id !== pdfId));
      alert('PDF deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to delete PDF');
    }
  };

  const editPdf = (pdfId) => {
    navigate(`/edit-pdf/${pdfId}`);
  };

  // ------------------- FETCH USER, IMAGES & PDFS -------------------
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);

        // Fetch all users
        const res = await axios.get('http://localhost:5000/users');
        const users = res.data.users || res.data;
        if (!users || users.length === 0) {
          setError('No user found');
          return;
        }

        const latestUser = users[users.length - 1];
        setUser(latestUser);

        // Fetch all images
        const imgRes = await axios.get('http://localhost:5000/getImage');
        const allImages = imgRes.data.data || [];
        const userImages = allImages.filter(
          (img) => img.email && latestUser.email && img.email.toLowerCase() === latestUser.email.toLowerCase()
        );
        setImages(userImages);

        // Fetch all PDFs
        const pdfRes = await axios.get('http://localhost:5000/getPdf');
        const allPdfs = pdfRes.data.data || [];
        const userPdfs = allPdfs.filter(
          (pdf) => pdf.email && latestUser.email && pdf.email.toLowerCase() === latestUser.email.toLowerCase()
        );
        setPdfs(userPdfs);

        if (userImages.length === 0 && userPdfs.length === 0) {
          setError('No uploads by this user');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
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

            {/* ------------------- TOGGLE BUTTONS ------------------- */}
            <div className="tab-buttons">
              <button
                className={`tab-btns ${activeTab === 'images' ? 'active' : ''}`}
                onClick={() => setActiveTab('images')}
              >
                Uploaded Images
              </button>
              <button
                className={`tab-btns ${activeTab === 'pdfs' ? 'active' : ''}`}
                onClick={() => setActiveTab('pdfs')}
              >
                Uploaded PDFs
              </button>
            </div>
          </div>

          {/* ------------------- RIGHT: CONTENT ------------------- */}
          <div className="uploaded-content">
            {activeTab === 'images' && (
              <>
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
                          <FaEdit
                            className="icon edit-icon"
                            title="Edit Image"
                            onClick={() => editImage(img._id)}
                          />
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
              </>
            )}

            {activeTab === 'pdfs' && (
              <>
                <h3>Uploaded PDFs</h3>
                {pdfs.length === 0 ? (
                  <p className="status-text">No PDFs uploaded</p>
                ) : (
                  <div className="pdf-grid">
                    {pdfs.map((pdf) => (
                      <div key={pdf._id} className="pdf-card-horizontal">
                        <img src={pdfThumbnail} alt="PDF" className="pdf-folder" />
                        <div className="pdf-info">
                          <p className="pdf-title">{pdf.title || "Untitled PDF"}</p>
                          <div className="pdf-actions">
                            <FaEdit
                              className="icon edit-icon"
                              title="Edit PDF"
                              onClick={() => editPdf(pdf._id)}
                            />
                            <FaTrash
                              className="icon delete-icon"
                              title="Delete PDF"
                              onClick={() => deletePdf(pdf._id)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default MyProfile;
