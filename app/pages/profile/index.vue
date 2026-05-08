<script setup lang="ts">
definePageMeta({
  layout: "profile",
});

const { getUserProfile, updateProfile } = useAuthApi();
const isLoading = ref(false);

const {
  data: profile,
  refresh,
  status,
} = await useAsyncData("user-profile", () => getUserProfile(), {
  transform: (data) => {
    if (!data) return null;
    return {
      name: data.full_name,
      phone: data.phone,
      email: data.email,
    };
  },
});

const isPageLoading = computed(
  () => status.value === "pending" || isLoading.value,
);

const handleSubmit = async ({ values, actions }: any) => {
  isLoading.value = true;
  try {
    await updateProfile({
      full_name: values.name,
      phone: values.phone,
    });

    await refresh();
  } catch (e) {
    console.error(e);
    actions.setErrors({ password: "Неверные данные" });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div>
    <div class="profile__content-body">
      <div class="profile__form">
        <UiLoadingOverlay v-if="isLoading" />
        <ProfileForm
          v-if="profile"
          :initial-data="profile"
          @submit="handleSubmit"
        />
        <div v-else-if="status !== 'pending'">Данные профиля не найдены.</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile__form {
  max-width: 500px;
  position: relative;

  @media (max-width: 768px) {
    max-width: 100%;
  }
}
</style>
