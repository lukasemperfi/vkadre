<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
  }>(),
  {
    label: "Loading...",
  },
);
</script>

<template>
  <div class="loader" role="status" aria-live="polite" aria-busy="true">
    <span class="loader__spinner" aria-hidden="true" />
    <!-- <span class="loader__label">{{ label }}</span> -->
  </div>
</template>

<style scoped lang="scss">
.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  min-height: clamp(160px, 28vh, 280px);
  font-family: var(--font-family);

  &__spinner {
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    border: 3px solid var(--gray);
    border-top-color: var(--black);
    border-radius: 50%;
    animation: loader-spin 0.75s linear infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
      border-top-color: var(--black);
      opacity: 0.85;
    }
  }

  &__label {
    font-weight: 400;
    font-size: 14px;
    line-height: 1.4;
    color: var(--gray);
  }
}

@keyframes loader-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
