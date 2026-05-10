<script setup lang="ts">
import { computed, ref } from "vue";
import type { UiCalendarEvent } from "../ui/calendar/types";
import type { ZonedDateTime } from "@internationalized/date";

interface Props {
  event: UiCalendarEvent | null;
  isOpen: boolean;
}

export interface BookingSlot {
  start: ZonedDateTime;
  end: ZonedDateTime;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:isOpen", value: boolean): void;
}>();

const packages = [
  {
    id: "5cf3706e-ea3a-4180-9404-f9c89989b67a",
    price: 990,
    currency: "UAH",
    service_id: "dc3a1e83-165e-4072-811a-5c172fff9fcc",
    location_id: null,
    photo_count: 10,
    duration_minutes: 10,
  },
  {
    id: "361e4485-f572-4072-8d31-cfa243087c58",
    price: 1990,
    currency: "UAH",
    service_id: "dc3a1e83-165e-4072-811a-5c172fff9fcc",
    location_id: null,
    photo_count: 20,
    duration_minutes: 20,
  },
  {
    id: "f753f33d-d26d-4810-a134-bd5e62e67dd3",
    price: 2990,
    currency: "UAH",
    service_id: "dc3a1e83-165e-4072-811a-5c172fff9fcc",
    location_id: null,
    photo_count: 30,
    duration_minutes: 30,
  },
];

const currentStep = ref<1 | 2>(1);

const selectedSlot = ref<BookingSlot | null>(null);
const selectedPackage = ref<(typeof packages)[0] | null>(packages[0]!);
const sources = ref(false);

const pending = ref(false);

const createBookingSlots = (
  start: ZonedDateTime | undefined,
  end: ZonedDateTime | undefined,
  intervalInMinutes: number,
): BookingSlot[] => {
  if (!start || !end) {
    return [];
  }

  const slots: BookingSlot[] = [];

  let currentStart = start;

  while (true) {
    const currentEnd = currentStart.add({
      minutes: intervalInMinutes,
    });

    if (currentEnd.compare(end) > 0) {
      break;
    }

    slots.push({
      start: currentStart,
      end: currentEnd,
    });

    currentStart = currentEnd;
  }

  return slots;
};

const slots = computed(() => {
  return createBookingSlots(
    props?.event?.start,
    props.event?.end,
    selectedPackage.value?.duration_minutes ?? 10,
  );
});

const formattedDate = computed(() => {
  return props.event?.start.toDate().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
});

const closeModal = () => {
  emit("update:isOpen", false);
};

const goToNextStep = () => {
  if (!selectedSlot.value || !selectedPackage.value) {
    return;
  }

  currentStep.value = 2;
};

const handleSubmit = (formData: unknown) => {};

const handlePackageClick = (item: (typeof packages)[0]) => {
  selectedPackage.value = item;
  console.log("selectedPackage", selectedPackage.value);
};

