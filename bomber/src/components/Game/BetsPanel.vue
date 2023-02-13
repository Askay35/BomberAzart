<template>
  <div id="bets-wrap">
    <div id="bets-tabs">
      <div
        v-for="tab in tabs"
        @click="selectTab(tab)"
        class="bets-tab"
        :class="{ active: tab.show }"
      >
        {{ tab.name }}
      </div>
    </div>
    <div v-if="current_tab != 2" id="bets-tabs-info">
      <div id="bets-count" class="number-info">
        <div>Колличество ставок:</div>
        <div>{{ betsCount }}</div>
      </div>
      <div
        v-if="current_tab == 0"
        @click="$store.commit('togglePrevRound')"
        id="prev-round-btn"
        :class="{ active: $store.state.game.show_prev_round }"
        class="outline-btn"
      >
        Пред. раунд
      </div>
    </div>
    <div id="bet-tabs-content" :style="{marginTop:current_tab==2?'25px':'0'}" class="hide-scroll">
      <slot></slot>
    </div>
    <div class="overflow-shadow"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current_tab: 0,
      tabs: [],
    };
  },
  computed: {
    betsCount() {
      switch (this.current_tab) {
        case 0:
          return this.$store.getters.currentBetsCount;
        case 1:
          return this.$store.getters.userBetsCount;
        default:
          return 0;
      }
    },
  },
  methods: {
    selectTab(tab) {
      if (!tab.show) {
        for (let t in this.tabs) {
          if (this.tabs[t].show) {
            this.tabs[t].show = false;
          }
        }
        this.current_tab = this.tabs.findIndex((v) => {
          return v.name == tab.name;
        });
        tab.show = true;
      }
    },
  },
};
</script>

<style lang="scss">
@import url("/src/assets/css/base.css");

#prev-round-btn.active {
  background: #ff00a8;
  border-color: #2d011e;
  color: #2d011e;
}

#bet-tabs-content {
  overflow: scroll;
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

#bets-tabs {
  border-radius: 30px;
  min-height: 40px;
  padding: 5px;
  display: flex;
  background: var(--ui-elem-bg);
}
</style>
