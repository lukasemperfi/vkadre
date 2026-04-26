<template>
  <footer class="ui-modal-footer">
    <slot />
  </footer>
</template>

<style lang="scss" scoped>
.ui-modal-footer {
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: auto;
  padding: 0 24px 31px;

  @media (max-width: globalBreakpoints.$breakpoint-sm) {
    padding-bottom: 24px;
  }
}
</style>
