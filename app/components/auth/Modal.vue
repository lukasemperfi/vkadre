<script setup lang="ts">
type AuthStep = "login" | "register" | "forgot";

const isOpen = defineModel<boolean>("isOpen", { default: false });
const emit = defineEmits(["close"]);
const authStep = ref<AuthStep>("login");
const isSendPassword = ref(false);

const reset = () => {
  authStep.value = "login";
  isSendPassword.value = false;
};

const setStep = (step: AuthStep) => {
  authStep.value = step;
};

watch(
  () => isOpen.value,
  (val) => {
    if (!val) {
      setTimeout(() => reset(), 300);
    }
  },
);

const handleLogin = (data: any) => console.log("Login:", data);
const handleRegister = (data: any) => console.log("Register:", data);

const handleForgotSuccess = () => {
  isSendPassword.value = true;
  console.log("handleForgotSuccess");
};
</script>
<template>
  <UiModal v-model:is-open="isOpen">
    <UiModalOverlay />
    <UiModalContent>
      <UiModalHeader>
        <span v-if="authStep === 'login'">Вход</span>
        <span v-else-if="authStep === 'register'">Регистрация</span>
        <div v-else-if="authStep === 'forgot'">
          <span v-if="!isSendPassword"
            >Востановление <br />
            пароля</span
          >
          <span v-else>Внимание</span>
        </div>
      </UiModalHeader>
      <UiModalCloseButton />
      <UiModalBody>
        <AuthLoginForm
          v-if="authStep === 'login'"
          @go-to-register="setStep('register')"
          @go-to-forgot="setStep('forgot')"
          @submit="handleLogin"
        />

        <AuthRegisterForm
          v-else-if="authStep === 'register'"
          @go-to-login="setStep('login')"
          @submit="handleRegister"
        />

        <AuthForgotForm
          v-else-if="authStep === 'forgot'"
          @go-to-login="setStep('login')"
          @success="handleForgotSuccess"
        />
      </UiModalBody>
    </UiModalContent>
  </UiModal>
</template>
<style scoped lang="scss"></style>
