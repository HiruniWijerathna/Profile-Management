import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../Nav/Nav";
import "./SendPdf.css";
import pdfImg from "../../assets/pdfI.jpg";

function SendPdfAndList() {
  const [pdf, setPdf] = useState(null);
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdf || !email || !title) {
      alert("Please enter title, email, and select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdf);
    formData.append("email", email);
    formData.append("title", title);

    try {
      const res = await axios.post("http://localhost:5000/send-pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message);
      setPdf(null);
      setEmail("");
      setTitle("");

      navigate("/all-pdf");
    } catch (error) {
      console.error(error.response?.data || error);
      setMessage("Failed to send PDF");
    }
  };

  return (
    <>
      <Nav />

      <div className="uplodepdfform">
        {/* Left image */}
        <div className="leftImage">
          <img src={pdfImg} alt="PDF Illustration" />
        </div>

        {/* Right form */}
        <div className="rightForm">
          <h2>Send PDF</h2>
          <p className="subtitle">Upload and send your PDF securely</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter PDF title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />

            <input
              type="email"
              placeholder="Enter recipient email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit">Send PDF</button>
          </form>

          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </>
  );
}

export default SendPdfAndList;
