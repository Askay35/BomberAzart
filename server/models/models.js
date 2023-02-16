const asyncQuery = require("../db").asyncQuery;
const moment = require("moment");
const { db } = require("../db");
const axios = require("axios").default;
const io = require("../socket");

let Game = {
  ROUND_STATES: {
    ROUND_START: 1,
    ROUND_WAIT: 2,
    ROUND_END: 3,
  },
  current_coef: 1.0,
  round_coef: 0.0,
  bets: [],
  bets_sum: 0.0,
  round_wait_left: 0.0,
  round_wait_max: 80,
  round_state: 3,

  async processRound() {
    let current_time = moment().format();
    return Game.addRound(Game.round_coef, current_time).then((resp) => {
      //добавляем ставки в базу если есть
      if (this.bets.length > 0) {
        this.addBets(this.bets, resp[0]["LAST_INSERT_ID()"], current_time);
      }

      //обновляем счета пользователей
      for (let bet of this.bets) {
        if (bet.win < 1) {
          User.subMoney(bet.user_id, bet.bet_size);
        }
      }
      //обновляем данные
      this.current_coef = 1.0;
      this.bets = [];
      this.bets_sum = 0.0;
      this.round_wait_left = 0.0;
    });
  },

  async wait(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ms);
      }, ms);
    });
  },
  async pauseBetweenRounds(val, part, delay) {
    while (val > 0) {
      val -= part;
      io.emit("round wait val", val);
      await this.wait(delay);
    }
  },
  async gameLoop() {
    while (true) {
      this.round_coef = parseFloat(
        (Math.random() * (3.0 - 1.0) + 1.0).toFixed(2)
      );

      for (let bet of this.bets) {
        this.bets_sum += bet.bet_size;
      }

      this.round_state = this.ROUND_STATES.ROUND_START;
      io.emit("round state", this.round_state);

      io.emit("round wait val", this.round_wait_max);

      io.emit("coef changed", this.current_coef);

      await this.wait(100);

      while (this.current_coef < this.round_coef) {
        this.current_coef += 0.01;
        io.emit("coef changed", this.current_coef);
        await this.wait(50);
      }

      await this.wait(500);

      this.round_state = this.ROUND_STATES.ROUND_WAIT;
      io.emit("round state", this.round_state);

      await this.processRound();

      io.emit("update money");

      await this.wait(2000);

      io.emit("add round", this.round_coef);

      this.round_state = this.ROUND_STATES.ROUND_END;
      io.emit("round state", this.round_state);

      await this.pauseBetweenRounds(this.round_wait_max, 1, 100);
    }
  },
  getUserBetsCount(user_id) {
    return this.bets.filter((bet) => {
      return bet.user_id == user_id;
    }).length;
  },
  async getBetData(bet_id, columns = []) {
    if (columns.length > 0) {
      return asyncQuery(
        `select ${columns.join(", ")} from bets where id=${db.escape(
          bet_id
        )} limit 1`
      );
    }
    return asyncQuery(`select * from bets where bet_id='${bet_id}' limit 1`);
  },
  getRoundData(round_id, columns = ["coef"]) {
    return asyncQuery(
      `SELECT ${columns.join(", ")} FROM rounds WHERE id=${round_id} limit 1`
    );
  },
  async addBets(bets_arr, round_id, date_time) {
    let query =
      "INSERT INTO bets (user_id, round_id, bet_size, coef, win, date_time) VALUES ";
    for (let bet in bets_arr) {
      query += `(${bets_arr[bet].user_id}, ${round_id}, ${
        bets_arr[bet].bet_size
      }, ${bets_arr[bet].coef == -1 ? 0.0 : db.escape(bets_arr[bet].coef)}, ${
        bets_arr[bet].win == -1 ? 0.0 : db.escape(bets_arr[bet].win)
      }, ${db.escape(date_time)})`;
      if (bet != bets_arr.length - 1) {
        query += ", ";
      }
    }
    return asyncQuery(query);
  },
  async addRound(coef, date_time) {
    return asyncQuery(
      `INSERT INTO rounds (coef, date_time) VALUES (${db.escape(
        coef
      )}, ${db.escape(date_time)})`
    ).then(() => {
      return asyncQuery("SELECT LAST_INSERT_ID()");
    });
  },
  async getRounds(count = -1, columns = []) {
    return asyncQuery(
      `SELECT ${
        columns.length > 0 ? columns.join(", ") : "*"
      } from rounds ORDER BY id DESC ${count == -1 ? "" : " LIMIT " + count}`
    );
  },
  async addMessage(message) {
    if ("text" in message) {
      return asyncQuery(
        `INSERT INTO messages (user_id, text) VALUES (${db.escape(
          message.user_id
        )}, ${db.escape(message.text)})`
      );
    } else {
      return asyncQuery(
        `INSERT INTO messages (user_id, bet_id) VALUES (${db.escape(
          message.user_id
        )}, ${db.escape(message.bet_id)})`
      );
    }
  },
  async getMessages(count = -1) {
    if (count == -1) {
      return asyncQuery(
        `SELECT * FROM (SELECT messages.id, messages.text, bets.coef, bets.win, bets.bet_size, rounds.coef as round_coef, users.name FROM messages LEFT JOIN users on messages.user_id = users.id LEFT JOIN bets on messages.bet_id = bets.id LEFT JOIN rounds on bets.round_id = rounds.id ORDER BY messages.id DESC) as msgs ORDER BY msgs.id ASC`
      );
    } else {
      return asyncQuery(
        `SELECT * FROM (SELECT messages.id, messages.text, bets.coef, bets.win, bets.bet_size, rounds.coef as round_coef, users.name FROM messages LEFT JOIN users on messages.user_id = users.id LEFT JOIN bets on messages.bet_id = bets.id LEFT JOIN rounds on bets.round_id = rounds.id ORDER BY messages.id DESC LIMIT ${count}) as msgs ORDER BY msgs.id ASC`
      );
    }
  },
};

let User = {
  initUser(socket) {
    return Game.getRounds(25, ["coef"]).then((rounds) => {
      Game.getMessages(30).then((messages) => {
        messages.forEach(message => {
          for (const key in message) {
            if(message[key]===null || key == 'id'){
              delete message[key];
            }
          }
        });
        socket.emit("game init", {
          round_state: Game.round_state,
          round_wait_max: Game.round_wait_max,
          rounds: rounds.map((v) => {
            return v.coef;
          }),
          messages: messages
        });
      });
    });
  },
  getUserData(token, columns = []) {
    if (columns.length > 0) {
      return asyncQuery(
        `select ${columns.join(", ")} from users where token=${db.escape(
          token
        )} limit 1`
      );
    }
    return asyncQuery(
      `select * from users where token=${db.escape(token)} limit 1`
    );
  },
  updateActivity(req, res, next) {
    axios.post(
      "http://127.0.0.1:8000/api/update/online",
      {},
      { params: { token: req.query.token } }
    );
    next();
  },
  async addMoney(user_id, money) {
    return asyncQuery(
      `UPDATE users SET money = money + ${db.escape(
        money
      )} WHERE id = ${user_id};`
    );
  },
  async subMoney(user_id, money) {
    return asyncQuery(
      `UPDATE users SET money = money - ${db.escape(
        money
      )} WHERE id = ${user_id};`
    );
  },
  getBets(user_id) {
    return asyncQuery(`SELECT * from bets WHERE user_id=${user_id}`);
  },
};

module.exports.Game = Game;
module.exports.User = User;
