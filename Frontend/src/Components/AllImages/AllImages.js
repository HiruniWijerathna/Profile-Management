import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaRegComment, FaPaperPlane } from "react-icons/fa";
import "./AllImages.css";
import Nav from "../Nav/Nav";

function AllImages() {
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all images
  const getImages = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/getImage");
      setAllImages(res.data.data || []);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getImages();
  }, []);

  // Like toggle
  const toggleLike = (id) => {
    setLikedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 🔍 Filter by NAME ONLY
  const filteredImages = allImages.filter((data) => {
    const fullName =
      `${data.firstname || ""} ${data.lastname || ""}`.toLowerCase();

    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <Nav />

      <div className="page">
        <h2 className="page-title">All Uploaded Images</h2>

        {/* 🔍 SEARCH BAR */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            onClick={() => {
              setSearchTerm("");
              getImages();
            }}
          >
            Reset
          </button>
        </div>

        {loading ? (
          <p className="status-text">Loading images...</p>
        ) : filteredImages.length === 0 ? (
          <p className="status-text">No matching results found.</p>
        ) : (
          <div className="insta-grid">
            {filteredImages.map((data) => (
              <div className="insta-card" key={data._id}>

                {/* Header */}
                <div className="insta-header">
                  <img
                    className="insta-avatar"
                    src={
                      data.profilePhoto
                        ? `http://localhost:5000/uploads/${data.profilePhoto}`
                        : "https://i.pravatar.cc/150"
                    }
                    alt="profile"
                  />
                  <span className="insta-username">
                    {data.firstname || "Unknown"} {data.lastname || ""}
                  </span>
                </div>

                {/* Image */}
                <img
                  className="insta-image"
                  src={`http://localhost:5000/uploads/${data.image}`}
                  alt="Uploaded"
                />

                {/* Footer */}
                <div className="insta-footer">
                  <div className="insta-actions">
                    <FaHeart
                      className={`like-btn ${
                        likedPosts[data._id] ? "liked" : ""
                      }`}
                      onClick={() => toggleLike(data._id)}
                    />
                    <FaRegComment />
                    <FaPaperPlane />
                  </div>

                  <p className="insta-caption">
                    <strong>{data.firstname || "User"}</strong> shared a photo
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllImages;
