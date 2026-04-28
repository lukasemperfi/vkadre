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
    1024: {
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
                  <img
                    :src="item.src"
                    :alt="item.alt"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </template>
            </UiCarousel>
          </div> -->

          <h1 class="home-hero__title">
            Фотосессии №1 <br />
            в Одессе, Южном <br />
            и Черноморске <br />
            поляне
          </h1>

          <div class="home-hero__features home-hero__features_desktop">
            <div class="home-hero__tier">
              <div class="home-hero__tier-accent" aria-hidden="true">
                <span />
                <span />
              </div>
              <p class="home-hero__tier-caption">10 мин — 10 фото</p>
              <p class="home-hero__tier-price">990 грн.</p>
            </div>
            <div class="home-hero__tier home-hero__tier_mid">
              <div class="home-hero__tier-accent" aria-hidden="true">
                <span />
                <span />
              </div>
              <p class="home-hero__tier-caption">20 мин — 20 фото</p>
              <p class="home-hero__tier-price">1990 грн.</p>
            </div>
            <div class="home-hero__tier home-hero__tier_wide">
              <div class="home-hero__tier-accent" aria-hidden="true">
                <span />
                <span />
              </div>
              <p class="home-hero__tier-only">Готовые фото на следующий день</p>
            </div>
          </div>

          <ul class="home-hero__features home-hero__features_mobile">
            <li class="home-hero__mobile-row">
              <span class="home-hero__bullet" aria-hidden="true" />
              <span class="home-hero__mobile-label">10 мин — 10 фото</span>
              <span class="home-hero__mobile-price">990 грн.</span>
            </li>
            <li class="home-hero__mobile-row">
              <span class="home-hero__bullet" aria-hidden="true" />
              <span class="home-hero__mobile-label">20 мин — 20 фото</span>
              <span class="home-hero__mobile-price">1990 грн.</span>
            </li>
            <li class="home-hero__mobile-extra">
              <span class="home-hero__bullet" aria-hidden="true" />
              Готовые фото на следующий день
            </li>
          </ul>

          <div class="home-hero__cta">
            <UiButton variant="outline" size="lg" label="Заказать фотосессию" />
          </div>
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

  //   @media (max-width: $_hero-mobile-max) {
  //     padding-block: 24px;
  //   }

  &__layout {
    display: grid;
    grid-template-columns: 501fr 610fr;

    // @media (max-width: $_hero-mobile-max) {
    //   grid-template-columns: 1fr;
    //   gap: 28px;
    // }
  }

  &__figure {
    display: block;
    margin: 0;
    width: 100%;
    max-width: 501px;
    aspect-ratio: 501 / 717;
    // @media (max-width: $_hero-mobile-max) {
    //   display: none;
    // }
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

    // @media (max-width: $_hero-mobile-max) {
    //   gap: 24px;
    //   max-width: none;
    //   justify-self: stretch;
    // }

    & > .home-hero__gallery-wrap {
      order: 4;
      margin-top: 8px;

      //   @media (max-width: $_hero-mobile-max) {
      //     order: 0;
      //     margin-top: 0;
      //   }
    }

    & > .home-hero__title {
      order: 1;
    }

    & > .home-hero__features_desktop {
      order: 2;
    }

    & > .home-hero__features_mobile {
      order: 2;
    }

    & > .home-hero__cta {
      order: 3;
    }
  }

  &__cta {
    align-self: flex-start;
    width: 100%;
    max-width: 366px;

    @media (max-width: $_hero-mobile-max) {
      max-width: 272px;
    }

    :deep(.ui-button) {
      width: 100%;
    }
  }

  &__gallery-wrap {
    width: 100%;
  }

  &__gallery-controls {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
    opacity: 0.5;

    @media (max-width: $_hero-mobile-max) {
      margin-bottom: 12px;
    }
  }

  &__swiper {
    width: 100%;

    :deep(.swiper) {
      overflow: visible;
    }
  }

  &__slide {
    height: 140px;

    @media (max-width: $_hero-mobile-max) {
      height: 186px;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-color: #c4c4c4;
    }
  }

  &__title {
    margin: 0;
    font-weight: 600;
    font-size: 48px;
    text-transform: uppercase;
    color: var(--black);
    line-height: 67px;
    margin-top: -18px;

    // @media (max-width: $_hero-mobile-max) {
    //   font-size: 24px;
    //   max-width: none;
    // }
  }

  &__features_desktop {
    display: flex;
    align-items: flex-start;
    gap: 50px;

    // @media (max-width: $_hero-mobile-max) {
    //   display: none !important;
    // }
  }

  &__tier {
    flex: none;
    width: 128px;

    &_mid {
      width: 132px;
    }

    &_wide {
      width: 162px;
    }
  }

  &__tier-accent {
    display: flex;
    align-items: center;
    gap: 0;
    margin-bottom: 10px;
    height: 3px;

    span:first-child {
      width: 25px;
      flex-shrink: 0;
      border-radius: 1.5px;
      height: 100%;
      background: var(--black);
    }

    span:last-child {
      flex: 1;
      min-width: 48px;
      height: 100%;
      background: rgb(23 26 30 / 30%);
    }
  }

  &__tier-caption {
    margin: 0;
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    text-transform: uppercase;
    color: var(--black);
    opacity: 0.6;
  }

  &__tier-price {
    margin: 4px 0 0;
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    text-transform: uppercase;
    color: var(--black);
  }

  &__tier-only {
    margin: 0;
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    text-transform: uppercase;
    color: var(--black);
  }

  &__features_mobile {
    display: none;
    margin: 0;
    padding: 0;
    list-style: none;

    // @media (max-width: $_hero-mobile-max) {
    //   display: block;
    // }
  }

  &__mobile-row {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding-left: 12px;
    position: relative;
  }

  &__mobile-row + &__mobile-row {
    margin-top: 8px;
  }

  &__bullet {
    position: absolute;
    left: 0;
    top: 0.5em;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--black);
  }

  &__mobile-label {
    flex: 1;
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    text-transform: uppercase;
    color: var(--black);
    opacity: 0.6;
  }

  &__mobile-price {
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    text-transform: uppercase;
    color: var(--black);
  }

  &__mobile-extra {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-top: 8px;
    padding-left: 12px;
    position: relative;
    max-width: 260px;
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    text-transform: uppercase;
    color: var(--black);

    .home-hero__bullet {
      top: 0.45em;
    }
  }
}
</style>
