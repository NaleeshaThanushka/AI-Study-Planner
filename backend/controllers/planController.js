const getTodayPlans = async (req, res) => {
  const plans = await Plan.find({
    user: req.user.id,
    completed: false,
  }).limit(3);

  res.json(plans);
};
