<script setup lang="ts">
// Массив с изображениями (замени на свои пути)
const photos = [
  { id: 1, src: "https://picsum.photos/seed/w-a1/232/195", alt: "" },
  { id: 2, src: "https://picsum.photos/seed/w-a2/232/195", alt: "" },
  { id: 3, src: "https://picsum.photos/seed/w-a3/232/195", alt: "" },
  { id: 4, src: "https://picsum.photos/seed/w-a4/232/195", alt: "" },
  { id: 5, src: "https://picsum.photos/seed/w-a5/232/195", alt: "" },
  { id: 6, src: "https://picsum.photos/seed/w-a6/232/195", alt: "" },
  { id: 7, src: "https://picsum.photos/seed/w-a7/232/195", alt: "" },
  { id: 8, src: "https://picsum.photos/seed/w-a8/232/195", alt: "" },
  { id: 9, src: "https://picsum.photos/seed/w-a9/232/195", alt: "" },
  { id: 10, src: "https://picsum.photos/seed/w-a10/232/195", alt: "" },
];
</script>

<template>
  <section class="works">
    <div class="app-container">
      <div class="works__photo-grid photo-grid">
        <div
          v-for="(photo, index) in photos"
          :key="photo.id"
          :class="['photo-grid__item', `photo-grid__item--${index + 1}`]"
        >
          <NuxtImg
            :src="photo.src"
            :alt="photo.alt"
            class="photo-grid__image"
            format="webp"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.works {
  .photo-grid {
    display: grid;
    grid-template-columns: 175fr repeat(4, 232fr);
    column-gap: globalFunctions.fluidValue(8px, 36px, 320px, 1440px);
    width: 100%;

    &__item {
      width: 100%;
      overflow: hidden;

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

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
}
</style>
