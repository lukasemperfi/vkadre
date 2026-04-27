<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: "chevron" | "arrow";
    disabled?: boolean;
  }>(),
  {
    variant: "chevron",
    disabled: false,
  },
);
</script>

<template>
  <button
    class="nav-btn nav-btn_prev"
    type="button"
    aria-label="Предыдущий слайд"
    v-bind="$attrs"
    :disabled="disabled"
  >
    <slot>
      <UiIcon v-if="variant === 'chevron'" name="chevron-left" />
      <UiIcon v-else name="slider-left-custom-arrow" />
    </slot>
  </button>
</template>

<style scoped lang="scss">
.nav-btn {
  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
}
</style>
