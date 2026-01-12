import React, { useEffect, useState, useMemo } from "react";
import {  useParams } from "react-router-dom";
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
  const [likedImages, setLikedImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const { userEmail } = useParams();

  /* 🔥 SYSTEM AUTO COVER PHOTO */
  const coverPhotos = useMemo(
    () => ["/cover1.jpg", "/cover2.jpg", "/cover3.jpg", "/cover4.jpg", "/cover5.jpg", "/cover6.jpg", "/cover7.jpg", "/cover8.jpg", "/cover9.jpg", "/cover10.jpg"],
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

        const imageRes = await axios.get("http://localhost:5000/getImage");
        const allImages = imageRes.data.data || [];

        const userImages = allImages.filter(
          (img) =>
            img.email &&
            img.email.toLowerCase() === matchedUser.email.toLowerCase()
        );

        setImages(userImages);
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

              {/* IMAGES */}
              <h3 className="section-title">Uploaded Images</h3>

              <div className="image-grid">
                {images.map((img, index) => (
                  <div key={index} className="image-card">
                    <h4 className="image-title">
                      {img.title || "Untitled"}
                    </h4>

                    <img
                      src={`http://localhost:5000/uploads/${img.image}`}
                      alt="uploaded"
                    />

                    {/* ACTION ICONS */}
                    <div className="image-actions">
                      <span
                        className="action-icon"
                        onClick={() => toggleLike(index)}
                      >
                        {likedImages[index] ? (
                          <FaHeart className="liked" />
                        ) : (
                          <FaRegHeart />
                        )}
                      </span>

                      <span className="action-icon">
                        <FaRegCommentDots />
                      </span>

                      <span className="action-icon">
                        <FaShare />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewImage;
