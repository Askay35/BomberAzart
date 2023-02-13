<template>
  <div class="bet-control">
    <div class="bet-control__header">
      <div class="bet-control__checkboxes" :disabled="bet_data.status">
        <Checkbox class="autobet-cb-wrap">Автоставка</Checkbox>
        <Checkbox class="autotake-cb-wrap">Автовывод</Checkbox>
      </div>
      <div class="bet-control__autotake-coef">
        <span>x</span>
        <input
          class="autotake-input transparent-input"
          value="2.00"
          :disabled="bet_data.status"
          @change.prevent="autocoefChange"
          @input.prevent="autocoefInput"
          type="text"
        />
        <div class="autotake-input-text">{{ bet_data.autocoef_str }}</div>
      </div>
    </div>
    <div class="bet-control__body">
      <div class="bet-control__btn-wrap">
        <div
          v-if="!bet_data.make_next && !bet_data.status"
          role="button"
          class="bet-control__btn prevent-select"
          @click="makeBet"
        >
          СТАВКА
        </div>
        <div
          v-else-if="$store.getters.roundEnd && bet_data.make_next"
          role="button"
          class="bet-control__btn prevent-select cancel-bet"
          @click="cancelBet"
        >
          ОТМЕНИТЬ
        </div>
        <div
          v-else-if="$store.getters.roundStart && bet_data.status"
          role="button"
          class="bet-control__btn prevent-select gold-gradient"
          @click="takeBet"
        >
          <div class="take-bet-win">
            {{
              ($store.state.game.current_coef * bet_data.bet_size).toFixed(0)
            }}
            ₽
          </div>
          <div>ЗАБРАТЬ</div>
        </div>
        <div
          v-else
          :disabled="$store.getters.roundStart"
          role="button"
          class="bet-control__btn prevent-select"
        >
          СТАВКА
        </div>
        <div
          class="bet-control__btn-underline"
          :class="{
            'gold-gradient': $store.getters.roundStart && bet_data.status,
            'cancel-bet': $store.getters.roundEnd && bet_data.make_next,
          }"
        ></div>
      </div>
      <div class="bet-control__size-wrap">
        <div class="bet-control__size">
          <div class="bet-control__size-top">
            <div
              :disabled="bet_data.status"
              class="bet-control__size-minus size-control-btn"
              @click="subtractBetSize(10)"
              role="button"
            >
              <img role="button" src="/src/assets/images/minus.svg" />
            </div>
            <div class="bet-control__size-input-wrap">
              <input
                ref="bet_size_input"
                :disabled="bet_data.status"
                @change.prevent="betChange"
                @input.prevent="betInput"
                type="text"
                class="transparent-input bet-size"
                :value="
                  bet_data.bet_size
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                "
              />
              <div ref="bet_size_text" class="bet-size__input-text"></div>
            </div>
            <div
              class="bet-control__size-plus size-control-btn"
              role="button"
              :disabled="bet_data.status"
              @click="addBetSize(10)"
            >
              <img role="button" src="/src/assets/images/plus.svg" />
            </div>
          </div>
          <div class="bet-control__size-bot prevent-select-all">
            <div class="add-bet-size-btn" role="button" @click="addBetSize(50)">
              <div role="button">+50</div>
            </div>
            <div
              class="add-bet-size-btn"
              role="button"
              :disabled="bet_data.status"
              @click="addBetSize(100)"
            >
              <div role="button">+100</div>
            </div>
            <div
              class="add-bet-size-btn"
              role="button"
              :disabled="bet_data.status"
              @click="addBetSize(200)"
            >
              <div role="button">+200</div>
            </div>
            <div
              class="add-bet-size-btn"
              role="button"
              :disabled="bet_data.status"
              @click="addBetSize(500)"
            >
              <div role="button">+500</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Checkbox from "../../UI/Checkbox.vue";