const formatTime = (date: ZonedDateTime) => {
  return date.toDate().toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const handleSlotClick = (slot: BookingSlot) => {
  selectedSlot.value = slot;
  console.log("selectedSlot", selectedSlot.value);
};
</script>

<template>
  <UiModal
    :is-open="isOpen"
    @update:is-open="emit('update:isOpen', $event)"
    class="booking-modal-group"
  >
    <UiModalOverlay />

    <UiModalContent class="booking-modal">
      <UiModalCloseButton />

      <UiLoadingOverlay v-if="pending" />

      <template v-if="event">
        <div class="app-container">
          <div class="booking-modal__steps">
            <div
              class="booking-modal__step"
              :class="{
                'booking-modal__step_active': currentStep === 1,
              }"
            >
              Данные фотосессии
            </div>

            <div
              class="booking-modal__step"
              :class="{
                'booking-modal__step_active': currentStep === 2,
              }"
            >
              Оплата
            </div>
          </div>

          <div class="booking-modal__title">
            {{ formattedDate }}: {{ event.title }}
          </div>

          <div v-if="currentStep === 1" class="booking-modal__content">
            <div class="booking-modal__image-wrapper">
              <img
                :src="event.image_url ?? ''"
                :alt="event.title"
                class="booking-modal__image"
              />
            </div>

            <div class="booking-modal__times">
              <div class="booking-modal__section-title">Выберите время</div>

              <div class="booking-modal__slots">
                <button
                  v-for="slot in slots"
                  :key="slot.start.toString()"
                  type="button"
                  class="booking-modal__slot"
                  :class="{
                    'booking-modal__slot_active':
                      selectedSlot?.start.toString() === slot.start.toString(),
                  }"
                  @click="handleSlotClick(slot)"
                >
                  {{ formatTime(slot.start) }} - {{ formatTime(slot.end) }}
                </button>
              </div>

              <div class="booking-modal__section-title">
                Длительность фотосессии
              </div>

              <div class="booking-modal__packages">
                <button
                  v-for="item in packages"
                  :key="item.id"
                  type="button"
                  class="booking-modal__package"
                  :class="{
                    'booking-modal__package_active':
                      selectedPackage?.id === item.id,
                  }"
                  @click="handlePackageClick(item)"
                >
                  {{ item.duration_minutes ?? 0 }} мин
                </button>
              </div>

              <label class="booking-modal__checkbox">
                <input v-model="sources" type="checkbox" />

                <span>Исходники</span>
              </label>
            </div>

            <div class="booking-modal__summary">
              <div class="booking-modal__section-title">Сумма</div>

              <div class="booking-modal__summary-list">
                <div class="booking-modal__summary-row">
                  <span>Стоимость фотосессии:</span>
                  <span> ₴ </span>
                </div>

                <div class="booking-modal__summary-row">
                  <span>Исходники:</span>
                  <span>
                    {{ sources ? "199 ₴" : "0 ₴" }}
                  </span>
                </div>

                <div
                  class="booking-modal__summary-row booking-modal__summary-row_total"
                >
                  <span>Итого:</span>
                  <span> ₴</span>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="booking-modal__payment">
            <div class="booking-modal__payment-info">
              <div class="booking-modal__section-title">Оплата</div>

              <div class="booking-modal__payment-item">
                <UiIcon name="location" />
                <span> г. {{ event.city }}, {{ event.location }} </span>
              </div>

              <div class="booking-modal__payment-item">
                <UiIcon name="calendar" />
                <span> </span>
              </div>

              <div class="booking-modal__payment-item">
                <UiIcon name="clock" />
                <span> </span>
              </div>
            </div>

            <div class="booking-modal__form">
              <ProfileForm @submit="handleSubmit" />
            </div>

            <div class="booking-modal__checkout">
              <div class="booking-modal__promo">
                <input
                  type="text"
                  placeholder="№ сертификата"
                  class="booking-modal__input"
                />

                <UiButton variant="outline"> Применить </UiButton>
              </div>

              <div class="booking-modal__checkout-total">К оплате ₴</div>

              <label class="booking-modal__checkbox">
                <input type="checkbox" />
                <span>Принимаю условия</span>
              </label>
            </div>
          </div>

          <div class="booking-modal__footer">
            <UiButton
              v-if="currentStep === 1"
              variant="outline"
              :disabled="!selectedSlot?.start || !selectedPackage?.id"
              @click="goToNextStep"
            >
              Далее
            </UiButton>

            <UiButton v-else variant="outline" @click="closeModal">
              Заказать экспресс-фотосессию
            </UiButton>
          </div>
        </div>
      </template>
    </UiModalContent>
  </UiModal>
</template>

<style scoped lang="scss">
.booking-modal {
  width: 100%;
  padding: 40px;
  height: 100vh;
  max-height: 100vh;
  margin-top: -5vh;
  margin-bottom: -5vh;

  &__steps {
    display: flex;
    gap: 40px;
    margin-bottom: 40px;
  }

  &__step {
    position: relative;
    padding-bottom: 12px;
    color: #b4b4b4;
    font-size: 12px;
    text-transform: uppercase;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background: #d8d8d8;
    }

    &_active {
      color: #111;

      &::after {
        background: #111;
      }
    }
  }

  &__title {
    margin-bottom: 40px;
    font-size: 34px;
    font-weight: 600;
    text-transform: uppercase;
  }

  &__content {
    display: grid;
    grid-template-columns: 240px 1fr 320px;
    gap: 40px;
  }

  &__image {
    width: 100%;
    height: 320px;
    object-fit: cover;
  }

  &__section-title {
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 600;
    text-transform: uppercase;
  }

  &__slots,
  &__packages {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 8px;
    margin-bottom: 32px;
  }

  &__slot,
  &__package {
    border: 1px solid #d8d8d8;
    background: transparent;
    padding: 10px 14px;
    cursor: pointer;
    transition: 0.2s;

    &_active {
      background: #111;
      color: white;
      border-color: #111;
    }
  }

  &__checkbox {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }

  &__summary-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__summary-row {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    &_total {
      padding-top: 20px;
      border-top: 1px solid #d8d8d8;
      font-weight: 700;
    }
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
  }

  &__payment {
    display: grid;
    grid-template-columns: 320px 1fr 320px;
    gap: 40px;
  }

  &__payment-info {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__payment-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__promo {
    display: flex;
    gap: 12px;
    margin-bottom: 32px;
  }

  &__input {
    width: 100%;
    border: 1px solid #d8d8d8;
    padding: 12px 16px;
    outline: none;
  }

  &__checkout-total {
    margin-bottom: 24px;
    font-size: 20px;
    font-weight: 700;
  }
}
</style>
