<script setup lang="ts">
import type { UiPhotoGridItem } from "./types";

interface Props {
  items: UiPhotoGridItem[];
  eager?: boolean;
}

withDefaults(defineProps<Props>(), {
  eager: false,
});
</script>

<template>
  <div class="ui-photo-grid-block">
    <div
      v-for="(photo, index) in items"
      :key="photo.id"
      :class="[
        'ui-photo-grid-block__item',
        `ui-photo-grid-block__item--${index + 1}`,
      ]"
    >
      <NuxtImg
        :src="photo.src"
        :alt="photo.alt ?? ''"
        class="ui-photo-grid-block__image"
        format="webp"
        :loading="eager ? 'eager' : 'lazy'"
        :fetchpriority="eager ? 'high' : 'auto'"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$_grid-column-gap: globalFunctions.fluidValue(8px, 36px, 320px, 1440px);

.ui-photo-grid-block {
  display: grid;
  grid-template-columns: 175fr repeat(4, 232fr);
  column-gap: $_grid-column-gap;
  width: 100%;

  @media (max-width: globalBreakpoints.$breakpoint-xs-max) {
    grid-template-columns: 112fr repeat(3, 148fr) 111fr;
    grid-auto-rows: 4px;
    column-gap: 8px;
    width: 705px;
    aspect-ratio: 705 / 305;
    flex: 0 0 auto;
    max-height: 305px;
  }

  &__item {
    $grid-row-max_mobile-end: 77;

    width: 100%;
    overflow: hidden;

    &--1 {
      grid-column: 1;
      grid-row: 1 / 44;
      aspect-ratio: 175 / 172;

      @media (max-width: globalBreakpoints.$breakpoint-xs-max) {
        aspect-ratio: auto;
        grid-row: 1/28;
      }
    }
    &--2 {
      grid-column: 2;
      grid-row: 1 / 75;
      aspect-ratio: 232 / 296;
      @media (max-width: globalBreakpoints.$breakpoint-xs-max) {
        aspect-ratio: auto;
        grid-row: 1/49;
      }
    }
    &--3 {
      grid-column: 3;
      grid-row: 1 / 43;
      aspect-ratio: 232 / 168;
      @media (max-width: globalBreakpoints.$breakpoint-xs-max) {
        aspect-ratio: auto;
        grid-row: 1/28;
      }
    }
    &--4 {
      grid-column: 4;
      grid-row: 1 / 68;
      aspect-ratio: 232 / 268;
      @media (max-width: globalBreakpoints.$breakpoint-xs-max) {
        aspect-ratio: auto;
        grid-row: 1/48;
      }
    }
    &--5 {
      grid-column: 5;
      grid-row: 1 / 75;
      aspect-ratio: 232 / 296;
      @media (max-width: globalBreakpoints.$breakpoint-xs-max) {
        aspect-ratio: auto;
        grid-row: 1/28;
      }
    }

    &--6 {
      grid-column: 1;
      grid-row: 53 / 126;
      aspect-ratio: 175 / 292;
      @media (max-width: globalBreakpoints.$breakpoint-xs-max) {
        grid-row: 30 /#{$grid-row-max_mobile-end};
        aspect-ratio: auto;
      }
    }
    &--7 {
      grid-column: 2;
      grid-row: 84 / 126;
      aspect-ratio: 232 / 168;
      @media (max-width: globalBreakpoints.$breakpoint-xs-max) {
        grid-row: 51 /#{$grid-row-max_mobile-end};
        aspect-ratio: auto;
      }
    }
    &--8 {
      grid-column: 3;
      grid-row: 52 / 126;
      aspect-ratio: 232 / 296;
      @media (max-width: globalBreakpoints.$breakpoint-xs-max) {
        aspect-ratio: auto;
        grid-row: 30 /#{$grid-row-max_mobile-end};
      }
    }
    &--9 {
      grid-column: 4;
      grid-row: 77 / 126;
      aspect-ratio: 232 / 196;
      @media (max-width: globalBreakpoints.$breakpoint-xs-max) {
        aspect-ratio: auto;
        grid-row: 50 /#{$grid-row-max_mobile-end};
      }
    }
    &--10 {
      grid-column: 5;
      grid-row: 84 / 126;
      aspect-ratio: 232 / 168;
      @media (max-width: globalBreakpoints.$breakpoint-xs-max) {
        aspect-ratio: auto;
        grid-row: 30 /#{$grid-row-max_mobile-end};
      }
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}
</style>
