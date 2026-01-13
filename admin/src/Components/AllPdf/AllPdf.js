import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../Nav/Nav";
import "./AllPdf.css";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

function AllPdf() {
  const [allPdfs, setAllPdfs] = useState([]);
  const [search, setSearch] = useState("");

  const pdfImages = ["/pdf.jpg"];

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

  // Delete PDF
  const deletePdf = async (id) => {
    if (!window.confirm("Delete this PDF?")) return;

    try {
      await axios.delete(`http://localhost:5000/deletePdf/${id}`);
      setAllPdfs((prev) => prev.filter((pdf) => pdf._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete PDF");
    }
  };

  // Filter PDFs
  const filteredPdfs = allPdfs.filter((pdf) =>
    pdf.fullname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Nav />
      <div className="all-pdf-container">
        <h2 className="page-title">All Uploaded PDF Documents</h2>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button onClick={() => setSearch("")} className="reset-btn">
            Reset
          </button>
        </div>

        <div className="allpdf-container">
          {filteredPdfs.map((pdf, index) => (
            <div key={pdf._id} className="pdf-card">

              {/* Header */}
              <div className="pdf-header">
                <Link to={`/view-images/${pdf.email}`} className="profile-link">
                  <img
                    src={
                      pdf.profilePhoto
                        ? `http://localhost:5000/uploads/${pdf.profilePhoto}`
                        : "https://via.placeholder.com/50"
                    }
                    alt="Profile"
                    className="profile-img"
                  />
                </Link>

                <Link
                  to={`/view-images/${pdf.email}`}
                  className="profile-link profile-name"
                >
                  {pdf.fullname}
                </Link>
              </div>

              <div className="divider"></div>

              {/* PDF Row */}
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
                </div>

                {/* Delete Button */}
                <button
                  className="delete-btnn"
                  onClick={() => deletePdf(pdf._id)}
                >
                  <FaTrash />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AllPdf;
