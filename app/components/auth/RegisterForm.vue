<script setup lang="ts">
defineEmits(["go-to-login", "submit"]);

const form = reactive({
  name: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
});
</script>

<template>
  <div class="auth-form">
    <div class="auth-form__fields">
      <UiInput v-model="form.name" placeholder="ИМЯ" />
      <UiInput v-model="form.phone" placeholder="ТЕЛЕФОН" type="tel" />
      <UiInput v-model="form.email" placeholder="ЭЛЕКТРОННАЯ ПОЧТА" />
      <UiInput
        v-model="form.password"
        placeholder="ПАРОЛЬ"
        type="password"
        is-password
      />
      <UiInput
        v-model="form.confirmPassword"
        placeholder="ПОДТВЕРЖДЕНИЕ ПАРОЛЯ"
        type="password"
        is-password
      />
    </div>

    <UiButton
      class="auth-form__submit"
      @click="$emit('submit', form)"
      variant="outline"
    >
      ЗАРЕГИСТРИРОВАТЬСЯ
    </UiButton>

    <button
      class="auth-form__link auth-form__link--center"
      @click="$emit('go-to-login')"
    >
      Уже есть аккаунт? Войти
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use "./styles.scss";
</style>
