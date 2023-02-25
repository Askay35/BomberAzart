import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/main.css";
import store from "./store/index";
import axios from "axios";

const app = createApp(App);

let socket = io("ws://127.0.0.1:3000");

if (sessionStorage.getItem("token") !== null) {
  store.commit("editUser", {
    token: sessionStorage.getItem("token"),
    name: sessionStorage.getItem("name"),
    email: sessionStorage.getItem("email"),
    is_auth: true,
    money: parseFloat(sessionStorage.getItem("money")),
  });
  store.dispatch("updateUserBets");
}

socket.on("game init", (game_config) => {
  store.commit("pushRounds", game_config.rounds);
  store.commit("setRoundWaitMax", game_config.round_wait_max);
  store.commit("setRoundState", game_config.round_state);
  store.commit("pushMessages", game_config.messages);
});

socket.on("chat message", (message) => {
  store.commit("pushMessages", message);
});

socket.on("update current bets", (bets) => {
  console.log(bets);
  store.commit("setCurrentBets", bets);
});

socket.on("update money", () => {
  store.dispatch("updateMoney");
});

socket.on("round wait val", (val) => {
  store.commit("setRoundWaitVal", val);
});

socket.on("round state", (state) => {
  store.commit("setRoundState", state);
  if (state == store.state.game.ROUND_STATES.ROUND_WAIT) {
    store.commit("resetCurrentBets");
  } else if (state == store.state.game.ROUND_STATES.ROUND_END) {
    store.dispatch("updateUserBets");
  }
});

socket.on("add round", (rounds) => {
  if (typeof rounds !== "number") {
    store.commit("pushRounds", rounds.coef);
  } else {
    store.commit("pushRounds", rounds);
  }
});

socket.on("coef changed", (new_coef) => {
  store.commit("setCurrentCoef", new_coef);
});

//get online users
axios.get("http://127.0.0.1:8000/api/users/online").then((users_online) => {
  store.commit("setUsersOnline", users_online.data);
});
//get online users every 10 seconds
setInterval(async () => {
  await axios
    .get("http://127.0.0.1:8000/api/users/online")
    .then((users_online) => {
      store.commit("setUsersOnline", users_online.data);
    });
}, 10000);

app.use(store);

app.mount("#app");
