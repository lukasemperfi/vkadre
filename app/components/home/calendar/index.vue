<script setup lang="ts">
import {
  CalendarDate,
  parseZonedDateTime,
  startOfMonth,
  today,
  getLocalTimeZone,
} from "@internationalized/date";
import type {
  UiCalendarSession,
  UiCalendarSessionsMap,
} from "~/components/ui/calendar/types";

const todayDate = startOfMonth(today(getLocalTimeZone()));
const month = shallowRef(todayDate);
const selectedDay = shallowRef<CalendarDate | null>(null);

const isPrevDisabled = computed(() => {
  const currentView = startOfMonth(month.value);
  const currentRealMonth = startOfMonth(today(getLocalTimeZone()));

  // Сравниваем объекты напрямую.
  // Если текущий вид меньше или равен реальному месяцу — блокируем.
  return currentView.compare(currentRealMonth) <= 0;
});

console.log("isPrevDisabled", isPrevDisabled.value);

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

const handlePrev = () => {
  console.log("Кликнули назад");
  changeMonth("prev");
};

const handleNext = () => {
  console.log("Кликнули вперед");
  changeMonth("next");
};

function changeMonth(direction: "prev" | "next") {
  if (direction === "next") {
    month.value = month.value.add({ months: 1 });
  } else {
    if (isPrevDisabled.value) return;
    month.value = month.value.subtract({ months: 1 });
  }
}
</script>

<template>
  <section class="calendar">
    <div class="app-container">
      <div class="calendar__wrapper">
        <div class="calendar__header">
          <h2 class="calendar__title h-2">
            Календарь на
            <span class="calendar__month-date">
              {{
                month?.toDate("UTC").toLocaleDateString("ru-RU", {
                  month: "long",
                })
              }}
            </span>
          </h2>

          <div class="calendar__month-nav">
            <UiCalendarNavButtons
              @prev="handlePrev"
              @next="handleNext"
              :prev-disabled="isPrevDisabled"
            />
          </div>
        </div>

        <UiCalendarMonth
          v-model:selected="selectedDay"
          :month="month"
          :sessions="sessions"
          @update:month="month = $event"
        />
        <UiCalendarDrawer
          v-model:is-open="isDrawerOpen"
          :sessions="selectedSessions"
          :current-date="selectedDay"
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

  &__header {
    display: flex;
    align-items: center;
  }

  &__month-date {
    color: var(--gray);
  }

  &__month-nav {
    margin-left: auto;
  }
}
</style>
