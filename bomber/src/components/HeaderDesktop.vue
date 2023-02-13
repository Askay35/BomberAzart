<template>
  <header>
    <DefaultModal id="feedback-modal" ref="feedback_modal">
      <template #header> Позвонить в службу поддержки </template>
      <template #body>
        <div class="modal-contact-item">
          <div>Телеграм:</div>
          <div>@bombergametg</div>
        </div>
        <div class="modal-contact-item">
          <div>Телефон:</div>
          <div>8 (988) 830 36-75</div>
        </div>
      </template>
    </DefaultModal>
    <DefaultModal id="howtoplay_modal" ref="howtoplay_modal">
      <template #header>Как играть?</template>
      <template #subheader>
        <div class="modal-subheader">
          Bomber – игра где ты можешь выиграть в несколько раз больше буквально
          за несколько секунд!
        </div>
      </template>
      <template #body>
        <div
          @scroll="howtoplayScroll"
          class="hide-scroll"
          id="howtoplay-content"
          :style="
            'mask-image: linear-gradient(to top, transparent 0%, black ' +
            howtoplay_scroll.toString() +
            '%)'
          "
        >
          <p>
            <span style="white-space: pre-wrap"
              >Как играть и какие правила?<br
            /></span>
          </p>
          <ul>
            <li>
              <span style="white-space: pre-wrap"
                >Чтобы сделать ставку, нужно выбрать желаемую сумму и нажать на
                кнопку &laquo;Ставка&raquo;.</span
              >
            </li>
            <li>
              <span style="white-space: pre-wrap"
                >При этом нет нужды ограничивать себя только одной ставкой за
                раз. Вы можете делать две ставки одновременно, используя как
                левую, так и правую панель ставки.</span
              >
            </li>
            <li>
              <span style="white-space: pre-wrap"
                >Чтобы вывести выигрыш, нужно нажать кнопку &laquo;Вывод&raquo;.
                Ваш выигрыш складывается из совокупности вашей ставки,
                умноженной на множитель кэшаута.</span
              >
            </li>
            <li>
              <span style="white-space: pre-wrap"
                >Если не сделать Вывод до того, как Счастливчик Джо улетит, то
                ставка будет потеряна.</span
              >
            </li>
          </ul>
          <p>
            <span style="white-space: pre-wrap">Автоставка и Автовывод</span>
          </p>
          <ul>
            <li>
              <span style="white-space: pre-wrap"
                >Автоматическую Ставку можно активировать на панели любой
                ставки, если поставить галочку в строчке
                &laquo;Автоставка&raquo;. В таком случае ставки делаются
                автоматически. Тем не менее чтобы вывести выигрыш все равно
                необходимо нажимать кнопку &laquo;Вывод&raquo; для каждого
                раунда.</span
              >
            </li>
            <li>
              <span style="white-space: pre-wrap"
                >Если желаете полностью автоматизировать игру, то имеется
                возможность и настройки автоматического вывода выигрыша. Для
                этого необходимо активировать на панели ставки
                &laquo;Автовывод&raquo;. Тогда средства будут автоматически
                выводиться при достижении заданного вами коэффициента.</span
              >
            </li>
          </ul>
          <p>
            <span style="white-space: pre-wrap">Интерфейс нашей игры</span>
          </p>
          <ul>
            <li>
              <span style="white-space: pre-wrap"
                >Слева находится панель &laquo;Лайв Ставки&raquo; На ней
                отображаются ставки, которые были сделаны в текущем
                раунде.</span
              >
            </li>
            <li>
              <span style="white-space: pre-wrap"
                >Панели &laquo;Мои ставки&raquo; содержит информацию о сделанных
                ставках и выводе средств за все время игры.</span
              >
            </li>
            <li>
              <span style="white-space: pre-wrap"
                >Панель &laquo;Топ&raquo; содержит игровую статистику. Тут можно
                изучить выигрыши других игроков как по сумме, так и по
                коэффициенту обналичивания. Так можно увидеть самые большие
                коэффициенты в раунде.</span
              >
            </li>
            <li>
              <span style="white-space: pre-wrap"
                >Справа находится панель чата. Он предназначен для общения с
                другими игроками</span
              >
            </li>
          </ul>
        </div>
      </template>
    </DefaultModal>
    <DefaultModal id="login_modal" ref="login_modal">
      <template #header> Вход </template>
      <template #body>
        <input
          type="email"
          autocomplete="nope"
          style="margin-bottom: 10px"
          v-model="loginData.email"
          :class="{ 'error-input': loginErrors.email != '' }"
          :placeholder="loginErrors.email == '' ? 'E-mail' : loginErrors.email"
          class="text-input"
        />
        <div class="position-relative w-100" style="margin-bottom: 10px">
          <input
            type="password"
            autocomplete="nope"
            id="login-password-input"
            :class="{ 'error-input': loginErrors.password != '' }"
            :placeholder="
              loginErrors.password == '' ? 'Пароль' : loginErrors.password
            "
            v-model="loginData.password"
            class="text-input w-100"
          />
          <ShowPassword
            @click="showPassword($event.target, 'login-password-input')"
            class="show-password"
          />
        </div>
        <div class="d-flex justify-content-between" style="margin-bottom: 20px">
          <div class="d-flex" style="gap: 10px">
            <img src="@/assets/images/vk.svg" role="button" />
            <img src="@/assets/images/google.svg" role="button" />
            <img src="@/assets/images/yandex.svg" role="button" />
          </div>
          <div
            role="button"
            style="height: max-content; font-weight: 500; font-size: 12px"
          >
            Забыли пароль?
          </div>
        </div>
        <div
          role="button"
          class="modal-button pink-button"
          style="margin-bottom: 10px"
          @click="login"
        >
          Войти
        </div>
        <div
          role="button"
          @click="toggleModal($refs.reg_modal)"
          class="modal-button dark-button"
        >
          Регистрация
        </div>
      </template>
    </DefaultModal>
    <DefaultModal id="reg_modal" ref="reg_modal">
      <template #header> Регистрация </template>
      <template #body>
        <input
          type="email"
          autocomplete="nope"
          style="margin-bottom: 10px"
          v-model="regData.email"
          :class="{ 'error-input': regErrors.email != '' }"
          :placeholder="regErrors.email == '' ? 'E-mail' : regErrors.email"
          class="text-input"
        />
        <div class="position-relative w-100" style="margin-bottom: 10px">
          <input
            type="password"
            autocomplete="nope"
            id="reg-password-input"
            :class="{ 'error-input': regErrors.password != '' }"
            :placeholder="
              regErrors.password == '' ? 'Пароль' : regErrors.password
            "
            v-model="regData.password"
            class="text-input w-100 password-input"
          />
          <ShowPassword
            @click="showPassword($event.target, 'reg-password-input')"
            class="show-password"
          />
        </div>
        <div class="position-relative w-100" style="margin-bottom: 10px">
          <input
            type="password"
            autocomplete="nope"
            id="reg-password-repeat-input"
            :class="{ 'error-input': regErrors.password_repeat != '' }"
            :placeholder="
              regErrors.password_repeat == ''
                ? 'Повторите пароль'
                : regErrors.password_repeat
            "
            v-model="regData.password_repeat"
            class="text-input w-100 password-input"
          />
          <ShowPassword
            @click="showPassword($event.target, 'reg-password-repeat-input')"
            class="show-password"
          />
        </div>
        <div class="d-flex justify-content-between" style="margin-bottom: 20px">
          <div class="d-flex" style="gap: 10px">
            <img src="@/assets/images/vk.svg" role="button" />
            <img src="@/assets/images/google.svg" role="button" />
            <img src="@/assets/images/yandex.svg" role="button" />
          </div>
          <div
            role="button"
            @click="toggleModal($refs.login_modal)"
            style="height: max-content; font-weight: 500; font-size: 12px"
          >
            Уже есть аккаунт?
          </div>
        </div>
        <div
          role="button"
          class="modal-button pink-button"
          style="margin-bottom: 10px"
          @click="register"
        >
          Зарегистрироваться
        </div>
      </template>
    </DefaultModal>
    <DefaultModal id="settings_modal" ref="settings_modal">
      <template #header>Настройки</template>
      <template #body>
        <input
          type="text"
          v-model="settingsData.name"
          :class="{ 'error-input': settingsErrors.name != '' }"
          :placeholder="
            settingsErrors.name == '' ? 'Имя пользователя' : settingsErrors.name
          "
          autocomplete="nope"
          style="margin-bottom: 10px"
          class="text-input"
        />
        <div class="d-flex" style="gap: 10px">
          <input
            type="email"
            autocomplete="nope"
            style="margin-bottom: 10px"
            v-model="settingsData.email"
            :readonly="!settingsState.emailChange"
            :class="{ 'error-input': settingsErrors.email != '' }"
            :placeholder="
              settingsErrors.email == '' ? 'E-mail' : settingsErrors.email
            "
            class="text-input"
          />
          <div
            v-if="!settingsState.emailChange"
            @click="
              settingsState.emailChange = true;
              settingsData.email = '';
            "
            class="modal-button pink-button"
          >
            Изменить
          </div>
          <div
            v-else
            @click="settingsState.emailChange = false"
            class="modal-button pink-button"
          >
            Х
          </div>
        </div>
        <div class="d-flex" style="margin-bottom: 10px; gap: 10px">
          <div class="position-relative w-100">
            <input
              type="password"
              autocomplete="nope"
              v-model="settingsData.current_password"
              :readonly="!settingsState.passwordChange"
              :class="{ 'error-input': settingsErrors.current_password != '' }"
              :placeholder="
                settingsErrors.current_password == ''
                  ? 'Текущий пароль'
                  : settingsErrors.current_password
              "
              id="settings-current-password"
              class="text-input"
            />
            <ShowPassword
              v-if="settingsState.passwordChange"
              @click="showPassword($event.target, 'settings-current-password')"
              class="show-password"
            />
          </div>
          <div
            v-if="!settingsState.passwordChange"
            @click="
              settingsState.passwordChange = true;
              settingsData.current_password = '';
            "
            class="modal-button pink-button"
          >
            Изменить
          </div>
          <div
            v-else
            @click="
              settingsState.passwordChange = false;
              settingsData.new_password = '';
              settingsData.new_password_confirm = '';
            "
            class="modal-button pink-button"
          >
            Х
          </div>
        </div>

        <div
          class="position-relative w-100"
          style="margin-bottom: 10px"
          v-if="settingsState.passwordChange"
        >
          <input
            type="password"
            autocomplete="nope"
            v-model="settingsData.new_password"
            :class="{ 'error-input': settingsErrors.new_password != '' }"
            :placeholder="
              settingsErrors.new_password == ''
                ? 'Новый пароль'
                : settingsErrors.new_password
            "
            id="settings-new-password"
            class="text-input"
          />
          <ShowPassword
            v-if="settingsState.passwordChange"
            @click="showPassword($event.target, 'settings-new-password')"
            class="show-password"
          />
        </div>

        <div
          class="position-relative w-100"
          style="margin-bottom: 20px"
          v-if="settingsState.passwordChange"
        >
          <input
            type="password"
            autocomplete="nope"
            v-model="settingsData.new_password_confirm"
            :class="{
              'error-input': settingsErrors.new_password_confirm != '',
            }"
            :placeholder="
              settingsErrors.new_password_confirm == ''
                ? 'Повторите пароль'
                : settingsErrors.new_password_confirm
            "
            id="settings-new-password-confirm"
            class="text-input"
          />
          <ShowPassword
            v-if="settingsState.passwordChange"
            @click="
              showPassword($event.target, 'settings-new-password-confirm')
            "
            class="show-password"
          />
        </div>
        <div
          role="button"
          style="height: 45px"
          class="modal-button pink-button"
          @click="editSettings"
        >
          Сохранить
        </div>
      </template>
    </DefaultModal>
    <img id="header-logo" src="@/assets/images/logo.svg" />
    <div
      class="v-dropdown"
      v-if="$store.getters.isAuth"
      id="header-dropdown-menu"
    >
      <div class="v-dropdown-item" @click="$store.dispatch('updateUserInfo')">
        Пополнить
      </div>
      <div class="v-dropdown-item">Вывести</div>
      <div class="v-dropdown-item">Детализация</div>
      <div class="v-dropdown-item">История ставок</div>
      <div
        class="v-dropdown-item"
        @click="
          this.innerText = 'Сохранить';
          updateSettingsData();
          showModal($refs.settings_modal);
        "
      >
        Настройки
      </div>
      <div class="v-dropdown-item" @click="$store.dispatch('logout')">
        Выйти
      </div>
    </div>
    <div id="header-right">
      <div id="header-right-wrap">
        <div
          id="header-feedback"
          @click="showModal($refs.feedback_modal)"
          role="button"
          class="button"
        >
          <div class="me-2">Обратная связь</div>
          <img src="@/assets/images/feedback.svg" />
        </div>
        <div id="header-controls" class="button">
          <div id="sound-btn" role="button" class="header-circle">
            <img src="@/assets/images/sound.svg" />
          </div>
          <img
            src="@/assets/images/divider.svg"
            style="height: 21px; margin: 0 10px"
          />
          <div
            id="about-btn"
            role="button"
            @click="showModal($refs.howtoplay_modal)"
            class="header-circle"
          >
            <img src="@/assets/images/howtoplay.svg" />
          </div>
        </div>
        <div
          v-if="!$store.getters.isAuth"
          id="header-login"
          @click="showModal($refs.login_modal)"
          role="button"
          class="button pink-shadow"
        >
          Войти
        </div>
        <div v-else id="header-profile-wrap" class="button">
          <div id="header-current-money">
            {{ $store.state.user.money.toFixed(2) }} ₽
          </div>
          <img
            src="@/assets/images/divider.svg"
            style="height: 21px; margin: 0 10px"
          />
          <div
            id="header-profile-btn"
            onclick="document.getElementById('header-dropdown-menu').classList.toggle('active')"
            role="button"
            style="width:29.6px"
            class="header-circle"
          >
            <img 
            style="width:13px"
            src="@/assets/images/person.svg" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import ShowPassword from "./icons/ShowPassword.vue";
