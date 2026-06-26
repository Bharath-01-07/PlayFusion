const Score = require("../models/Score");

// ===============================
// Save Score
// ===============================

const saveScore = async (req, res) => {
  try {
    const { user, username, score } = req.body;

    const newScore = new Score({
      user,
      username,
      score,
      game: "Snake",
    });

    await newScore.save();

    res.status(201).json({
      success: true,
      message: "Score Saved Successfully",
      data: newScore,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get Leaderboard
// ===============================

const getLeaderboard = async (req, res) => {
  try {
    const scores = await Score.find()
      .sort({ score: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      leaderboard: scores,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  saveScore,
  getLeaderboard,
};
