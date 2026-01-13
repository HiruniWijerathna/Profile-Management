import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./AllImages.css";
import Nav from "../Nav/Nav";

function AllImages() {
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(false);
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

  // Delete Image
  const deleteImage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await axios.delete(`http://localhost:5000/deleteImage/${id}`);
      setAllImages((prev) => prev.filter((img) => img._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete image");
    }
  };

  // Filter images by name
  const filteredImages = allImages.filter((data) => {
    const fullName = `${data.firstname || ""} ${data.lastname || ""}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <Nav />

      <div className="page">
        <h2 className="page-title">All Uploaded Images</h2>

        {/* SEARCH BAR */}
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
                  <Link to={`/view-images/${data.email}`} className="images-btn">
                    <img
                      className="insta-avatar"
                      src={
                        data.profilePhoto
                          ? `http://localhost:5000/uploads/${data.profilePhoto}`
                          : "https://i.pravatar.cc/150"
                      }
                      alt="profile"
                    />
                  </Link>

                  <Link to={`/view-images/${data.email}`} className="insta-username">
                    {data.firstname || "Unknown"} {data.lastname || ""}
                  </Link>
                </div>

                {/* Title */}
                {data.title && <p className="insta-title">{data.title}</p>}

                {/* Image */}
                <img
                  className="insta-image"
                  src={`http://localhost:5000/uploads/${data.image}`}
                  alt="Uploaded"
                />

                {/* Footer */}
                <div className="insta-footer">
                  <div className="insta-actions">
                    <FaTrash
                      className="delete-btn"
                      onClick={() => deleteImage(data._id)}
                    />
                  </div>

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
