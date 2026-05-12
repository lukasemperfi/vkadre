<script setup lang="ts"></script>

<template>
  <div class="home-page">
    <HomeHero />
    <HomeAbout />
    <HomeWorks />
    <HomeCalendar />
    <HomeServices />
    <HomeLocations />
    <HomeTeam />
    <HomeReviews />
    <HomeFaq />
    <HomeContacts />

    <NuxtImg src="/images/home-background.png" class="home-page__background" />
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  &__background {
    position: absolute;
    top: globalFunctions.fluidValue(60px, 406px, 320px, 1440px);
    left: globalFunctions.fluidValue(-381px, -345px, 320px, 1440px);
    width: globalFunctions.fluidValue(870px, 2308px, 320px, 1440px);
    height: 100%;
    object-fit: cover;
    z-index: -1;
    max-width: none;
    filter: blur(270px);

    @media (max-width: 768px) {
      opacity: 0.4;
    }
  }

  :deep(.home-hero) {
    margin-top: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
  }

  :deep(.about) {
    margin-top: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
  }

  :deep(.works) {
    margin-top: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
  }

  :deep(.calendar) {
    margin-top: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
  }

  :deep(.services) {
    margin-top: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
  }

  :deep(.locations) {
    margin-top: globalFunctions.fluidValue(40px, 95px, 320px, 1440px);
  }

  :deep(.team) {
    margin-top: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
  }

  :deep(.reviews) {
    margin-top: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
  }

  :deep(.faq) {
    margin-top: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
  }

  :deep(.contacts) {
    margin-top: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
    margin-bottom: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
  }

  :deep(.photo-grid-demo) {
    margin-top: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
    padding-bottom: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
  }
}

.photo-grid-demo {
  &__title {
    margin-bottom: globalFunctions.fluidValue(16px, 60px, 320px, 1440px);
  }

  &__case {
    & + & {
      margin-top: globalFunctions.fluidValue(32px, 80px, 320px, 1440px);
    }
  }

  &__subtitle {
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 18px;
    line-height: 1.3;
    color: var(--gray);
  }
}
</style>
