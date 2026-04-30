<script setup lang="ts">
interface Props {
  to: string;
  label: string;
}

defineProps<Props>();

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <NuxtLink v-slot="{ isActive, href, navigate }" :to="to" custom>
    <a
      :href="href"
      class="menu__link"
      :class="{ 'menu__link--active': isActive }"
      :aria-current="isActive ? 'page' : undefined"
      @click="(e) => (emit('click', e), navigate(e))"
    >
      <UiIcon
        v-show="isActive"
        name="menu-arrow"
        class="menu__icon"
        aria-hidden="true"
      />
      <span class="menu__link-text">{{ label }}</span>
    </a>
  </NuxtLink>
</template>

<style lang="scss">
@use "./action.scss";
</style>
