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

type Photo = (typeof photos)[number];
type PhotoSlide = Photo[];

const slidePhotos = computed(() => {
  const SLIDE_SIZE = 10;
  const slides: PhotoSlide[] = [];

  for (let i = 0; i < photos.length; i += SLIDE_SIZE) {
    console.log("itter");
    slides.push(photos.slice(i, i + SLIDE_SIZE));
  }
  return slides;
});

console.log(slidePhotos.value);

const galleryCarouselRef = ref(null);

const worksCarouselOptions = {
  slidesPerView: 0.75,
  spaceBetween: 20,
  autoplay: false,

  breakpoints: {
    1024: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
  },
};
</script>

<template>
  <section class="works">
    <div class="app-container">
      <h2 class="works__title h-2">Наши работы</h2>
      <div class="works__slider">
        <UiCarousel
          ref="galleryCarouselRef"
          class="works__swiper"
          :items="slidePhotos"
          :options="worksCarouselOptions"
        >
          <template #item="{ item }">
            <div class="works__photo-grid photo-grid">
              <div
                v-for="(photo, index) in item"
                :key="photo.id"
                :class="[
                  'photo-grid__item',
                  `photo-grid__item--${Number(index) + 1}`,
                ]"
              >
                <NuxtImg
                  :src="photo.src"
                  :alt="photo.alt"
                  class="photo-grid__image"
                  format="webp"
                />
              </div>
            </div>
          </template>
        </UiCarousel>
      </div>
      <div class="works__slider-controls">
        <UiCarouselNavButtons variant="arrow" :carousel="galleryCarouselRef" />
      </div>
      <div class="works__bottom">
        <UiButton variant="outline" label="Смотреть все Портфолио" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.works {
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
  }

  .photo-grid {
    display: grid;
    grid-template-columns: 175fr repeat(4, 232fr);
    column-gap: globalFunctions.fluidValue(8px, 36px, 320px, 1440px);
    width: 100%;

    &__item {
      width: 100%;
      overflow: hidden;

      &--1 {
        grid-column: 1;
        grid-row: 1 / 44;
        aspect-ratio: 175 / 172;
      }
      &--2 {
        grid-column: 2;
        grid-row: 1 / 75;
        aspect-ratio: 232 / 296;
      }
      &--3 {
        grid-column: 3;
        grid-row: 1 / 43;
        aspect-ratio: 232 / 168;
      }
      &--4 {
        grid-column: 4;
        grid-row: 1 / 68;
        aspect-ratio: 232 / 268;
      }
      &--5 {
        grid-column: 5;
        grid-row: 1 / 75;
        aspect-ratio: 232 / 296;
      }

      &--6 {
        grid-column: 1;
        grid-row: 53 / 126;
        aspect-ratio: 175 / 292;
      }
      &--7 {
        grid-column: 2;
        grid-row: 84 / 126;
        aspect-ratio: 232 / 168;
      }
      &--8 {
        grid-column: 3;
        grid-row: 52 / 126;
        aspect-ratio: 232 / 296;
      }
      &--9 {
        grid-column: 4;
        grid-row: 77 / 126;
        aspect-ratio: 232 / 196;
      }
      &--10 {
        grid-column: 5;
        grid-row: 84 / 126;
        aspect-ratio: 232 / 168;
      }
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
}
</style>
