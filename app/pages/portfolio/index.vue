<script setup lang="ts">
import type { UiPhotoGridItem } from "~/components/ui/photo-grid/types";

type Tabs =
  | "all"
  | "express"
  | "individual-photo"
  | "individual-video"
  | "family"
  | "odessa";
const activeTab = ref<Tabs>("all");

const { getPortfolios } = usePortfolioApi();

const { data: portfolios } = await useAsyncData("portfolios", () =>
  getPortfolios(),
);

const portfolioList = computed<UiPhotoGridItem[]>(() => {
  return (
    portfolios.value
      ?.map((portfolio) => ({
        id: portfolio.id,
        alt: portfolio.title || "",
        src: portfolio.image_url,
      }))
      .slice(0, 20) ?? []
  );
});
</script>

<template>
  <div class="portfolio-page">
    <div class="app-container">
      <div class="portfolio-page__header">
        <h1 class="portfolio-page__title">Портфолио</h1>
        <div class="portfolio-page__subtitle">
          За 3 года работы мы организовали более 10 000 фотосессий в Одессе
        </div>
      </div>
      <div class="portfolio-page__content">
        <UiTabs v-model="activeTab">
          <UiTabsList class="calendar__view-tabs-list">
            <UiTabsTrigger id="all">Все</UiTabsTrigger>
            <UiTabsTrigger id="express">Экспресс</UiTabsTrigger>
            <UiTabsTrigger id="individual-photo"
              >Индивидуальная фотосессия</UiTabsTrigger
            >
            <UiTabsTrigger id="individual-video"
              >Экспресс-видеосъемка</UiTabsTrigger
            >
            <UiTabsTrigger id="family">Семейная фотосессия</UiTabsTrigger>
            <UiTabsTrigger id="odessa">Фотосессии в ОДЕССЕ</UiTabsTrigger>
          </UiTabsList>

          <UiTabsPanel id="all">
            <UiPhotoGrid :items="portfolioList" mobile-variant="mobile-flat" />
          </UiTabsPanel>
          <UiTabsPanel id="express">
            <UiPhotoGrid :items="portfolioList" mobile-variant="mobile-flat" />
          </UiTabsPanel>
          <UiTabsPanel id="individual-photo">
            <UiPhotoGrid :items="portfolioList" mobile-variant="mobile-flat" />
          </UiTabsPanel>
          <UiTabsPanel id="individual-video">
            <UiPhotoGrid :items="portfolioList" mobile-variant="mobile-flat" />
          </UiTabsPanel>
          <UiTabsPanel id="family">
            <UiPhotoGrid :items="portfolioList" mobile-variant="mobile-flat" />
          </UiTabsPanel>
          <UiTabsPanel id="odessa">
            <UiPhotoGrid :items="portfolioList" mobile-variant="mobile-flat" />
          </UiTabsPanel>
        </UiTabs>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.portfolio-page {
  padding-top: globalFunctions.fluidValue(40px, 72px, 320px, 1440px);
  &__header {
    margin-bottom: globalFunctions.fluidValue(40px, 60px, 320px, 1440px);
  }

  &__title {
    font-family: var(--font-family);
    font-weight: 600;
    font-size: globalFunctions.fluidValue(24px, 48px, 320px, 1440px);
    text-transform: uppercase;
    color: var(--black);
    margin-bottom: 8px;
  }
  &__subtitle {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;

    line-height: 26px;
    color: var(--black);
  }

  :deep(.tabs-list) {
    overflow-x: auto;
    flex-wrap: nowrap;
  }
}
</style>
