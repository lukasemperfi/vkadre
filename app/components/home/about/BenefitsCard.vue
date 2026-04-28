<script setup lang="ts"></script>

<template>
  <div class="benefits-card">
    <div class="benefits-card__icon">
      <slot name="icon" />
    </div>

    <div class="benefits-card__body">
      <div class="benefits-card__title">
        <slot name="title" />
      </div>
      <div class="benefits-card__content">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.benefits-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: var(--black);
  position: relative;

  &__icon {
    display: grid;
    place-items: center;
    flex: none;
    width: 56px;
    height: 56px;

    @media (max-width: globalBreakpoints.$breakpoint-sm) {
      width: 36px;
      height: 36px;
    }

    :deep(svg),
    :deep(img) {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  &:nth-child(3) {
    .benefits-card__icon {
      width: 40px;
      height: 56px;

      @media (max-width: globalBreakpoints.$breakpoint-sm) {
        width: 26px;
        height: 36px;
      }
    }
  }
  &:nth-child(4) {
    .benefits-card__icon {
      width: 44px;
      height: 56px;

      @media (max-width: globalBreakpoints.$breakpoint-sm) {
        width: 28px;
        height: 36px;
      }
    }
  }

  &__body {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 11px;
    width: 100%;
    flex: none;
  }

  &__title {
    font-family: var(--font-family);
    font-weight: 600;
    font-size: globalFunctions.fluidValue(14px, 18px, 320px, 1440px);
    text-transform: uppercase;
    color: var(--black);
  }

  &__content {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: globalFunctions.fluidValue(14px, 16px, 320px, 1440px);
    line-height: globalFunctions.fluidValue(22px, 26px, 320px, 1440px);
    color: var(--black);
  }
}
</style>
