import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../Nav/Nav";
import "./UploadImageEdit.css";

function UploadImageEdit() {
  const [input, setInput] = useState({ title: "", image: "", email: "" });
  const [file, setFile] = useState(null); // for file preview
  const history = useNavigate();
  const { id } = useParams();

  // Fetch image by ID
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/uploadImg/${id}`);
        const data = res.data;
        setInput({ title: data.title, image: data.image, email: data.email });
      } catch (err) {
        console.error("Failed to fetch image", err);
      }
    };
    fetchHandler();
  }, [id]);

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", input.title);
      formData.append("email", input.email);
      if (file) formData.append("image", file);

      await axios.put(`http://localhost:5000/uploadImg/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      history("/all-images");
    } catch (err) {
      console.error("Failed to update image", err);
    }
  };

  return (
    <>
      <Nav />
      <div className="upload-page">
        <div className="upload-card">
          <h2>Edit Image</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Enter photo title"
              value={input.title}
              onChange={handleChange}
              required
              className="upload-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={input.email}
              onChange={handleChange}
              required
              className="upload-input"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="upload-file"
            />

            {/* Preview */}
            {file ? (
              <div className="preview-box">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="preview-img"
                />
              </div>
            ) : input.image ? (
              <div className="preview-box">
                <img
                  src={`http://localhost:5000/uploads/${input.image}`}
                  alt="Preview"
                  className="preview-img"
                />
              </div>
            ) : null}

            <button type="submit" className="upload-btn">
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UploadImageEdit;
