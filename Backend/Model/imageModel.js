const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    image: { type: String, required: true }, // filename
    email: { type: String, required: true, trim: true, lowercase: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", imageSchema);
