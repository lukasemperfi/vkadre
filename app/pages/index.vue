<script setup lang="ts">
import type { UiPhotoGridItem } from "~/components/ui/photo-grid/types";

const makeDemoPhotos = (prefix: string, count: number): UiPhotoGridItem[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    src: `https://picsum.photos/seed/${prefix}-${i + 1}/232/195`,
    alt: "",
  }));

const demoPhotos2Rows = makeDemoPhotos("pg-demo-2", 10);
const demoPhotos4Rows = makeDemoPhotos("pg-demo-4", 20);
</script>

<template>
  <div class="home-page">
    <HomeHero />
    <HomeAbout />
    <HomeWorks />
    <HomeServices />
    <HomeLocations />
    <HomeTeam />
    <HomeReviews />
    <HomeFaq />
    <HomeContacts />
    <div class="app-container">
      <UiPhotoGrid :items="demoPhotos2Rows" />
      <div style="height: 50px; background-color: teal"></div>
      <UiPhotoGrid :items="demoPhotos4Rows" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  :deep(.ui-photo-grid-block) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-auto-rows: auto;
    width: 100%;
    max-width: 100%;
  }
  :deep(.ui-photo-grid-block__item) {
    grid-row: auto;
    grid-column: auto;
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
