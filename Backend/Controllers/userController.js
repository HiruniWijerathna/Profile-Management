const User = require("../Model/userModel");

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD USER
const addUser = async (req, res) => {
  try {
    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      profilePhoto: req.file ? req.file.filename : null
    });

    await newUser.save();
    res.status(201).json({ users: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET USER BY ID
const getById = async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE USER
const updateUser = async (req, res) => {
  try {
    const updatedData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone
    };

    if (req.file) {
      updatedData.profilePhoto = req.file.filename;
    }

    const users = await User.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!users) {
      return res.status(404).json({ message: "Update failed" });
    }

    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const users = await User.findByIdAndDelete(req.params.id);
    if (!users) {
      return res.status(404).json({ message: "Delete failed" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
