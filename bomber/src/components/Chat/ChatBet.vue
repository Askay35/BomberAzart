<template>
  <div class="chat-bet">
    <div class="chat-bet-header">
      <div class="chat-message-name">{{ name }}:</div>
      <div class="chat-message-body">Поделился ставкой</div>
    </div>
    <div class="chat-bet-body">
      <div class="chat-bet-info">
        <div class="chat-bet-size">
          <div>Ставка:</div>
          {{ parseFloat(size).toFixed(2) }} ₽
        </div>
        <div class="chat-bet-win">
          <div>Выигрыш:</div>
          {{ parseFloat(win).toFixed(2) }} ₽
        </div>
      </div>
      <div class="chat-bet-coef">
        <div class="chat-bet-out">
          <div>Вывод:</div>
          <Coef>{{ parseFloat(coef).toFixed(2) }}</Coef>
        </div>
        <div class="chat-bet-round">
          <div>Раунд:</div>
          {{ round }}x
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Coef from '../UI/Coef.vue';

export default {
    props: {
        name: String,
        size: Number,
        coef: Number,
        round: Number,
        win: Number,
    },
    components: { Coef }
};
</script>

<style lang="scss">
@import url("/src/assets/css/base.css");

.chat-bet {
  background: var(--ui-elem-bg);
  border: var(--chat-bet-border);
  flex-direction: column;
  border-radius: 8px;
  display: flex;
  margin-bottom: 15px;
  .bet {
    margin-left: 2px;
  }
}

.chat-bet > div {
  display: flex;
  padding: 10px;
}

.chat-bet-header {
  border-bottom: var(--chat-bet-border);
}

.chat-bet-body {
  font-weight: 600;
  font-size: 13px;
  flex-direction: column;
}
.chat-bet-coef,
.chat-bet-info {
  display: flex;
  justify-content: space-between;
}
.chat-bet-info {
  margin-bottom: 20px;
}
.chat-bet-coef > div,
.chat-bet-info > div {
  display: flex;
  align-items: center;
}
.chat-bet-coef > div > div:not(.bet),
.chat-bet-info > div > div {
  color: #b7359a;
  margin-right: 3px;
  font-size: 12px;
  font-weight: 500;
  padding-bottom: 1px;
}

.chat-bet-round {
  display: flex;
  align-items: center;
  align-self: end;
}
</style>
