<script setup lang="ts">
const { getLocationReviews } = useLocationReviewsApi();

const { data: reviews } = await useAsyncData("home-reviews", () =>
  getLocationReviews(),
);

console.log("reviews", reviews.value);

const galleryCarouselRef = ref(null);

const reviewsCarouselOptions = {
  slidesPerView: 1.15,
  spaceBetween: 16,
  autoplay: false,
  breakpoints: {
    550: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
  },
};
</script>

<template>
  <section class="reviews">
    <div class="app-container">
      <div class="reviews__wrapper">
        <h2 class="reviews__title h-2">Отзывы Клиентов</h2>
        <div class="reviews__slider">
          <UiCarousel
            ref="galleryCarouselRef"
            class="reviews__swiper"
            :items="reviews ?? []"
            :options="reviewsCarouselOptions"
          >
            <template #item="{ item }">
              <ReviewCard :key="item.id" :review="item" />
            </template>
          </UiCarousel>
        </div>

        <div class="reviews__bottom">
          <div class="reviews__bottom-buttons">
            <UiCarouselNavButtons
              variant="arrow"
              :carousel="galleryCarouselRef"
            />
            <UiButton
              variant="outline"
              label="Оставить отзыв"
              class="reviews__button"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.reviews {
  &__wrapper {
    border-bottom: 1px solid var(--gray);
    padding-bottom: globalFunctions.fluidValue(39px, 99px, 320px, 1440px);
  }

  &__title {
    margin-bottom: globalFunctions.fluidValue(24px, 58px, 320px, 1440px);
  }

  &__slider {
    @media (max-width: globalBreakpoints.$breakpoint-sm) {
      margin-right: globalFunctions.fluidValue(-24px, -96px, 320px, 1440px);
    }

    :deep(.swiper-slide) {
      opacity: 0.3;
      transition: opacity 0.3s ease;
    }
    :deep(.swiper-slide-active) {
      opacity: 1;
    }
  }

  &__bottom {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    :deep(.nav-buttons) {
      transform: translateY(8px);

      @media (max-width: globalBreakpoints.$breakpoint-sm) {
        display: none;
      }
    }
    &-buttons {
      max-width: 637px;
      display: flex;
      justify-content: space-between;

      gap: 50px;
    }
  }

  &__button {
    width: 285px;
    @media (max-width: globalBreakpoints.$breakpoint-sm) {
      width: 100%;
    }
  }
}
</style>
