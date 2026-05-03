<script setup lang="ts">
const { getLocations } = useLocationsApi();

const { data: locations } = await useAsyncData("home-locations", () =>
  getLocations(),
);

const galleryCarouselRef = ref(null);
const isSliderReady = ref(false);

onMounted(async () => {
  await nextTick();
  isSliderReady.value = true;
});

const locationsCarouselOptions = {
  slidesPerView: 1.15,
  spaceBetween: 16,
  autoplay: false,
  breakpoints: {
    769: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 32,
    },
  },
};
</script>

<template>
  <section v-if="locations && locations.length" class="locations">
    <div class="app-container">
      <div class="locations__wrapper">
        <h2 class="locations__title h-2">Информация о локациях</h2>
        <div class="locations__slider">
          <HomeLocationsSkeleton v-if="!isSliderReady" />
          <UiCarousel
            v-else
            ref="galleryCarouselRef"
            class="locations__swiper"
            :items="locations"
            :options="locationsCarouselOptions"
          >
            <template #item="{ item }">
              <LocationCard :key="item.id" :location="item" />
            </template>
          </UiCarousel>
        </div>

        <div class="locations__bottom">
          <UiButton
            variant="outline"
            label="Смотреть все Локации"
            class="locations__button"
          />
          <UiCarouselNavButtons
            variant="arrow"
            :carousel="galleryCarouselRef"
            v-show="isSliderReady"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.locations {
  &__wrapper {
    border-bottom: 1px solid var(--gray);
    padding-bottom: globalFunctions.fluidValue(39px, 99px, 320px, 1440px);
  }

  &__title {
    margin-bottom: globalFunctions.fluidValue(16px, 60px, 320px, 1440px);
  }

  &__slider {
    margin-bottom: globalFunctions.fluidValue(40px, 59px, 320px, 1440px);

    @media (max-width: globalBreakpoints.$breakpoint-sm) {
      margin-right: globalFunctions.fluidValue(-24px, -96px, 320px, 1440px);
    }
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    :deep(.nav-buttons) {
      transform: translateY(8px);

      @media (max-width: globalBreakpoints.$breakpoint-sm) {
        display: none;
      }
    }
  }

  &__button {
    @media (max-width: globalBreakpoints.$breakpoint-sm) {
      width: 100%;
    }
  }
}
</style>
