<script setup lang="ts">
const skeletonItems = 10;
</script>

<template>
  <div class="works-skeleton">
    <div class="works-skeleton__grid">
      <div
        v-for="n in skeletonItems"
        :key="n"
        :class="['works-skeleton__item', `works-skeleton__item--${n}`]"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$_grid-column-gap: globalFunctions.fluidValue(8px, 36px, 320px, 1440px);

.works-skeleton {
  width: 100%;

  &__grid {
    display: grid;
    grid-template-columns: 175fr repeat(4, 232fr);
    column-gap: $_grid-column-gap;
    width: 100%;
  }

  &__item {
    width: 100%;
    overflow: hidden;
    @extend %works-shimmer;

    &--1 {
      grid-column: 1;
      grid-row: 1 / 44;
      aspect-ratio: 175 / 172;
    }
    &--2 {
      grid-column: 2;
      grid-row: 1 / 75;
      aspect-ratio: 232 / 296;
    }
    &--3 {
      grid-column: 3;
      grid-row: 1 / 43;
      aspect-ratio: 232 / 168;
    }
    &--4 {
      grid-column: 4;
      grid-row: 1 / 68;
      aspect-ratio: 232 / 268;
    }
    &--5 {
      grid-column: 5;
      grid-row: 1 / 75;
      aspect-ratio: 232 / 296;
    }
    &--6 {
      grid-column: 1;
      grid-row: 53 / 126;
      aspect-ratio: 175 / 292;
    }
    &--7 {
      grid-column: 2;
      grid-row: 84 / 126;
      aspect-ratio: 232 / 168;
    }
    &--8 {
      grid-column: 3;
      grid-row: 52 / 126;
      aspect-ratio: 232 / 296;
    }
    &--9 {
      grid-column: 4;
      grid-row: 77 / 126;
      aspect-ratio: 232 / 196;
    }
    &--10 {
      grid-column: 5;
      grid-row: 84 / 126;
      aspect-ratio: 232 / 168;
    }
  }
}

%works-shimmer {
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
  animation: works-skeleton-shimmer 1.4s ease-in-out infinite;
}

@keyframes works-skeleton-shimmer {
  0% {
    background-position: -150% 0;
  }
  100% {
    background-position: 150% 0;
  }
}
</style>
