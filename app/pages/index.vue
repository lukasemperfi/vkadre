<script setup lang="ts"></script>

<template>
  <div class="home-page">
    <HomeHero />
    <HomeAbout />
    <HomeWorks />
    <HomeServices />
    <HomeLocations />
    <HomeTeam />
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  :deep(.home-hero) {
    margin-top: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
  }

  :deep(.about) {
    margin-top: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
  }

  :deep(.works) {
    margin-top: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
  }

  :deep(.services) {
    margin-top: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
  }

  :deep(.locations) {
    margin-top: globalFunctions.fluidValue(40px, 95px, 320px, 1440px);
  }

  :deep(.team) {
    margin-top: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
  }
}
</style>
