<script setup lang="ts">
import { CalendarDate, parseZonedDateTime } from "@internationalized/date";
import type { UiCalendarSessionsMap } from "~/components/ui/calendar/types";

const month = shallowRef(new CalendarDate(2026, 6, 1));
const selected = shallowRef<CalendarDate | null>(new CalendarDate(2026, 6, 3));
const panelOpen = ref(true);
console.log("month", month.value);
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
});
</script>

<template>
  <section class="calendar">
    <div class="app-container">
      <div class="calendar__wrapper">
        <h2 class="calendar__title h-2">Календарь</h2>
        <UiCalendarMonth
          v-model:selected="selected"
          v-model:panel-open="panelOpen"
          :month="month"
          :sessions="sessions"
          @update:month="month = $event"
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
  }
}
</style>
