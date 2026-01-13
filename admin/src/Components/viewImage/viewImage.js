import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FaHeart,
  FaRegHeart,
  FaRegCommentDots,
  FaShare
} from "react-icons/fa";
import Nav from "../Nav/Nav";
import "./ViewImage.css";

function ViewImage() {
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [likedImages, setLikedImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("images"); // ✅ Images or PDFs

  const { userEmail } = useParams();

  /* 🔥 SYSTEM AUTO COVER PHOTO */
  const coverPhotos = useMemo(
    () => [
      "/cover1.jpg", "/cover2.jpg", "/cover3.jpg", "/cover4.jpg",
      "/cover5.jpg", "/cover6.jpg", "/cover7.jpg", "/cover8.jpg",
      "/cover9.jpg", "/cover10.jpg"
    ],
    []
  );

  const randomCover = useMemo(
    () => coverPhotos[Math.floor(Math.random() * coverPhotos.length)],
    [coverPhotos]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // ✅ Fetch user
        const userRes = await axios.get("http://localhost:5000/users");
        const users = userRes.data.users || [];
        const matchedUser = users.find(
          (u) => u.email.toLowerCase() === userEmail.toLowerCase()
        );

        if (!matchedUser) {
          setError("User not found");
          return;
        }
        setUser(matchedUser);

        // ✅ Fetch images
        const imageRes = await axios.get("http://localhost:5000/getImage");
        const allImages = imageRes.data.data || [];
        const userImages = allImages.filter(
          (img) =>
            img.email &&
            img.email.toLowerCase() === matchedUser.email.toLowerCase()
        );
        setImages(userImages);

        // ✅ Fetch PDFs
        const pdfRes = await axios.get("http://localhost:5000/getPDF");
        const allPdfs = pdfRes.data.data || [];
        const userPdfs = allPdfs.filter(
          (pdf) =>
            pdf.email &&
            pdf.email.toLowerCase() === matchedUser.email.toLowerCase()
        );
        setPdfs(userPdfs);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) fetchData();
  }, [userEmail]);

  const toggleLike = (index) => {
    setLikedImages((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div>
      <Nav />

      <div className="view-images-page">
        <div className="view-images-container">
          {loading ? (
            <p className="status-text">Loading...</p>
          ) : !user ? (
            <p className="status-text">{error}</p>
          ) : (
            <>
              {/* ✅ AUTO SYSTEM COVER PHOTO */}
              <div
                className="cover-photo"
                style={{ backgroundImage: `url(${randomCover})` }}
              />

              {/* USER INFO */}
              <div className="user-info">
                <div className="profile-photo">
                  {user.profilePhoto ? (
                    <img
                      src={`http://localhost:5000/uploads/${user.profilePhoto}`}
                      alt="Profile"
                    />
                  ) : (
                    <div className="photo-placeholder">
                      {user.firstname.charAt(0)}
                    </div>
                  )}
                </div>

                <h2>{user.firstname} {user.lastname}</h2>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <p>{user.address}</p>
              </div>

              {/* ✅ TAB BUTTONS */}
              <div className="tab-buttons">
                <button
                  className={`tab-btn ${activeTab === "images" ? "active" : ""}`}
                  onClick={() => setActiveTab("images")}
                >
                  Uploaded Images
                </button>
                <button
                  className={`tab-btn ${activeTab === "pdfs" ? "active" : ""}`}
                  onClick={() => setActiveTab("pdfs")}
                >
                  Uploaded PDFs
                </button>
              </div>

              {/* ✅ IMAGES SECTION */}
              {activeTab === "images" && (
                <>
                  <h3 className="section-title">Uploaded Images</h3>
                  <div className="image-grid">
                    {images.map((img, index) => (
                      <div key={index} className="image-card">
                        <h4 className="image-title">{img.title || "Untitled"}</h4>
                        <img
                          src={`http://localhost:5000/uploads/${img.image}`}
                          alt="uploaded"
                        />
                        <div className="image-actions">
                          <span className="action-icon" onClick={() => toggleLike(index)}>
                            {likedImages[index] ? <FaHeart className="liked" /> : <FaRegHeart />}
                          </span>
                          <span className="action-icon"><FaRegCommentDots /></span>
                          <span className="action-icon"><FaShare /></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* ✅ PDFs SECTION */}
              {activeTab === "pdfs" && (
                <>
                  <h3 className="section-title">Uploaded PDFs</h3>
                  <div className="pdf-list">
                    {pdfs.map((pdf, index) => (
                      <div key={index} className="pdf-image-card">
                        <img src="/pdf.jpg" alt="PDF File" className="pdf-file-img" />
                        <div className="pdf-title-box">
                          <strong>Title:</strong> {pdf.title || "Untitled"}
                        </div>
                        <div className="pdf-buttons">
                          <a
                            href={`http://localhost:5000/files/${pdf.pdfFile}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="open-btn"
                          >
                            Open PDF
                          </a>
                          <a
                            href={`http://localhost:5000/files/${pdf.pdfFile}`}
                            download
                            className="download-btn"
                          >
                            Download PDF
                          </a>
                        </div>
                        <div className="pdf-social">
                          <span className="action-icon" onClick={() => toggleLike(`pdf-${index}`)}>
                            {likedImages[`pdf-${index}`] ? <FaHeart className="liked" /> : <FaRegHeart />}
                          </span>
                          <span className="action-icon"><FaRegCommentDots /></span>
                          <span className="action-icon"><FaShare /></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewImage;
