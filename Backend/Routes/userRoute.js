const express = require('express');
const router = express.Router();

const user = require("../Model/userModel");
const userController = require("../Controllers/userController");

//GET all users
router.get("/", userController.getAllUsers);

//add user
router.post("/", userController.addUser);

//get user by ID
router.get("/:id", userController.getById);

//update user by ID
router.put("/:id", userController.updateUser);

//delete user by ID
router.delete("/:id", userController.deleteUser);

module.exports = router;