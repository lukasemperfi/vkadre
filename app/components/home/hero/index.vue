<script setup lang="ts">
const carouselSlides = Array.from({ length: 6 }, (_, index) => ({
  src: `https://picsum.photos/seed/vkadre-gallery-${index}/380/280.webp`,
  alt: `Галерея работ — кадр ${index + 1}`,
}));

const galleryCarouselOptions = {
  slidesPerView: 1.15,
  spaceBetween: 20,
  autoplay: false,
  breakpoints: {
    1300: {
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
            Фотосессии №1 в Одессе, Южном и Черноморске поляне
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

          <!-- <div class="home-hero__gallery-wrap">
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
                <div class="home-hero__slide">
                  <NuxtImg
                    :src="item.src"
                    :alt="item.alt"
                    width="190"
                    height="140"
                    format="webp"
                    class="home-hero__slide-image"
                  />
                </div>
              </template>
            </UiCarousel>
          </div> -->
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
$_hero-mobile-max: 1000px;

.home-hero {
  padding-block-start: 18px;
  padding-block-end: 24px;

  &__layout {
    display: grid;
    grid-template-columns: 501fr 610fr;
    gap: 24px;

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
    transform: translateY(-6%);
    margin-bottom: -17px;
    max-width: 458px;

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

    :deep(.ui-button) {
      width: 100%;
    }
  }

  &__gallery-wrap {
  }

  &__gallery-controls {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 32px;
    opacity: 0.5;

    @media (max-width: $_hero-mobile-max) {
      margin-bottom: 12px;
    }
  }

  &__swiper {
  }

  &__slide {
  }
}
</style>
