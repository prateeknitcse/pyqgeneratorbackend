const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({
  branch: String,
  semester: String,
  year: String,
  exam: String,
  subject: String,
  fileUrl: String, 
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Paper", paperSchema);


