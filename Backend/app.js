const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware to parse JSON requests
app.use("/", (req, res, next) => {
    res.send("API is running...");
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://hiruniwijerathna7_db_user:qkH3qshAfrkqYSd7@cluster0.yvmhrx0.mongodb.net/')
    .then(() => console.log('MongoDB connected'))
    .then(() => {
        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });
    })

    .catch((err) => console.log((err)));


