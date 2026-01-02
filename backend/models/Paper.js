const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({
  branch: String,
  semester: String,
  year: String,
  exam: String,     // midsem | endsem
  subject: String,
  filePath: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});
paperSchema.index(
  { branch: 1, semester: 1, year: 1, exam: 1, subject: 1 },
  { unique: true }
);


module.exports = mongoose.model("Paper", paperSchema);

