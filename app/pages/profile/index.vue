<script setup lang="ts">
definePageMeta({
  layout: "profile",
});
</script>

<template>
  <div>
    <div class="profile__content-body">
      <div class="profile__form"><ProfileForm /></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile__form {
  max-width: 500px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
}
</style>
