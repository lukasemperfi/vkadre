<script setup lang="ts">
const skeletonItems = 6;
</script>

<template>
  <div class="home-hero-skeleton">
    <div
      v-for="n in skeletonItems"
      :key="n"
      class="home-hero-skeleton__slide"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.home-hero-skeleton {
  display: flex;
  gap: 20px;
  overflow: hidden;
  width: 100%;

  &__slide {
    flex: 0 0 calc(100% / 1.15);
    aspect-ratio: 254 / 186;
    max-width: 100%;
    @extend %home-hero-shimmer;

    @media (min-width: 551px) and (max-width: 768px) {
      flex: 0 0 calc(100% / 2.15);
      aspect-ratio: 4 / 3;
      max-width: 321px;
    }

    @media (min-width: 769px) and (max-width: 1250px) {
      flex: 0 0 calc((100% - 40px) / 3);
      aspect-ratio: 4 / 3;
      max-width: 348px;
    }

    @media (min-width: 1251px) {
      flex: 0 0 calc((100% - 40px) / 3);
      aspect-ratio: 190 / 140;
      max-width: 190px;
    }
  }
}

%home-hero-shimmer {
  position: relative;
  overflow: hidden;
  background-color: var(--gray);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.35) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background-repeat: no-repeat;
  background-size: 200% 100%;
  background-position: -150% 0;
  animation: home-hero-skeleton-shimmer 1.4s ease-in-out infinite;
}

@keyframes home-hero-skeleton-shimmer {
  0% {
    background-position: -150% 0;
  }
  100% {
    background-position: 150% 0;
  }
}
</style>
