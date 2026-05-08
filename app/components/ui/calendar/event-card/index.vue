<script setup lang="ts">
import type { UiCalendarEvent } from "../types";

interface Props {
  event: UiCalendarEvent;
  showDate?: boolean;
  locale?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showDate: false,
  locale: "ru-RU",
});

console.log(props);

provide("eventContext", {
  event: computed(() => props.event),
  showDate: computed(() => props.showDate),
  locale: computed(() => props.locale),
});
</script>

<template>
  <article class="event-card">
    <slot />
  </article>
</template>

<style scoped lang="scss">
.event-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>
