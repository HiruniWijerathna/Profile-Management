import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ImageUplode.css";
import Nav from "../Nav/Nav";
import uploadImg from "../../assets/uplodeI.jpg";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const onImgChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitImg = async (e) => {
    e.preventDefault();

    if (!image || !email || !title) {
      alert("Please enter a title, email, and select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("email", email);
    formData.append("title", title);

    try {
      await axios.post("http://localhost:5000/uploadImg", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Image uploaded successfully!");
      setImage(null);
      setEmail("");
      setTitle("");
      navigate("/all-images");
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to upload image!");
    }
  };

  return (
    <>
      <Nav />

      <div className="upload-page">
        <div className="upload-card">

          {/* Left image */}
          <div className="upload-left">
            <img src={uploadImg} alt="Upload Illustration" />
          </div>

          {/* Right Form */}
          <div className="upload-right">
            <h2>Upload Image</h2>
            <p className="subtitle">Upload and share your images easily</p>

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
                Upload Image
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}

export default ImageUpload;
