<script setup lang="ts">
import { type CalendarDate } from "@internationalized/date";
import type { UiCalendarEvent } from "./types";

interface Props {
  date: CalendarDate;
  events: UiCalendarEvent[];
  locale?: string;
  showDateInCard?: boolean;
  currentDay?: boolean;
}

console.log("sdfsdf");

const props = withDefaults(defineProps<Props>(), {
  locale: "ru-RU",
  showDateInCard: false,
  currentDay: false,
});

// "16 марта"
const formattedDate = computed(() => {
  return props.date
    .toDate("UTC")
    .toLocaleDateString(props.locale, {
      day: "numeric",
      month: "long",
    })
    .replace(/\s*г\.$/, "");
});

// "понедельник"
const dayOfWeek = computed(() => {
  return props.date.toDate("UTC").toLocaleDateString(props.locale, {
    weekday: "long",
  });
});
</script>

<template>
  <div class="day" :class="{ 'day_current-day': currentDay }">
    <div class="day__header">
      <div class="day__date">
        <div class="day__date-num">{{ formattedDate }}</div>
        <div class="day__weekday">{{ dayOfWeek }}</div>
      </div>
    </div>

    <div class="day__events">
      <template v-if="events.length > 0">
        <UiCalendarEventCard
          v-for="event in events"
          :key="event.id"
          :event="event"
          :show-date="showDateInCard"
          :locale="locale"
          class="day__event-card"
        >
          <UiCalendarEventCardTitle />
          <UiCalendarEventCardTime />
        </UiCalendarEventCard>
      </template>
      <div v-else class="day__empty">Нет событий на этот день</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.day {
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  padding-top: 28px;

  &_current-day {
    border-top: 2px solid var(--black);
    .day__date-num {
      font-weight: 600;
    }
  }

  &__header {
    margin-bottom: 22px;
  }

  &__date-num {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 24px;
    text-transform: uppercase;
    color: var(--black);
    margin-bottom: 6px;
  }

  &__weekday {
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 12px;
    text-transform: uppercase;
    color: var(--black);
    opacity: 0.4;
  }

  &__events {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  &__empty {
    font-size: 14px;
    color: var(--gray);
    font-style: italic;
  }
}
</style>
