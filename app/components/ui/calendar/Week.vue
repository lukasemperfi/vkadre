<script setup lang="ts">
import { computed } from "vue";
import {
  startOfWeek,
  type CalendarDate,
  today,
  getLocalTimeZone,
  parseDate,
  DateFormatter,
} from "@internationalized/date";
import {
  UI_CALENDAR_DEFAULT_LOCALE,
  type UiCalendarDay,
  type UiCalendarEvent,
} from "./types";

interface Props {
  // В режиме недели 'date' — это любой день, входящий в нужную неделю
  date: CalendarDate;
  events?: UiCalendarEvent[];
  selected?: CalendarDate | null;
  locale?: string;
}

const props = withDefaults(defineProps<Props>(), {
  events: () => [],
  selected: null,
  locale: UI_CALENDAR_DEFAULT_LOCALE,
});

console.log(props.events);

const emit = defineEmits<{
  "update:selected": [date: CalendarDate];
  "day-click": [day: UiCalendarDay];
}>();

const now = today(getLocalTimeZone());

// Вычисляем дни только для одной недели (7 дней)
const visibleDays = computed<UiCalendarDay[]>(() => {
  const gridStart = startOfWeek(props.date, props.locale);

  return Array.from({ length: 7 }, (_, i) => {
    const date = gridStart.add({ days: i });
    return {
      date,
      // В недельном виде почти всегда true, либо можно сравнивать с текущим месяцем
      isCurrentMonth: date.month === props.date.month,
    };
  });
});

const weekdayLabels = computed<[short: string, long: string][]>(() => {
  const start = startOfWeek(props.date, props.locale);
  const longFormatter = new Intl.DateTimeFormat(props.locale, {
    weekday: "long",
  });
  const shortFormatter = new Intl.DateTimeFormat(props.locale, {
    weekday: "short",
  });

  return Array.from({ length: 7 }, (_, index) => {
    const d = start.add({ days: index }).toDate("UTC");
    return [shortFormatter.format(d), longFormatter.format(d)];
  });
});

function isSelectedDay(day: UiCalendarDay): boolean {
  return props.selected !== null && day.date.compare(props.selected) === 0;
}

function handleDayClick(day: UiCalendarDay): void {
  emit("day-click", day);
  emit("update:selected", day.date);
}

function getEventsForDay(day: CalendarDate): UiCalendarEvent[] {
  return props.events.filter((event) => {
    return (
      event.start.day === day.day &&
      event.start.month === day.month &&
      event.start.year === day.year
    );
  });
}
</script>
<template>
  <div class="week">
    <div class="week__days">
      <UiCalendarDay
        v-for="day in visibleDays"
        :key="day.date.toString()"
        :date="day.date"
        :events="getEventsForDay(day.date)"
        :show-date-in-card="false"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.week {
  &__days {
    display: flex;
  }
}
</style>
