const express = require("express");

const router = express.Router();

const {
  saveScore,
  getLeaderboard,
} = require("../controllers/scoreController");

// Save Score
router.post("/", saveScore);

// Get Leaderboard
router.get("/leaderboard", getLeaderboard);

module.exports = router;