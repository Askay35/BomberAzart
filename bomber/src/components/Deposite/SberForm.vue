<template>
  <div class="deposite-pay-form" id="deposite-sber-form">
    <div v-if="!deposite_status" class="d-flex">
      <div class="deposite-desc">
        <div>
          <div>Сумма депозита</div>
          <div>500 ₽ – 300 000 ₽</div>
        </div>
      </div>
      <div class="deposite-divider"></div>
      <div class="deposite-input-wrap">
        <div class="input-group">
          <div class="deposite-input-image">
            <img src="/src/assets/images/green_sber.svg" />
          </div>
          <input
            type="number"
            @change="depositeSizeChange($event, 500, 300000)"
            @input="depositeSizeInput"
            value="500"
            placeholder="300 000 ₽"
            ref="deposite_input_sber"
            class="form-control disable-focus deposite-input"
          />
        </div>
        <div class="deposite-size-btns prevent-select-all">
          <div
            class="deposite-size-btn"
            @click="depositeSizeBtnClick(500, $refs.deposite_input_sber)"
          >
            500 ₽
          </div>
          <div
            class="deposite-size-btn"
            @click="depositeSizeBtnClick(1000, $refs.deposite_input_sber)"
          >
            1 000 ₽
          </div>
          <div
            class="deposite-size-btn"
            @click="depositeSizeBtnClick(5000, $refs.deposite_input_sber)"
          >
            5 000 ₽
          </div>
          <div
            class="deposite-size-btn"
            @click="depositeSizeBtnClick(10000, $refs.deposite_input_sber)"
          >
            10 000 ₽
          </div>
          <div
            class="deposite-size-btn"
            @click="depositeSizeBtnClick(50000, $refs.deposite_input_sber)"
          >
            50 000 ₽
          </div>
          <div
            class="deposite-size-btn"
            @click="depositeSizeBtnClick(100000, $refs.deposite_input_sber)"
          >
            100 000 ₽
          </div>
          <div
            class="deposite-size-btn"
            @click="depositeSizeBtnClick(300000, $refs.deposite_input_sber)"
          >
            300 000 ₽
          </div>
        </div>
        <button type="button" @click="makeDeposite" class="w-100 btn-pink">
          Продолжить
        </button>
      </div>
    </div>
    <div class="deposite-made-card flex-column" id="deposite-made-sber" v-else>
      <div class="d-flex justify-content-between w-100 mb-3">
        <img class="deposite-made-icon" src="/src/assets/images/ru_sber.svg" />
        <div class="deposite-made-desc">
          Скопируйте точную сумму, указанную в поле ниже. По этой сумме мы определим, что это ваш платеж и зачислим его автоматически.
        </div>
      </div>
      <div class="d-flex w-100 justify-content-between">
        <div class="d-flex flex-column">
          <div class="deposite-made-key"> Сумма для перевода</div>
          <div class="deposite-made-value">34999.71</div>
        </div>
        <div class="d-flex flex-column align-items-end">
          <div class="deposite-made-key">Номер карты для перевода</div>
          <div class="deposite-made-value">4006 8006 0058 4766</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PayForm from "./PayForm.vue";
export default {
  mixins: [PayForm],
  data() {
    return {
      deposite: { size: 500 },
    };
  },
  methods: {
    makeDeposite() {
      this.deposite_status = true;
    },
  },
};
</script>

<style lang="scss">
#deposite-made-sber {
  background: #1a9329;
  outline: 2px solid #04b719;
  .deposite-made-desc{
    background: #11711c;
  }
}
#deposite-sber-form{
  .deposite-input-image img{
    width: 17px;
  }
}
</style>
