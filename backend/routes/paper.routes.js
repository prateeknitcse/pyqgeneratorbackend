const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Paper = require("../models/Paper.js");
const verifyAdmin = require("../middleware/auth");
const uploadToDrive = require("../utils/drive");



// 📤 Upload Paper (Admin)
router.post(
  "/upload",
  verifyAdmin,
  upload.single("paper"),
  async (req, res) => {
    try {
      // Upload PDF to Google Drive
      const fileUrl = await uploadToDrive(req.file);

      const paper = new Paper({
        branch: req.body.branch,
        semester: req.body.semester,
        year: req.body.year,
        exam: req.body.exam,
        subject: req.body.subject,
        fileUrl
      });

      await paper.save();

      res.json({ message: "Paper uploaded to Google Drive" });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Drive upload failed" });
    }
  }
);


// 📄 Fetch Papers (User)
router.get("/", async (req, res) => {
  const papers = await Paper.find(req.query);
  res.json(papers);
});
// 📚 Get unique subjects by branch & semester
router.get("/subjects", async (req, res) => {
  const { branch, semester } = req.query;

  if (!branch || !semester) {
    return res.json([]);
  }

  const subjects = await Paper.distinct("subject", { branch, semester });
  res.json(subjects);
});

module.exports = router;
