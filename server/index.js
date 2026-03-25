const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const jobApplicationRoutes = require("./routes/jobApplications");

const app = express();
const PORT = process.env.PORT || 5000;

//Mongoose= package that helps the Node app talk to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/job-applications", jobApplicationRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
;

