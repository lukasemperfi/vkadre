<script setup lang="ts"></script>

<template>
  <div class="loading-overlay">
    <UiLoader />
  </div>
</template>

<style scoped lang="scss">
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.7);
}
</style>
