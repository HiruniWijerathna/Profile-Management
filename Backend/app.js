const express = require('express');
const mongoose = require('mongoose');
const routes = require('./Routes/userRoute');


const app = express();
const cors = require('cors');

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Basic route
app.get("/", (req, res) => {
    res.send("API is running...");
});
// User routes
app.use("/users", routes);







// Connect to MongoDB
mongoose.connect('mongodb+srv://hiruniwijerathna7_db_user:qkH3qshAfrkqYSd7@cluster0.yvmhrx0.mongodb.net/')
    .then(() => console.log('MongoDB connected'))
    .then(() => {
        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });
    })

    .catch((err) => console.log((err)));


// call register model
require("./Model/registerModel");

const Register = mongoose.model("Register");

app.post("/register", async (req, res) => {
  const { name, gmail, password } = req.body;

  try {
    await Register.create({
      name,
      gmail,
      password
    });

    res.status(201).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: err.message });
  }
});

//login
app.post("/login", async (req, res) => {
  const { gmail, password } = req.body;

  try {
    const user = await Register.findOne({ gmail });

    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }

    if (user.password === password) {
      return res.json({ status: "ok" });
    } else {
      return res.status(401).json({ err: "Incorrect password" });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Server Error" });
  }
});





