<script setup lang="ts">
type AuthStep = "login" | "register" | "forgot" | "forgot-success";

const isOpen = defineModel<boolean>("isOpen", { default: false });
const emit = defineEmits(["close"]);
const authStep = ref<AuthStep>("login");
const authApi = useAuthApi();
const router = useRouter();
const isLoading = ref(false);

const reset = () => {
  authStep.value = "login";
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

const handleLogin = async ({ values, actions }: any) => {
  isLoading.value = true;
  try {
    await authApi.signIn(values.email, values.password);

    isOpen.value = false;
  } catch (e) {
    console.error(e);
    actions.setErrors({ password: "Неверный логин или пароль" });
  } finally {
    isLoading.value = false;
  }
};

const handleRegister = async ({ values, actions }: any) => {
  isLoading.value = true;
  try {
    await authApi.signUp(
      values.email,
      values.password,
      values.name,
      values.phone,
    );

    isOpen.value = false;
    router.push("/");
  } catch (err: any) {
    console.error(err);
    actions.setErrors({ confirmPassword: "Ошибка при регистрации" });
  } finally {
    isLoading.value = false;
  }
};

const handleForgotSuccess = async ({ values, actions }: any) => {
  isLoading.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStep("forgot-success");
  } catch (e) {
    console.error(e);
    actions.setErrors({ email: "Неверный email" });
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <UiModal v-model:is-open="isOpen">
    <UiModalOverlay />
    <UiModalContent>
      <UiModalHeader>
        <span v-if="authStep === 'login'">Вход</span>
        <span v-else-if="authStep === 'register'">Регистрация</span>
        <span v-else-if="authStep === 'forgot'">
          Востановление <br />
          пароля
        </span>
        <span v-else-if="authStep === 'forgot-success'">Внимание</span>
      </UiModalHeader>
      <UiModalCloseButton />
      <UiModalBody>
        <UiLoadingOverlay v-if="isLoading" />
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

        <p v-else-if="authStep === 'forgot-success'">
          Пароль будет выслан вам на почту в ближайшее время.
        </p>
      </UiModalBody>
    </UiModalContent>
  </UiModal>
</template>
<style scoped lang="scss"></style>
