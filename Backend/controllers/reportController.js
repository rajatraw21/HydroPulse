const Report = require('../models/reports');
const fs = require('fs');
const path = require('path');

exports.submitReport = async (req, res) => {
  try {
    console.log('request body:', req.body);
    const { description, category } = req.body;
    const location = req.body.location; // Assuming location is provided in the request body
    console.log(req.files);
    const images = req.files.map(file => file.path); // Assuming 'path' property contains the path to the uploaded file
    
    const newReport = new Report({ description, category, location, images });
    await newReport.save();

    res.status(201).json({ message: 'Report submitted successfully' });
  } catch (error) {
    console.error('Error submitting report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getReportedProblems = async (req, res) => {
  try {
    const reportedProblems = await Report.find();
    res.json(reportedProblems);
  } catch (error) {
    console.error('Error fetching reported problems:', error);
    res.status(500).json({ error: 'An error occurred while fetching reported problems' });
  }
};
