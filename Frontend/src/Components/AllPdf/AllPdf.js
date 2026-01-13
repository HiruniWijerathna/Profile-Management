import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../Nav/Nav";
import "./AllPdf.css";
import { FaHeart, FaRegComment, FaPaperPlane } from "react-icons/fa";

function AllPdf() {
  const [allPdfs, setAllPdfs] = useState([]);
  const [liked, setLiked] = useState({}); // store liked state per PDF

  // PDF images from public folder
  const pdfImages = [
    "/pdf.jpg",
    
  ];

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/getPdf");
        if (res.data.status === "ok") {
          setAllPdfs(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching PDFs", error);
      }
    };

    fetchPdfs();
  }, []);

  // Toggle heart
  const toggleLike = (id) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <Nav />

      <div className="allpdf-container">
        {allPdfs.map((pdf, index) => (
          <div key={pdf._id} className="pdf-card">

            {/* Profile Header */}
            <div className="pdf-header">
              <img
                src={
                  pdf.profilePhoto
                    ? `http://localhost:5000/uploads/${pdf.profilePhoto}`
                    : "https://via.placeholder.com/50"
                }
                alt="Profile"
                className="profile-img"
              />
              <span className="profile-name">{pdf.fullname}</span>
            </div>

            <div className="divider"></div>

            {/* PDF Content */}
            <div className="pdf-content">
              <img
                src={pdfImages[index % pdfImages.length]}
                alt="PDF"
                className="pdf-icon"
              />

              <div className="pdf-info">
                <p className="pdf-title">
                  <strong>Title:</strong> {pdf.title}
                </p>

                {/* Buttons */}
                <div className="pdf-buttons">
                  <a
                    href={`http://localhost:5000/files/${pdf.pdfFile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="open-btn"
                  >
                    Open PDF
                  </a>

                  <a
                    href={`http://localhost:5000/files/${pdf.pdfFile}`}
                    download
                    className="download-btn"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="insta-footer">
              <div className="insta-actions">
                <FaHeart
                  className={`like-btn ${liked[pdf._id] ? "liked" : ""}`}
                  onClick={() => toggleLike(pdf._id)}
                />
                <FaRegComment />
                <FaPaperPlane />
              </div>

            </div>

          </div>
        ))}
      </div>
    </>
  );
}

export default AllPdf;
