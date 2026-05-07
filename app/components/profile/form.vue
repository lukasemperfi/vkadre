<script setup lang="ts">
const name = ref<string | undefined>(undefined);
const phone = ref<string | undefined>(undefined);
const email = ref<string | undefined>(undefined);
</script>
<template>
  <form class="profile-form">
    <div class="profile-form__fields">
      <UiInput placeholder="Имя" v-model="name">
        <template #left>
          <UiIcon name="person-i" />
        </template>
      </UiInput>
      <UiInput placeholder="Телефон" v-model="phone">
        <template #left>
          <UiIcon name="phone-m" />
        </template>
      </UiInput>
      <UiInput placeholder="Имейл" v-model="email">
        <template #left>
          <UiIcon name="email-m" />
        </template>
      </UiInput>
    </div>
    <UiButton
      type="submit"
      variant="outline"
      class="profile-form__button"
      label="Сохранить"
    ></UiButton>
  </form>
</template>
<style scoped lang="scss">
.profile-form {
  &__fields {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__button {
    margin-top: globalFunctions.fluidValue(32px, 40px, 320px, 1440px);
    width: 285px;
  }

  :deep(.ui-input__affix_left) {
    svg {
      opacity: 0.4;
    }
  }
}
</style>
