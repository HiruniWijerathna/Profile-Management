const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // new field
    image: { type: String, required: true }, 
    email: { type: String, required: true, trim: true, lowercase: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", imageSchema);
