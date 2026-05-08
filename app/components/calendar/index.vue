<script setup lang="ts">
import {
  CalendarDate,
  parseZonedDateTime,
  startOfMonth,
  today,
  getLocalTimeZone,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  parseDate,
} from "@internationalized/date";
import type { UiCalendarEvent } from "~/components/ui/calendar/types";

type ViewType = "calendar" | "list" | "week" | "3_days";

const todayDate = today(getLocalTimeZone());
const month = shallowRef(todayDate);
const selectedDay = shallowRef<CalendarDate | null>(null);
const cityActiveTab = ref("odessa");
const viewActiveTab = ref<ViewType>("calendar");
const isShowMonthNav = computed(() => {
  return viewActiveTab.value === "calendar" || viewActiveTab.value === "week";
});
const locale = "ru-RU";

const isPrevDisabled = computed(() => {
  const currentView = startOfMonth(month.value);
  const currentRealMonth = startOfMonth(today(getLocalTimeZone()));

  return currentView.compare(currentRealMonth) <= 0;
});

const isDrawerOpen = computed({
  get: () => selectedDay.value !== null,
  set: (value) => {
    if (!value) selectedDay.value = null;
  },
});

// Имитация данных из БД (чистый JSON со строками)
const events = ref([
  {
    id: 1,
    start: "2026-05-04T10:00[Europe/Kyiv]",
    end: "2026-05-04T12:00[Europe/Kyiv]",
    title: "Встреча с командой",
    location: "Офис, Одесса",
  },
  {
    id: 2,
    start: "2026-05-04T16:00[Europe/Kyiv]",
    end: "2026-05-04T20:00[Europe/Kyiv]",
    title: "Парк Шевченко: Магнолии",
    location: "г. Одесса",
  },
  {
    id: 3,
    start: "2026-05-05T09:00[Europe/Kyiv]",
    end: "2026-05-05T11:00[Europe/Kyiv]",
    title: "Frontend Workshop",
    location: "Online",
  },
  {
    id: 4,
    start: "2026-05-06T14:30[Europe/Kyiv]",
    end: "2026-05-06T16:00[Europe/Kyiv]",
    title: "Code Review",
    location: "г. Одесса",
  },
  {
    id: 5,
    start: "2026-05-08T11:00[Europe/Kyiv]",
    end: "2026-05-08T13:00[Europe/Kyiv]",
    title: "Refactoring Session",
    location: "Online",
  },
  {
    id: 6,
    start: "2026-05-11T18:00[Europe/Kyiv]",
    end: "2026-05-11T20:00[Europe/Kyiv]",
    title: "Футбол: Тренировка",
    location: "Спортивная площадка",
  },
  {
    id: 7,
    start: "2026-05-13T10:00[Europe/Kyiv]",
    end: "2026-05-13T11:30[Europe/Kyiv]",
    title: "Planning Sprint",
    location: "г. Одесса",
  },
  {
    id: 8,
    start: "2026-05-15T19:00[Europe/Kyiv]",
    end: "2026-05-15T22:00[Europe/Kyiv]",
    title: "Просмотр фильма",
    location: "Дома",
  },
  {
    id: 9,
    start: "2026-05-19T14:00[Europe/Kyiv]",
    end: "2026-05-19T15:30[Europe/Kyiv]",
    title: "English Speaking Club",
    location: "Online",
  },
  {
    id: 10,
    start: "2026-05-22T10:00[Europe/Kyiv]",
    end: "2026-05-22T18:00[Europe/Kyiv]",
    title: "UI Tech Conference",
    location: "Online",
  },
  {
    id: 11,
    start: "2026-05-25T17:30[Europe/Kyiv]",
    end: "2026-05-25T19:00[Europe/Kyiv]",
    title: "Разбор логов и багфикс",
    location: "г. Одесса",
  },
  {
    id: 12,
    start: "2026-05-28T12:00[Europe/Kyiv]",
    end: "2026-05-28T13:00[Europe/Kyiv]",
    title: "Sync with PM",
    location: "Online",
  },
  {
    id: 13,
    start: "2026-05-31T15:00[Europe/Kyiv]",
    end: "2026-05-31T18:00[Europe/Kyiv]",
    title: "Прогулка у моря",
    location: "Набережная",
  },
]);

