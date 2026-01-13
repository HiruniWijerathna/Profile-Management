import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../Nav/Nav";

function SendPdfAndList() {
  const [pdf, setPdf] = useState(null);
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // <--- for redirect

  const handleFileChange = (e) => setPdf(e.target.files[0]);

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

      // ✅ Redirect to AllPdf page
      navigate("/all-pdf");
    } catch (error) {
      console.error(error.response?.data || error);
      setMessage("Failed to send PDF");
    }
  };

  return (
    <>
      <Nav />
      <div style={{ padding: "20px" }}>
        <h2>Send PDF</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Enter PDF title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
          </div>
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit">Send PDF</button>
        </form>

        {message && <p>{message}</p>}
      </div>
    </>
  );
}

export default SendPdfAndList;
