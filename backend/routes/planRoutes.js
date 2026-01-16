router.get("/stats", protect, async (req, res) => {
  const total = await Plan.countDocuments({ user: req.user.id });
  const completed = await Plan.countDocuments({
    user: req.user.id,
    completed: true
  });

  res.json({
    total,
    completed,
    pending: total - completed
  });
});
