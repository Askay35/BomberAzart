const express = require("express");

const User = require("../models/models").User;
const router = express.Router();
const rateLimit = require('express-rate-limit');


const userLimit = rateLimit({
	windowMs: 60 * 1000, 
	max: 20, 
	standardHeaders: true, 
	legacyHeaders: false,
});

router.get("/api/user", userLimit, User.updateActivity, (req, res) => {
  if ("columns" in req.query) {
    User.getUserData(req.token, req.query.columns).then((user_data) => {
      return res.json(user_data);
    });
  } else {
    User.getUserData(req.token).then((user_data) => {
      return res.json(user_data);
    });
  }
});

const userBetsLimit = rateLimit({
	windowMs: 60 * 1000, 
	max: 15, 
	standardHeaders: true, 
	legacyHeaders: false,
});

router.get("/api/user/bets", userBetsLimit, User.updateActivity, (req, res) => {
  User.getUserData(req.token, ["id"]).then((user_data) => {
    User.getBets(user_data[0].id).then((bets) => {
      return res.json({ success: true, data: { bets: bets } });
    });
  });
});

module.exports = router;
