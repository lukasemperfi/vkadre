<script setup lang="ts">
const slides = [
  { src: "/images/home-hero.jpg", alt: "hero image 1" },
  { src: "/images/home-hero.jpg", alt: "hero image 2" },
  { src: "/images/home-hero.jpg", alt: "hero image 3" },
  { src: "/images/home-hero.jpg", alt: "hero image 4" },
  { src: "/images/home-hero.jpg", alt: "hero image 5" },
];
</script>

<template>
  <div class="home-page">
    <div class="app-container">Home page</div>
    <!-- <NuxtImg src="/images/home-hero.jpg" alt="hero image" format="webp" /> -->
    <UiCarousel
      :items="slides"
      variant="hero"
      :options="{
        slidesPerView: 1,
        loop: true,

        pagination: { clickable: true },
        navigation: true,
      }"
    >
      <template #item="{ item, index }">
        <div>{{ item.alt }}</div>
      </template>
    </UiCarousel>
  </div>
</template>
