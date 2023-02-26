<template>
  <div id="game-wrap">
    <Modal id="last-coefs-modal" ref="last_coefs_modal" :backdrop="false">
      <template #header>
        <div class="d-flex align-items-center">
          <img src="@/assets/images/time2.svg" />
          <div id="last-coefs-title">История раундов</div>
        </div>
        <img
          src="@/assets/images/close_coefs.svg"
          @click="$refs.last_coefs_modal.shown = false"
          role="button"
        />
      </template>
      <template #body>
        <Coef v-for="round in $store.state.game.rounds" :coef="round" />
      </template>
    </Modal>
    <div id="game-coefs">
      <div
        @wheel="coefsWheel"
        @mousedown="coefsMDown"
        @mousemove="coefsMMove"
        @mouseup="mpos.state = false"
        id="game-coefs-inner"
        class="hide-scroll prevent-select-all"
      >
        <Coef v-for="round in $store.state.game.rounds" :coef="round" />
      </div>
      <div class="overflow-shadow"></div>
      <img
        role="button"
        @click="$refs.last_coefs_modal.shown = true"
        id="show-last-coefs"
        src="@/assets/images/time_coefs.svg"
      />
    </div>

    <div id="current-coef__wrap" class="prevent-select-all">
      <div
        id="current-coef"
        :class="{
          'round-start': $store.getters.roundStart,
          'round-wait': $store.getters.roundWait,
        }"
      >
        <div id="current-coef-inner" v-if="!$store.getters.roundEnd">
          <div id="current-coef-val">
            x{{ $store.state.game.current_coef.toFixed(2) }}
          </div>
          <div id="current-coef-text" v-if="$store.getters.roundWait">
            Улетел!
          </div>
        </div>
        <div class="round-wait" v-if="$store.getters.roundEnd">
          <svg
            class="circle-loader"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="200px"
            height="200px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <circle
              cx="50"
              cy="50"
              r="30"
              stroke="#2d011e"
              stroke-width="10"
              fill="none"
            ></circle>
            <circle
              cx="50"
              cy="50"
              r="30"
              stroke="#ff00a8"
              stroke-width="8"
              stroke-linecap="round"
              fill="none"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="1s"
                values="0 50 50;180 50 50;720 50 50"
                keyTimes="0;0.5;1"
              ></animateTransform>
              <animate
                attributeName="stroke-dasharray"
                repeatCount="indefinite"
                dur="1s"
                values="18.84955592153876 169.64600329384882;94.2477796076938 94.24777960769377;18.84955592153876 169.64600329384882"
                keyTimes="0;0.5;1"
              ></animate>
            </circle>
          </svg>
          <div class="d-flex flex-column" id="round-wait-wrap">
            <div id="round-wait-text">
              Ожидание <br />
              следующего раунда
            </div>
            <progress-bar
              style="width: 90%; max-width: 350px"
              :val="$store.state.game.round_wait_val"
              :max="$store.state.game.round_wait_max"
            ></progress-bar>
          </div>
        </div>
      </div>
    </div>
    <div id="game-controls">
      <BetControl />
      <BetControl />
    </div>
  </div>
</template>

<script>
import Coef from "../UI/Coef.vue";
import Modal from "../UI/Modal.vue";
import ProgressBar from "../UI/ProgressBar.vue";
import BetControl from "./UI/BetControl.vue";

export default {
  data() {
    return {
      mpos: { left: 0, x: 0, state: false },
    };
  },
  components: { BetControl, Coef, Modal, ProgressBar },
  methods: {
    coefsWheel(e) {
      e.target.scrollLeft += e.deltaY;
    },
    coefsMDown(e) {
      this.mpos = { left: e.target.scrollLeft, x: e.clientX, state: true };
    },
    coefsMUp(e) {
      this.mpos.state = true;
    },
    coefsMMove(e) {
      if (this.mpos.state) {
        e.target.scrollLeft = this.mpos.left - (e.clientX - this.mpos.x);
      }
    },
  },
  mounted() {
    window.onscroll = () => {
      if (window.scrollY > 50) {
        document.getElementById("game-wrap").classList.add("active");
      } else {
        document.getElementById("game-wrap").classList.remove("active");
      }
    };
  },
};
</script>

<style lang="scss">
@import url("/src/assets/css/base.css");

#current-coef-text {
  font-size: 82px !important;
  line-height: 1;
}
#current-coef-val {
  line-height: 1;
  font-size: 96px;
  transition: all 0.2s ease;
}

#round-wait-text {
  margin-bottom: 30px;
}

.round-wait {
  font-size: 36px !important;
  width: 90%;
}

#last-coefs-title {
  font-weight: 800;
  font-size: 20px;
  letter-spacing: 0.08em;
  margin-left: 8px;
  text-transform: uppercase;
  color: #fff;
  margin-top: 1px;
}

#last-coefs-modal {
  width: 100%;
  position: absolute;
  left: 0;
  transform: none;
  top: 0%;
  height: max-content;
  .modal-dialog {
    margin: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .modal-header {
    border-radius: 0;
    justify-content: space-between;
    align-items: center;
    height: 58px;
    padding: 0 10px 0 20px !important;
    background: #2d011e;
    outline: 1px solid #2d011e;
  }
  .modal-body {
    border-radius: 0;
    flex-wrap: wrap;
    gap: 10px 5px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border: 1px solid #4e0033;
    background: #4e0033;
  }
}
#game-wrap {
  flex: 1;
  overflow: hidden;
  border-right: 1px solid var(--border-color);
  position: relative;
  display: flex;
  flex-direction: column;
}
#game-controls {
  padding: 10px 15px;
  display: flex;
}
#show-last-coefs {
  position: absolute;
  right: 10px;
  top: 50%;
  z-index: 2;
  transform: translateY(-50%);
}
#game-coefs-inner {
  display: flex;
  scroll-behavior: smooth;
  overflow: scroll;
  height: 100%;
  padding: 15px 10px;
  gap: 5px;
  * {
    pointer-events: none;
  }
}
#game-coefs {
  width: 100%;
  height: 58px;
  overflow: hidden;
  position: relative;
  .overflow-shadow {
    background: linear-gradient(90deg, rgba(19, 0, 13, 0.04) 0%, #13000d 100%);
    right: 0;
    top: 0;
    width: 320px;
    height: 100%;
  }
}

#current-coef__wrap {
  display: flex;
  flex: 1;
  justify-content: center;
  border-bottom: 1px solid var(--border-color);
  border-top: 1px solid var(--border-color);
}

#current-coef {
  width: 100%;
  justify-content: center;
  display: flex;
  margin-top: 15%;
  font-weight: 800;
  font-size: 96px;

  &.round-start,
  &.round-wait {
    margin-top: 0;
    margin-bottom: 5%;
    align-items: center;
  }
  &.round-wait {
    #current-coef-val {
      font-size: 56px;
      margin-bottom: 10px;
    }
  }
  & > div {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  color: var(--pink-color);

  text-shadow: 0px 0px 10px var(--pink-color);
}
</style>