const isWithinRange = (dateStr: string) => {
  const eventZoned = parseZonedDateTime(dateStr);
  const targetDate = new CalendarDate(
    eventZoned.year,
    eventZoned.month,
    eventZoned.day,
  );

  if (viewActiveTab.value === "3_days") {
    const endRange = month.value.add({ days: 2 });
    return (
      targetDate.compare(month.value) >= 0 && targetDate.compare(endRange) <= 0
    );
  }

  if (viewActiveTab.value === "week") {
    const start = startOfWeek(month.value, locale);
    const end = endOfWeek(month.value, locale);
    return targetDate.compare(start) >= 0 && targetDate.compare(end) <= 0;
  }

  if (viewActiveTab.value === "calendar" || viewActiveTab.value === "list") {
    const start = startOfMonth(month.value);
    const end = endOfMonth(month.value);
    return targetDate.compare(start) >= 0 && targetDate.compare(end) <= 0;
  }

  return true;
};

/**
 * Просто отфильтрованный плоский массив событий
 */
const filteredEvents = computed(() => {
  return events.value
    .filter((event) => isWithinRange(event.start))
    .map((event) => ({
      ...event,
      // Превращаем строки из "БД" в объекты для удобной работы в компонентах
      start: parseZonedDateTime(event.start),
      end: parseZonedDateTime(event.end),
    }))
    .sort((a, b) => a.start.compare(b.start)); // Сортировка по времени
});

const selectedEvents = computed<UiCalendarEvent[]>(() => {
  if (!selectedDay.value) return [];
  return filteredEvents.value.filter((event) => {
    return (
      event.start.day === selectedDay.value?.day &&
      event.start.month === selectedDay.value?.month &&
      event.start.year === selectedDay.value?.year
    );
  });
});

const handlePrev = () => {
  console.log("Кликнули назад");
  changeMonth("prev");
};

const handleNext = () => {
  console.log("Кликнули вперед");
  changeMonth("next");
};

function changeMonth(direction: "prev" | "next") {
  const amount = direction === "next" ? 1 : -1;

  if (viewActiveTab.value === "week" || viewActiveTab.value === "3_days") {
    // Переключаем по 7 дней
    const newDate = month.value.add({ weeks: amount });

    // Проверка на блокировку "назад" (если нужно ограничение по текущему моменту)
    if (direction === "prev" && isPrevDisabled.value) return;

    month.value = newDate;
  } else {
    // Обычное переключение месяца
    if (direction === "prev" && isPrevDisabled.value) return;
    month.value = month.value.add({ months: amount });
  }
}

const handleCityTabChange = ({
  active,
  prev,
}: {
  active: string | number;
  prev: string | number;
}) => {
  console.log("Была активна:", prev);
  console.log("Стала активна (нажали):", active);
};

const handleViewTabChange = ({
  active,
  prev,
}: {
  active: string | number;
  prev: string | number;
}) => {
  console.log("Была активна:", prev);
  console.log("Стала активна (нажали):", active);
};

const handleMobileViewChange = (view: ViewType) => {
  viewActiveTab.value = view;
  console.log("Активна:", view);
};

const formattedDateTitle = computed(() => {
  if (!month.value) return "";

  if (viewActiveTab.value === "week" || viewActiveTab.value === "3_days") {
    const start = startOfWeek(month.value, locale);
    const end = endOfWeek(month.value, locale);

    const startFormat = start.toDate("UTC").toLocaleDateString(locale, {
      day: "numeric",
      month: start.month !== end.month ? "short" : undefined,
    });

    const endFormat = end.toDate("UTC").toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
    });

    return `${startFormat} — ${endFormat}`.replace(/\s*г\.$/, "");
  }

  return month.value
    .toDate("UTC")
    .toLocaleDateString(locale, { month: "long" });
});
</script>

