<script setup lang="ts">
const context = inject<any>("eventContext");

const locationText = computed(() => context.event.value.location);
</script>

<template>
  <div v-if="locationText" class="event-card__location">
    <UiIcon name="location" class="event-card__pin" />
    <span class="event-card__location-text">{{ locationText }}</span>
  </div>
</template>

<style scoped lang="scss">
.event-card__location {
  display: flex;
  align-items: center;
  gap: 8px;

  &-text {
    font-weight: 400;
    font-size: 16px;
    line-height: 160%;
    color: var(--black);
  }
}
.event-card__pin {
  width: 18px;
  height: 18px;
}
</style>
