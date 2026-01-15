const mongoose = require("mongoose");

const studyPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  subject: { type: String, required: true },
  date: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("StudyPlan", studyPlanSchema);
