<template>
  <div v-show="show" class="hide-scroll">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    name: { required: true },
    active: { default: false },
  },
  data() {
    return {
      show: false,
    };
  },
  created() {
    this.show = this.active;
    this.$parent.tabs.push(this);
  },
};
</script>

<style lang="scss"></style>
