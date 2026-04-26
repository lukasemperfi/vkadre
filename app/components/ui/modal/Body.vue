<template>
  <div class="ui-modal-body">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.ui-modal-body {
  overflow-y: auto;
  padding-inline: globalFunctions.fluidValue(24px, 47px, 320px, 1440px);
  padding-block: 40px;

  @media (max-width: globalBreakpoints.$breakpoint-sm) {
    margin-bottom: auto;
  }
}
</style>
