<script setup lang="ts"></script>
<template>
  <div class="app-layout">
    <LayoutHeader />

    <main class="main-content">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  overflow: clip;
}
.main-content {
  flex: 1;
}
</style>
