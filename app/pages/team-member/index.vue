<script setup lang="ts">
import type { UiPhotoGridItem } from "~/components/ui/photo-grid/types";

const carouselSlides = [
  {
    id: 1,
    src: "/images/home-hero-slide-1.jpg",
    alt: "Галерея работ — кадр 1",
  },
  {
    id: 2,
    src: "/images/home-hero-slide-2.jpg",
    alt: "Галерея работ — кадр 2",
  },
  {
    id: 3,
    src: "/images/home-hero-slide-3.jpg",
    alt: "Галерея работ — кадр 3",
  },
  {
    id: 4,
    src: "/images/home-hero-slide-1.jpg",
    alt: "Галерея работ — кадр 4",
  },
  {
    id: 5,
    src: "/images/home-hero-slide-2.jpg",
    alt: "Галерея работ — кадр 5",
  },
  {
    id: 6,
    src: "/images/home-hero-slide-3.jpg",
    alt: "Галерея работ — кадр 6",
  },
];

const galleryCarouselOptions = {
  slidesPerView: 1.15,
  spaceBetween: 20,
  autoplay: false,
  breakpoints: {
    550: {
      slidesPerView: 2.15,
      spaceBetween: 20,
    },
    769: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1250: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
};

const galleryCarouselRef = ref(null);
const isSliderReady = ref(false);

const { getPhotographer } = usePhotographersApi();

const { data: photographer } = await useAsyncData("photographer", () =>
  getPhotographer("7517ebc9-2df1-49d4-8e4f-bd80fb16667e"),
);

console.log(photographer.value);

const portfolioList = computed<UiPhotoGridItem[]>(() => {
  return (
    photographer.value?.portfolio
      ?.map((portfolio) => ({
        id: portfolio.id,
        alt: portfolio.title || "",
        src: portfolio.image_url,
      }))
      .slice(0, 20) ?? []
  );
});

onMounted(async () => {
  await nextTick();
  isSliderReady.value = true;
});
</script>

<template>
  <div class="team-member-page">
    <div class="app-container">
      <section class="team-member-page__layout">
        <figure class="team-member-page__figure">
          <NuxtImg
            :src="photographer?.avatar_url"
            :alt="photographer?.full_name"
            format="webp"
            class="team-member-page__photo"
          />
        </figure>

        <div class="team-member-page__column team-member-page__column_info">
          <div class="team-member-page__info-wrapper">
            <div class="team-member-page__info-header">
              <h1 class="team-member-page__info-title">
                {{ photographer?.full_name }}
              </h1>
              <div class="team-member-page__info-role">
                {{ photographer?.role }}
              </div>
            </div>

            <div
              class="team-member-page__info-description"
              v-html="photographer?.bio"
            ></div>
          </div>

          <div class="team-member-page__gallery-wrap">
            <div class="team-member-page__gallery-controls">
              <UiCarouselNavButtons
                variant="arrow"
                :carousel="galleryCarouselRef"
                v-show="isSliderReady"
              />
            </div>

            <HomeHeroSkeleton v-if="!isSliderReady" />
            <UiCarousel
              v-else
              ref="galleryCarouselRef"
              class="team-member-page__swiper"
              :items="carouselSlides"
              :options="galleryCarouselOptions"
            >
              <template #item="{ item }">
                <div class="team-member-page__slide-image-wrap">
                  <NuxtImg
                    :src="item.src"
                    :alt="item.alt"
                    format="webp"
                    class="team-member-page__slide-image"
                  />
                </div>
              </template>
            </UiCarousel>
          </div>
        </div>
      </section>
      <section class="team-member-page__works">
        <div class="team-member-page__works-title h-2">Работы Саши</div>
        <UiPhotoGrid :items="portfolioList" />
      </section>
      <UiCallBlock />
    </div>
  </div>
</template>

<style scoped lang="scss">
.team-member-page {
  padding-top: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);

  &__layout {
    display: grid;
    grid-template-columns: 533fr 610fr;
    gap: 24px;
    padding-bottom: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
    border-bottom: 1px solid var(--gray);

    @media (max-width: globalBreakpoints.$breakpoint-md) {
      grid-template-columns: 1fr;
    }
  }

  &__figure {
    width: 100%;
    max-width: 533px;
    aspect-ratio: 533 / 625;
  }

  &__photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: #c4c4c4;
  }

  &__column {
    max-width: 610px;
    justify-self: end;
    width: 100%;
    display: flex;
    flex-direction: column;
    min-width: 0;

    @media (max-width: globalBreakpoints.$breakpoint-md) {
      justify-self: start;
      max-width: 100%;
    }
  }

  &__info-wrapper {
    max-width: 500px;
    flex: 1;
    align-self: flex-end;

    @media (max-width: globalBreakpoints.$breakpoint-md) {
      max-width: 100%;
      align-self: flex-start;
    }
  }

  &__info-title {
    font-family: var(--font-family);
    font-weight: 600;
    font-size: globalFunctions.fluidValue(16px, 32px, 320px, 1440px);
    line-height: globalFunctions.fluidValue(22px, 45px, 320px, 1440px);
    text-transform: uppercase;
    color: var(--black);
    margin-bottom: 4px;
  }
  &__info-role {
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    text-transform: uppercase;
    color: var(--black);
    margin-bottom: globalFunctions.fluidValue(24px, 40px, 320px, 1440px);
  }

  &__info-description {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    color: var(--black);

    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__gallery-wrap {
    @media (max-width: globalBreakpoints.$breakpoint-md) {
      display: none;
    }
  }

  &__gallery-controls {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 32px;
    opacity: 0.5;

    @media (max-width: 768px) {
      display: none;
    }
  }

  &__swiper {
  }

  &__slide-image-wrap {
    aspect-ratio: 190/140;
    max-width: 190px;

    @media (min-width: 769px) and (max-width: 1250px) {
      aspect-ratio: auto;
      max-width: 348px;
    }

    @media (min-width: 551px) and (max-width: 768px) {
      aspect-ratio: auto;
      max-width: 321px;
    }

    @media (max-width: 550px) {
      aspect-ratio: 254/186;
      max-width: 100%;
    }
  }

  &__slide-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  :deep(.swiper-slide) {
    // max-width: 100%;
    // aspect-ratio: 254/186;
  }

  &__title-br {
    display: block;

    @media (min-width: 551px) and (max-width: 1250px) {
      display: none;
    }

    @media (max-width: 550px) {
      display: block;
    }
  }

  &__spline {
    top: 177px;
    right: -57px;
    width: 692px;
    height: 654px;
  }

  &__works {
    padding-block: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
    border-bottom: 1px solid var(--gray);

    &-title {
      margin-bottom: globalFunctions.fluidValue(24px, 60px, 320px, 1440px);
    }
  }
}
</style>
