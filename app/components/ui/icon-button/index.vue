<script setup lang="ts">
import { computed, useAttrs } from "vue";

type IconButtonAs = "button" | "link";
type IconButtonVariant = "dashed" | "solid";

type UiIconButtonProps = {
  variant?: IconButtonVariant;
  as?: IconButtonAs;
  to?: unknown;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const props = withDefaults(defineProps<UiIconButtonProps>(), {
  variant: "dashed",
  as: "button",
  to: undefined,
  type: "button",
  disabled: false,
});

const attrs = useAttrs();

defineOptions({
  inheritAttrs: false,
});

const isLink = computed(() => props.as === "link");

const rootClass = computed(() => [
  "icon-button",
  props.variant === "dashed" && "icon-button_variant-dashed",
  props.variant === "solid" && "icon-button_variant-solid",
  props.disabled && "icon-button_is-disabled",
  attrs.class,
]);

function onClick(e: MouseEvent) {
  if (!isLink.value) return;
  if (!props.disabled) return;
  e.preventDefault();
  e.stopPropagation();
}
</script>

<template>
  <component
    :is="isLink ? 'NuxtLink' : 'button'"
    :class="rootClass"
    :to="isLink ? props.to : undefined"
    :type="!isLink ? props.type : undefined"
    :disabled="!isLink ? props.disabled : undefined"
    :aria-disabled="isLink && props.disabled ? 'true' : undefined"
    :tabindex="isLink && props.disabled ? -1 : undefined"
    v-bind="attrs"
    @click="onClick"
  >
    <slot />
  </component>
</template>

<style scoped lang="scss">
.icon-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  padding: 10px;
  color: var(--black);
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
  border: 1px dashed var(--gray);
  background: transparent;

  @media (hover: hover) {
    &:not(._is-disabled):hover {
      border-color: var(--black);
    }
  }

  &_variant-dashed {
    border-style: dashed;
  }

  &_variant-solid {
    border-style: solid;
  }

  &_is-disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }
}
</style>
