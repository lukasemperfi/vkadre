<script setup lang="ts">
import { useForm, useField } from "vee-validate";

const emit = defineEmits(["go-to-forgot", "go-to-register", "submit"]);

const { handleSubmit, errors } = useForm({
  validationSchema: loginSchema,
});

const { value: email } = useField<string>("email");
const { value: password } = useField<string>("password");

const isPasswordVisible = ref(false);

const inputType = computed(() => {
  return isPasswordVisible.value ? "text" : "password";
});

const togglePassword = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const onSubmit = handleSubmit((values, actions) => {
  emit("submit", { values, actions });
});
</script>

<template>
  <div class="auth-form">
    <div class="auth-form__fields">
      <UiInput
        v-model="email"
        placeholder="ЭЛЕКТРОННАЯ ПОЧТА"
        :error="errors.email"
      />

      <div class="auth-form__password-wrapper">
        <UiInput
          v-model="password"
          placeholder="ПАРОЛЬ"
          :type="inputType"
          :error="errors.password"
        >
          <template #right>
            <UiIcon :name="'eye-closed'" @click="togglePassword" />
          </template>
        </UiInput>

        <button
          class="auth-form__link auth-form__link--forgot"
          @click="$emit('go-to-forgot')"
          type="button"
        >
          Забыли пароль?
        </button>
      </div>
    </div>

    <UiButton class="auth-form__submit" @click="onSubmit" variant="outline">
      ВОЙТИ
    </UiButton>

    <button
      class="auth-form__link auth-form__link--center"
      @click="$emit('go-to-register')"
      type="button"
    >
      Нет аккаунта? Зарегистрироваться
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use "./styles.scss";
</style>
