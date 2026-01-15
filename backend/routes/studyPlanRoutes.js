const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createPlan,
  getPlans,
  updatePlan,
  deletePlan
} = require("../controllers/studyPlanController");

// All routes protected
router.post("/", protect, createPlan);         // Create plan
router.get("/", protect, getPlans);           // Get all plans
router.put("/:id", protect, updatePlan);      // Update plan
router.delete("/:id", protect, deletePlan);   // Delete plan

module.exports = router;
