<script setup lang="ts">
const skeletonItems = 4;
</script>

<template>
  <div class="locations-skeleton">
    <div
      v-for="n in skeletonItems"
      :key="n"
      class="locations-skeleton__slide"
    >
      <div class="locations-skeleton__figure"></div>
      <div class="locations-skeleton__title"></div>
      <div class="locations-skeleton__row">
        <div class="locations-skeleton__icon"></div>
        <div class="locations-skeleton__city"></div>
      </div>
      <div class="locations-skeleton__description-line"></div>
      <div class="locations-skeleton__description-line locations-skeleton__description-line_short"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.locations-skeleton {
  display: flex;
  gap: 16px;
  overflow: hidden;
  width: 100%;

  @media (min-width: 769px) {
    gap: 20px;
  }

  @media (min-width: 1024px) {
    gap: 32px;
  }

  &__slide {
    flex: 0 0 calc(100% / 1.15);
    display: flex;
    flex-direction: column;

    @media (min-width: 769px) {
      flex: 0 0 calc((100% - 20px) / 2);
    }

    @media (min-width: 1024px) {
      flex: 0 0 calc((100% - 64px) / 3);
    }
  }

  &__figure {
    width: 100%;
    aspect-ratio: 272 / 180;
    margin-bottom: globalFunctions.fluidValue(16px, 40px, 320px, 1440px);
    @extend %locations-shimmer;

    @media (min-width: globalBreakpoints.$breakpoint-sm) {
      aspect-ratio: 395 / 376;
    }
  }

  &__title {
    height: 16px;
    width: 70%;
    margin-bottom: 17px;
    @extend %locations-shimmer;
  }

  &__row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 17px;
  }

  &__icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    @extend %locations-shimmer;
  }

  &__city {
    height: 16px;
    width: 40%;
    @extend %locations-shimmer;
  }

  &__description-line {
    height: globalFunctions.fluidValue(14px, 16px, 320px, 1440px);
    width: 100%;
    margin-bottom: 8px;
    @extend %locations-shimmer;

    &_short {
      width: 60%;
      margin-bottom: 0;
    }
  }
}

%locations-shimmer {
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
  animation: locations-skeleton-shimmer 1.4s ease-in-out infinite;
}

@keyframes locations-skeleton-shimmer {
  0% {
    background-position: -150% 0;
  }
  100% {
    background-position: 150% 0;
  }
}
</style>
