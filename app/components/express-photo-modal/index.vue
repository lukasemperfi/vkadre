<script setup lang="ts">
import {
  parseAbsoluteToLocal,
  today,
  getLocalTimeZone,
  CalendarDate,
  type ZonedDateTime,
} from "@internationalized/date";
import type { UiCalendarEvent } from "../ui/calendar/types";

interface Props {
  isOpen: boolean;
}

interface BookingSlot {
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
const locationsApi = useLocationsApi();

const locations = ref<LocationWithRelations[]>([]);
const bookings = ref<any[]>([]);
const currentStep = ref<1 | 2 | 3>(1);
const selectedLocation = ref<LocationWithRelations | null>(null);
const selectedSlot = shallowRef<BookingSlot | null>(null);
const selectedPackage = ref(packages[0]);
const currentSelectedDay = ref<any>(null);

const sources = ref(false);
const pending = ref(false);
const SOURCES_PRICE = 199;
const isAcceptTerms = ref(false);
const termsError = ref("");

type Tabs = "all" | "south" | "odessa";
const activeTab = ref<Tabs>("all");

const profileFormRef = ref<{ submitForm: () => void } | null>(null);

watch(
  () => props.isOpen,
  async (isOpen) => {
    if (isOpen) {
      pending.value = true;
      try {
        locations.value = await locationsApi.getLocations();
      } catch (e) {
        console.error(e);
      } finally {
        pending.value = false;
      }
    }
  },
  { immediate: true },
);

const filteredLocationsByCity = computed(() => {
  const map: Record<Tabs, string> = {
    all: "Все",
    odessa: "Одесса",
    south: "Южный",
  };
  if (activeTab.value === "all") return locations.value;

  return locations.value.filter(
    (loc) => loc.city.toLowerCase() === map[activeTab.value].toLowerCase(),
  );
});

const locationEvents = computed<UiCalendarEvent[]>(() => {
  if (!selectedLocation.value) return [];
  return selectedLocation.value.slots.map((slot) => ({
    id: slot.id,
    title: selectedLocation.value!.title,
    locationId: selectedLocation.value!.id,
    start: parseAbsoluteToLocal(slot.start_time),
    end: parseAbsoluteToLocal(slot.end_time),
  }));
});

watch(locationEvents, (events) => {
  if (events.length > 0 && !currentSelectedDay.value) {
    const now = today(getLocalTimeZone());

    const futureEvents = events.filter((e) => {
      const eventDate = new CalendarDate(
        e.start.year,
        e.start.month,
        e.start.day,
      );
      return eventDate.compare(now) >= 0;
    });

    if (futureEvents.length > 0) {
      const sorted = [...futureEvents].sort((a, b) => a.start.compare(b.start));
      currentSelectedDay.value = sorted[0]?.start;
    }
  }
});

const generatedEvent = computed<UiCalendarEvent | null>(() => {
  if (!selectedLocation.value) return null;
  const firstSlot = selectedLocation.value.slots[0];
  if (!firstSlot) return null;
  return {
    id: selectedLocation.value.id,
    title: selectedLocation.value.title,
    locationId: selectedLocation.value.id,
    city: selectedLocation.value.city,
    location: selectedLocation.value.address,
    image_url: selectedLocation.value.image_url,
    start: parseAbsoluteToLocal(firstSlot.start_time),
    end: parseAbsoluteToLocal(firstSlot.end_time),
  };
});

watch(selectedLocation, async (newLoc) => {
  if (newLoc) {
    try {
      bookings.value = await bookingsApi.getBookingsByLocation(newLoc.id);
    } catch (e) {
      console.error(e);
    }
  }
});

const createBookingSlots = (
  start: ZonedDateTime,
  end: ZonedDateTime,
  intervalInMinutes: number,
): BookingSlot[] => {
  const slots: BookingSlot[] = [];
  let currentStart = start;
  while (true) {
    const currentEnd = currentStart.add({ minutes: intervalInMinutes });
    if (currentEnd.compare(end) > 0) break;
    slots.push({ start: currentStart, end: currentEnd });
    currentStart = currentEnd;
  }
  return slots;
};

const slotsWithStatus = computed(() => {
  if (!currentSelectedDay.value || !selectedLocation.value) return [];

  const dayEvents = locationEvents.value.filter(
    (e) =>
      e.start.day === currentSelectedDay.value.day &&
      e.start.month === currentSelectedDay.value.month &&
      e.start.year === currentSelectedDay.value.year,
  );

  return dayEvents
    .flatMap((event) =>
      createBookingSlots(
        event.start,
        event.end,
        selectedPackage.value?.duration_minutes ?? 10,
      ),
    )
    .map((slot) => ({
      ...slot,
      disabled: isSlotBooked(slot),
    }));
});

const isSlotBooked = (slot: BookingSlot) => {
  const slotStart = slot.start.toDate().getTime();
  const slotEnd = slot.end.toDate().getTime();
  return bookings.value.some((b) => {
    const bookingStart = new Date(b.start_time).getTime();
    const bookingEnd = new Date(b.end_time).getTime();
    return slotStart < bookingEnd && slotEnd > bookingStart;
  });
};

const formattedDate = computed(() => {
  return currentSelectedDay.value?.toDate().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
});

const eventCardDate = computed(() => {
  if (!currentSelectedDay.value) return "";
  return currentSelectedDay.value.toDate().toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
});

const eventCardTime = computed(() => {
  if (!selectedSlot.value) return "";
  return `${formatTime(selectedSlot.value.start)} - ${formatTime(selectedSlot.value.end)}`;
});

const formatTime = (date: any) => {
  return date.toDate().toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const resetState = () => {
  selectedLocation.value = null;
  selectedSlot.value = null;
  currentSelectedDay.value = null;
  selectedPackage.value = packages[0];
  currentStep.value = 1;
  sources.value = false;
  isAcceptTerms.value = false;
  bookings.value = [];
  activeTab.value = "all";
};

const closeModal = () => {
  resetState();
  emit("update:isOpen", false);
};

const goToNextStep = () => {
  if (currentStep.value === 1 && selectedLocation.value) currentStep.value = 2;
  else if (currentStep.value === 2 && selectedSlot.value) currentStep.value = 3;
};

const handleProfileSubmit = async (data: any) => {
  if (!selectedSlot.value || !selectedLocation.value) return;
  pending.value = true;
  try {
    const bookingPayload = {
      location_id: selectedLocation.value.id,
      start_time: selectedSlot.value.start.toDate().toISOString(),
      end_time: selectedSlot.value.end.toDate().toISOString(),
      name: data.values.name,
      phone: data.values.phone,
      email: data.values.email,
      duration_minutes: selectedPackage?.value?.duration_minutes ?? 10,
      price: totalPrice.value,
      source: sources.value ? 1 : 0,
    };
    await bookingsApi.createBooking(bookingPayload);
    closeModal();
  } catch (e) {
    console.error(e);
  } finally {
    pending.value = false;
  }
};

const handleSlotClick = (slot: BookingSlot) => (selectedSlot.value = slot);
const handlePackageClick = (item: any) => (selectedPackage.value = item);

const sessionPrice = computed(() => selectedPackage.value?.price ?? 0);
const totalPrice = computed(
  () => sessionPrice.value + (sources.value ? SOURCES_PRICE : 0),
);
const cardLocation = computed(() =>
  selectedLocation.value
    ? `г. ${selectedLocation.value.city}, ${selectedLocation.value.title}`
    : "",
);

const triggerProfileSubmit = () => {
  if (!isAcceptTerms.value) {
    termsError.value = "Необходимо принять условия";
    return;
  }
  profileFormRef.value?.submitForm();
};

const handleDayClick = (payload: { date: any; events: UiCalendarEvent[] }) => {
  currentSelectedDay.value = payload.date;
  selectedSlot.value = null;
};

const handleLocationClick = (location: LocationWithRelations) => {
  selectedLocation.value = location;
};

const getCellClass = (date: any) => {
  const hasEvents = locationEvents.value.some(
    (e) =>
      e.start.day === date.day &&
      e.start.month === date.month &&
      e.start.year === date.year,
  );
  return hasEvents ? "" : "calendar-month__cell_empty";
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
      <UiModalCloseButton class="booking-modal__close" @click="closeModal" />
      <UiLoadingOverlay v-if="pending" />

      <div class="app-container">
        <div class="booking-modal__steps">
          <div
            class="booking-modal__step"
            :class="{ 'booking-modal__step_active': currentStep === 1 }"
          >
            Локация
          </div>
          <div
            class="booking-modal__step"
            :class="{ 'booking-modal__step_active': currentStep === 2 }"
          >
            Время и данные
          </div>
          <div
            class="booking-modal__step"
            :class="{ 'booking-modal__step_active': currentStep === 3 }"
          >
            Оплата
          </div>
        </div>

        <div class="booking-modal__title h-2">
          <template v-if="currentStep === 1">Выберите локацию</template>
          <template v-else-if="currentStep === 2"
            >Выберите дату и время</template
          >
          <template v-else-if="currentStep === 3">Оплата</template>
        </div>

        <div v-if="currentStep === 1" class="booking-modal__locations">
          <UiTabs v-model="activeTab">
            <UiTabsList class="calendar__view-tabs-list">
              <UiTabsTrigger id="all">Все</UiTabsTrigger>
              <UiTabsTrigger id="south">Южный</UiTabsTrigger>
              <UiTabsTrigger id="odessa">Одесса</UiTabsTrigger>
            </UiTabsList>
            <div class="booking-modal__locations-list">
              <div
                v-for="location in filteredLocationsByCity"
                :key="location.id"
                class="booking-modal__location"
                :style="{
                  opacity: selectedLocation?.id === location.id ? 1 : 0.5,
                }"
                @click="handleLocationClick(location)"
              >
                <div class="booking-modal__location-image">
                  <NuxtImg
                    :src="location.image_url"
                    :alt="location.title"
                    format="webp"
                    class="booking-modal__location-image-img"
                  />
                </div>
                <div class="booking-modal__location-title">
                  {{ location.title }}
                </div>
              </div>
            </div>
          </UiTabs>
        </div>

        <div
          v-else-if="currentStep === 2 && generatedEvent"
          class="booking-modal__content"
        >
          <UiCalendarDatePicker
            :events="locationEvents"
            :current-selected-day="currentSelectedDay"
            @day-click="handleDayClick"
          />

          <template v-if="currentSelectedDay">
            <hr class="divider" />
            <div class="booking-modal__times">
              <div class="booking-modal__section-title">
                Выберите подходящее время
              </div>
              <div class="booking-modal__slots">
                <button
                  v-for="slot in slotsWithStatus"
                  :key="slot.start.toString()"
                  type="button"
                  class="booking-modal__slot"
                  :disabled="slot.disabled"
                  :class="{
                    'booking-modal__slot_active':
                      selectedSlot?.start.toString() === slot.start.toString(),
                    'booking-modal__slot_disabled': slot.disabled,
                  }"
                  @click="!slot.disabled && handleSlotClick(slot)"
                >
                  {{ formatTime(slot.start) }} - {{ formatTime(slot.end) }}
                </button>
                <div
                  v-if="slotsWithStatus.length === 0"
                  class="booking-modal__no-slots"
                >
                  Нет доступных слотов на эту дату
                </div>
              </div>

