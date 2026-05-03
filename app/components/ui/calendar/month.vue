<script setup lang="ts">
import {
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  type CalendarDate,
} from "@internationalized/date";
import {
  UI_CALENDAR_DEFAULT_LOCALE,
  type UiCalendarDay,
  type UiCalendarSession,
  type UiCalendarSessionsMap,
} from "./types";

interface Props {
  month: CalendarDate;
  sessions?: UiCalendarSessionsMap;
  selected?: CalendarDate | null;
  panelOpen?: boolean;
  locale?: string;
}

const props = withDefaults(defineProps<Props>(), {
  sessions: () => ({}),
  selected: null,
  panelOpen: false,
  locale: UI_CALENDAR_DEFAULT_LOCALE,
});

const emit = defineEmits<{
  "update:month": [month: CalendarDate];
  "update:selected": [date: CalendarDate];
  "update:panelOpen": [value: boolean];
  "day-click": [day: UiCalendarDay];
}>();

const visibleDays = computed<UiCalendarDay[]>(() => {
  const monthStart = startOfMonth(props.month);
  const gridStart = startOfWeek(monthStart, props.locale);

  return Array.from({ length: 42 }, (_, i) => {
    const date = gridStart.add({ days: i });
    return {
      date,
      isCurrentMonth: date.month === props.month.month,
    };
  });
});

console.log("visibleDays", visibleDays.value);

const weekdayLabels = computed<string[]>(() => {
  const formatter = new Intl.DateTimeFormat(props.locale, { weekday: "long" });
  const start = startOfWeek(startOfMonth(props.month), props.locale);
  return Array.from({ length: 7 }, (_, index) =>
    formatter.format(start.add({ days: index }).toDate("UTC")),
  );
});
console.log("weekdayLabels", weekdayLabels.value);
function sessionsCountForDay(day: UiCalendarDay): number {
  return props.sessions[day.date.toString()]?.length ?? 0;
}

const selectedSessions = computed<UiCalendarSession[]>(() => {
  if (!props.selected) return [];
  return props.sessions[props.selected.toString()] ?? [];
});

function isSelectedDay(day: UiCalendarDay): boolean {
  return props.selected !== null && day.date.compare(props.selected) === 0;
}

function handleDayClick(day: UiCalendarDay): void {
  emit("day-click", day);
  emit("update:selected", day.date);
  if (!props.panelOpen) emit("update:panelOpen", true);
}

function closePanel(): void {
  emit("update:panelOpen", false);
}
</script>

<template>
  <div class="calendar-month" role="grid">
    <div class="calendar-month__weekdays">
      <div
        v-for="weekday in weekdayLabels"
        :key="weekday"
        class="calendar-month__weekday"
        role="columnheader"
      >
        {{ weekday }}
      </div>
    </div>
    <div class="calendar-month__grid" role="grid">
      <button
        v-for="day in visibleDays"
        :key="day.date.toString()"
        type="button"
        role="gridcell"
        class="calendar-month__cell"
        :class="{
          'calendar-month__cell_other-month': !day.isCurrentMonth,
          'calendar-month__cell_selected': isSelectedDay(day),
          'calendar-month__cell_has-sessions': sessionsCountForDay(day) > 0,
        }"
        @click="handleDayClick(day)"
        :disabled="!day.isCurrentMonth"
      >
        <span class="calendar-month__day">
          {{ String(day.date.day).padStart(2, "0") }}
        </span>
        <span
          v-if="sessionsCountForDay(day) > 0"
          class="calendar-month__caption"
        >
          {{ sessionsCountForDay(day) }} фотосессии
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.calendar-month {
  display: grid;
  grid-template-columns: repeat(7, minmax(160px, 1fr));
  grid-template-rows: max-content repeat(6, 100px);
  overflow-x: auto;

  gap: 1px;
  background-color: #f1f1f1;

  &__weekdays {
    grid-column: 1 / -1;
    grid-row: 1;
    display: grid;
    grid-template-columns: subgrid;
    gap: 0;
  }
  &__grid {
    grid-column: 1 / -1;
    grid-row: 2 / -1;
    display: grid;
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;
    border-inline: 1px solid #f1f1f1;
    border-bottom: 1px solid #f1f1f1;
  }

  &__weekday,
  &__cell {
    background-color: #ffffff;
  }

  &__weekday {
    padding-block: 16px;
    color: var(--gray);
    font-weight: 400;
    font-size: 14px;
    text-align: center;
    text-transform: capitalize;
  }

  &__cell {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 20px;
    text-align: left;
    cursor: pointer;
    border: 0;
    appearance: none;
    color: var(--black);
    position: relative;

    &:hover {
      z-index: 1;
    }

    &_other-month {
      cursor: default;

      .calendar-month__day,
      .calendar-month__caption {
        color: var(--gray-light);
        opacity: 0.2;
      }
    }

    &_selected {
      outline: 1px solid var(--black);
      outline-offset: -1px;
      z-index: 2;
    }
  }

  &__day {
    font-family: var(--font-family);
    font-weight: 600;
    font-size: 16px;
    text-transform: uppercase;
    color: var(--black);
    line-height: 1;
  }

  &__caption {
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 14px;
    color: var(--gray);
    line-height: 1;
  }
}
</style>
