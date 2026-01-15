const StudyPlan = require("../models/StudyPlan");

// CREATE Study Plan
const createPlan = async (req, res) => {
  try {
    const { title, description, subject, date } = req.body;

    if (!title || !subject) {
      return res.status(400).json({ message: "Title and Subject are required" });
    }

    const plan = await StudyPlan.create({
      user: req.user.id,
      title,
      description,
      subject,
      date
    });

    res.status(201).json({ message: "Study plan created", plan });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET All Plans for User
const getPlans = async (req, res) => {
  try {
    const plans = await StudyPlan.find({ user: req.user.id }).sort({ date: 1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE Study Plan
const updatePlan = async (req, res) => {
  try {
    const plan = await StudyPlan.findOne({ _id: req.params.id, user: req.user.id });
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    const updated = await StudyPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Plan updated", plan: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE Study Plan
const deletePlan = async (req, res) => {
  try {
    const plan = await StudyPlan.findByIdAndDelete(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    await plan.remove();
    res.json({ message: "Plan deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPlan, getPlans, updatePlan, deletePlan };
