<script setup lang="ts">
import { inject } from "vue";
import { UI_MODAL_INJECTION_KEY, type UiModalContext } from "./context";

const { close } = inject<UiModalContext>(UI_MODAL_INJECTION_KEY)!;
</script>

<template>
  <button
    class="ui-modal-close"
    type="button"
    aria-label="Закрыть"
    @click="close"
  >
    <UiIcon name="strong-cross" class="ui-modal-close__icon" />
  </button>
</template>

<style lang="scss" scoped>
.ui-modal-close {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;

  @media (hover: hover) {
    &:hover {
      opacity: 0.7;
    }
  }
  &__icon {
    width: 17px;
    height: 16px;

    :deep(path) {
      fill: var(--black);
    }
  }
}
</style>
