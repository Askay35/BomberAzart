import axios from "axios";
import config from "../../config";

const state = function () {
  return {
    token: null,
    name: null,
    email: null,
    is_auth: false,
    money: 0.0,
  };
};

const mutations = {
  editUser(state, user) {
    for (let key in user) {
      if (key == "money") {
        sessionStorage.setItem(key, user[key].toFixed(2));
      } else {
        sessionStorage.setItem(key, user[key]);
      }
      state[key] = user[key];
    }
  },
  logout(state) {
    state.name = null;
    state.token = null;
    state.email = null;
    state.is_auth = false;
    state.money = 0.0;
    sessionStorage.clear();
  },
};

const getters = {
  isAuth(state) {
    return state.is_auth;
  },
};

const actions = {
  login({ commit }, loginData) {
    return axios.post(config.PHP_HOST + "/login", loginData).then((resp) => {
      if (resp.data.success) {
        commit("editUser", {
          email: loginData.email,
          token: resp.data.data.token,
          name: resp.data.data.name,
          money: resp.data.data.money,
          is_auth: true,
        });
        return true;
      } else {
        return resp.data.errors;
      }
    });
  },
  editSettings({ commit, state }, settingsData) {
    delete settingsData.new_password_confirm;
    if (settingsData.new_password == "") {
      delete settingsData.current_password;
    }
    if (settingsData.email == state.email) {
      delete settingsData.email;
    }
    for (const key in settingsData) {
      if (settingsData[key] == "") {
        delete settingsData[key];
      }
    }
    return axios
      .post(config.PHP_HOST + "/user/edit", settingsData, {
        params: {
          token: state.token,
        },
      })
      .then((resp) => {
        if (resp.data.success) {
          commit("editUser", {
            email: settingsData.email,
            name: settingsData.name,
          });
          return true;
        } else {
          return resp.data.errors;
        }
      });
  },
  logout({ commit }) {
    commit("logout");
  },
  register({ commit }, regData) {
    return axios
      .post(config.PHP_HOST + "/register", {
        email: regData.email,
        password: regData.password,
      })
      .then((resp) => {
        if (resp.data.success) {
          commit("editUser", {
            email: regData.email,
            token: resp.data.data.token,
            name: resp.data.data.name,
          });
          return true;
        } else {
          return resp.data.errors;
        }
      });
  },
  updateUserInfo({ commit, state }) {
    return axios
      .get(config.PHP_HOST + "/user", {
        params: {
          token: state.token,
        },
      })
      .then((resp) => {
        if (resp.data.success) {
          commit("editUser", resp.data.data);
        }
      });
  },
  updateMoney({ commit, state }) {
    return axios
      .get(config.PHP_HOST + "/user", {
        params: {
          token: state.token,
          fields: ["money"],
        },
      })
      .then((resp) => {
        if (resp.data.success) {
          commit("editUser", resp.data.data);
        }
      });
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
