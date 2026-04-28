<script setup lang="ts"></script>

<template>
  <NuxtImg class="spline" src="/images/spline.png" alt="Spline" format="webp" />
</template>

<style scoped lang="scss">
.spline {
  position: absolute;
  z-index: -1;

  //  Comment for development(Pixel Perfect)
  //   filter: blur(270px);
}
</style>
