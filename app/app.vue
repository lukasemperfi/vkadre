<script setup lang="ts">
const user = useSupabaseUser();
const route = useRoute();

watch(
  user,
  (newUser) => {
    if (!newUser && route.path.startsWith("/profile")) {
      navigateTo("/", { replace: true });
    }
  },
  { immediate: true },
);
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