export default {
  components: { Checkbox },
  data() {
    return {
      bet_data: {
        autotake: false,
        autobet: false,
        autocoef: 2.0,
        autocoef_str: "2.00",
        bet_size: 100,
        status: false,
        make_next: false,
      },
    };
  },
  props: {
    bet_id: {
      required: true,
    },
  },
  created() {
    this.bet_data.bet_id = this.bet_id;
  },
  watch: {
    "$store.state.game.current_coef"(coef) {
      if (coef >= this.bet_data.autocoef) {
        this.takeBet();
      }
    },
    "$store.state.game.round_state"(new_state) {
      this.bet_data.status = false;
      if (
        new_state == this.$store.state.game.ROUND_STATES.ROUND_START &&
        (this.bet_data.make_next || this.bet_data.autobet)
      ) {
        this.bet_data.make_next = false;
        this.$store
          .dispatch("addBet", this.bet_data.bet_size)
          .then((resp) => {
            if (resp.data.success) {
              this.bet_data.status = true;
            } else {
              console.log("addBet fail", resp.data.error);
            }
          })
          .catch((e) => {
            console.log("addBet error", e);
          });
      }
    },
  },
  methods: {
    makeBet() {
      if (
        this.$store.state.game.round_state ==
        this.$store.state.game.ROUND_STATES.ROUND_END
      ) {
        this.bet_data.make_next = true;
      }
    },
    cancelBet() {
      this.bet_data.make_next = false;
    },
    takeBet() {
      if (this.bet_data.status) {
        this.$store.dispatch("takeBet", this.bet_data.bet_id).then((resp) => {
          if (resp.data.success) {
            this.$store.dispatch("updateMoney");
            this.$store.dispatch("updateUserBets");
          } else {
            console.log("takebet fail");
            console.log(resp.data.error);
          }
        });
      }
      this.bet_data.status = false;
    },
    subtractBetSize(val) {
      if (this.bet_data.bet_size - val >= 10) {
        this.bet_data.bet_size -= val;
        this.updateBetSize();
      }
    },
    addBetSize(val) {
      if (this.bet_data.bet_size + val <= 1000000) {
        this.bet_data.bet_size += val;
        this.updateBetSize();
      }
    },
    updateBetSize() {
      this.$refs.bet_size_input.value = this.bet_data.bet_size
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      this.$refs.bet_size_text.value = this.$refs.bet_size_input.value;
    },
    autocoefInput(e) {
      let new_val = e.target.value;
      let regex = /^[0-9]{0,3}(\.)?[0-9]{0,2}$/;
      if (new_val === "") {
        this.bet_data.autocoef_str = new_val;
      } else if (regex.test(new_val)) {
        let filtered_val = regex.exec(new_val)[0];
        let float_val = parseFloat(filtered_val);
        if (float_val > 0.0 && float_val <= 999.99) {
          this.bet_data.autocoef_str = filtered_val;
        }
      }
      e.target.value = this.bet_data.autocoef_str;
    },
    autocoefChange(e) {
      let new_val = parseFloat(this.bet_data.autocoef_str);
      if (this.bet_data.autocoef_str === "" || new_val <= 1.0) {
        this.bet_data.autocoef = 1.01;
      } else {
        this.bet_data.autocoef = parseFloat(this.bet_data.autocoef_str);
      }
      this.bet_data.autocoef_str = this.bet_data.autocoef.toFixed(2);
      e.target.value = this.bet_data.autocoef_str;
    },
    betInput(e) {
      let new_val = e.target.value.replaceAll(" ", "");
      let regex = /^[0-9]{0,7}$/;
      let bet_size_str = "";
      if (new_val === "") {
        bet_size_str = new_val;
      } else if (regex.test(new_val)) {
        let filtered_val = regex.exec(new_val)[0];
        let int_val = parseInt(filtered_val);
        if (int_val > 0) {
          if (int_val <= 1000000) {
            bet_size_str = filtered_val;
          } else {
            bet_size_str = "1 000 000";
          }
        }
      } else {
        bet_size_str = this.bet_data.bet_size.toString();
      }
      bet_size_str = bet_size_str.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      e.target.value = bet_size_str;
    },
    betChange(e) {
      let bet_size_str = e.target.value;
      bet_size_str = bet_size_str.replaceAll(" ", "");
      let new_val = parseInt(bet_size_str);

      if (bet_size_str === "" || new_val < 10) {
        this.bet_data.bet_size = 10;
      } else if (new_val > 1000000) {
        this.bet_data.bet_size = 1000000;
      } else {
        this.bet_data.bet_size = parseInt(bet_size_str);
      }

      bet_size_str = this.bet_data.bet_size
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      e.target.value = bet_size_str;
    },
  },
};
</script>

