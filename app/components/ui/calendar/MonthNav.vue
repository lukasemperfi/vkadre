<script setup lang="ts"></script>

<template>
  <div class="month-nav">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.month-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
