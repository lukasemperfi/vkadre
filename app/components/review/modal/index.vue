<script setup lang="ts">
const isOpen = defineModel<boolean>("isOpen", { default: false });

const locationsApi = useLocationsApi();

const cityOptions = [
  { label: "Одесса", value: "Одесса" },
  { label: "Южный", value: "Южный" },
];

const locationOptions = ref<{ label: string; value: string }[]>([]);

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: reviewModalSchema,
});

const { value: name } = useField<string>("name");
const { value: city } = useField<string>("city");
const { value: locationId } = useField<string>("locationId");
const { value: review } = useField<string>("review");

const isSubmitting = ref(false);

async function loadLocations() {
  if (locationOptions.value.length > 0) return;
  try {
    const list = await locationsApi.getLocations();
    locationOptions.value = list.map((loc) => ({
      label: loc.title,
      value: loc.id,
    }));
  } catch (e) {
    console.error(e);
  }
}

watch(
  () => isOpen.value,
  (open) => {
    if (open) {
      loadLocations();
    } else {
      setTimeout(() => {
        resetForm();
        isSubmitting.value = false;
      }, 300);
    }
  },
);

const onSubmit = handleSubmit(async () => {
  isSubmitting.value = true;
  await new Promise((r) => setTimeout(r, 900));
  isOpen.value = false;
});
</script>

<template>
  <UiModal v-model:is-open="isOpen">
    <UiModalOverlay />
    <UiModalContent>
      <UiModalHeader>Напишите отзыв</UiModalHeader>
      <UiModalCloseButton />
      <UiModalBody>
        <form class="review-modal__form" @submit.prevent="onSubmit">
          <UiLoadingOverlay v-if="isSubmitting" />

          <div class="review-modal__fields">
            <UiInput
              id="review-name"
              v-model="name"
              placeholder="ИМЯ"
              :error="errors.name"
              autocomplete="name"
            >
              <template #right>
                <UiIcon
                  v-if="name && !errors.name"
                  name="mark"
                  class="review-modal__valid-icon"
                  aria-hidden="true"
                />
              </template>
            </UiInput>

            <UiSelect
              id="review-city"
              v-model="city"
              :options="cityOptions"
              placeholder="ОТКУДА ВЫ?"
              :error-message="errors.city"
              error-id="review-city-error"
            />

            <UiSelect
              id="review-location"
              v-model="locationId"
              :options="locationOptions"
              placeholder="ЛОКАЦИЯ"
              :error-message="errors.locationId"
              error-id="review-location-error"
            />

            <div class="review-modal__textarea-wrap">
              <textarea
                id="review-text"
                v-model="review"
                class="review-modal__textarea"
                rows="4"
                placeholder="ВАШ ОТЗЫВ"
                :aria-invalid="errors.review ? 'true' : undefined"
                :aria-describedby="errors.review ? 'review-text-error' : undefined"
              />
              <p
                v-if="errors.review"
                id="review-text-error"
                class="review-modal__textarea-error"
                role="alert"
              >
                {{ errors.review }}
              </p>
            </div>
          </div>

          <div class="review-modal__actions">
            <div class="review-modal__submit-frame">
              <UiMenuButton
                type="button"
                label="ОТПРАВИТЬ ОТЗЫВ"
                class="review-modal__menu-btn"
                @click="onSubmit"
              />
            </div>
          </div>
        </form>
      </UiModalBody>
    </UiModalContent>
  </UiModal>
</template>

<style scoped lang="scss">
.review-modal__form {
  position: relative;
}

.review-modal__fields {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: globalFunctions.fluidValue(28px, 40px, 320px, 1440px);
}

.review-modal__valid-icon {
  color: var(--black);
}

.review-modal__textarea-wrap {
  position: relative;
  width: 100%;
  padding-bottom: globalFunctions.fluidValue(10px, 17px, 320px, 1440px);
  border-bottom: 1px solid var(--gray);
  transition: border-color 0.3s ease;

  &:focus-within {
    border-bottom-color: var(--black);
  }
}

.review-modal__textarea {
  display: block;
  width: 100%;
  min-height: 96px;
  resize: vertical;
  border: none;
  background: transparent;
  outline: none;
  padding: 0;
  margin: 0;
  font-family: var(--font-family);
  font-weight: 600;
  font-size: globalFunctions.fluidValue(14px, 16px, 320px, 1440px);
  line-height: 1.35;
  text-transform: uppercase;
  color: var(--black);

  @media (max-width: globalBreakpoints.$breakpoint-xs) {
    font-weight: 500;
  }

  &::placeholder {
    color: var(--black);
    opacity: 0.2;
  }
}

.review-modal__textarea-error {
  position: absolute;
  left: 0;
  top: calc(100% + 2px);
  margin: 0;
  font-size: 10px;
  line-height: 16px;
  color: var(--error);
}

.review-modal__textarea-wrap:has(.review-modal__textarea[aria-invalid="true"]) {
  border-bottom-color: var(--error);
}

.review-modal__actions {
  display: flex;
  justify-content: center;
}

.review-modal__submit-frame {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: min(100%, 280px);
  padding: globalFunctions.fluidValue(12px, 16px, 320px, 1440px)
    globalFunctions.fluidValue(20px, 32px, 320px, 1440px);
  border: 1px solid var(--black);
  background: #ffffff;
}

.review-modal__menu-btn {
  width: 100%;
  justify-content: center;
  text-align: center;

  :deep(.menu__link-text) {
    text-transform: uppercase;
    font-weight: 600;
  }
}
</style>
