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




