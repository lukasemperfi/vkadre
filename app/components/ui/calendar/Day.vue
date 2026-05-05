<script setup lang="ts">
import { type CalendarDate } from "@internationalized/date";
import type { UiCalendarEvent } from "./types";

interface Props {
  date: CalendarDate;
  events: UiCalendarEvent[];
  locale?: string;
  showDateInCard?: boolean;
}

console.log("sdfsdf");

const props = withDefaults(defineProps<Props>(), {
  locale: "ru-RU",
  showDateInCard: false,
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
  <div class="day">
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
          <UiCalendarEventCardTime />
          <UiCalendarEventCardTitle />
          <UiCalendarEventCardLocation />
        </UiCalendarEventCard>
      </template>
      <div v-else class="day__empty">Нет событий на этот день</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.day {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  &__header {
    display: flex;
    align-items: baseline;
    gap: 12px;
    padding-bottom: 10px;
  }

  &__date {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__date-num {
    font-size: 20px;
    font-weight: 700;
    color: var(--black, #000);
    text-transform: lowercase;
    white-space: nowrap;

    &:first-letter {
      text-transform: uppercase;
    }
  }

  &__weekday {
    font-size: 16px;
    font-weight: 400;
    color: var(--gray, #888);
    text-transform: lowercase;
  }

  &__events {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__event-card {
    // Можно добавить стили для разделения карточек,
    // если они не предусмотрены в самом компоненте
    &:not(:last-child) {
      padding-bottom: 16px;
      border-bottom: 1px dashed #d8d8d8;
    }
  }

  &__empty {
    font-size: 14px;
    color: var(--gray);
    font-style: italic;
    padding: 10px 0;
  }
}
</style>
