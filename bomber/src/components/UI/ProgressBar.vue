<template>
  <div class="progress-bar">
    <div class="progress-bar-inner" :style="{ width: innerWidth }"></div>
  </div>
</template>

<script>
export default {
  computed: {
    innerWidth() {
      return this.val == 0 ? "0%" : this.val / (this.max / 100) + "%";
    },
  },
  props: {
    val: {
      default: 1,
    },
    max: {
      default: 10,
    },
  },
};
</script>

<style lang="scss">
@import url("/src/assets/css/base.css");

.progress-bar {
  height: 10px;
  width: 100%;
  background: var(--ui-elem-bg);

  &,
  * {
    border-radius: 15px;
  }
}
.progress-bar-inner {
  height: 100%;
  transition: all 0.2s ease;
  background: rgb(255, 0, 168);
  background: linear-gradient(
    180deg,
    rgba(255, 0, 168, 1) 0%,
    rgba(201, 0, 133, 1) 50%,
    rgba(148, 0, 97, 1) 100%
  );
}
</style>
