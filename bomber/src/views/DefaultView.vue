<template>
  <header-desktop></header-desktop>
  <main id="bomber-main">
    <Chat />
    <Game />
    <BetsPanel />
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

export default {
  data() {
    return {
      overlay_shown: false,
      current_modal: null,
    };
  },
  components: { Chat, BetsPanel, Game, HeaderDesktop },
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
