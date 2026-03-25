//Mongoose= package that helps the Node app talk to MongoDB
const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    jobTitle: {
        type: String,
        required: true,
        trim: true,
    },
    jobLink: {
        type: String,
        trim: true,
    },
    jobDescription: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ["saved", "applied", "interview", "offer", "rejected"],
        default: "saved",
    },
    notes: {
        type: String,
        trim: true,
        default: "",
    },
    dateSaved: {
        type: Date,
        default: Date.now,
    },
    dateApplied: {
        type: Date,
    },
});

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
