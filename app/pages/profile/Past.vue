<script setup lang="ts">
definePageMeta({
  layout: "profile",
});
interface BookingItem {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  isCancelled: boolean;
  showActions: "booking" | "completed";
}

const mockBookings: BookingItem[] = [
  {
    id: 1,
    title: "Парк «Тараса Шевченка». Цветение магнолий.",
    location: "г. Одесса",
    date: "3.04.2022",
    time: "14:00 - 14:10",
    isCancelled: false,
    showActions: "completed",
  },
  {
    id: 2,
    title: "Парк «Тараса Шевченка». Цветение магнолий.",
    location: "г. Одесса",
    date: "3.04.2022",
    time: "14:00 - 14:10",
    isCancelled: true,
    showActions: "completed",
  },
  {
    id: 3,
    title: "Парк «Тараса Шевченка». Цветение магнолий.",
    location: "г. Сочи",
    date: "3.04.2022",
    time: "14:00 - 14:10",
    isCancelled: false,
    showActions: "completed",
  },
];

const handleCancel = (id: number) => {
  console.log(`Отмена бронирования №${id}`);
};

const handleDownload = (id: number) => {
  console.log(`Загрузка фото для №${id}`);
};

const handleReview = (id: number) => {
  console.log(`Переход к отзыву для №${id}`);
};
</script>

<template>
  <div>
    <div class="past">
      <div class="past__list">
        <ProfileBookingCard
          v-for="item in mockBookings"
          :key="item.id"
          v-bind="item"
          @cancel="handleCancel(item.id)"
          @download="handleDownload(item.id)"
          @review="handleReview(item.id)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.past {
  &__list {
    display: grid;
    grid-template-columns: 1fr max-content;
    gap: 24px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    :deep(.booking-card) {
      @media (max-width: 768px) {
        border: 1px solid var(--gray);
        padding: 10px;
      }
    }
  }
}
</style>
