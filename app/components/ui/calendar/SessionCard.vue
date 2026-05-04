<script setup lang="ts">
import type { UiCalendarSession } from "./types";

interface Props {
  session: UiCalendarSession;
  showDate?: boolean;
  showLocation?: boolean;
  locale?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showDate: false,
  showLocation: true,
  locale: "ru-RU",
});

const timeRange = computed<string>(() => {
  const formatter = new Intl.DateTimeFormat(props.locale, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: props.session.start.timeZone,
  });
  return [props.session.start, props.session.end]
    .map((value) => formatter.format(value.toDate()))
    .join("-");
});

const dayMonthLabel = computed<string>(() => {
  const formatter = new Intl.DateTimeFormat(props.locale, {
    day: "numeric",
    month: "long",
    timeZone: props.session.start.timeZone,
  });
  return formatter.format(props.session.start.toDate());
});

const headline = computed<string>(() =>
  props.showDate
    ? `${dayMonthLabel.value}, ${timeRange.value}`
    : timeRange.value,
);

const showLocationRow = computed<boolean>(
  () => props.showLocation && Boolean(props.session.location),
);
</script>

<template>
  <article class="session-card">
    <div class="session-card__time">{{ headline }}</div>
    <p class="session-card__title">{{ session.title }}</p>
    <div v-if="showLocationRow" class="session-card__location">
      <UiIcon name="location" class="session-card__pin" />
      <span class="session-card__location-text">{{ session.location }}</span>
    </div>
  </article>
</template>

<style scoped lang="scss">
.session-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: var(--font-family);

  &__time {
    font-family: var(--font-family);
    font-weight: 600;
    font-size: 18px;
    text-transform: uppercase;
    color: var(--gray);
  }

  &__title {
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    color: var(--black);
  }

  &__location {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    color: var(--black);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__pin {
    width: 18px;
    height: 18px;
    color: var(--black);
  }

  &__location-text {
    font-weight: 400;
    font-size: 16px;
    line-height: 160%;
    color: var(--black);
  }
}
</style>
