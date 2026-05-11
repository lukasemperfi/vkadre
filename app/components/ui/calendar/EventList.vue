<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { UiCalendarEvent } from "./types";

interface Props {
  events: UiCalendarEvent[];
  cityFilter: string;
  itemsPerPage?: number;
  locale?: string;
}

const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: 3,
  locale: "ru-RU",
});

const currentPage = ref(0);

const filteredByCity = computed(() => {
  if (!props.cityFilter) return props.events;

  const filterMap: Record<string, string> = {
    odessa: "Одесса",
    south: "Южный",
  };

  const targetCity = filterMap[props.cityFilter] || props.cityFilter;

  return props.events.filter((event) => {
    return event?.city?.toLowerCase() === targetCity.toLowerCase();
  });
});

const totalPages = computed(() =>
  Math.ceil(filteredByCity.value.length / props.itemsPerPage),
);

const paginatedEvents = computed(() => {
  const start = currentPage.value * props.itemsPerPage;
  return filteredByCity.value.slice(start, start + props.itemsPerPage);
});

watch(
  () => props.cityFilter,
  () => {
    currentPage.value = 0;
  },
);

const handlePrev = () => {
  if (currentPage.value > 0) currentPage.value--;
};

const handleNext = () => {
  if (currentPage.value < totalPages.value - 1) currentPage.value++;
};

const visibleDots = computed(() => {
  const maxVisible = 5;
  const total = totalPages.value;

  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i);
  }

  let start = currentPage.value - Math.floor(maxVisible / 2);
  start = Math.max(0, Math.min(start, total - maxVisible));

  return Array.from({ length: maxVisible }, (_, i) => start + i);
});
</script>

<template>
  <div class="event-list">
    <div class="event-list__content">
      <UiCalendarEventCard
        v-for="event in paginatedEvents"
        :key="event.id"
        :event="event"
        :show-date="true"
        :locale="locale"
      >
        <UiCalendarEventCardTime />
        <UiCalendarEventCardTitle />
        <UiCalendarEventCardLocation />
      </UiCalendarEventCard>

      <div v-if="paginatedEvents.length === 0" class="event-list__empty">
        Нет событий в этом городе
      </div>
    </div>

    <div v-if="totalPages > 1" class="event-list__footer">
      <div class="event-list__pagination">
        <div
          v-for="pageIndex in visibleDots"
          :key="pageIndex"
          class="event-list__dot"
          :class="{ 'event-list__dot_active': pageIndex === currentPage }"
          @click="currentPage = pageIndex"
        />
      </div>

      <div class="ui-calendar-nav-buttons">
        <button
          class="ui-calendar-nav-buttons__button"
          @click="handlePrev"
          :disabled="currentPage === 0"
        >
          <UiIcon name="chevron-left" />
        </button>
        <button
          class="ui-calendar-nav-buttons__button"
          @click="handleNext"
          :disabled="currentPage === totalPages - 1"
        >
          <UiIcon name="chevron-right" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.event-list {
  &__content {
    display: flex;
    flex-direction: column;
    gap: 25px;
    min-height: 300px;
  }

  &__empty {
    padding: 40px;
    text-align: center;
    color: #999;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 45px;
  }

  &__pagination {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  &__dot {
    width: 8px;
    height: 8px;
    background-color: #d1d1d1;
    border-radius: 2px; // Квадратные как на макете
    cursor: pointer;
    transition: all 0.3s ease;

    &_active {
      background-color: #1a1a1a;
      width: 10px; // Немного выделяем активный
      height: 10px;
    }
  }
}

// Твои стили кнопок
.ui-calendar-nav-buttons {
  display: flex;
  gap: 8px;

  &__button {
    width: 30px;
    height: 30px;
    display: flex;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: transparent;
    border: none;

    @media (hover: hover) {
      &:hover {
        background-color: rgba(0, 0, 0, 0.03);
      }
    }

    &:disabled {
      opacity: 0.2;
      cursor: default;
    }
  }
}
</style>
