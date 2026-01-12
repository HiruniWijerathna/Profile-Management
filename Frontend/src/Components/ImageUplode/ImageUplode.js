import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onImgChange = (e) => setImage(e.target.files[0]);

  const submitImg = async (e) => {
    e.preventDefault();
    if (!image || !email) return alert("Please select an image and enter email!");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("email", email);

    try {
      await axios.post("http://localhost:5000/uploadImg", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Image uploaded successfully!");
      setImage(null);
      setEmail("");
      navigate("/all-images"); // Go to all images page
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to upload image!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Image</h2>
      <form onSubmit={submitImg}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginRight: "10px" }}
        />
        <input type="file" accept="image/*" onChange={onImgChange} required />
        <button type="submit" style={{ marginLeft: "10px" }}>
          Upload
        </button>
      </form>
    </div>
  );
}

export default ImageUpload;
