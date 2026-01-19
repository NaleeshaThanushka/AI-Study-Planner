const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

// Rule-based AI suggestion
router.post("/suggest", protect, (req, res) => {
  try {
    const { subject, hours } = req.body;

    if (!subject || !hours) {
      return res.status(400).json({ message: "Subject and hours are required" });
    }

    let suggestion = "";

    if (hours <= 1) {
      suggestion = `Focus on revising key concepts of ${subject}`;
    } else if (hours <= 3) {
      suggestion = `Study theory + solve practice questions for ${subject}`;
    } else {
      suggestion = `Deep study: theory, exercises, and mock test for ${subject}`;
    }

    res.json({ suggestion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
