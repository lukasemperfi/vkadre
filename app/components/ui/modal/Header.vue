<template>
  <header class="ui-modal-header">
    <slot />
  </header>
</template>

<style lang="scss" scoped>
.ui-modal-header {
  padding-top: 40px;
  padding-inline: globalFunctions.fluidValue(24px, 47px, 320px, 1440px);
  font-family: var(--font-family);
  font-weight: 600;
  font-size: globalFunctions.fluidValue(24px, 32px, 320px, 1440px);
  line-height: globalFunctions.fluidValue(32px, 45px, 320px, 1440px);
  text-transform: uppercase;
  color: var(--black);

  @media (max-width: globalBreakpoints.$breakpoint-sm) {
    margin-top: auto;
  }
}
</style>
