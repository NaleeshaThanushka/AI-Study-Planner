const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.get("/", protect, (req, res) => {
  res.json({
    message: `Hello ${req.user.name}, you accessed a protected route ✅`
  });
});

module.exports = router;
