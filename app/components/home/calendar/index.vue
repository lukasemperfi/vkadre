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

type DesktopViewType = "month" | "week" | "day";
type MobileViewType = "calendar" | "list";

const todayDate = startOfMonth(today(getLocalTimeZone()));
const month = shallowRef(todayDate);
const selectedDay = shallowRef<CalendarDate | null>(null);
const cityActiveTab = ref("odessa");
const desktopViewActiveTab = ref<DesktopViewType>("month");
const mobileViewActiveTab = ref<MobileViewType>("calendar");

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

const handleMobileViewChange = (view: MobileViewType) => {
  mobileViewActiveTab.value = view;
  console.log("Активна:", view);
};
</script>

<template>
  <section class="calendar-section">
    <div class="app-container">
      <div class="calendar">
        <div class="calendar__wrapper">
          <div class="calendar__header">
            <h2 class="calendar__title h-2">
              Календарь<span class="calendar__title_part"> на </span>
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
            <div class="calendar__actions">
              <button
                class="calendar__actions-btn"
                :class="{
                  'calendar__actions-btn_active':
                    mobileViewActiveTab === 'list',
                }"
                :disabled="mobileViewActiveTab === 'list'"
                @click="handleMobileViewChange('list')"
              >
                <UiIcon name="list" />
              </button>

              <button
                class="calendar__actions-btn"
                :class="{
                  'calendar__actions-btn_active':
                    mobileViewActiveTab === 'calendar',
                }"
                :disabled="mobileViewActiveTab === 'calendar'"
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
              <UiTabs
                v-model="desktopViewActiveTab"
                @change="handleViewTabChange"
              >
                <UiTabsList class="calendar__view-tabs-list">
                  <UiTabsTrigger id="day">3 дня</UiTabsTrigger>
                  <UiTabsTrigger id="week">7 дней</UiTabsTrigger>
                  <UiTabsTrigger id="month">1 Месяц</UiTabsTrigger>
                </UiTabsList>
              </UiTabs>
            </div>
          </div>
          <hr class="calendar__divider" />

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
    </div>
  </section>
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
    grid-template-columns: repeat(4, max-content);
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    margin-bottom: globalFunctions.fluidValue(24px, 60px, 320px, 1440px);

    @container (width < 950px) {
      grid-template-columns: repeat(2, max-content);
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
    // @media (max-width: $tablet-breakpoint) {
    //   display: none;
    // }

    @container (width < 650px) {
      display: none;
    }
  }

  &__view-tabs {
    // @media (max-width: $tablet-breakpoint) {
    //   display: none;
    // }

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
}
</style>
