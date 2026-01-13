import React, { useState } from "react";
import axios from "axios";
import Nav from "../Nav/Nav";
import "./SearchImages.css";

function SearchImages() {
  const [email, setEmail] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const searchImages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/images/${email}`
      );
      setImages(res.data.images);
      setError("");
    } catch (err) {
      setImages([]);
      setError("No images found for this email");
    }
  };

  return (
    <div>
      <Nav />

      <div className="search-container">
        <h2>Search Images by Email</h2>

        <div className="search-box">
          <input
            type="email"
            placeholder="Enter user email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={searchImages}>Search</button>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="image-grid">
          {images.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:5000/uploads/${img.image}`}
              alt="uploaded"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchImages;
