<script setup lang="ts"></script>

<template>
  <div class="home-page">
    <HomeHero />
    <!-- <NuxtImg src="/images/home-hero.jpg" alt="hero image" format="webp" /> -->
    <!-- <div class="custom-navigation">
      <UiCarouselPrevNav
        @click="prev"
        :carousel="carouselRef"
        variant="arrow"
      />
      <UiCarouselNextNav
        @click="next"
        :disabled="carouselRef?.isEnd"
        variant="arrow"
      />
    </div> -->

    <!-- <UiCarouselNavButtons :carousel="carouselRef" />
    <UiCarousel
      ref="carouselRef"
      :items="slides"
      variant="hero"
      :options="{
        slidesPerView: 1,
        loop: false,

        pagination: { clickable: true },
        navigation: true,
      }"
    >
      <template #item="{ item, index }">
        <div>{{ item.alt }}</div>
      </template>
    </UiCarousel> -->
  </div>
</template>
