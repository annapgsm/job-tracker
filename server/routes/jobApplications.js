const express = require("express");
const router = express.Router();
const JobApplication = require("../models/JobApplication");

router.get("/", async (req, res) => {
  try {
    const jobs = await JobApplication.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job applications" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newJob = new JobApplication(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ message: "Error creating job application" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedJob = await JobApplication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: "Error updating job application" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await JobApplication.findByIdAndDelete(req.params.id);
    res.json({ message: "Job application deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting job application" });
  }
});

module.exports = router;