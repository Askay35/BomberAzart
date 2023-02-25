<template>
  <div class="deposite-pay-form">
    <div v-if="!deposite_status" class="d-flex">
      <div class="deposite-desc">
        <div>
          <div>Сумма депозита</div>
          <div>1 000 ₽ – 25 000 ₽</div>
        </div>
      </div>
      <div class="deposite-divider"></div>
      <div class="deposite-input-wrap">
        <div class="input-group">
          <div class="deposite-input-image">
            <img src="/src/assets/images/qiwi_sign.png" />
          </div>
          <input
            type="number"
            @change="depositeSizeChange($event, 1000, 25000)"
            @input="depositeSizeInput"
            value="1000"
            placeholder="25 000 ₽"
            class="form-control disable-focus deposite-input"
            ref="deposite_input_qiwi"
          />
        </div>
        <div class="deposite-size-btns prevent-select-all">
          <div
            class="deposite-size-btn"
            @click="depositeSizeBtnClick(1000, $refs.deposite_input_qiwi)"
          >
            1 000 ₽
          </div>
          <div
            class="deposite-size-btn"
            @click="depositeSizeBtnClick(5000, $refs.deposite_input_qiwi)"
          >
            5 000 ₽
          </div>
          <div
            class="deposite-size-btn"
            @click="depositeSizeBtnClick(10000, $refs.deposite_input_qiwi)"
          >
            10 000 ₽
          </div>
          <div
            class="deposite-size-btn"
            @click="depositeSizeBtnClick(25000, $refs.deposite_input_qiwi)"
          >
            25 000 ₽
          </div>
        </div>
        <button type="button" @click="makeDeposite" class="w-100 btn-pink">
          Продолжить
        </button>
      </div>
    </div>
    <div class="deposite-made-card" id="deposite-made-qiwi" v-else></div>
  </div>
</template>

<script>
import PayForm from "./PayForm.vue";
export default {
  mixins: [PayForm],
  data() {
    return {
      deposite: { size: 1000 },
    };
  },
  methods: {
    makeDeposite() {
      this.deposite_status = true;
    },
  },
};
</script>
