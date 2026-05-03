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
    slides.push(photos.slice(i, i + SLIDE_SIZE));
  }
  return slides;
});

const galleryCarouselRef = ref(null);
const isSliderReady = ref(false);

onMounted(async () => {
  await nextTick();
  isSliderReady.value = true;
});

const worksCarouselOptions = {
  slidesPerView: 1,
  spaceBetween: 20,
  autoplay: false,
};
</script>

<template>
  <section class="works">
    <div class="app-container">
      <div class="works__wrapper">
        <h2 class="works__title h-2">Наши работы</h2>
        <div class="works__slider">
          <div class="works__mobile-gallery">
            <template
              v-for="(slideChunk, slideIndex) in slidePhotos"
              :key="slideIndex"
            >
              <div class="works__photo-grid photo-grid photo-grid_mobile">
                <div
                  v-for="(photo, index) in slideChunk"
                  :key="photo.id"
                  :class="[
                    'photo-grid__item',
                    `photo-grid__item--${Number(index) + 1}`,
                    `photo-grid__item--${Number(index) + 1}_mobile`,
                  ]"
                >
                  <NuxtImg
                    :src="photo.src"
                    :alt="photo.alt"
                    class="photo-grid__image"
                    format="webp"
                    :loading="slideIndex === 0 ? 'eager' : 'lazy'"
                    :fetchpriority="slideIndex === 0 ? 'high' : 'auto'"
                  />
                </div>
              </div>
            </template>
          </div>
          <div class="works__desktop-slider">
            <HomeWorksSkeleton v-if="!isSliderReady" />
            <UiCarousel
              v-else
              ref="galleryCarouselRef"
              class="works__swiper"
              :items="slidePhotos"
              :options="worksCarouselOptions"
            >
              <template #item="{ item, index }">
                <div class="works__photo-grid photo-grid">
                  <div
                    v-for="(photo, i) in item"
                    :key="photo.id"
                    :class="[
                      'photo-grid__item',
                      `photo-grid__item--${Number(i) + 1}`,
                    ]"
                  >
                    <NuxtImg
                      :src="photo.src"
                      :alt="photo.alt"
                      class="photo-grid__image"
                      format="webp"
                      :loading="index === 0 ? 'eager' : 'lazy'"
                      :fetchpriority="index === 0 ? 'high' : 'auto'"
                    />
                  </div>
                </div>
              </template>
            </UiCarousel>
          </div>
        </div>
        <div class="works__slider-controls">
          <UiCarouselNavButtons
            variant="arrow"
            :carousel="galleryCarouselRef"
            v-show="isSliderReady"
          />
        </div>
        <div class="works__bottom">
          <UiButton variant="outline" label="Смотреть все Портфолио" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
$_grid-column-gap: globalFunctions.fluidValue(8px, 36px, 320px, 1440px);
.works {
  $tablet-breakpoint: 959px;

  &__wrapper {
    padding-bottom: globalFunctions.fluidValue(40px, 104px, 320px, 1440px);
    border-bottom: 1px solid var(--gray);
  }

  &__title {
    margin-bottom: globalFunctions.fluidValue(16px, 60px, 320px, 1440px);
  }

  &__slider {
    margin-bottom: globalFunctions.fluidValue(40px, 50px, 320px, 1440px);

    @media (max-width: $tablet-breakpoint) {
      margin-right: globalFunctions.fluidValue(-24px, -96px, 320px, 1440px);
    }
  }

  &__mobile-gallery {
    display: none;
    column-gap: 8px;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;

    @media (max-width: $tablet-breakpoint) {
      display: flex;
    }
  }

  &__desktop-slider {
    @media (max-width: $tablet-breakpoint) {
      display: none;
    }
  }

  &__slider-controls {
    display: flex;
    justify-content: flex-end;
    margin-bottom: -11px;

    @media (max-width: $tablet-breakpoint) {
      display: none;
    }
  }

  .photo-grid {
    display: grid;
    grid-template-columns: 175fr repeat(4, 232fr);
    column-gap: $_grid-column-gap;
    width: 100%;

    &_mobile {
      grid-template-columns: 112fr repeat(3, 148fr) 111fr;
      grid-auto-rows: 4px;
      column-gap: 8px;
      width: 705px;
      aspect-ratio: 705 / 305;
      flex: 0 0 auto;
      max-height: 305px;
    }

    &__item {
      width: 100%;
      overflow: hidden;

      &--1 {
        grid-column: 1;
        grid-row: 1 / 44;
        aspect-ratio: 175 / 172;

        &_mobile {
          aspect-ratio: auto;
          // aspect-ratio: 112 / 108;
          grid-row: 1/28;
        }
      }
      &--2 {
        grid-column: 2;
        grid-row: 1 / 75;
        aspect-ratio: 232 / 296;
        &_mobile {
          aspect-ratio: auto;
          // aspect-ratio: 148 / 192;
          grid-row: 1/49;
        }
      }
      &--3 {
        grid-column: 3;
        grid-row: 1 / 43;
        aspect-ratio: 232 / 168;
        &_mobile {
          // aspect-ratio: 148 / 108;
          aspect-ratio: auto;
          grid-row: 1/28;
        }
      }
      &--4 {
        grid-column: 4;
        grid-row: 1 / 68;
        aspect-ratio: 232 / 268;
        &_mobile {
          // aspect-ratio: 148 / 188;
          aspect-ratio: auto;
          grid-row: 1/48;
        }
      }
      &--5 {
        grid-column: 5;
        grid-row: 1 / 75;
        aspect-ratio: 232 / 296;
        &_mobile {
          // aspect-ratio: 112 / 108;
          aspect-ratio: auto;
          grid-row: 1/28;
        }
      }

      &--6 {
        grid-column: 1;
        grid-row: 53 / 126;
        aspect-ratio: 175 / 292;
        &_mobile {
          // aspect-ratio: 112 / 188;
          grid-row: 30/77;
          aspect-ratio: auto;
        }
      }
      &--7 {
        grid-column: 2;
        grid-row: 84 / 126;
        aspect-ratio: 232 / 168;
        &_mobile {
          // aspect-ratio: 148 / 108;
          grid-row: 51/77;
          aspect-ratio: auto;
        }
      }
      &--8 {
        grid-column: 3;
        grid-row: 52 / 126;
        aspect-ratio: 232 / 296;
        &_mobile {
          // aspect-ratio: 148 / 188;
          aspect-ratio: auto;
          grid-row: 30/77;
        }
      }
      &--9 {
        grid-column: 4;
        grid-row: 77 / 126;
        aspect-ratio: 232 / 196;
        &_mobile {
          // aspect-ratio: 148 / 108;
          aspect-ratio: auto;
          grid-row: 50/77;
        }
      }
      &--10 {
        grid-column: 5;
        grid-row: 84 / 126;
        aspect-ratio: 232 / 168;
        &_mobile {
          // aspect-ratio: 112 / 188;
          aspect-ratio: auto;
          grid-row: 30/77;
        }
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
