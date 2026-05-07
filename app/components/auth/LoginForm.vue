<script setup lang="ts">
defineEmits(["go-to-forgot", "go-to-register", "submit"]);
const email = ref("");
const password = ref("");

const isPasswordVisible = ref(false);

const inputType = computed(() => {
  return isPasswordVisible.value ? "text" : "password";
});
const togglePassword = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>

<template>
  <div class="auth-form">
    <div class="auth-form__fields">
      <UiInput v-model="email" placeholder="ЭЛЕКТРОННАЯ ПОЧТА" />
      <div class="auth-form__password-wrapper">
        <UiInput v-model="password" placeholder="ПАРОЛЬ" :type="inputType">
          <template #right>
            <UiIcon name="eye-closed" @click="togglePassword" />
          </template>
        </UiInput>
        <button
          class="auth-form__link auth-form__link--forgot"
          @click="$emit('go-to-forgot')"
          variant="outline"
        >
          Забыли пароль?
        </button>
      </div>
    </div>

    <UiButton
      class="auth-form__submit"
      @click="$emit('submit', { email, password })"
      variant="outline"
    >
      ВОЙТИ
    </UiButton>

    <button
      class="auth-form__link auth-form__link--center"
      @click="$emit('go-to-register')"
    >
      Нет аккаунта? Зарегистрироваться
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use "./styles.scss";
</style>
