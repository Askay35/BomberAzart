<template>
  <div class="bet-info__item" :class="{ win: bet.win > 0.0 }">
    <div class="bet-info__item-name">{{ 'name' in bet ? bet.name : $store.state.user.name }}</div>
    <div class="bet-info__item-size">{{ bet.bet_size.toFixed(2) }} ₽</div>
    <div class="bet-info__item-coef" :class="{ win: bet.coef > 0.0 }">
      <coef v-if="bet.coef > 0.0" :coef="bet.coef"></coef>
      <template v-else>-</template>
    </div>
    <div class="bet-info__item-win">
      {{ bet.win > 0.0 ? bet.win.toFixed(2) : "-" }}
    </div>
    <div v-if="share" @click="$store.dispatch('sendMessage', {bet_id:bet.id})" class="bet-info__item-share outline-btn">
      <img src="/src/assets/images/share.svg" />
    </div>
  </div>
</template>

<script>
import Coef from '../../UI/Coef.vue';
export default {
  components: { Coef },
  props: {
    bet: {
      required: true,
    },
    share:{
        default:true
    }
  },
};
</script>

<style lang="scss">
.bet-info__item {
  display: flex;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border-radius: 15px;
  background: var(--ui-elem-bg);
  font-size: 12px;
  font-weight: 500;
  border: 1px solid var(--ui-elem-bg);
  & > div {
    width: 60px;
    text-align: center;
  }
  &.win {
    border: 1px solid var(--pink-color);
    background: var(--bet-win-color);
  }
}
.bet-info__item-win {
  flex: 1;
}
.bet-info__item-size {
  flex: 1;
}
.bet-info__item-coef {
  flex: 1;
  &.win {
    display: flex;
    justify-content: center;
  }
}
.bet-info__item-share {
  padding: 0;
  width: 25px !important;
  height: 25px;
  border-radius: 6px !important;
}
.bet-info__item-name {
  width: 15% !important;
  display: flex;
  align-items: center;
  overflow: hidden;
  color: var(--bet-name-text-color);
}
</style>
