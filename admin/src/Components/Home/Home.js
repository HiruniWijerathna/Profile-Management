import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../Nav/Nav";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FaUsers, FaImage, FaFilePdf, FaArrowUp } from "react-icons/fa";
import "./Home.css";

function Home() {
  const [users, setUsers] = useState([]);
  const [images, setImages] = useState([]);
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const userRes = await axios.get("http://localhost:5000/users");
      const imageRes = await axios.get("http://localhost:5000/getImage");
      const pdfRes = await axios.get("http://localhost:5000/getPdf");

      setUsers(userRes.data?.users || []);
      setImages(imageRes.data?.data || []);
      setPdfs(pdfRes.data?.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const data = [
    { name: "Users", value: users.length },
    { name: "Images", value: images.length },
    { name: "PDFs", value: pdfs.length },
  ];

  const COLORS = ["#6366f1", "#22c55e", "#f97316"];

  return (
    <>
      <Nav />
      <div className="admin-home">

        {/* Welcome Section */}
        <div className="welcome-box">
          <h1>Welcome back, Admin 👋</h1>
          <p>Here’s what’s happening in your system today.</p>
        </div>

        {/* Stat Cards */}
        <div className="card-container">
          <div className="card users">
            <FaUsers className="card-icon" />
            <h2>Users</h2>
            <p>{users.length}</p>
            <span className="growth">
              <FaArrowUp /> 5%
            </span>
          </div>

          <div className="card images">
            <FaImage className="card-icon" />
            <h2>Images</h2>
            <p>{images.length}</p>
            <span className="growth">
              <FaArrowUp /> 8%
            </span>
          </div>

          <div className="card pdfs">
            <FaFilePdf className="card-icon" />
            <h2>PDFs</h2>
            <p>{pdfs.length}</p>
            <span className="growth">
              <FaArrowUp /> 3%
            </span>
          </div>
        </div>

        {/* Charts */}
        <div className="charts">
          <div className="chart-box">
            <h3>System Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <h3>Content Ratio</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label
                >
                  {data.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity-box">
          <h3>Recent Activity</h3>
          <ul>
            <li>📄 New PDF uploaded</li>
            <li>🖼️ Image added to gallery</li>
            <li>👤 New user registered</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;
