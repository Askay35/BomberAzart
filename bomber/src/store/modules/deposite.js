import axios from "axios";
import config from "../../config";

const state = function () {
  return {
  };
};

const mutations = {
  editUser(state, user) {
  },
};

const getters = {
  isAuth(state) {
  },
};

const actions = {
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
};

export default {
  state,
  mutations,
  getters,
  actions,
};
