const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    email: { type: String, required: true },
    pdfFile: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pdf", pdfSchema);
