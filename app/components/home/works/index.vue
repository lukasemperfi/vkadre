<script setup lang="ts">
const { getPortfolios } = usePortfolioApi();

const { data: portfolios, pending } = await useAsyncData(
  "home-works-portfolio",
  () => getPortfolios(),
);

type WorkPhoto = {
  id: string;
  src: string;
  alt: string;
};

const photos = computed<WorkPhoto[]>(() => {
  return (
    portfolios.value
      ?.map((row) => ({
        id: row.id,
        src: row.image_url,
        alt: row.title ?? "",
      }))
      .slice(0, 30) ?? []
  );
});

type PhotoSlide = WorkPhoto[];

const slidePhotos = computed(() => {
  const SLIDE_SIZE = 10;
  const slides: PhotoSlide[] = [];
  const list = photos.value;

  for (let i = 0; i < list.length; i += SLIDE_SIZE) {
    slides.push(list.slice(i, i + SLIDE_SIZE));
  }
  return slides;
});

const galleryCarouselRef = ref(null);
const isSliderReady = ref(false);
const isPicPreviewOpen = ref(false);
const initialSlideIndex = ref(0);

onMounted(async () => {
  await nextTick();
  isSliderReady.value = true;
});

const worksCarouselOptions = {
  slidesPerView: 1,
  spaceBetween: 20,
  autoplay: false,
};

const handlePicPreviewClick = (photoId: string) => {
  const index = photos.value.findIndex((p) => p.id === photoId);
  initialSlideIndex.value = index !== -1 ? index : 0;
  isPicPreviewOpen.value = true;
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
                  @click="handlePicPreviewClick(photo.id)"
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
            <HomeWorksSkeleton v-if="!isSliderReady || pending" />
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
                    @click="handlePicPreviewClick(photo.id)"
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
            v-show="isSliderReady && !pending"
          />
        </div>
        <div class="works__bottom">
          <UiButton variant="outline" label="Смотреть все Портфолио" />
        </div>
      </div>
    </div>
  </section>
  <ModalPicPreview
    v-model:is-open="isPicPreviewOpen"
    :slides="photos"
    :initial-slide="initialSlideIndex"
  />
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
      cursor: pointer;

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
