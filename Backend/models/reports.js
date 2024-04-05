// models/Report.js

const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  images: [String],// Assuming you store image URLs as strings
  location:{
    type: String,
    required: true
  }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
