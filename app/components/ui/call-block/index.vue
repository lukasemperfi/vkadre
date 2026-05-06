<script setup lang="ts"></script>

<template>
  <div class="ui-call-block">
    <div class="ui-call-block__wrapper">
      <div class="ui-call-block__title">
        Звоните, мы всегда <br />
        рады поговорить с вами!
      </div>
      <UiButton
        class="ui-call-block__button"
        variant="outline"
        label="Заказать фотосессию"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-call-block {
  container-type: inline-size;
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
    gap: 24px;

    @container (width < 650px) {
      flex-direction: column;
      justify-content: center;
    }
  }
  &__title {
    font-family: var(--font-family);
    font-weight: 600;
    font-size: globalFunctions.fluidValue(16px, 32px, 320px, 1440px);
    line-height: globalFunctions.fluidValue(22px, 45px, 320px, 1440px);
    text-transform: uppercase;
    color: var(--black);

    @container (width < 650px) {
      text-align: center;
    }
  }
}
</style>
