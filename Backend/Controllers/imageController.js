const ImageModel = require("../Model/imageModel");

// GET ALL IMAGES
const getAllImages = async (req, res) => {
  try {
    const images = await ImageModel.find();
    res.json({ status: "ok", data: images });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
};

// GET SINGLE IMAGE BY ID
const getImageById = async (req, res) => {
  try {
    const image = await ImageModel.findById(req.params.id);
    if (!image) return res.status(404).json({ status: "error", message: "Image not found" });
    res.json({ status: "ok", data: image }); // important: "data" key
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
};

// UPDATE IMAGE
const updateImage = async (req, res) => {
  try {
    const { title } = req.body;
    const updatedData = {};
    if (title) updatedData.title = title;
    if (req.file) updatedData.image = req.file.filename;

    const updated = await ImageModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );

    if (!updated) return res.status(404).json({ status: "error", message: "Image not found" });

    res.json({ status: "ok", data: updated });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
};

// DELETE IMAGE
const deleteImage = async (req, res) => {
  try {
    const deleted = await ImageModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ status: "error", message: "Image not found" });
    res.json({ status: "ok", message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
};

module.exports = { getAllImages, getImageById, updateImage, deleteImage };