              <div class="booking-modal__section-title">
                Длительность фотосессии
              </div>
              <div class="booking-modal__packages">
                <button
                  v-for="item in packages"
                  :key="item.id"
                  class="booking-modal__package"
                  :class="{
                    'booking-modal__package_active':
                      selectedPackage?.id === item.id,
                  }"
                  @click="handlePackageClick(item)"
                >
                  {{ item.duration_minutes }} мин
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
                  <span>{{ sessionPrice }} ₴</span>
                </div>
                <div class="booking-modal__summary-row">
                  <span>Исходники:</span>
                  <span>{{ sources ? SOURCES_PRICE : 0 }} ₴</span>
                </div>
                <div
                  class="booking-modal__summary-row booking-modal__summary-row_total"
                >
                  <span>Итого:</span>
                  <span>{{ totalPrice }} ₴</span>
                </div>
              </div>
            </div>
          </template>
        </div>

        <div
          v-else-if="currentStep === 3 && generatedEvent"
          class="booking-modal__payment"
        >
          <div class="booking-modal__payment-info">
            <div class="booking-modal__section-title">Оплата</div>
            <ProfileBookingCard
              :title="generatedEvent.title"
              :location="cardLocation"
              :date="eventCardDate"
              :time="eventCardTime"
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
              <UiButton variant="outline" class="profile-form__button-apply"
                >Применить</UiButton
              >
            </div>
            <div class="booking-modal__checkout-total">
              К оплате
              <span class="booking-modal__checkout-total-price"
                >{{ totalPrice }} ₴</span
              >
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
            v-if="currentStep === 1 || currentStep === 2"
            variant="outline"
            :disabled="
              (currentStep === 1 && !selectedLocation) ||
              (currentStep === 2 && !selectedSlot)
            "
            @click="goToNextStep"
          >
            Далее
          </UiButton>
          <UiButton v-else variant="outline" @click="triggerProfileSubmit">
            Заказать фотосессию
          </UiButton>
        </div>
      </div>
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

  &__slot_disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
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
    :deep(.ui-input) {
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

  &__locations-list {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: globalFunctions.fluidValue(15px, 35px, 320px, 1440px);
    max-height: 470px;
    overflow-y: auto;
    padding-right: 24px;
    margin-right: -24px;

    @media (max-width: 1439px) {
      grid-template-columns: repeat(auto-fill, minmax(126px, 1fr));
      max-height: 65vh;
    }
  }

  &__location-image {
    aspect-ratio: 180/170;
    margin-bottom: 18px;

    @media (max-width: 1439px) {
      aspect-ratio: 126/120;
    }
  }

  &__location-image-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__location-title {
    font-family: var(--font-family);
    font-weight: 700;
    font-size: 14px;
    line-height: 22px;
    color: var(--black);
  }

  &__no-slots {
    grid-column: 1 / -1;
  }
}
</style>
