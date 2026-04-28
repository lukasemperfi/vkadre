<script setup lang="ts">
const slots = useSlots();

const hasUnit = computed(() => Boolean(slots.unit));
</script>

<template>
  <div class="about-stat-card">
    <div class="about-stat-card__value" :class="{ 'has-unit': hasUnit }">
      <span class="about-stat-card__value-main">
        <slot name="value" />
      </span>
      <span v-if="hasUnit" class="about-stat-card__value-unit">
        <slot name="unit" />
      </span>
    </div>

    <div class="about-stat-card__caption">
      <slot name="caption" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.about-stat-card {
  color: var(--black);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 13px;

  &__value {
    display: inline-flex;
    align-items: baseline;
    gap: 0;

    &.has-unit {
      gap: 8px;
    }
  }

  &__value-main {
    font-family: var(--font-family);
    font-weight: 600;
    font-size: globalFunctions.fluidValue(32px, 48px, 320px, 1440px);
    text-transform: uppercase;
    color: var(--black);
  }

  &__value-unit {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 14px;
    color: var(--black);
  }

  &__caption {
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    text-transform: uppercase;
    color: var(--black);
  }
}
</style>
