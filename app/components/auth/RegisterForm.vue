<script setup lang="ts">
import { useForm, useField } from "vee-validate";

const emit = defineEmits(["go-to-login", "submit"]);

const { handleSubmit, errors } = useForm({
  validationSchema: registerSchema,
});

const { value: name } = useField<string>("name");
const { value: phone } = useField<string>("phone");
const { value: email } = useField<string>("email");
const { value: password } = useField<string>("password");
const { value: confirmPassword } = useField<string>("confirmPassword");

const onSubmit = handleSubmit((values) => {
  emit("submit", values);
});
</script>

<template>
  <div class="auth-form">
    <div class="auth-form__fields">
      <UiInput v-model="name" placeholder="ИМЯ" :error="errors.name" />
      <UiInput
        v-model="phone"
        placeholder="ТЕЛЕФОН"
        type="tel"
        :error="errors.phone"
      />
      <UiInput
        v-model="email"
        placeholder="ЭЛЕКТРОННАЯ ПОЧТА"
        :error="errors.email"
      />
      <UiInput
        v-model="password"
        placeholder="ПАРОЛЬ"
        is-password
        :error="errors.password"
      />
      <UiInput
        v-model="confirmPassword"
        placeholder="ПОДТВЕРЖДЕНИЕ ПАРОЛЯ"
        is-password
        :error="errors.confirmPassword"
      />
    </div>

    <UiButton class="auth-form__submit" @click="onSubmit" variant="outline">
      ЗАРЕГИСТРИРОВАТЬСЯ
    </UiButton>

    <button
      class="auth-form__link auth-form__link--center"
      @click="$emit('go-to-login')"
      type="button"
    >
      Уже есть аккаунт? Войти
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use "./styles.scss";
</style>
