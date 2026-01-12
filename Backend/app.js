const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const userRoutes = require("./Routes/userRoute");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Base route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// User routes
app.use("/users", userRoutes);

// ================= REGISTER & LOGIN =================

// Register model
require("./Model/registerModel");
const Register = mongoose.model("Register");

// Register
app.post("/register", async (req, res) => {
  const { name, gmail, password } = req.body;
  try {
    await Register.create({ name, gmail, password });
    res.status(201).json({ status: "ok" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { gmail, password } = req.body;
  try {
    const user = await Register.findOne({ gmail });
    if (!user) return res.status(404).json({ err: "User not found" });

    if (user.password === password) {
      res.json({ status: "ok" });
    } else {
      res.status(401).json({ err: "Incorrect password" });
    }
  } catch (err) {
    res.status(500).json({ err: "Server error" });
  }
});

// ================= DATABASE =================

mongoose
  .connect(
    "mongodb+srv://hiruniwijerathna7_db_user:qkH3qshAfrkqYSd7@cluster0.yvmhrx0.mongodb.net/"
  )
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () =>
      console.log("Server running on port 5000")
    );
  })
  .catch((err) => console.log(err));
