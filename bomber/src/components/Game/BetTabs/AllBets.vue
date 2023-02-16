<template>
  <div>
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
  </div>
</template>

<script>
import Bet from "../UI/Bet.vue";
export default {
  components: { Bet },
};
</script>

<style></style>
