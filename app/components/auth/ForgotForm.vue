<script setup lang="ts">
import { useForm, useField } from "vee-validate";

const emit = defineEmits(["go-to-login", "success"]);

const { handleSubmit, errors } = useForm({
  validationSchema: forgotSchema,
});

const { value: email } = useField<string>("email");

const handleSend = handleSubmit((values, actions) => {
  emit("success", { values, actions });
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
    </div>
    <UiButton class="auth-form__submit" @click="handleSend" variant="outline">
      ВЫСЛАТЬ ПАРОЛЬ
    </UiButton>
  </div>
</template>

<style lang="scss" scoped>
@use "./styles.scss";
</style>
