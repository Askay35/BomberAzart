import config from "../../config";
import axios from "axios";

const state = function () {
  return {
    ROUND_STATES: {
      ROUND_START: 1,
      ROUND_WAIT: 2,
      ROUND_END: 3,
    },
    bets: {
      current: [],
      prev: [],
      my: [],
    },
    round_state: 3,
    round_wait_val: 100,
    round_wait_max: 100,
    chat: true,
    current_coef: 1.0,
    users_online: 0,
    rounds: [],
    messages: [],
  };
};

const mutations = {
  toggleChatState(state, val) {
    state.chat = val;
  },
  setRoundState(state, val) {
    state.round_state = val;
  },
  setUsersOnline(state, count) {
    state.users_online = count;
  },
  setCurrentCoef(state, val) {
    state.current_coef = val;
  },
  pushMessages(state, messages) {
    if (Array.isArray(messages)) {
      state.messages.push(...messages);
    } else if (messages !== undefined) {
      state.messages.push(messages);
    }
  },
  setUserBets(state, bets) {
    state.bets.my = bets;
  },
  setCurrentBets(state, bets) {
    state.bets.current = bets;
  },
  resetCurrentBets(state) {
    state.bets.prev = JSON.parse(JSON.stringify(state.bets.current));
    state.bets.current = [];
  },
  pushRounds(state, rounds) {
    if (Array.isArray(rounds)) {
      state.rounds.unshift(...rounds);
    } else if (rounds !== undefined) {
      state.rounds.unshift(rounds);
    }
    if (state.rounds.length > 25) {
      state.rounds = state.rounds.slice(
        state.rounds.length - 10,
        state.rounds.length
      );
    }
  },
  setRoundWaitVal(state, seconds) {
    state.round_wait_val = seconds;
  },
  setRoundWaitMax(state, max) {
    state.round_wait_max = max;
  },
};

const getters = {
  currentBetsCount(state) {
    return state.bets.current.length;
  },
  userBetsCount(state) {
    return state.bets.my.length;
  },
  prevBetsCount(state) {
    return state.bets.prev.length;
  },
  roundEnd(state) {
    return state.round_state == state.ROUND_STATES.ROUND_END;
  },
  roundStart(state) {
    return state.round_state == state.ROUND_STATES.ROUND_START;
  },
  roundWait(state) {
    return state.round_state == state.ROUND_STATES.ROUND_WAIT;
  },
};

const actions = {
  //message = {text:'' or bet_id:123}
  sendMessage({ commit, state, rootState }, message) {
    return axios.post(config.NODE_HOST + "/message/add", message, {
      params: {
        token: rootState.user.token,
      },
    }).then(resp=>{
      console.log(resp.data);
    });
  },
  updateUserBets({ commit, state, rootState }) {
    return axios
      .get(config.NODE_HOST + "/user/bets", {
        params: {
          token: rootState.user.token,
        },
      })
      .then((res) => {
        commit("setUserBets", res.data.data.bets);
      });
  },
  takeBet({ commit, state, rootState }, bet_id) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          config.NODE_HOST + "/bet/take",
          {
            bet_id:bet_id
          },
          {
            params: {
              token: rootState.user.token,
            },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addBet({ commit, state, rootState }, bet_size) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          config.NODE_HOST + "/bet/add",
          {
            bet_size: bet_size,
          },
          {
            params: {
              token: rootState.user.token,
            },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
