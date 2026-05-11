<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
  slides: any[];
  initialSlide?: number;
}>();

const emit = defineEmits<{
  (e: "update:isOpen", value: boolean): void;
}>();

const galleryCarouselOptions = computed(() => ({
  initialSlide: props.initialSlide || 0,
  slidesPerView: 1.15,
  spaceBetween: 0,
  speed: 800,
  autoplay: false,
  centeredSlides: true,
  loop: true,
  breakpoints: {
    450: { slidesPerView: 2 },
    600: { slidesPerView: 3 },
    1250: { slidesPerView: 3 },
  },
}));

const galleryCarouselRef = ref(null);
const isSliderReady = ref(false);

onMounted(async () => {
  await nextTick();
  isSliderReady.value = true;
});
</script>

<template>
  <UiModal
    :is-open="isOpen"
    @update:is-open="emit('update:isOpen', $event)"
    class="modal-pic-preview-group"
  >
    <UiModalOverlay />
    <UiModalContent class="modal-pic-preview">
      <UiModalCloseButton class="modal-pic-preview__close" />
      <div class="modal-pic-preview__header">
        <p class="modal-pic-preview__text modal-pic-preview__text_header">
          Самый доступный вид фотосессии, в результате которой Вы получите
          качественные
        </p>
      </div>
      <div class="modal-pic-preview__slider-wrapper">
        <UiCarousel
          ref="galleryCarouselRef"
          class="modal-pic-preview__swiper"
          :items="slides"
          :options="galleryCarouselOptions"
        >
          <template #item="{ item }">
            <div class="modal-pic-preview__slide-image-wrap">
              <NuxtImg
                :src="item.src"
                :alt="item.alt"
                format="webp"
                class="modal-pic-preview__slide-image"
              />
            </div>
          </template>
        </UiCarousel>
      </div>
      <div class="modal-pic-preview__footer">
        <div class="app-container">
          <div class="modal-pic-preview__text modal-pic-preview__text_footer">
            Самый доступный вид фотосессии, в результате которой Вы получите
            качественные
          </div>
          <div class="modal-pic-preview__nav-controls">
            <UiCarouselNavButtons
              variant="arrow"
              :carousel="galleryCarouselRef"
              v-show="isSliderReady"
            />
          </div>
        </div>
      </div>
    </UiModalContent>
  </UiModal>
</template>

<style scoped lang="scss">
.modal-pic-preview {
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  margin-top: -5vh;
  margin-bottom: -5vh;
  overflow-y: auto;
  position: relative;

  display: flex;
  flex-direction: column;

  &__header {
    flex: 1;
  }

  &__footer {
    flex: 1;
    display: flex;
    justify-content: center;
    position: relative;

    .app-container {
      display: flex;
      justify-content: center;
      position: relative;
    }
  }

  &__nav-controls {
    position: absolute;
    top: globalFunctions.fluidValue(24px, 40px, 320px, 1440px);
    right: 96px;

    @media (max-width: 1439px) {
      display: none;
    }
  }

  &__text {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    color: var(--black);
    padding-top: globalFunctions.fluidValue(24px, 40px, 320px, 1440px);
    padding-bottom: globalFunctions.fluidValue(58px, 68px, 320px, 1440px);
    max-width: 455px;

    @media (max-width: 600px) {
      font-size: 14px;
      line-height: 22px;
    }

    &_header {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }
  }

  &__slider-wrapper {
    margin-block: auto;
    max-width: 1440px;
    align-self: center;

    @media (max-width: 1439px) {
      align-self: auto;
    }
  }

  &__swiper {
  }

  &__slide-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__slide-image-wrap {
    aspect-ratio: 454 / 580;
    transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    opacity: 0.2;
    width: 100%;
    height: 100%;

    @media (max-width: 600px) {
      aspect-ratio: 272 / 348;
    }
  }

  :deep(.swiper-slide-active) {
    .modal-pic-preview__slide-image-wrap {
      opacity: 1;
    }
  }

  :deep(.swiper-wrapper) {
    transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1) !important;
  }
}
</style>
