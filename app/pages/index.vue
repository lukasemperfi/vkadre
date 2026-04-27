<script setup lang="ts">
const items = [
  { id: "home", label: "Главная", to: "/" },
  { id: "services", label: "Услуги", to: "/services" },
  { id: "contacts", label: "Контакты", to: "/contacts" },
];
</script>

<template>
  <div>
    <UiMenu :items="items" />
  </div>
</template>
