<template>
  <div class="ui-modal-body">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.ui-modal-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 8px 24px 0;
}
</style>
