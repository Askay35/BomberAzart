const express = require("express");

const Game = require("../models/models").Game;
const User = require("../models/models").User;

const io = require("../socket");

const router = express.Router();

let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();

//сделать ставку, передать bet_size
router.post("/api/bet/add", jsonParser, User.updateActivity, (req, res) => {
  //если идет ожидание ставок
  if (Game.round_state == Game.ROUND_STATES.ROUND_START) {
    //получаем данные пользователя делающего ставку
    User.getUserData(req.token, ["id", "money", "name"]).then((user_data) => {
      //если ставок меньше двух идем дальше
      if (Game.getUserBetsCount(user_data[0].id) < 2) {
        //если денег на счету пользователя достаточно
        if (user_data[0].money >= req.body.bet_size) {
          //если ставка подходящего размера
          if (req.body.bet_size >= 10 && req.body.bet_size <= 1000000) {
            //если ставка подходящего размера
            Game.bets.push({
              user_id: user_data[0].id,
              name: user_data[0].name,
              bet_size: req.body.bet_size,
              coef: -1,
              win: -1,
            });

            //обновляем ставки у всех пользователей
            io.emit("update current bets", Game.bets);

            return res.json({ success: true });
          } else {
            return res.json({
              success: false,
              error: "Неверный размер ставки",
            });
          }
        } else {
          return res.json({
            success: false,
            error: "Недостаточно средств для ставки",
          });
        }
      } else {
        return res.json({
          success: false,
          error: "Нельзя сделать больше 2 ставок за раунд",
        });
      }
    });
  } else {
    return res.json({ success: false, error: "Ожидание раунда не началось" });
  }
});

//забрать ставку, передать bet_id(0 или 1)
router.post(
  "/api/bet/take",
  jsonParser,
  User.updateActivity,
  async (req, res) => {
    //если раунд идет
    if (Game.round_state == Game.ROUND_STATES.ROUND_START) {
      //получаем данные пользователя
      let user_data = await User.getUserData(req.token, ["id"]);
      //получаем текущие ставки пользователя
      let user_bets = [];
      Game.bets.forEach((val, index) => {
        if (val.user_id == user_data[0].id) {
          user_bets.push(index);
        }
      });
      //если ставки есть и айди забираемой ставки меньше их количества
      if (req.body.bet_id >= 0 && req.body.bet_id < user_bets.length) {
        //если ставку еще не забрали
        if (Game.bets[user_bets[req.body.bet_id]].coef == -1) {
          Game.bets[user_bets[req.body.bet_id]].coef = Game.current_coef;
          Game.bets[user_bets[req.body.bet_id]].win =
            Game.bets[user_bets[req.body.bet_id]].bet_size *
            Game.bets[user_bets[req.body.bet_id]].coef;

          //обновляем ставки у всех пользователей
          io.emit("update current bets", Game.bets);

          await User.addMoney(
            Game.bets[user_bets[req.body.bet_id]].user_id,
            Game.bets[user_bets[req.body.bet_id]].win -
              Game.bets[user_bets[req.body.bet_id]].bet_size
          );

          return res.json({
            success: true,
            data: {
              coef: Game.bets[user_bets[req.body.bet_id]].coef,
              win: Game.bets[user_bets[req.body.bet_id]].win,
            },
          });
        } else {
          return res.json({ success: false, error: "Вы уже забрали ставку" });
        }
      } else {
        return res.json({ success: false, error: "Ставки нет" });
      }
    } else {
      return res.json({ success: false, error: "Раунд не начался" });
    }
  }
);

//message = {bet_id}

router.post(
  "/api/message/add",
  User.updateActivity,
  jsonParser,
  async (req, res) => {
    let is_text = false;
    if ("text" in req.body) {
      is_text = true;
      if (req.body.text.length > 150 || req.body.text == "") {
        return res.json({
          success: false,
          errors: {
            message: "Сообщение должно быть длинной до 150 символов",
          },
        });
      }
    }

    let user_data = await User.getUserData(req.query.token, ["id", "name"]);
    let message = {
      name: user_data[0].name,
    };
    if (is_text) {
      message.text = req.body.text;
      await Game.addMessage({
        text: message.text,
        user_id: user_data[0].id,
      });

      io.emit("chat message", message);

      return res.json({ success: true });
    } else if ("bet_id" in req.body) {
      let bet_data = await Game.getBetData(req.body.bet_id, [
        "win",
        "coef",
        "bet_size",
        "round_id",
      ]);
      let round_coef = await Game.getRoundData(bet_data[0].round_id)[0].coef;
      let bet = {
        win: bet_data[0].win,
        coef: bet_data[0].coef,
        bet_size: bet_data[0].bet_size,
        win: bet_data[0].win,
        round: round_coef
      };
      await Game.addMessage({
        user_id: user_data[0].id,
        bet_id: req.body.bet_id,
      });

      io.emit("chat message", { name: message.name, bet: bet });
     
      return res.json({ success: true });
    } else {
      return res.json({
        success: false,
        errors: { message: "Неверный формат сообщения!" },
      });
    }
  }
);

module.exports = router;
