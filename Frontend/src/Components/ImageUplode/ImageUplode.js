import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ImageUplode.css";
import Nav from '../Nav/Nav';

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState(""); // new state
  const navigate = useNavigate();

  // Handle image selection
  const onImgChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const submitImg = async (e) => {
    e.preventDefault();

    if (!image || !email || !title) {
      alert("Please enter a title, email, and select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("email", email);
    formData.append("title", title); // append title

    try {
      await axios.post("http://localhost:5000/uploadImg", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Image uploaded successfully!");
      setImage(null);
      setEmail("");
      setTitle(""); // reset title
      navigate("/all-images");
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to upload image!");
    }
  };

  return (
    <div>
        <Nav/>
    <div className="upload-page">
      <div className="upload-card">
        <h2>Upload Image</h2>

        <form onSubmit={submitImg}>
          <input
            type="text"
            placeholder="Enter photo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="upload-input"
          />

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="upload-input"
          />

          <input
            type="file"
            accept="image/*"
            onChange={onImgChange}
            required
            className="upload-file"
          />

          {/* Preview before upload */}
          {image && (
            <div className="preview-box">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="preview-img"
              />
            </div>
          )}

          <button type="submit" className="upload-btn">
            Upload
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default ImageUpload;
