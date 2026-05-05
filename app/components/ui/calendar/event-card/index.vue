<script setup lang="ts">
import type { UiCalendarSession } from "../types";

interface Props {
  event: UiCalendarSession;
  showDate?: boolean;
  locale?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showDate: false,
  locale: "ru-RU",
});

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
