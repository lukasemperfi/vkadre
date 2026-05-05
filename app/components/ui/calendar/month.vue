<script setup lang="ts">
import {
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  type CalendarDate,
  today,
  getLocalTimeZone,
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
  locale?: string;
}

const props = withDefaults(defineProps<Props>(), {
  sessions: () => ({}),
  selected: null,
  locale: UI_CALENDAR_DEFAULT_LOCALE,
});

const emit = defineEmits<{
  "update:month": [month: CalendarDate];
  "update:selected": [date: CalendarDate];
  "day-click": [day: UiCalendarDay];
}>();

const now = today(getLocalTimeZone());

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

const weekdayLabels = computed<[short: string, long: string][]>(() => {
  const start = startOfWeek(startOfMonth(props.month), props.locale);
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
}
</script>

<template>
  <div class="calendar-month-container">
    <div class="calendar-month" role="grid">
      <div class="calendar-month__weekdays">
        <div
          v-for="weekday in weekdayLabels"
          :key="weekday[1]"
          class="calendar-month__weekday"
          role="columnheader"
        >
          <span class="calendar-month__weekday-label_desktop">
            {{ weekday[1] }}
          </span>
          <span class="calendar-month__weekday-label_mobile">
            {{ weekday[0] }}
          </span>
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
            'calendar-month__cell_current-day': day.date.compare(now) === 0,
            'calendar-month__cell_past-date': day.date.compare(now) < 0,
          }"
          @click="handleDayClick(day)"
          :disabled="!day.isCurrentMonth || day.date.compare(now) < 0"
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
          <span class="calendar-month__caption_mobile">
            <span
              v-for="i in Math.min(sessionsCountForDay(day), 4)"
              :key="i"
              class="calendar-month__caption_mobile-item"
            ></span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.calendar-month-container {
  container-type: inline-size;
}
.calendar-month {
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 1439px) {
    aspect-ratio: 1 / 1;
  }

  &__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0;
    flex: 0 0 auto;
  }
  &__grid {
    flex: 0 0 auto;
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    grid-template-rows: repeat(6, 100px);
    gap: 1px;
    background-color: #f1f1f1;
    width: 100%;
    border: 1px solid #f1f1f1;

    @container (width < 1248px) {
      grid-template-rows: repeat(6, minmax(0, 1fr));
      aspect-ratio: 7 / 6;
    }
  }

  &__weekday,
  &__cell {
    background-color: #ffffff;
  }

  &__weekday {
    padding-block: 16px;
    color: var(--black);
    font-weight: 400;
    font-size: 14px;
    text-align: center;
    text-transform: capitalize;

    @container (width < 700px) {
      font-size: 2.5cqi;
    }
  }

  &__weekday-label {
    &_desktop {
      display: block;
      @container (width < 1248px) {
        display: none;
      }
    }
    &_mobile {
      display: none;
      @container (width < 1248px) {
        display: block;
      }
    }
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

    @container (width < 1248px) {
      justify-content: center;
      align-items: center;
      padding: 0;
    }

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

      @container (width < 700px) {
        outline: none;
        background-color: var(--black);

        .calendar-month__day,
        .calendar-month__caption {
          color: #ffffff;
        }
        .calendar-month__caption_mobile-item {
          background-color: #ffffff;
        }
      }

      .calendar-month__caption {
        color: var(--black);
      }
    }

    &_current-day {
      background-color: rgb(255 217 247 / 43%);
    }

    &_past-date {
      pointer-events: none;
    }

    &:disabled {
      cursor: default;
    }
  }

  &__day {
    font-family: var(--font-family);
    font-weight: 600;
    font-size: 16px;
    text-transform: uppercase;
    color: var(--black);
    line-height: 1;

    @container (width < 700px) {
      font-size: 2.5cqi;
      color: var(--black);
    }
  }

  &__caption {
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 14px;
    color: var(--gray);
    line-height: 1;
    white-space: nowrap;

    @container (width < 1248px) {
      position: absolute;
      bottom: 8%;
      left: 50%;
      transform: translateX(-50%);
    }

    @container (width < 1000px) {
      display: none;
    }

    &_mobile {
      display: flex;
      gap: 4px;
      display: none;

      @container (width < 1000px) {
        display: flex;
        position: absolute;
        bottom: 8%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 4px;
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 10px;
        text-align: center;
        color: var(--black);
      }

      @container (width < 450px) {
        gap: 2px;
      }
    }
    &_mobile-item {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--gray);

      @container (width < 700px) {
        width: 1cqi;
        height: 1cqi;
      }

      @container (width < 450px) {
        width: 4px;
        height: 4px;
      }
    }
  }
}
</style>
