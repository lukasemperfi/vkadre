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
  /** Any date inside the visible month. The grid is built from it. */
  month: CalendarDate;
  /**
   * Sessions grouped by day. Key is `CalendarDate.toString()`
   * ("YYYY-MM-DD"). Pass only the days that have sessions.
   */
  sessions?: UiCalendarSessionsMap;
  /** Currently selected day. `v-model:selected`. */
  selected?: CalendarDate | null;
  /** Whether the side panel with sessions is open. `v-model:panelOpen`. */
  panelOpen?: boolean;
  /** BCP 47 locale — controls weekday order and labels. */
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

/** 35 or 42 cells aligned to the locale's first weekday. */
const visibleDays = computed<UiCalendarDay[]>(() => {
  const monthStart = startOfMonth(props.month);
  const monthEnd = endOfMonth(props.month);
  const gridStart = startOfWeek(monthStart, props.locale);
  const gridEnd = endOfWeek(monthEnd, props.locale);

  const result: UiCalendarDay[] = [];
  for (
    let cursor = gridStart;
    cursor.compare(gridEnd) <= 0;
    cursor = cursor.add({ days: 1 })
  ) {
    result.push({
      date: cursor,
      isCurrentMonth: cursor.month === props.month.month,
    });
  }
  return result;
});

console.log("visibleDays", visibleDays.value);

/** Localized weekday labels in the order that matches `visibleDays`. */
const weekdayLabels = computed<string[]>(() => {
  const formatter = new Intl.DateTimeFormat(props.locale, { weekday: "long" });
  const start = startOfWeek(startOfMonth(props.month), props.locale);
  return Array.from({ length: 7 }, (_, index) =>
    formatter.format(start.add({ days: index }).toDate("UTC")),
  );
});

/** Number of sessions for a given day cell. */
function sessionsCountForDay(day: UiCalendarDay): number {
  return props.sessions[day.date.toString()]?.length ?? 0;
}

/** Sessions of the currently selected day. */
const selectedSessions = computed<UiCalendarSession[]>(() => {
  if (!props.selected) return [];
  return props.sessions[props.selected.toString()] ?? [];
});

/** Stable comparison for highlighting the selected cell. */
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
  <div class="calendar-month"></div>
</template>

<style scoped lang="scss">
.calendar-month {
}
</style>
