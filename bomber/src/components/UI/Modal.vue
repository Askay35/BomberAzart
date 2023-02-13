<template>
  <div class="v-modal modal" v-if="shown" data-bs-backdrop="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header"></slot>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    backdrop: {
      default: true,
    },
    is_shown: {
      default: false,
    },
  },
  data() {
    return {
      shown: false,
      overlay: true,
    };
  },
  created() {
    this.overlay = this.backdrop;
    this.shown = this.is_shown;
  },
};
</script>

<style lang="scss">
@import url("/src/assets/css/base.css");
.v-modal {
  display: flex;
  z-index: 50;
  width: max-content;
  height: max-content;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .modal-header-title {
    font-size: 20px;
    font-weight: 700;
  }
}
.v-modal .modal-header {
  border: none;
  padding: 0 20px !important;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;
  background: var(--modal-header-bg);
  padding: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 56px;
}
.v-modal .modal-content {
  background: unset;
  border: none;
}
.v-modal .modal-body {
  width: 100%;
  display: flex;
  padding: 20px !important;
  border: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: var(--modal-body-bg);
}
.v-modal .modal-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: unset !important;
}
</style>
