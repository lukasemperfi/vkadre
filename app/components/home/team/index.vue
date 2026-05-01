<script setup lang="ts">
const { getPhotographers } = usePhotographersApi();

const { data: photographers } = await useAsyncData("home-team", () =>
  getPhotographers(),
);

const teamCarouselRef = ref(null);
const isSliderReady = ref(false);

onMounted(async () => {
  await nextTick();
  isSliderReady.value = true;
});

const teamCarouselOptions = {
  slidesPerView: 1.15,
  spaceBetween: 16,
  autoplay: false,
  breakpoints: {
    450: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    900: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1250: {
      slidesPerView: 4,
      spaceBetween: 32,
    },
  },
};
</script>

<template>
  <section class="team">
    <div class="app-container">
      <div class="team__wrapper">
        <div class="team__header">
          <h2 class="team__title h-2">Наша команда</h2>
          <UiCarouselNavButtons
            variant="arrow"
            :carousel="teamCarouselRef"
            v-show="isSliderReady"
          />
        </div>

        <div class="team__slider">
          <HomeTeamSkeleton v-if="!isSliderReady" />
          <UiCarousel
            v-else
            ref="teamCarouselRef"
            class="team__swiper"
            :items="photographers ?? []"
            :options="teamCarouselOptions"
          >
            <template #item="{ item }">
              <div class="team-card">
                <div class="team-card__image-wrapper">
                  <NuxtImg
                    :src="item.avatar_url"
                    :alt="item.full_name"
                    format="webp"
                    class="team-card__image"
                  />
                </div>
                <div class="team-card__body">
                  <h3 class="team-card__title">{{ item.full_name }}</h3>
                  <p class="team-card__role">{{ item.role }}</p>
                </div>
              </div>
            </template>
          </UiCarousel>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.team {
  &__wrapper {
    border-bottom: 1px solid var(--gray);
    padding-bottom: globalFunctions.fluidValue(40px, 86px, 320px, 1440px);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: globalFunctions.fluidValue(16px, 60px, 320px, 1440px);

    :deep(.nav-buttons) {
      transform: translateY(-5px);

      @media (max-width: globalBreakpoints.$breakpoint-sm) {
        display: none;
      }
    }
  }

  &__slider {
    @media (max-width: 450px) {
      margin-right: globalFunctions.fluidValue(-24px, -96px, 320px, 1440px);
    }
  }

  .team-card {
    &__image-wrapper {
      width: 100%;
      aspect-ratio: 288 / 368;
      max-height: 368px;
      background: var(--gray);
      overflow: hidden;
      margin-bottom: globalFunctions.fluidValue(16px, 40px, 320px, 1440px);
      margin-bottom: 30px;
    }
    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__title {
      font-family: var(--font-family);
      font-weight: 600;
      font-size: 18px;
      text-transform: uppercase;
      color: var(--black);
      margin-bottom: 15px;
    }
    &__role {
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 16px;
      color: var(--black);
    }
  }
}
</style>
