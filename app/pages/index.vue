<script setup lang="ts"></script>

<template>
  <div class="home-page">
    <HomeHero />
    <HomeAbout />
    <HomeWorks />
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  :deep(.home-hero) {
    margin-top: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
  }
  :deep(.works) {
    margin-top: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
  }
}
</style>
