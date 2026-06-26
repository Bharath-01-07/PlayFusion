const express = require("express");

const router = express.Router();

const {
  updateRewards,
} = require("../controllers/userController");

router.post("/reward", updateRewards);

module.exports = router;
