<script setup lang="ts">
import { useForm, useField } from "vee-validate";

const props = defineProps<{
  initialData?: {
    email: string | null;
    name: string | null;
    phone: string | null;
  };
}>();

const emit = defineEmits(["submit"]);

const { handleSubmit, errors } = useForm({
  validationSchema: profileSchema,
  initialValues: props.initialData,
  // enableReinitialize: true,
});

const { value: name } = useField<string | undefined>("name");
const { value: phone } = useField<string | undefined>("phone");
const { value: email } = useField<string | undefined>("email");

const onProfileSubmit = handleSubmit((values, actions) => {
  emit("submit", { values, actions });
});

defineExpose({
  submitForm: onProfileSubmit,
});
</script>

<template>
  <form class="profile-form">
    <div class="profile-form__fields">
      <UiInput placeholder="Имя" v-model="name" :error="errors.name">
        <template #left>
          <UiIcon name="person-i" />
        </template>
      </UiInput>

      <UiInput
        placeholder="Телефон"
        v-model="phone"
        type="tel"
        :error="errors.phone"
      >
        <template #left>
          <UiIcon name="phone-m" />
        </template>
      </UiInput>

      <UiInput placeholder="Имейл" v-model="email" :error="errors.email">
        <template #left>
          <UiIcon name="email-m" />
        </template>
      </UiInput>
    </div>

    <UiButton
      type="button"
      variant="outline"
      class="profile-form__button"
      label="Сохранить"
      @click="onProfileSubmit"
    />
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

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  :deep(.ui-input__affix_left) {
    svg {
      opacity: 0.4;
    }
  }
}
</style>
