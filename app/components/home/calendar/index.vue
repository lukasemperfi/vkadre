<script setup lang="ts">
import { CalendarDate, parseZonedDateTime } from "@internationalized/date";
import type {
  UiCalendarSession,
  UiCalendarSessionsMap,
} from "~/components/ui/calendar/types";

const month = shallowRef(new CalendarDate(2026, 5, 1));
const selectedDay = shallowRef<CalendarDate | null>(null);

const isDrawerOpen = computed({
  get: () => selectedDay.value !== null,
  set: (value) => {
    if (!value) selectedDay.value = null;
  },
});

const sessions = ref<UiCalendarSessionsMap>({
  "2026-05-04": [
    {
      id: 1,
      start: parseZonedDateTime("2026-05-04T16:00[Europe/Kyiv]"),
      end: parseZonedDateTime("2026-05-04T20:00[Europe/Kyiv]"),
      title: "парк «Тараса Шевченка». Цветение магнолий.",
      location: "г. Одесса",
    },
    {
      id: 2,
      start: parseZonedDateTime("2026-05-04T16:00[Europe/Kyiv]"),
      end: parseZonedDateTime("2026-05-04T20:00[Europe/Kyiv]"),
      title: "парк «Тараса Шевченка». Цветение магнолий.",
      location: "г. Одесса",
    },
    {
      id: 3,
      start: parseZonedDateTime("2026-05-04T16:00[Europe/Kyiv]"),
      end: parseZonedDateTime("2026-05-04T20:00[Europe/Kyiv]"),
      title: "парк «Тараса Шевченка». Цветение магнолий.",
      location: "г. Одесса",
    },
  ],
  "2026-05-05": [
    {
      id: 4,
      start: parseZonedDateTime("2026-05-05T16:00[Europe/Kyiv]"),
      end: parseZonedDateTime("2026-05-05T20:00[Europe/Kyiv]"),
      title: "парк «Тараса Шевченка». Цветение магнолий.",
      location: "г. Одесса",
    },
    {
      id: 5,
      start: parseZonedDateTime("2026-05-05T16:00[Europe/Kyiv]"),
      end: parseZonedDateTime("2026-05-05T20:00[Europe/Kyiv]"),
      title: "парк «Тараса Шевченка». Цветение магнолий.",
      location: "г. Одесса",
    },
    {
      id: 6,
      start: parseZonedDateTime("2026-05-05T16:00[Europe/Kyiv]"),
      end: parseZonedDateTime("2026-05-05T20:00[Europe/Kyiv]"),
      title: "парк «Тараса Шевченка». Цветение магнолий.",
      location: "г. Одесса",
    },
    {
      id: 7,
      start: parseZonedDateTime("2026-05-05T16:00[Europe/Kyiv]"),
      end: parseZonedDateTime("2026-05-05T20:00[Europe/Kyiv]"),
      title: "парк «Тараса Шевченка». Цветение магнолий.",
      location: "г. Одесса",
    },
    {
      id: 8,
      start: parseZonedDateTime("2026-05-05T16:00[Europe/Kyiv]"),
      end: parseZonedDateTime("2026-05-05T20:00[Europe/Kyiv]"),
      title: "парк «Тараса Шевченка». Цветение магнолий.",
      location: "г. Одесса",
    },
  ],
  "2026-05-06": [
    {
      id: 5,
      start: parseZonedDateTime("2026-05-06T16:00[Europe/Kyiv]"),
      end: parseZonedDateTime("2026-05-06T20:00[Europe/Kyiv]"),
      title: "парк «Тараса Шевченка». Цветение магнолий.",
      location: "г. Одесса",
    },
  ],
});

const selectedSessions = computed<UiCalendarSession[]>(() => {
  if (!selectedDay.value) return [];
  return sessions.value[selectedDay.value.toString()] ?? [];
});

const onClosePanel = () => {
  selectedDay.value = null;
};
</script>

<template>
  <section class="calendar">
    <div class="app-container">
      <div class="calendar__wrapper">
        <h2 class="calendar__title h-2">Календарь</h2>

        <UiCalendarMonth
          v-model:selected="selectedDay"
          :month="month"
          :sessions="sessions"
          @update:month="month = $event"
        />
        <UiCalendarDrawer
          v-model:is-open="isDrawerOpen"
          :sessions="selectedSessions"
        />
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
.calendar {
  &__wrapper {
    padding-bottom: globalFunctions.fluidValue(40px, 104px, 320px, 1440px);
    border-bottom: 1px solid var(--gray);
    position: relative;
    overflow: clip;
  }
}
</style>
