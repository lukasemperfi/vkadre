<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
  type CalendarDate,
  today,
  getLocalTimeZone,
} from "@internationalized/date";
import {
  UI_CALENDAR_DEFAULT_LOCALE,
  type UiCalendarDay,
  type UiCalendarEvent,
} from "./types";

interface Props {
  date: CalendarDate;
  events?: UiCalendarEvent[];
  selected?: CalendarDate | null;
  locale?: string;
  city?: string;
}

const props = withDefaults(defineProps<Props>(), {
  events: () => [],
  selected: null,
  locale: UI_CALENDAR_DEFAULT_LOCALE,
  city: "Город",
});

const emit = defineEmits<{
  (e: "update:selected", date: CalendarDate): void;
  (e: "day-click", day: UiCalendarDay): void;
}>();

const now = today(getLocalTimeZone());

// Внутреннее состояние текущей стартовой даты
const currentStartDate = ref<CalendarDate>(props.date);

// Синхронизация, если родитель изменит пропс date
watch(
  () => props.date,
  (newDate) => {
    currentStartDate.value = newDate;
  },
);

// Логика блокировки кнопки "Назад"
const isPrevDisabled = computed(() => {
  return currentStartDate.value.compare(now) <= 0;
});

// Управление внутри компонента
function handlePrev() {
  if (isPrevDisabled.value) return;
  currentStartDate.value = currentStartDate.value.subtract({ days: 3 });
}

function handleNext() {
  currentStartDate.value = currentStartDate.value.add({ days: 3 });
}

// Генерация дней на основе внутреннего состояния
const visibleDays = computed<UiCalendarDay[]>(() => {
  return Array.from({ length: 3 }, (_, i) => {
    const date = currentStartDate.value.add({ days: i });
    return {
      date,
      isCurrentMonth: date.month === currentStartDate.value.month,
    };
  });
});

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
  <div class="three-days">
    <div class="three-days__header">
      <div class="three-days__location">
        <UiIcon name="location" />
        <span>{{ city }}</span>
      </div>
      <UiCalendarNavButtons
        @prev="handlePrev"
        @next="handleNext"
        :prev-disabled="isPrevDisabled"
      />
    </div>
    <div class="three-days__days">
      <UiCalendarDay
        v-for="day in visibleDays"
        :key="day.date.toString()"
        :date="day.date"
        :events="getEventsForDay(day.date)"
        :show-date-in-card="false"
        :class="{
          'three-days__day_current-day': day.date.compare(now) === 0,
        }"
        :current-day="day.date.compare(now) === 0"
        @click="handleDayClick(day)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.three-days {
  padding-top: 28px;
  padding-bottom: 40px;
  padding-inline: 44px;

  border: 1px solid var(--gray);
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  &__location {
    display: flex;
    align-items: center;
    gap: 9px;
    font-family: var(--font-family);
    font-weight: 600;
    font-size: 24px;

    text-transform: uppercase;
    color: var(--black);
  }

  &__days {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
}
</style>
