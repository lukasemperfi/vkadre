<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div
    class="ui-modal-drawer-content"
    role="dialog"
    aria-modal="true"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.ui-modal-drawer-content {
  position: relative;
  z-index: 1;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: var(--font-family);
  width: 360px;
  height: 100vh;
  max-height: 100vh;
  min-height: 100vh;
  max-width: none;
  border-radius: 0;
  box-shadow: none;
  border: 1px solid var(--gray);
  border-right: none;
  color: var(--black);

  @media (max-width: globalBreakpoints.$breakpoint-sm) {
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    border: none;
  }
}
</style>
