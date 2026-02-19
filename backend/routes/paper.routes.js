const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Paper = require("../models/Paper.js");
const verifyAdmin = require("../middleware/auth");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
router.post(
  "/upload",
  verifyAdmin,
  upload.single("paper"),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto",   
        folder: "pyq_papers"    
      });
      fs.unlinkSync(req.file.path);

      const paper = new Paper({
        branch: req.body.branch,
        semester: req.body.semester,
        year: req.body.year,
        exam: req.body.exam,
        subject: req.body.subject,
        fileUrl: result.secure_url
      });

      await paper.save();

      res.json({ message: "Paper uploaded to Cloudinary" });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Cloudinary upload failed" });
    }
  }
);



router.get("/", async (req, res) => {
  const papers = await Paper.find(req.query);
  res.json(papers);
});

router.get("/subjects", async (req, res) => {
  const { branch, semester } = req.query;

  if (!branch || !semester) {
    return res.json([]);
  }

  const subjects = await Paper.distinct("subject", { branch, semester });
  res.json(subjects);
});

module.exports = router;
