<template>
  <div class="v-modal modal" v-show="shown" :data-bs-backdrop="backdrop">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-header-title"><slot name="header"></slot></div>
          <img
            class="modal-close-btn"
            src="@/assets/images/close_modal.svg"
            role="button"
            @click="hideModal(this)"
          />
        </div>
        <slot name="subheader"></slot>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "./Modal.vue";
export default {
  extends: Modal,
  inject: ["hideModal"],
};
</script>

<style lang="scss">
.modal-close-btn{
    width: 24px;
}
</style>