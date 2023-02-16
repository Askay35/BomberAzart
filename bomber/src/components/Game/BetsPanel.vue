<template>
  <div id="bets-wrap">
    <div class="bets-tabs">
      <div
        v-for="tab in tabs"
        @click="current_tab = tab"
        class="bets-tab"
        :class="{ active: current_tab.name == tab.name }"
      >
        {{ tab.name }}
      </div>
    </div>
    <div v-if="current_tab.name != 'Топ'" id="bets-tabs-info">
      <div id="bets-count" class="number-info">
        <div>Колличество ставок:</div>
        <div>{{ betsCount }}</div>
      </div>
      <div
        v-if="current_tab.name == 'Все'"
        @click="show_prev_round = !show_prev_round"
        id="prev-round-btn"
        :class="{ active: show_prev_round }"
        class="outline-btn"
      >
        Пред. раунд
      </div>
    </div>
    <div
      id="bet-tabs-content"
      :class="{
        'overflow-scroll': current_tab.name != 'Топ',
        'overflow-visible': current_tab.name == 'Топ',
      }"
      :style="{ marginTop: current_tab.name == 'Топ' ? '10px' : '0' }"
      class="hide-scroll"
    >
      <keep-alive>
        <component
          :is="current_tab.component" v-bind="allBetsProps()"
        ></component>
      </keep-alive>
    </div>
    <div class="overflow-shadow"></div>
  </div>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core';
export default {
  data() {
    return {
      show_prev_round: false,
      current_tab: { name: "Все", component: "all-bets" },
      tabs: [
        { name: "Все", component: "all-bets" },
        { name: "Мои", component: "my-bets" },
        { name: "Топ", component: "top-bets" },
      ],
    };
  },
  components:{
    AllBets:defineAsyncComponent(()=>import('../Game/BetTabs/AllBets.vue')),
    MyBets:defineAsyncComponent(()=>import('../Game/BetTabs/MyBets.vue')),
    TopBets:defineAsyncComponent(()=>import('../Game/BetTabs/TopBets.vue')),
  },
  methods:{
    allBetsProps(){
      if(this.current_tab.name == 'Все'){
        return {show_prev_round:this.show_prev_round};
      }
      return {};
    },
  },
  computed: {
    betsCount() {
      switch (this.current_tab) {
        case "AllBets":
          return this.$store.getters.currentBetsCount;
        case "MyBets":
          return this.$store.getters.userBetsCount;
        default:
          return 0;
      }
    },
  },
};
</script>

<style lang="scss">
@import url("/src/assets/css/base.css");

#prev-round-btn.active {
  background: #ff00a8;
  border-color: #ff00a8;
  color: #2d011e;
}

#bet-tabs-content{
  & > div {
    gap: 10px;
    overflow: scroll;
    display: flex;
    flex-direction: column;
  }
}
#bets-tabs-info {
  margin: 10px 0 25px;
  min-height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bets-tab {
  flex: 1;
  font-weight: 700;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &.active {
    background: var(--pink-color);
  }
}
#bets-wrap {
  padding: 10px 15px 0;
  position: relative;
  display: flex;
  .overflow-shadow {
    left: 0;
    bottom: 0;
    width: 100%;
    background: linear-gradient(
      180deg,
      rgba(19, 0, 13, 0) 0%,
      rgba(19, 0, 13, 0.8) 100%
    );
    height: 250px;
  }

  flex-direction: column;
}

.bets-tabs {
  border-radius: 30px;
  min-height: 40px;
  padding: 5px;
  display: flex;
  background: var(--ui-elem-bg);
}
</style>
