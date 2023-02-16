<template>
  <div>
      <Bet v-for="bet in $store.state.game.bets.my" :bet="bet" />
  </div>
</template>

<script>
import Bet from '../UI/Bet.vue'
export default {
  components: { Bet },
}
</script>

<style>

</style>