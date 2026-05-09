<script setup lang="ts">
import { computed, ref } from "vue";
import type { UiCalendarEvent } from "../ui/calendar/types";

interface Props {
  event: UiCalendarEvent | null;
  isOpen: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:isOpen", value: boolean): void;
}>();

const locationsApi = useLocationsApi();

const currentStep = ref<1 | 2>(1);

const selectedSlotId = ref<string | null>(null);
const selectedPackageId = ref<string | null>(null);
const includeSourceFiles = ref(false);

const location = ref<LocationWithRelations | null>(null);
const pending = ref(false);

const loadLocation = async () => {
  if (!props?.event?.locationId) return;
  pending.value = true;

  try {
    location.value = await locationsApi.getLocation(props?.event?.locationId);
  } finally {
    pending.value = false;
  }
};
watch(
  () => props.isOpen,
  async (isOpen) => {
    if (isOpen && !location.value) {
      await loadLocation();
    }
  },
);

const selectedSlot = computed(() => {
  if (!location.value || !selectedSlotId.value) {
    return null;
  }

  return location.value.slots.find((slot) => slot.id === selectedSlotId.value);
});

const selectedPackage = computed(() => {
  if (!location.value || !selectedPackageId.value) {
    return null;
  }

  return location.value.service_packages.find(
    (item) => item.id === selectedPackageId.value,
  );
});

const totalPrice = computed(() => {
  if (!selectedPackage.value) {
    return 0;
  }

  let total = Number(selectedPackage.value.price);

  if (includeSourceFiles.value) {
    total += 1290;
  }

  return total;
});

const formattedSlots = computed(() => {
  if (!location.value) {
    return [];
  }

  return location.value.slots
    .filter((slot) => !slot.is_booked)
    .map((slot) => {
      const start = new Date(slot.start_time);

      const end = new Date(slot.end_time);

      return {
        id: slot.id,
        label: `${start.toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        })}`,
        fullLabel: `${start.toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        })} - ${end.toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        })}`,
      };
    });
});

const formattedPackages = computed(() => {
  if (!location.value) {
    return [];
  }

  return location.value.service_packages.map((item: any) => ({
    id: item.id,
    duration: item.duration_minutes,
    price: item.price,
  }));
});

const formattedDate = computed(() => {
  if (!selectedSlot.value) {
    return "";
  }

  return new Date(selectedSlot.value.start_time)
    .toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
    })
    .toUpperCase();
});

const closeModal = () => {
  emit("update:isOpen", false);
};

const goToNextStep = () => {
  if (!selectedSlotId.value || !selectedPackageId.value) {
    return;
  }

  currentStep.value = 2;
};

const handleSubmit = (formData: unknown) => {
  console.log("booking submit", {
    formData,
    slot: selectedSlot.value,
    package: selectedPackage.value,
  });
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

      <template v-if="location">
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
          {{ formattedDate }}: {{ location.title }}
        </div>

        <div v-if="currentStep === 1" class="booking-modal__content">
          <div class="booking-modal__image-wrapper">
            <img
              :src="location.image_url ?? ''"
              :alt="location.title"
              class="booking-modal__image"
            />
          </div>

          <div class="booking-modal__times">
            <div class="booking-modal__section-title">Выберите время</div>

            <div class="booking-modal__slots">
              <button
                v-for="slot in formattedSlots"
                :key="slot.id"
                type="button"
                class="booking-modal__slot"
                :class="{
                  'booking-modal__slot_active': selectedSlotId === slot.id,
                }"
                @click="selectedSlotId = slot.id"
              >
                {{ slot.label }}
              </button>
            </div>

            <div class="booking-modal__section-title">
              Длительность фотосессии
            </div>

            <div class="booking-modal__packages">
              <button
                v-for="item in formattedPackages"
                :key="item.id"
                type="button"
                class="booking-modal__package"
                :class="{
                  'booking-modal__package_active':
                    selectedPackageId === item.id,
                }"
                @click="selectedPackageId = item.id"
              >
                {{ item.duration }} мин
              </button>
            </div>

            <label class="booking-modal__checkbox">
              <input v-model="includeSourceFiles" type="checkbox" />

              <span>Исходники</span>
            </label>
          </div>

          <div class="booking-modal__summary">
            <div class="booking-modal__section-title">Сумма</div>

            <div class="booking-modal__summary-list">
              <div class="booking-modal__summary-row">
                <span>Стоимость фотосессии:</span>
                <span> {{ selectedPackage?.price ?? 0 }} ₴ </span>
              </div>

              <div class="booking-modal__summary-row">
                <span>Исходники:</span>
                <span>
                  {{ includeSourceFiles ? "1290 ₴" : "0 ₴" }}
                </span>
              </div>

              <div
                class="booking-modal__summary-row booking-modal__summary-row_total"
              >
                <span>Итого:</span>
                <span>{{ totalPrice }} ₴</span>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="booking-modal__payment">
          <div class="booking-modal__payment-info">
            <div class="booking-modal__section-title">Оплата</div>

            <div class="booking-modal__payment-item">
              <UiIcon name="location" />
              <span> г. {{ location.city }}, {{ location.address }} </span>
            </div>

            <div class="booking-modal__payment-item">
              <UiIcon name="calendar" />
              <span>
                {{ formattedDate }}
              </span>
            </div>

            <div class="booking-modal__payment-item">
              <UiIcon name="clock" />
              <span>
                {{
                  formattedSlots.find((slot: any) => slot.id === selectedSlotId)
                    ?.fullLabel
                }}
              </span>
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

            <div class="booking-modal__checkout-total">
              К оплате {{ totalPrice }} ₴
            </div>

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
            :disabled="!selectedSlotId || !selectedPackageId"
            @click="goToNextStep"
          >
            Далее
          </UiButton>

          <UiButton v-else variant="outline" @click="closeModal">
            Заказать экспресс-фотосессию
          </UiButton>
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
    display: flex;
    flex-wrap: wrap;
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
