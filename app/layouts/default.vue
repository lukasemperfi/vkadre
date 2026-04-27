<script setup lang="ts"></script>
<template>
  <div class="app-layout">
    <LayoutHeader />

    <main class="main-content">
      <slot />
    </main>
    <div>footer</div>
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-content {
  flex: 1;
}
</style>
