const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gmail: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Register", registerSchema);


