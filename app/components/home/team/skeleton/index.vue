<script setup lang="ts">
const skeletonItems = 6;
</script>

<template>
  <div class="team-skeleton">
    <div
      v-for="n in skeletonItems"
      :key="n"
      class="team-skeleton__slide"
    >
      <div class="team-skeleton__image"></div>
      <div class="team-skeleton__body">
        <div class="team-skeleton__title"></div>
        <div class="team-skeleton__role"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.team-skeleton {
  display: flex;
  gap: 16px;
  overflow: hidden;
  width: 100%;

  @media (min-width: 900px) {
    gap: 24px;
  }

  @media (min-width: 1250px) {
    gap: 32px;
  }

  &__slide {
    flex: 0 0 calc(100% / 1.15);

    @media (min-width: 450px) {
      flex: 0 0 calc((100% - 16px) / 2);
    }

    @media (min-width: 900px) {
      flex: 0 0 calc((100% - 48px) / 3);
    }

    @media (min-width: 1250px) {
      flex: 0 0 calc((100% - 96px) / 4);
    }
  }

  &__image {
    width: 100%;
    aspect-ratio: 288 / 368;
    max-height: 368px;
    margin-bottom: 30px;
    border-radius: 0;
    @extend %shimmer;
  }

  &__body {
    display: flex;
    flex-direction: column;
  }

  &__title {
    height: 18px;
    width: 70%;
    margin-bottom: 15px;
    @extend %shimmer;
  }

  &__role {
    height: 16px;
    width: 50%;
    @extend %shimmer;
  }
}

%shimmer {
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
  animation: team-skeleton-shimmer 1.4s ease-in-out infinite;
}

@keyframes team-skeleton-shimmer {
  0% {
    background-position: -150% 0;
  }
  100% {
    background-position: 150% 0;
  }
}
</style>
