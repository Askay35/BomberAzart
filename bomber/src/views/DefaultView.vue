<template>
  <header-desktop></header-desktop>
  <main id="bomber-main">
    <Chat />
    <Game />
    <BetsPanel>
      <Tab :active="true" name="Все">
        <Bet
          v-if="$store.state.game.show_prev_round"
          v-for="bet in $store.state.game.bets.prev"
          :bet="bet"
        />
        <Bet
          v-else
          v-for="bet in $store.state.game.bets.current"
          :share="false"
          :bet="bet"
        />
      </Tab>
      <Tab name="Мои">
        <Bet
          v-for="bet in $store.state.game.bets.my"
          :bet="bet"
        />
      </Tab>
      <Tab name="Топ">
        <div class="bet-info__item win">
          <div class="bet-info__item-name">Abuba</div>
          <div class="bet-info__item-size">10 ₽</div>
          <coef :coef="1.5"></coef>
          <div class="bet-info__item-win">15.00 ₽</div>
        </div>
        <div class="bet-info__item">
          <div class="bet-info__item-name">Abuba</div>
          <div class="bet-info__item-size">10 ₽</div>
          <div>-</div>
          <div class="bet-info__item-win">-</div>
        </div>
      </Tab>
    </BetsPanel>
  </main>
  <div
    v-if="overlay_shown"
    @click="hideModal(current_modal)"
    id="modal-overlay"
  ></div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Chat from "../components/Chat/Chat.vue";
import BetsPanel from "../components/Game/BetsPanel.vue";
import Game from "../components/Game/Game.vue";
import HeaderDesktop from "../components/HeaderDesktop.vue";
import Coef from "../components/UI/Coef.vue";
import Tab from "../components/UI/Tab.vue";
import Bet from "../components/Game/UI/Bet.vue";

export default {
  data() {
    return {
      overlay_shown: false,
      current_modal: null,
    };
  },
  components: { Chat, BetsPanel, Game, HeaderDesktop, Coef, Tab, Bet },
  provide() {
    return {
      login_modal: ref(null),
      showModal: this.showModal,
      hideModal: this.hideModal,
      toggleModal: (modal) => {
        this.current_modal.shown = false;
        this.current_modal = modal;
        if (modal.overlay) {
          this.overlay_shown = true;
        } else {
          this.overlay_shown = false;
        }
        modal.shown = true;
      },
      showPassword: (target, id) => {
        let el = document.getElementById(id);
        if (el.getAttribute("type") == "text") {
          target.classList.remove("active");
          el.setAttribute("type", "password");
        } else {
          el.setAttribute("type", "text");
          target.classList.add("active");
        }
      },
    };
  },
  methods: {
    showModal(modal) {
      this.current_modal = modal;
      if (modal.overlay) {
        this.overlay_shown = true;
      }
      modal.shown = true;
    },
    hideModal(modal) {
      if (modal.overlay) {
        this.overlay_shown = false;
      }
      modal.shown = false;
    },
  },
};
</script>

<style lang="scss">
@import url("/src/assets/css/base.css");

#bomber-main {
  display: flex;
  height: calc(100vh - 70px);
  widows: 100%;
}

#bets-wrap {
  width: 320px;
}
</style>
