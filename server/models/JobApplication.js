//Mongoose= package that helps the Node app talk to MongoDB
const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
    {
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
            default: "",
        },
        jobDescription: {
            type: String,
            trim: true,
            default: "",
        },
        salary: {
            type: Number,
        },
        platform: {
            type: String,
            trim: true, 
            default: "",
        },
        location: {
            type: String, 
            trim: true, 
            default: "",
        },
        contact: {
            type: String, 
            trim: true, 
            default: "",
        },
        status: {
            type: String,
            enum: ["Saved", "Applied", "Interview", "Offer", "Rejected"],
            default: "Saved",
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
        dateUpdated: {
            type: Date,
            default: null,
        },
    }
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
