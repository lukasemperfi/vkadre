<script setup lang="ts">
import {
  CalendarDate,
  today,
  getLocalTimeZone,
  startOfMonth,
  endOfMonth,
} from "@internationalized/date";
import type { UiCalendarEvent } from "./types";

const props = defineProps<{
  events?: UiCalendarEvent[];
}>();

const emit = defineEmits<{
  (
    e: "day-click",
    payload: { date: CalendarDate; events: UiCalendarEvent[] },
  ): void;
}>();

const locale = "ru-RU";
const todayDate = today(getLocalTimeZone());
const month = shallowRef(todayDate);
const selectedDay = shallowRef<CalendarDate | null>(null);

const filteredEvents = computed(() => {
  if (!props.events) return [];

  const start = startOfMonth(month.value);
  const end = endOfMonth(month.value);

  return props.events.filter((event) => {
    const targetDate = new CalendarDate(
      event.start.year,
      event.start.month,
      event.start.day,
    );
    return targetDate.compare(start) >= 0 && targetDate.compare(end) <= 0;
  });
});

const isPrevDisabled = computed(() => {
  const now = today(getLocalTimeZone());
  return startOfMonth(month.value).compare(startOfMonth(now)) <= 0;
});

const handlePrev = () => {
  if (isPrevDisabled.value) return;
  month.value = month.value.add({ months: -1 });
};

const handleNext = () => {
  month.value = month.value.add({ months: 1 });
};

watch(selectedDay, (newDate) => {
  if (!newDate) return;

  const dayEvents =
    props.events?.filter(
      (event) =>
        event.start.day === newDate.day &&
        event.start.month === newDate.month &&
        event.start.year === newDate.year,
    ) || [];

  emit("day-click", { date: newDate, events: dayEvents });
});

const formattedDateTitle = computed(() => {
  return month.value.toDate("UTC").toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
  });
});
</script>

<template>
  <div class="simple-calendar">
    <div class="calendar__header">
      <UiCalendarMonthNav class="calendar__month-nav-block">
        <UiCalendarDateTitle :month="month" />
        <UiCalendarNavButtons
          @prev="handlePrev"
          @next="handleNext"
          :prev-disabled="isPrevDisabled"
        />
      </UiCalendarMonthNav>
    </div>

    <div class="calendar__body">
      <UiCalendarMonth
        v-model:selected="selectedDay"
        :month="month"
        :events="filteredEvents"
        @update:month="month = $event"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.simple-calendar {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  :deep(.ui-calendar-month) {
    width: 100%;
  }
}
</style>
