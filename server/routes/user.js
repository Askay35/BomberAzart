const express = require("express");

const User = require("../models/models").User;
const router = express.Router();

router.get("/api/user", User.updateActivity, (req, res) => {
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

router.get("/api/user/bets", User.updateActivity, (req, res) => {
  User.getUserData(req.token, ["id"]).then((user_data) => {
    User.getBets(user_data[0].id).then((bets) => {
      return res.json({ success: true, data: { bets: bets } });
    });
  });
});

module.exports = router;
