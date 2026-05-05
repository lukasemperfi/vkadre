<script setup lang="ts">
const context = inject<any>("eventContext");

const timeRange = computed(() => {
  const { event, locale } = context;
  const formatter = new Intl.DateTimeFormat(locale.value, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: event.value.start.timeZone,
  });
  return [event.value.start, event.value.end]
    .map((v) => formatter.format(v.toDate()))
    .join("-");
});

const dayMonthLabel = computed(() => {
  const { event, locale } = context;
  const formatter = new Intl.DateTimeFormat(locale.value, {
    day: "numeric",
    month: "long",
    timeZone: event.value.start.timeZone,
  });
  return formatter.format(event.value.start.toDate());
});

const headline = computed(() =>
  context.showDate.value
    ? `${dayMonthLabel.value}, ${timeRange.value}`
    : timeRange.value,
);
</script>

<template>
  <div class="event-card__time">{{ headline }}</div>
</template>

<style scoped lang="scss">
.event-card__time {
  font-weight: 600;
  font-size: 18px;
  text-transform: uppercase;
  color: var(--gray);
}
</style>