<style lang="scss">
@import url("/src/assets/css/base.css");

.gold-gradient {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1em;
  background: linear-gradient(180deg, #ffb800 0%, #a04d00 100%) !important;
  div:first-child {
    margin-bottom: 5px;
  }
}
.take-bet-win {
  font-family: "Manrope";
  font-style: normal;
  margin-bottom: 5px;
  font-weight: 400;
  font-size: 15px;
}
.cancel-bet {
  background: linear-gradient(180deg, #ff0000 0%, #801616 100%) !important;
}

.size-control-btn {
  border-radius: 50%;
  background: var(--bet-win-color);
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bet-control__checkboxes {
  gap: 15px;
  display: flex;
  align-items: center;
}

.add-bet-size-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-size: 10px;
  font-weight: 700;
  height: 20px;
  background: var(--bet-win-color);
  border-radius: 8px;
  div {
    margin-left: -2px;
  }
}
.autotake-input {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 17px;
  top: 0;
  z-index: 1;
  max-width: 70px;
}
.bet-size {
  max-width: 100%;
  font-size: 16px;
  left: 0;
  padding: 0;
  height: 100%;
  text-align: center;
  top: 0;
  position: absolute;
}
.bet-control__size-input-wrap {
  flex: 1;
  height: 100%;
  position: relative;
}
.autotake-input-text,
.bet-size__input-text {
  color: var(--default-text-color);
  font-weight: 700;
}
.autotake-input-text {
  display: flex;
  z-index: 2;
  position: relative;
  justify-content: center;
  margin-left: 3px;
  align-items: center;
  pointer-events: none;
  width: 100%;
  height: 100%;
}

.bet-control__header {
  padding: 7px 15px;
  background: var(--ui-elem-bg);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  justify-content: space-between;
}
.bet-control__autotake-coef {
  background: var(--bet-win-color);
  position: relative;
  border-radius: 8px;
  justify-content: center;
  display: flex;
  align-items: center;
  height: 29px;
  padding: 0 15px 0 10px;
  span {
    color: var(--pink-color);
    font-size: 11px;
  }
}
.bet-control__body {
  display: flex;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 0 15px;
  background: var(--bet-win-color);
  & > div {
    flex: 1;
  }
}

.bet-control__btn-underline {
  background: linear-gradient(180deg, #ff00a8 0%, #702851 100%);
  border-radius: 8px 8px 0px 0px;
  height: 2px;
  width: 66.66%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
}
.bet-control__btn-wrap {
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-right: 15px;
}
.bet-control__size-wrap {
  padding: 12px 0;
}
.bet-control__size {
  width: 100%;
  padding: 0 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--ui-elem-bg);
  border-radius: 8px;
  & > div {
    width: 100%;
    display: flex;
    align-items: center;
  }
}
.bet-control__size-bot {
  gap: 5px;
  height: calc(50% - 1px);
}
.bet-control__size-top {
  height: calc(50% + 1px);
  justify-content: space-between;
  border-bottom: 1px solid #59003b;
}
.bet-control__btn {
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: 800;
  font-size: 16px;
  border-radius: 8px;
  letter-spacing: 0.06em;
  background: linear-gradient(180deg, #ff00a8 0%, #702851 100%);
  border: 4px solid var(--ui-elem-bg);
}
.bet-control {
  width: 50%;
  &:first-child {
    margin-right: 15px;
  }
}
.size-control-btn {
  &,
  & > & {
    cursor: pointer;
  }
}
.bet-control__size-plus {
  img {
    width: 10px;
    height: 10px;
  }
}
</style>
