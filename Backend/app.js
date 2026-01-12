// Imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const userRoutes = require("./Routes/userRoute");

// Models
const Register = require("./Model/registerModel"); // make sure model exports correctly
const ImageModel = require("./Model/imageModel"); // image model

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/file", express.static("../Frontend/src/Components/ImageUploder/files"));

// Base route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// User routes
app.use("/users", userRoutes);

// ========== REGISTER & LOGIN ==========
app.post("/register", async (req, res) => {
  const { name, gmail, password } = req.body;
  try {
    await Register.create({ name, gmail, password });
    res.status(201).json({ status: "ok" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { gmail, password } = req.body;
  try {
    const user = await Register.findOne({ gmail });
    if (!user) return res.status(404).json({ err: "User not found" });
    if (user.password === password) res.json({ status: "ok" });
    else res.status(401).json({ err: "Incorrect password" });
  } catch (err) {
    res.status(500).json({ err: "Server error" });
  }
});

// ========== MULTER SETUP ==========
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // save in backend/uploads
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ========== IMAGE UPLOAD ==========
app.post("/uploadImg", upload.single("image"), async (req, res) => {
  try {
    const { email, title } = req.body;

    if (!req.file || !email || !title) {
      return res.status(400).json({
        status: "error",
        message: "Image, email, or title missing",
      });
    }

    await ImageModel.create({
      image: req.file.filename,
      email,
      title, // save title
    });

    res.json({ status: "ok", message: "Image uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: err.message });
  }
});

// ========== GET ALL IMAGES WITH USER INFO ==========
app.get("/getImage", async (req, res) => {
  try {
    const imagesWithUser = await ImageModel.aggregate([
      {
        $lookup: {
          from: "userdetails",    // MongoDB collection name
          localField: "email",    // email in ImageModel
          foreignField: "email",  // email in UserDetails
          as: "userInfo",
        },
      },
      { $unwind: { path: "$userInfo", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          title: 1,               // include title
          image: 1,
          email: 1,
          firstname: "$userInfo.firstname",
          lastname: "$userInfo.lastname",
          profilePhoto: "$userInfo.profilePhoto",
        },
      },
    ]);

    res.json({ status: "ok", data: imagesWithUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: err.message });
  }
});



// ========== DATABASE ==========
mongoose
  .connect(
    "mongodb+srv://hiruniwijerathna7_db_user:qkH3qshAfrkqYSd7@cluster0.yvmhrx0.mongodb.net/"
  )
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));