import DefaultModal from "./UI/DefaultModal.vue";

export default {
  components: { DefaultModal, ShowPassword },
  inject: ["showModal", "login_modal","showPassword", "hideModal", "toggleModal"],
  data() {
    return {
      settingsData: {
        name: "",
        email: "",
        current_password: "00000000",
        new_password: "",
        new_password_confirm: "",
      },
      settingsState: {
        emailChange: false,
        passwordChange: false,
      },
      settingsErrors: {
        name: "",
        email: "",
        current_password: "",
        new_password: "",
        new_password_confirm: "",
      },
      loginData: {
        email: "",
        password: "",
      },
      loginErrors: {
        error: false,
        email: "",
        password: "",
      },
      regErrors: {
        error: false,
        email: "",
        password: "",
        password_repeat: "",
      },
      regData: {
        email: "",
        password: "",
        password_repeat: "",
      },
      howtoplay_scroll: 50,
    };
  },
  mounted(){
    this.login_modal.value = this.$refs.login_modal;
  },
  methods: {
    editSettings(e) {
      if (
        this.settingsData.new_password != "" &&
        this.settingsData.new_password != this.settingsData.current_password
      ) {
        this.settingsErrors.new_password = "Пароли не совпадают!";
        this.settingsErrors.new_password_confirm = "Пароли не совпадают!";
        this.settingsData.new_password = "";
        this.settingsData.new_password_confirm = "";
        return;
      }
      e.target.setAttribute("disabled", "");
      e.target.innerText = "Сохранение...";
      this.$store
        .dispatch("editSettings", JSON.parse(JSON.stringify(this.settingsData)))
        .then((resp) => {
          if (resp === true) {
            this.settingsData.current_password = "00000000";
            e.target.innerText = "Данные изменены!";
          } else {
            for (let key in resp) {
              this.settingsData[key] = "";
              this.settingsErrors[key] = resp[key];
            }
            if (this.settingsErrors.new_password != "") {
              this.settingsErrors.new_password_confirm =
                this.settingsErrors.new_password;
              this.settingsData.new_password_confirm = "";
            }
            e.target.innerText = "Cохранить";
          }
          e.target.removeAttribute("disabled");
        });
    },
    updateSettingsData() {
      this.$store.dispatch("updateUserInfo").then(() => {
        this.settingsData.email = this.$store.state.user.email;
        this.settingsData.name = this.$store.state.user.name;
        this.settingsData.current_password = "00000000";
      });
    },
    validateReg() {
      this.regErrors.error = false;
      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          this.regData.email
        )
      ) {
        this.regData.email = "";
        this.regErrors.email = "Электронная почта не валидна!";
        this.regErrors.error = true;
      }
      if (
        this.regData.password.length < 8 ||
        this.regData.password.length > 32
      ) {
        this.regErrors.password =
          "Пароль должен быть длинной от 8 до 32 символов!";
        this.regErrors.error = true;
      }
      if (this.regData.password != this.regData.password_repeat) {
        this.regErrors.password_repeat = "Пароли не совпадают";
        this.regErrors.error = true;
      }
      if (this.regErrors.password != "") {
        this.regData.password = "";
        this.regData.password_repeat = "";
      }
      if (this.regErrors.password_repeat != "") {
        this.regData.password_repeat = "";
      }
    },
    validateLogin() {
      this.loginErrors.error = false;
      if (this.loginData.email == "") {
        this.loginErrors.email = "Введите электронную почту!";
        this.loginErrors.error = true;
      }
      if (this.loginData.password == "") {
        this.loginErrors.password = "Введите пароль!";
        this.loginErrors.error = true;
      }
    },
    register(e) {
      e.target.setAttribute("disabled", "");
      e.target.innerText = "Регистрация...";
      this.validateReg();
      if (!this.regErrors.error) {
        this.$store.dispatch("register", this.regData).then((resp) => {
          if (resp === true) {
            this.$store
              .dispatch("login", {
                email: this.regData.email,
                password: this.regData.password,
              })
              .then(() => {
                this.$store.dispatch("setUserBets");
                e.target.removeAttribute("disabled");
                e.target.innerText = "Зарегистрироваться";
                this.hideModal(this.$refs.reg_modal);
                this.regErrors = {
                  error: false,
                  email: "",
                  password: "",
                  password_repeat: "",
                };
              });
          }
        });
      }
    },
    login(e) {
      e.target.setAttribute("disabled", "");
      e.target.innerText = "Вход...";
      this.validateLogin();
      if (!this.loginErrors.error) {
        this.$store.dispatch("login", this.loginData).then((resp) => {
          if (resp === true) {
            this.$store.dispatch("setUserBets");
            this.hideModal(this.$refs.login_modal);
          } else {
            if ("email" in resp) {
              this.loginErrors.email = resp.email;
              this.loginData.email = "";
              this.loginData.password = "";
              this.loginErrors.error = true;
            }
            if ("password" in resp) {
              this.loginErrors.password = resp.password;
              this.loginData.password = "";
              this.loginErrors.error = true;
            }
          }
        }).then(()=>{
          e.target.removeAttribute("disabled");
          e.target.innerText = "Войти";
        });
      }
    },
    howtoplayScroll(e) {
      e.target.onscroll = (e) => {
        this.howtoplay_scroll =
          50 -
          e.target.scrollTop /
            ((e.target.scrollHeight - e.target.clientHeight) / 100) /
            2;
      };
    },
  },
};
</script>

