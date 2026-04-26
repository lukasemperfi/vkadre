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
  padding-bottom: 40px;
  padding-inline: globalFunctions.fluidValue(24px, 47px, 320px, 1440px);
}
</style>
