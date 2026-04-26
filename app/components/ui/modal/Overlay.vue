<script setup lang="ts">
import { inject } from "vue";
import { UI_MODAL_INJECTION_KEY, type UiModalContext } from "./context";

const { close } = inject<UiModalContext>(UI_MODAL_INJECTION_KEY)!;
</script>

<template>
  <div
    class="ui-modal-overlay"
    role="presentation"
    aria-hidden="true"
    @click="close"
  />
</template>

<style lang="scss" scoped>
.ui-modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 0;
}
</style>
