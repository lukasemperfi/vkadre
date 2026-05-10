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

const bookingsApi = useBookingsApi();
const currentStep = ref<1 | 2>(1);

const selectedSlot = shallowRef<BookingSlot | null>(null);
const selectedPackage = ref<(typeof packages)[0] | null>(packages[0]!);
const sources = ref(false);
const pending = ref(false);
const SOURCES_PRICE = 199;
const isAcceptTerms = ref(false);
const termsError = ref("");

const profileFormRef = ref<{
  submitForm: () => void;
} | null>(null);

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

const toSqlDateTime = (date: ZonedDateTime) => {
  return date.toDate().toISOString();
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

const eventCardDate = computed(() => {
  return formateDate(props.event?.start, {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
});

const eventCardTime = computed(() => {
  if (!selectedSlot.value) {
    return;
  }
  return `${formatTime(selectedSlot.value.start)}  -  ${formatTime(selectedSlot.value.end)}`;
});

const formateDate = (
  date?: ZonedDateTime,
  options?: Intl.DateTimeFormatOptions,
) => {
  return date?.toDate().toLocaleDateString("ru-RU", options);
};

const resetState = () => {
  selectedSlot.value = null;
  selectedPackage.value = packages[0]!;
  sources.value = false;
  pending.value = false;
  isAcceptTerms.value = false;
  termsError.value = "";
  currentStep.value = 1;
};

const closeModal = () => {
  resetState();

  emit("update:isOpen", false);
};

const goToNextStep = () => {
  if (!selectedSlot.value || !selectedPackage.value) {
    return;
  }

  currentStep.value = 2;
};

const triggerProfileSubmit = () => {
  if (!isAcceptTerms.value) {
    termsError.value = "Необходимо принять условия";
    return;
  }

  termsError.value = "";

  profileFormRef.value?.submitForm();
};
const handleProfileSubmit = async (data: any) => {
  if (
    !selectedSlot.value ||
    !selectedPackage.value ||
    !props.event?.locationId
  ) {
    return;
  }

  pending.value = true;

  const bookingPayload = {
    location_id: props.event.locationId,
    start_time: toSqlDateTime(selectedSlot.value.start),
    end_time: toSqlDateTime(selectedSlot.value.end),
    name: data.values.name,
    phone: data.values.phone,
    email: data.values.email,
    duration_minutes: selectedPackage.value.duration_minutes,
    price: totalPrice.value,
    source: sources.value ? 1 : 0,
  };

  await bookingsApi.createBooking(bookingPayload);
  pending.value = false;
  data.actions.resetForm();
  resetState();
  closeModal();
};

const handlePackageClick = (item: (typeof packages)[0]) => {
  selectedPackage.value = item;
  console.log("selectedPackage", selectedPackage.value);
};

const formatTime = (date: any) => {
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

const sessionPrice = computed(() => {
  return selectedPackage.value?.price ?? 0;
});

const sourcesPrice = computed(() => {
  return sources.value ? SOURCES_PRICE : 0;
});

const totalPrice = computed(() => {
  return sessionPrice.value + sourcesPrice.value;
});

const cardLocation = computed(() => {
  return `г. ${props.event?.city}, ${props.event?.title}`;
});
</script>

<template>
  <UiModal
    :is-open="isOpen"
    @update:is-open="emit('update:isOpen', $event)"
    class="booking-modal-group"
  >
    <UiModalOverlay />

    <UiModalContent class="booking-modal">
      <UiModalCloseButton class="booking-modal__close" @click="closeModal" />
      <UiLoadingOverlay v-if="pending" />

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

          <div class="booking-modal__title h-2">
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

            <hr class="divider" />
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

              <label class="custom-checkbox">
                <input v-model="sources" type="checkbox" />
                <span class="checkmark"></span>
                <span>Исходники (весь отснятый материал)</span>
              </label>
            </div>
            <hr class="divider" />
            <div class="booking-modal__summary">
              <div class="booking-modal__section-title">Сумма</div>

              <div class="booking-modal__summary-list">
                <div class="booking-modal__summary-row">
                  <span>Стоимость фотосессии:</span>
                  <span> {{ sessionPrice }} ₴ </span>
                </div>

                <div class="booking-modal__summary-row">
                  <span>Исходники:</span>
                  <span> {{ sources ? SOURCES_PRICE : 0 }} ₴ </span>
                </div>

                <div
                  class="booking-modal__summary-row booking-modal__summary-row_total"
                >
                  <span>Итого:</span>
                  <span> {{ totalPrice }} ₴ </span>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="booking-modal__payment">
            <div class="booking-modal__payment-info">
              <div class="booking-modal__section-title">Оплата</div>
              <ProfileBookingCard
                :title="event.title"
                :location="cardLocation"
                :date="eventCardDate || ``"
                :time="eventCardTime || ``"
              />
            </div>

            <hr class="divider" />

            <div class="booking-modal__form">
              <ProfileForm ref="profileFormRef" @submit="handleProfileSubmit" />
            </div>

            <div class="booking-modal__checkout">
              <div class="booking-modal__promo">
                <UiInput
                  placeholder="№ сертификата"
                  class="booking-modal__input"
                />

                <UiButton variant="outline" class="profile-form__button-apply">
                  Применить
                </UiButton>
              </div>

              <div class="booking-modal__checkout-total">
                К оплате
                <span class="booking-modal__checkout-total-price">
                  {{ totalPrice }} ₴
                </span>
              </div>

              <label class="custom-checkbox booking-modal__checkbox-terms">
                <input
                  v-model="isAcceptTerms"
                  type="checkbox"
                  @change="termsError = ''"
                />

                <span class="checkmark"></span>
                <span>Принимаю условия</span>
                <div v-if="termsError" class="booking-modal__checkbox-error">
                  {{ termsError }}
                </div>
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

            <UiButton v-else variant="outline" @click="triggerProfileSubmit">
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
  padding-block: 45px;
  height: 100vh;
  max-height: 100vh;
  margin-top: -5vh;
  margin-bottom: -5vh;
  overflow-y: auto;
  position: relative;

  &__steps {
    display: flex;
    gap: globalFunctions.fluidValue(4px, 33px, 320px, 1440px);
    margin-bottom: globalFunctions.fluidValue(40px, 82px, 320px, 1440px);
  }

  &__step {
    position: relative;
    padding-top: 18px;
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 14px;
    text-transform: uppercase;
    color: var(--gray);
    width: 20.8vw;
    border-top: 1px solid var(--gray);
    white-space: nowrap;

    @media (max-width: 900px) {
      color: white;
    }

    &_active {
      color: var(--black);
      border-top: 1px solid var(--black);

      @media (max-width: 900px) {
        color: white;
      }
    }
  }

  &__title {
    margin-bottom: globalFunctions.fluidValue(24px, 60px, 320px, 1440px);
  }

  &__content {
    display: grid;
    grid-template-columns: 280fr max-content 338fr max-content 359fr;
    gap: 65px;

    @media (max-width: 1439px) {
      grid-template-columns: 1fr;
    }
  }

  &__image-wrapper {
    aspect-ratio: 280/329;
    max-width: 280px;

    @media (max-width: 1439px) {
      display: none;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__section-title {
    font-family: var(--font-family);
    font-weight: 700;
    font-size: 18px;
    color: var(--black);
    margin-bottom: 30px;
  }

  &__slots,
  &__packages {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 8px;
    margin-bottom: 32px;
  }

  &__slots {
    height: 136px;
    overflow: auto;
    padding-right: 8px;
    margin-right: -8px;

    @media (max-width: 1439px) {
      height: auto;
      padding-right: 0;
      margin-right: 0;
    }
  }

  &__packages {
    display: flex;
    gap: 8px;
  }

  &__slot,
  &__package {
    background: transparent;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.2s;
    white-space: nowrap;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    border: 1px solid var(--gray);

    &_active {
      color: white;
      border-color: var(--gray);
      background-color: var(--black);
    }
  }

  &__checkbox {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }

  &__checkbox-error {
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    font-size: 10px;
    line-height: 16px;
    color: var(--error);
  }

  &__checkbox-terms {
    position: relative;
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

    @media (max-width: 450px) {
      button {
        width: 100%;
      }
    }
  }

  &__payment {
    display: grid;
    grid-template-columns: 269fr max-content 360fr 424fr;
    gap: 55px;

    @media (max-width: 1439px) {
      grid-template-columns: 1fr;
    }
  }

  &__payment-info {
  }

  &__payment-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__promo {
    display: flex;
    gap: 12px;
    justify-content: space-between;
    margin-bottom: 32px;
    flex-wrap: wrap;
    :deep(.ui-inpu) {
      flex: 50%;
    }
  }

  &__close {
    right: globalFunctions.fluidValue(24px, 96px, 320px, 1440px);
  }

  .divider {
    height: 100%;
    width: 1px;
    background-color: var(--gray);

    @media (max-width: 1439px) {
      display: none;
    }
  }

  .custom-checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .custom-checkbox input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    display: inline-block;
    height: 24px;
    width: 24px;
    background-color: transparent;
    border-radius: 2px;
    position: relative;
    cursor: pointer;
    border: 1px solid var(--black);
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
    left: 50%;
    top: 50%;
    width: 6px;
    height: 12px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  .custom-checkbox input:checked ~ .checkmark:after {
    display: block;
  }
  .custom-checkbox input:checked ~ .checkmark {
    background-color: var(--black);
  }

  :deep(.booking-card) {
    .booking-card__title,
    .booking-card__actions {
      display: none;
    }
  }

  :deep(.profile-form__button) {
    display: none;
  }

  &__checkout-total {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    color: var(--black);
    margin-bottom: 40px;
  }

  &__checkout-total-price {
    font-weight: 600;
  }

  .profile-form__button-apply {
    border: 1px solid var(--gray);
    color: var(--gray);
  }
}
</style>
