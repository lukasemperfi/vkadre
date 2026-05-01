<script setup lang="ts">
const photos = [
  { id: 1, src: "https://picsum.photos/seed/w-a1/232/195", alt: "" },
  { id: 2, src: "https://picsum.photos/seed/w-a2/232/195", alt: "" },
  { id: 3, src: "https://picsum.photos/seed/w-a3/232/195", alt: "" },
  { id: 4, src: "https://picsum.photos/seed/w-a4/232/195", alt: "" },
  { id: 5, src: "https://picsum.photos/seed/w-a5/232/195", alt: "" },
  { id: 6, src: "https://picsum.photos/seed/w-a6/232/195", alt: "" },
  { id: 7, src: "https://picsum.photos/seed/w-a7/232/195", alt: "" },
  { id: 8, src: "https://picsum.photos/seed/w-a8/232/195", alt: "" },
  { id: 9, src: "https://picsum.photos/seed/w-a9/232/195", alt: "" },
  { id: 10, src: "https://picsum.photos/seed/w-a10/232/195", alt: "" },
  { id: 11, src: "https://picsum.photos/seed/w-a11/232/195", alt: "" },
  { id: 12, src: "https://picsum.photos/seed/w-a12/232/195", alt: "" },
  { id: 13, src: "https://picsum.photos/seed/w-a13/232/195", alt: "" },
  { id: 14, src: "https://picsum.photos/seed/w-a14/232/195", alt: "" },
  { id: 15, src: "https://picsum.photos/seed/w-a15/232/195", alt: "" },
  { id: 16, src: "https://picsum.photos/seed/w-a16/232/195", alt: "" },
  { id: 17, src: "https://picsum.photos/seed/w-a17/232/195", alt: "" },
  { id: 18, src: "https://picsum.photos/seed/w-a18/232/195", alt: "" },
  { id: 19, src: "https://picsum.photos/seed/w-a19/232/195", alt: "" },
  { id: 20, src: "https://picsum.photos/seed/w-a20/232/195", alt: "" },
  { id: 21, src: "https://picsum.photos/seed/w-a21/232/195", alt: "" },
  { id: 22, src: "https://picsum.photos/seed/w-a22/232/195", alt: "" },
  { id: 23, src: "https://picsum.photos/seed/w-a23/232/195", alt: "" },
  { id: 24, src: "https://picsum.photos/seed/w-a24/232/195", alt: "" },
  { id: 25, src: "https://picsum.photos/seed/w-a25/232/195", alt: "" },
  { id: 26, src: "https://picsum.photos/seed/w-a26/232/195", alt: "" },
  { id: 27, src: "https://picsum.photos/seed/w-a27/232/195", alt: "" },
  { id: 28, src: "https://picsum.photos/seed/w-a28/232/195", alt: "" },
  { id: 29, src: "https://picsum.photos/seed/w-a29/232/195", alt: "" },
  { id: 30, src: "https://picsum.photos/seed/w-a30/232/195", alt: "" },
];

const galleryCarouselRef = ref(null);

const locationsCarouselOptions = {
  slidesPerView: 3,
  spaceBetween: 20,
  autoplay: false,
};
</script>

<template>
  <section class="locations">
    <div class="app-container">
      <div class="locations__wrapper">
        <h2 class="locations__title h-2">Наши работы</h2>
        <div class="locations__slider">
          <UiCarousel
            ref="galleryCarouselRef"
            class="locations__swiper"
            :items="photos"
            :options="locationsCarouselOptions"
          >
            <template #item="{ item }">
              <div :key="item.id" class="locations__image-wrapper">
                <NuxtImg
                  :src="item.src"
                  :alt="item.alt"
                  class="locations__image"
                  format="webp"
                />
              </div>
            </template>
          </UiCarousel>
        </div>
        <div class="locations__slider-controls">
          <UiCarouselNavButtons
            variant="arrow"
            :carousel="galleryCarouselRef"
          />
        </div>
        <div class="locations__bottom">
          <UiButton variant="outline" label="Смотреть все Портфолио" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.locations {
  $tablet-breakpoint: 959px;
  &__title {
    margin-bottom: globalFunctions.fluidValue(16px, 60px, 320px, 1440px);
  }

  &__slider {
    margin-bottom: globalFunctions.fluidValue(40px, 50px, 320px, 1440px);
  }

  &__slider-controls {
    display: flex;
    justify-content: flex-end;
    margin-bottom: -11px;

    @media (max-width: $tablet-breakpoint) {
      display: none;
    }
  }
}
</style>
