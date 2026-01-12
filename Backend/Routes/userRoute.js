const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userController");
const upload = require("../middleware/upload");

// GET all users
router.get("/", userController.getAllUsers);

// ADD user (WITH profile photo)
router.post(
  "/",
  upload.single("profilePhoto"),
  userController.addUser
);

// GET user by ID
router.get("/:id", userController.getById);

// UPDATE user (WITH / WITHOUT photo)
router.put(
  "/:id",
  upload.single("profilePhoto"),
  userController.updateUser
);

// DELETE user
router.delete("/:id", userController.deleteUser);

module.exports = router;
