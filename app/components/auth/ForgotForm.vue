<script setup lang="ts">
const emit = defineEmits(["go-to-login", "success"]);
const email = ref("");
const isSent = ref(false);

const handleSend = () => {
  isSent.value = true;
  emit("success");
};
</script>

<template>
  <div class="auth-form">
    <template v-if="!isSent">
      <div class="auth-form__fields">
        <UiInput v-model="email" placeholder="ЭЛЕКТРОННАЯ ПОЧТА" />
      </div>
      <UiButton class="auth-form__submit" @click="handleSend" variant="outline"
        >ВЫСЛАТЬ ПАРОЛЬ</UiButton
      >
    </template>

    <div v-else class="auth-form__success">
      <p class="auth-form__text">
        Пароль будет выслан вам на почту в ближайшее время.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "./styles.scss";
</style>
