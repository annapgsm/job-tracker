//Mongoose= package that helps the Node app talk to MongoDB
const mongoose = require("mongoose");

// creates new schema/shape for data
const jobApplicationSchema = new mongoose.Schema({
  companyName: String,
  jobTitle: String,
  jobLink: String,
  jobDescription: String,
  status: String,
  notes: String,
  dateSaved: Date,
  dateApplied: Date,
});


module.exports = mongoose.model("JobApplication", jobApplicationSchema);


