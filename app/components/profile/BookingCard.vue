<script setup lang="ts">
interface Props {
  title: string;
  location: string;
  date: string;
  time: string;
  isCancelled?: boolean;
  showActions?: "booking" | "completed";
}

const props = withDefaults(defineProps<Props>(), {
  isCancelled: false,
  showActions: "booking",
});

defineEmits(["cancel", "download", "review"]);
</script>

<template>
  <div class="booking-card" :class="{ 'is-cancelled': isCancelled }">
    <div class="booking-card__info">
      <h3 class="booking-card__title">{{ title }}</h3>

      <div class="booking-card__details">
        <div class="booking-item">
          <UiIcon name="location" class="booking-item__icon" />
          <span class="booking-item__text">{{ location }}</span>
        </div>

        <div class="booking-card__meta">
          <div class="booking-item">
            <UiIcon
              name="calendar-m"
              class="booking-item__icon booking-item__icon_calendar"
            />
            <span class="booking-item__text">{{ date }}</span>
          </div>
          <div class="booking-item">
            <UiIcon name="clock-m" class="booking-item__icon" />
            <span class="booking-item__text">{{ time }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="booking-card__actions">
      <template v-if="showActions === 'booking'">
        <button v-if="!isCancelled" @click="$emit('cancel')" class="action-btn">
          <UiIcon name="close-circle" class="action-btn__icon" />
          <span class="action-btn__text">Отменить бронь</span>
          <UiIcon name="box-info" class="action-btn__info-icon" />
        </button>

        <div v-else class="status-cancelled">
          <UiIcon name="mark" class="status-cancelled__icon" />
          <span class="status-cancelled__text">Бронь отменена</span>
        </div>
      </template>

      <template v-else-if="showActions === 'completed'">
        <button @click="$emit('download')" class="action-btn">
          <UiIcon name="download-m" class="action-btn__icon" />
          <span class="action-btn__text">Скачать фото</span>
          <UiIcon name="box-info" class="action-btn__info-icon" />
        </button>

        <button @click="$emit('review')" class="action-btn">
          <UiIcon name="comment-m" class="action-btn__icon" />
          <span class="action-btn__text">Оставить отзыв</span>
          <UiIcon name="box-info" class="action-btn__info-icon" />
        </button>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$black: #171a1e;
$mobile-breakpoint: 500px;

.booking-card {
  position: relative;
  display: grid;
  grid-template-columns: subgrid;
  gap: 24px;
  padding: 8px 0;
  transition: all 0.3s ease;
  grid-column: 1/-1;

  &__title {
    margin: 0;
    font-weight: 500;
    font-size: 16px;
    color: #000000;
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 8px;
  }

  &__meta {
    display: flex;
    flex-direction: row;
    gap: 24px;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: 14px;
    align-items: flex-start;
  }

  &__divider {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: $black;
    opacity: 0.1;
  }
}

.booking-item {
  display: flex;
  align-items: center;
  gap: 10px;

  &__icon {
    width: 16px;
    height: 16px;
    color: $black;

    &_calendar {
      opacity: 0.3;
    }
  }

  &__text {
    font-size: 14px;
    line-height: 160%;
    color: $black;
  }
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: $black;
  white-space: nowrap;

  &__text {
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  &__icon {
    width: 16px;
    height: 16px;
    transition: opacity 0.2s;
  }

  &__info-icon {
    width: 16px;
    height: 16px;
  }

  &:hover &__icon {
    opacity: 1;
  }
}

.status-cancelled {
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.2;

  &__text {
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  &__icon {
    width: 16px;
    height: 16px;
  }
}
</style>
