<script setup lang="ts">
import { useForm, useField } from "vee-validate";

const emit = defineEmits(["go-to-login", "success"]);
const isSent = ref(false);

const { handleSubmit, errors } = useForm({
  validationSchema: forgotSchema,
});

const { value: email } = useField<string>("email");

const handleSend = handleSubmit((values) => {
  isSent.value = true;
  emit("success", values);
});
</script>

<template>
  <div class="auth-form">
    <template v-if="!isSent">
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
    </template>

    <div v-else class="auth-form__success">
      <p class="auth-form__text">
        Пароль будет выслан вам на почту в ближайшее время.
      </p>
      <button
        class="auth-form__link auth-form__link--center"
        @click="$emit('go-to-login')"
        type="button"
      >
        Вернуться назад
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "./styles.scss";
</style>
