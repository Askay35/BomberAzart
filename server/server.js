const express = require("express");
const config = require("./config");
const app = express();
const userRoutes = require("./routes/user");
const gameRoutes = require("./routes/game");


const io = require('./socket');
const Game = require("./models/models").Game;
const User = require("./models/models").User;
const helmet = require('helmet');


io.on("connection", (socket) => {
  User.initUser(socket);

  socket.on("disconnect", () => {});
});

app.use(helmet());
app.disable('x-powered-by');

app.use("/api", function (req, res, next) {
  const token = req.query.token;

  if (!token)
    return res.json({ success: false, data: { token: "Не указан токен!" } });

  req.token = token;
  next();
});

app.use(userRoutes);
app.use(gameRoutes);


app.listen(config.server.port);


io.listen(3000);

Game.gameLoop();

//close app

// process.on("SIGINT", function () {
//   server.close((err) => {
//     if (err) {
//       return console.log("Ошибка закрытия сервера: " + err.message);
//     }
//     console.log("Сервер выключен");
//   });
//   io.close((err) => {
//     if (err) {
//       return console.log("Ошибка закрытия socket io: " + err.message);
//     }
//     console.log("Socket io выключен");
//   });

//   db.end(function (err) {
//     if (err) {
//       return console.log("Ошибка: " + err.message);
//     }
//     console.log("Подключение к базе данных закрыто");
//   });
// });