<style lang="scss">
@import url("/src/assets/css/base.css");

#settings_modal {
  width: 400px;
  .modal-dialog {
    width: 100%;
  }
  input {
    width: 100%;
  }
  .modal-body {
    flex-direction: column;
  }
  .modal-button {
    height: 35px;
    cursor: pointer;
    padding: 0 10px;
  }
}
#header-current-money {
  font-weight: 600;
  font-size: 12px;
}
#howtoplay_modal {
  width: 800px;
  .modal-body {
    overflow: hidden;
    height: 320px;
    & > div {
      overflow: scroll;
      flex-direction: column;
      font-weight: 300;
      p {
        font-size: 14px;
        font-weight: 700;
        line-height: 1;
        margin: 30px 0 10px;
      }
      p:first-child {
        margin: 0 0 10px;
      }
    }
  }
}
.modal-button {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  border-radius: 8px;
  height: 45px;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
}
#feedback-modal {
  .modal-dialog {
    width: 400px;
  }
  .modal-body {
    flex-direction: column;
    gap: 10px 0;
    font-size: 13px;
    padding: 15px 20px 20px !important;
  }
  .modal-contact-item {
    display: flex;
    align-items: center;
    &:first-child {
      margin-right: 11px;
    }
    div:first-child {
      font-weight: 400;
      margin-right: 5px;
    }
    div:last-child {
      font-weight: 700;
    }
  }
}
#login_modal,
#reg_modal {
  .modal-dialog {
    width: 400px;
  }
  .modal-body {
    flex-direction: column;
  }
}
header {
  width: 100%;
  position: relative;
  height: 70px;
  border-bottom: 1px solid var(--border-color);
  background: var(--app-bg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 15px;
}
#header-login {
  background: var(--pink-color);
  width: 90px;
  &:hover {
    background: #d1008c;
  }
}
#header-logo {
  height: 28px;
}
#header-right {
  background: var(--app-bg);
  z-index: 5;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
}
#header-dropdown-menu {
  right: 20px;
  top: -300%;
  &.active {
    top: 100%;
  }
}
#header-right-wrap {
  height: 42px;
  display: flex;
  gap: 10px;
  z-index: 5;
  & > div {
    height: 100%;
  }
}
#header-controls {
  cursor: default;
  padding: 10px;
}
.header-circle {
  display: flex;
  padding: 3px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--pink-color);
  img {
    width: 22px;
    height: 22px;
  }
}
</style>
