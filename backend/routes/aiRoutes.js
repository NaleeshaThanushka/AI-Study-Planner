const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.post("/suggest", protect, (req, res) => {
  const { subject, hours } = req.body;

  let suggestion = "";

  if (hours <= 1) {
    suggestion = `Focus on revising key concepts of ${subject}`;
  } else if (hours <= 3) {
    suggestion = `Study theory + solve practice questions for ${subject}`;
  } else {
    suggestion = `Deep study: theory, exercises, and mock test for ${subject}`;
  }

  res.json({ suggestion });
});

module.exports = router;
