<script setup lang="ts">
import { inject } from "vue";
import { UI_MODAL_INJECTION_KEY, type UiModalContext } from "./context";

const { close } = inject<UiModalContext>(UI_MODAL_INJECTION_KEY)!;
</script>

<template>
  <UiIconButton
    class="ui-modal-close"
    type="button"
    aria-label="Закрыть"
    @click="close"
    variant="solid"
  >
    <UiIcon name="cross" class="ui-modal-close__icon" />
  </UiIconButton>
</template>

<style lang="scss" scoped>
.ui-modal-close {
  $right-padding: globalFunctions.fluidValue(24px, 47px, 320px, 1440px);
  $icon-right-padding: 10px;

  position: absolute;
  top: 24px;
  right: calc($right-padding - $icon-right-padding);
  border-color: white;

  @media (hover: hover) {
    &:not(._is-disabled):hover {
      border-color: white;
    }
  }

  @media (max-width: globalBreakpoints.$breakpoint-sm) {
    border-color: var(--gray);
    right: $right-padding;

    @media (hover: hover) {
      &:not(._is-disabled):hover {
        border-color: var(--black);
      }
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