<template>
  <div class="calendar">
    <div class="calendar__wrapper">
      <div class="calendar__header">
        <h2 class="calendar__title h-2">
          Календарь<span class="calendar__title_part"> на </span>
          <span class="calendar__month-date" v-show="isShowMonthNav">
            {{ formattedDateTitle }}
          </span>
        </h2>
        <div class="calendar__month-nav">
          <UiCalendarNavButtons
            @prev="handlePrev"
            @next="handleNext"
            :prev-disabled="isPrevDisabled"
            v-show="isShowMonthNav"
          />
        </div>
        <div class="calendar__actions">
          <button
            class="calendar__actions-btn"
            :class="{
              'calendar__actions-btn_active': viewActiveTab === 'list',
            }"
            :disabled="viewActiveTab === 'list'"
            @click="handleMobileViewChange('list')"
          >
            <UiIcon name="list" />
          </button>

          <button
            class="calendar__actions-btn"
            :class="{
              'calendar__actions-btn_active': viewActiveTab === 'calendar',
            }"
            :disabled="viewActiveTab === 'calendar'"
            @click="handleMobileViewChange('calendar')"
          >
            <UiIcon name="calendar" />
          </button>
        </div>

        <div class="calendar__city-tabs">
          <UiTabs v-model="cityActiveTab" @change="handleCityTabChange">
            <UiTabsList class="calendar__city-tabs-list">
              <UiTabsTrigger id="odessa">Одесса</UiTabsTrigger>
              <UiTabsTrigger id="south">Южный</UiTabsTrigger>
            </UiTabsList>
          </UiTabs>
        </div>
        <div class="calendar__view-tabs">
          <UiTabs v-model="viewActiveTab" @change="handleViewTabChange">
            <UiTabsList class="calendar__view-tabs-list">
              <UiTabsTrigger id="3_days">3 дня</UiTabsTrigger>
              <UiTabsTrigger id="week">7 дней</UiTabsTrigger>
              <UiTabsTrigger id="calendar">1 Месяц</UiTabsTrigger>
            </UiTabsList>
          </UiTabs>
        </div>
      </div>

      <div class="ui-calendar" v-show="viewActiveTab === 'calendar'">
        <UiCalendarMonthNav class="calendar__month-nav-block">
          <UiCalendarDateTitle :month="month" />
          <UiCalendarNavButtons
            @prev="handlePrev"
            @next="handleNext"
            :prev-disabled="isPrevDisabled"
          />
        </UiCalendarMonthNav>

        <UiCalendarMonth
          v-model:selected="selectedDay"
          :month="month"
          :events="filteredEvents"
          @update:month="month = $event"
        />
      </div>
      <div class="week-calendar" v-show="viewActiveTab === 'week'">
        <UiCalendarWeek :date="month" :events="filteredEvents" />
      </div>
      <div class="days-calendar" v-show="viewActiveTab === '3_days'">
        <div class="three-days-cards">
          <UiCalendarThreeDays
            :date="month"
            :events="filteredEvents"
            :city="`Одесса`"
          />
          <UiCalendarThreeDays
            :date="month"
            :events="filteredEvents"
            :city="`Южный`"
          />
        </div>
      </div>
      <UiCalendarDrawer
        v-model:is-open="isDrawerOpen"
        :events="selectedEvents"
        :current-date="selectedDay"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
.calendar {
  $mobile-breakpoint: 449px;
  $tablet-breakpoint: 749px;

  container-type: inline-size;

  &__wrapper {
    padding-bottom: globalFunctions.fluidValue(40px, 104px, 320px, 1440px);
    border-bottom: 1px solid var(--gray);
    position: relative;
    overflow: clip;
  }

  &__header {
    display: grid;
    grid-template-columns: max-content 1fr max-content max-content;
    align-items: center;
    justify-content: space-between;

    margin-bottom: globalFunctions.fluidValue(24px, 60px, 320px, 1440px);

    @container (width < 1150px) {
      grid-template-columns: repeat(2, max-content);
      gap: 30px;
    }
  }

  &__title {
    font-size: globalFunctions.fluidValue(24px, 32px, 320px, 1440px);

    &_part {
      @container (width < 650px) {
        display: none;
      }
    }
  }

  &__month-date {
    color: var(--gray);

    @container (width < 650px) {
      display: none;
    }
  }

  &__month-nav {
    margin-left: auto;

    @container (width < 650px) {
      display: none;
    }
  }

  &__city-tabs,
  &__view-tabs {
    :deep(.tabs-list) {
      padding: 0;
      border: none;
    }
  }

  &__city-tabs {
    padding-left: 5vw;

    @container (width < 1150px) {
      padding-left: 0;
    }

    @container (width < 650px) {
      display: none;
    }
  }

  &__view-tabs {
    padding-left: 5vw;

    @container (width < 1150px) {
      padding-left: 0;
    }

    @container (width < 650px) {
      display: none;
    }
  }

  &__divider {
    width: 100%;
    height: 1px;
    background-color: #f1f1f1;

    @container (width < 650px) {
      display: none;
    }
  }

  &__month-nav-block {
    display: none !important;

    @container (width < 650px) {
      display: flex;
    }
  }

  :deep(.calendar-month__weekdays) {
    @container (width < 650px) {
      display: none;
    }
  }

  &__actions {
    display: none;
    @container (width < 650px) {
      display: flex;
      gap: 15px;
    }

    &-btn {
      opacity: 0.2;

      &_active {
        opacity: 1;
      }
    }
  }

  .three-days-cards {
    display: flex;
    gap: 32px;

    @media (max-width: 1439px) {
      flex-direction: column;
      gap: 24px;
    }
  }
}
</style>
