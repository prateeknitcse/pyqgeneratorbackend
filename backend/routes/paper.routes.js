const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Paper = require("../models/Paper");


// 📤 Upload Paper (Admin)
router.post("/upload", upload.single("paper"), async (req, res) => {
  try {
    const paper = new Paper({
      branch: req.body.branch,
      semester: req.body.semester,
      year: req.body.year,
      exam: req.body.exam,
      subject: req.body.subject,
      filePath: req.file.path
    });

    await paper.save();
    res.json({ message: "Paper uploaded successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 📄 Fetch Papers (User)
router.get("/", async (req, res) => {
  const papers = await Paper.find(req.query);
  res.json(papers);
});

module.exports = router;
