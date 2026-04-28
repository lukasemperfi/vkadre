<script setup lang="ts">
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
</script>

<template>
  <section class="home-hero">
    <div class="app-container">
      <div class="home-hero__layout">
        <figure class="home-hero__figure">
          <NuxtImg
            src="/images/home-hero.jpg"
            alt="Фотосессия в Одессе"
            format="webp"
            class="home-hero__photo"
          />
        </figure>

        <div class="home-hero__column">
          <h1 class="home-hero__title">
            Фотосессии №1 <br class="home-hero__title-br" />
            в Одессе, Южном <br class="home-hero__title-br" />
            и Черноморске <br class="home-hero__title-br" />
            поляне
          </h1>

          <div class="home-hero__features features">
            <div class="features__item">
              <div class="features__item-accent" aria-hidden="true"></div>
              <p class="features__item-caption">
                10 мин - 10 фото
                <span class="features__item-price">990 грн.</span>
              </p>
            </div>
            <div class="features__item">
              <div class="features__item-accent" aria-hidden="true"></div>
              <p class="features__item-caption">
                20 мин - 20 фото
                <span class="features__item-price">1990 грн.</span>
              </p>
            </div>
            <div class="features__item">
              <div class="features__item-accent" aria-hidden="true"></div>
              <p class="features__item-only">Готовые фото на следующий день</p>
            </div>
          </div>

          <div class="home-hero__cta">
            <UiButton variant="outline" label="Заказать фотосессию" />
          </div>

          <div class="home-hero__gallery-wrap">
            <div class="home-hero__gallery-controls">
              <UiCarouselNavButtons
                variant="arrow"
                :carousel="galleryCarouselRef"
              />
            </div>

            <UiCarousel
              ref="galleryCarouselRef"
              class="home-hero__swiper"
              :items="carouselSlides"
              :options="galleryCarouselOptions"
            >
              <template #item="{ item }">
                <div class="home-hero__slide-image-wrap">
                  <NuxtImg
                    :src="item.src"
                    :alt="item.alt"
                    format="webp"
                    class="home-hero__slide-image"
                  />
                </div>
              </template>
            </UiCarousel>
          </div>
        </div>
      </div>
    </div>
    <UiSpline class="home-hero__spline" />
  </section>
</template>

<style lang="scss" scoped>
$_hero-mobile-max: 1000px;

.home-hero {
  position: relative;
  z-index: 0;
  overflow-x: clip;
  &__layout {
    display: grid;
    grid-template-columns: 501fr 610fr;
    gap: 24px;
    padding-bottom: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
    border-bottom: 1px solid var(--gray);

    @media (max-width: 1250px) {
      grid-template-columns: 1fr;
      gap: 0;
    }
  }

  &__figure {
    display: block;
    margin: 0;
    width: 100%;
    max-width: 501px;
    aspect-ratio: 501 / 717;

    @media (max-width: 1250px) {
      display: none;
    }
  }

  &__photo {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 501 / 717;
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

    @media (max-width: 1250px) {
      justify-self: start;
      max-width: 100%;
    }
  }

  &__title {
    margin: 0;
    font-weight: 600;
    font-size: globalFunctions.fluidValue(24px, 48px, 320px, 1440px);
    text-transform: uppercase;
    color: var(--black);
    line-height: globalFunctions.fluidValue(34px, 66px, 320px, 1440px);
    transform: translateY(-4%);
    margin-bottom: -17px;

    @media (max-width: 1250px) {
      max-width: 100%;
      transform: translateY(0);
      margin-bottom: 24px;
    }
  }

  &__features {
    margin-bottom: globalFunctions.fluidValue(24px, 64px, 320px, 1440px);
  }

  .features {
    display: grid;
    grid-template-columns: 128fr 132fr 162fr;
    gap: 50px;
    max-width: 522px;

    @media (max-width: 1439px) {
      max-width: 100%;
    }

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: globalFunctions.fluidValue(8px, 24px, 320px, 1440px);
    }

    &__item {
      display: grid;
      position: relative;
      padding-left: 0;

      @media (max-width: 1024px) {
        padding-left: 12px;
      }

      &::before {
        display: none;
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: var(--black);
        top: 7px;

        @media (max-width: 1024px) {
          display: block;
        }
      }
    }

    &__item-accent {
      height: 3px;
      position: relative;
      width: 72px;
      margin-bottom: 21px;

      @media (max-width: 1024px) {
        display: none;
      }

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        width: 100%;
        height: 1px;
        background: var(--gray);
      }

      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 25px;
        height: 100%;
        border-radius: 2px;
        background: var(--black);
      }
    }

    &__item-caption {
      margin: 0;
      font-weight: 500;
      font-size: 14px;
      text-transform: uppercase;
      color: rgba(0, 0, 0, 0.6);
      line-height: 20px;

      @media (max-width: 1250px) {
        display: flex;
        gap: 16px;
      }
    }

    &__item-price {
      font-weight: 500;
      font-size: 14px;
      text-transform: uppercase;
      color: var(--black);
      line-height: 20px;
    }

    &__item-only {
      margin: 0;
      font-weight: 500;
      font-size: 14px;
      text-transform: uppercase;
      color: var(--black);
      line-height: 20px;
    }
  }

  &__cta {
    align-self: flex-start;
    width: 100%;
    max-width: 366px;
    flex: 1;

    @media (max-width: 1250px) {
      margin-bottom: 24px;
    }

    @media (max-width: 768px) {
      max-width: 100%;
      margin-bottom: 0;
    }

    :deep(.ui-button) {
      width: 100%;
    }
  }

  &__gallery-wrap {
    @media (max-width: 768px) {
      margin-right: globalFunctions.fluidValue(-24px, -96px, 320px, 1440px);
      order: -1;
      margin-bottom: 24px;
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
}
</style>
