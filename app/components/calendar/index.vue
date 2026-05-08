<script setup lang="ts">
import {
  CalendarDate,
  today,
  getLocalTimeZone,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  startOfMonth,
  parseAbsoluteToLocal,
  type ZonedDateTime,
} from "@internationalized/date";

import type { UiCalendarEvent } from "~/components/ui/calendar/types";

type ViewType = "calendar" | "list" | "week" | "3_days";
type CityType = "odessa" | "south";

const locatationsApi = useLocationsApi();

const { data: locations } = await useAsyncData("locations-events", () =>
  locatationsApi.getLocations(),
);

/////////////////////////////

const todayDate = today(getLocalTimeZone());

const month = shallowRef(todayDate);

const selectedDay = shallowRef<CalendarDate | null>(null);

const cityActiveTab = ref<CityType>("odessa");

const viewActiveTab = ref<ViewType>("calendar");

const locale = "ru-RU";

/////////////////////////////

const calendarEl = ref<HTMLElement | null>(null);

const { width } = useElementSize(calendarEl);

const isMobileByContainer = computed(() => {
  return width.value > 0 && width.value < 650;
});

watch(
  isMobileByContainer,
  (mobile) => {
    if (mobile) {
      if (viewActiveTab.value === "week" || viewActiveTab.value === "3_days") {
        viewActiveTab.value = "list";
      }
    } else {
      if (viewActiveTab.value === "list") {
        viewActiveTab.value = "week";
      }
    }
  },
  { immediate: true },
);

/////////////////////////////

const parsedEvents = computed<UiCalendarEvent[]>(() => {
  if (!locations.value) {
    return [];
  }

  return locations.value.flatMap((location) => {
    const uniqueDays = new Set<string>();

    return location.slots
      .filter((slot) => {
        const start = parseAbsoluteToLocal(slot.start_time);

        const dayKey = `${start.year}-${start.month}-${start.day}`;

        if (uniqueDays.has(dayKey)) {
          return false;
        }

        uniqueDays.add(dayKey);

        return true;
      })
      .map<UiCalendarEvent>((slot) => ({
        id: slot.id,

        title: location.title,

        start: parseAbsoluteToLocal(slot.start_time),

        end: parseAbsoluteToLocal(slot.end_time),

        isBooked: slot.is_booked,

        locationId: location.id,

        city: location.city,

        location: location.address,
      }));
  });
});

/////////////////////////////

const isWithinRange = (date: ZonedDateTime) => {
  const targetDate = new CalendarDate(date.year, date.month, date.day);

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

  const start = startOfMonth(month.value);

  const end = endOfMonth(month.value);

  return targetDate.compare(start) >= 0 && targetDate.compare(end) <= 0;
};

/////////////////////////////

const filteredEvents = computed<UiCalendarEvent[]>(() => {
  return parsedEvents.value
    .filter((event) => isWithinRange(event.start))
    .sort((a, b) => a.start.compare(b.start));
});

/////////////////////////////

const selectedEvents = computed<UiCalendarEvent[]>(() => {
  if (!selectedDay.value) {
    return [];
  }

  return filteredEvents.value.filter((event) => {
    return (
      event.start.day === selectedDay.value?.day &&
      event.start.month === selectedDay.value?.month &&
      event.start.year === selectedDay.value?.year
    );
  });
});

/////////////////////////////

const isShowMonthNav = computed(() => {
  return viewActiveTab.value === "calendar" || viewActiveTab.value === "week";
});

const isPrevDisabled = computed(() => {
  const now = today(getLocalTimeZone());

  if (viewActiveTab.value === "week") {
    const currentWeekStart = startOfWeek(month.value, locale);

    const realWeekStart = startOfWeek(now, locale);

    return currentWeekStart.compare(realWeekStart) <= 0;
  }

  if (viewActiveTab.value === "3_days") {
    return month.value.compare(now) <= 0;
  }

  const currentViewMonth = startOfMonth(month.value);

  const realMonthStart = startOfMonth(now);

  return currentViewMonth.compare(realMonthStart) <= 0;
});

/////////////////////////////

const isDrawerOpen = computed({
  get: () => selectedDay.value !== null,

  set: (value) => {
    if (!value) {
      selectedDay.value = null;
    }
  },
});

/////////////////////////////

const cities = [
  {
    id: 1,
    label: "Одесса",
    value: "odessa",
  },
  {
    id: 2,
    label: "Южный",
    value: "south",
  },
];

/////////////////////////////

const handlePrev = () => {
  changeMonth("prev");
};

const handleNext = () => {
  changeMonth("next");
};

function changeMonth(direction: "prev" | "next") {
  const amount = direction === "next" ? 1 : -1;

  if (viewActiveTab.value === "week" || viewActiveTab.value === "3_days") {
    if (direction === "prev" && isPrevDisabled.value) {
      return;
    }

    month.value = month.value.add({
      weeks: amount,
    });

    return;
  }

  if (direction === "prev" && isPrevDisabled.value) {
    return;
  }

  month.value = month.value.add({
    months: amount,
  });
}

/////////////////////////////

const handleCityTabChange = ({
  active,
  prev,
}: {
  active: string | number;
  prev: string | number;
}) => {
  console.log("Была активна:", prev);

  console.log("Стала активна:", active);
};

const handleViewTabChange = ({
  active,
  prev,
}: {
  active: string | number;
  prev: string | number;
}) => {
  console.log("Была активна:", prev);

  console.log("Стала активна:", active);
};

const handleMobileViewChange = (view: ViewType) => {
  viewActiveTab.value = view;
};

/////////////////////////////

const formattedDateTitle = computed(() => {
  if (!month.value) {
    return "";
  }

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

  return month.value.toDate("UTC").toLocaleDateString(locale, {
    month: "long",
  });
});
</script>

<template>
  <div class="calendar" ref="calendarEl">
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
        <UiSelect
          v-model="cityActiveTab"
          :options="cities"
          placeholder="Выберите город"
          class="calendar__city-select"
        />
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
      <div class="list-calendar" v-show="viewActiveTab === 'list'">
        <UiCalendarEventList
          :events="parsedEvents"
          :city-filter="cityActiveTab"
          :items-per-page="3"
          locale="ru-RU"
        />
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
    margin-bottom: 60px;

    @container (width < 1150px) {
      grid-template-columns: repeat(2, max-content);
      gap: 30px;
    }

    @container (width < 650px) {
      margin-bottom: 24px;
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
    display: none;

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

  .week-calendar {
    @container (width < 650px) {
      display: none;
    }
  }
  .days-calendar {
    @container (width < 650px) {
      display: none;
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

  &__city-select {
    display: none;

    @container (width < 650px) {
      display: block;
      width: 100%;
      grid-column: 1/-1;
    }
  }
}
</style>
