<script setup lang="ts">
import { computed, useAttrs } from "vue";

type ButtonVariant = "solid" | "outline";
type ButtonSize = "lg";

type UiButtonProps = {
  label?: string;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: "button" | "submit" | "reset";
};

const props = withDefaults(defineProps<UiButtonProps>(), {
  label: "Button",
  disabled: false,
  variant: "solid",
  size: "lg",
  type: "button",
});

const attrs = useAttrs();

const className = computed(() => [
  "ui-button",
  `ui-button_variant_${props.variant}`,
  `ui-button_size_${props.size}`,
  attrs.class,
]);
</script>

<template>
  <button :type="props.type" :disabled="props.disabled" :class="className">
    <slot>{{ props.label }}</slot>
  </button>
</template>

<style scoped lang="scss">
.ui-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 0;
  outline: none;
  user-select: none;
  cursor: pointer;

  font-family: inherit;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;

  transition:
    background-color 150ms ease,
    color 150ms ease,
    border-color 150ms ease,
    opacity 150ms ease;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid rgba(23, 26, 30, 0.35);
    outline-offset: 3px;
  }

  &_size_lg {
    padding-block: 17px;
    padding-inline: globalFunctions.fluidValue(16px, 38px, 320px, 1440px);
  }

  &_variant_outline {
    background: transparent;
    color: var(--black);
    border: 1px solid var(--black);

    &:hover:not(:disabled) {
      background: var(--black);
      color: #ffffff;
    }
  }

  &_variant_solid {
    background: var(--black);
    color: #ffffff;
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background: transparent;
      color: var(--black);
      border-color: var(--black);
    }
  }
}
</style>
