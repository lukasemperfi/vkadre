<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div class="ui-modal-content" role="dialog" aria-modal="true" v-bind="$attrs">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.ui-modal-content {
  position: relative;
  z-index: 1;
  background: #ffffff;
  box-shadow: 0px 25px 40px rgba(0, 0, 0, 0.05);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: var(--font-family);
  width: 654px;
  min-height: 200px;
  max-height: 90vh;
  color: var(--black);

  @media (max-width: globalBreakpoints.$breakpoint-sm) {
    max-width: 100vw;
    max-height: 100vh;
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
}
</style>
