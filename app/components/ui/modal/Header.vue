<template>
  <header class="ui-modal-header">
    <slot />
  </header>
</template>

<style lang="scss" scoped>
.ui-modal-header {
  flex-shrink: 0;
  padding: 45px 24px 0;

  @media (max-width: globalBreakpoints.$breakpoint-sm) {
    padding-top: 24px;
  }
}
</style>
