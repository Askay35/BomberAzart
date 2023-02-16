<template>
  <div class="hide-scroll">
    <Bet
      v-if="show_prev_round"
      v-for="bet in $store.state.game.bets.prev"
      :share="false"
      :bet="bet"
    />
    <Bet
      v-else
      v-for="bet in $store.state.game.bets.current"
      :share="false"
      :bet="bet"
    />
  </div>
</template>

<script>
import Bet from "../UI/Bet.vue";
export default {
  props: {
    show_prev_round: { reqired: true },
  },
  components: { Bet },
};
</script>

<style></style>
