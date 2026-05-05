<script setup lang="ts">
const context = inject<any>("eventContext");

const title = computed(() => context.event.value.title);
</script>

<template>
  <p class="event-card__title">{{ title }}</p>
</template>

<style scoped lang="scss">
.event-card__title {
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: var(--black);
  margin: 0;
}
</style>
