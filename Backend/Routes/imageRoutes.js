const express = require("express");
const router = express.Router();
const ImageModel = require("../Model/imageModel");
const multer = require("multer");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// GET ALL IMAGES
router.get("/getImage", async (req, res) => {
  try {
    const images = await ImageModel.find();
    res.json({ status: "ok", data: images });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: err.message });
  }
});

// ✅ GET SINGLE IMAGE BY ID
router.get("/:id", async (req, res) => {
  try {
    const img = await ImageModel.findById(req.params.id);
    if (!img) return res.status(404).json({ status: "error", message: "Image not found" });
    res.json({ status: "ok", data: img });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: err.message });
  }
});

// UPDATE IMAGE
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title } = req.body;
    const updatedData = {};
    if (title) updatedData.title = title;
    if (req.file) updatedData.image = req.file.filename;

    const updatedImage = await ImageModel.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedImage) return res.status(404).json({ status: "error", message: "Image not found" });

    res.json({ status: "ok", data: updatedImage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: err.message });
  }
});

// DELETE IMAGE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await ImageModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ status: "error", message: "Image not found" });
    res.json({ status: "ok", message: "Image deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: err.message });
  }
});

module.exports = router;
