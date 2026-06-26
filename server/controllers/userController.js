const User = require("../models/User");

const updateRewards = async (req, res) => {
  try {
    const { userId, score } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.gamesPlayed += 1;
    user.coins += 20;
    user.xp += score;

    if (score > user.highestScore) {
      user.highestScore = score;
      user.xp += 50;
    }

    user.level = Math.floor(user.xp / 100) + 1;

    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  updateRewards,
};
