<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: "chevron" | "arrow";
    carousel?: any;
  }>(),
  {
    variant: "chevron",
    carousel: null,
  },
);

const isDisabled = computed(() => {
  return props.carousel?.isBeginning ?? false;
});
</script>

<template>
  <button
    class="nav-btn nav-btn_prev"
    type="button"
    aria-label="Предыдущий слайд"
    v-bind="$attrs"
    :disabled="isDisabled"
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
