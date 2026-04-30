<script setup lang="ts">
type AriaCurrent = "page" | "step" | "location" | "date" | "time";

interface Props {
  label: string;
  isActive?: boolean;
  ariaCurrent?: AriaCurrent;
}

defineProps<Props>();
</script>

<template>
  <button
    type="button"
    class="menu__link"
    :class="{ 'menu__link--active': isActive }"
    :aria-current="ariaCurrent"
  >
    <UiIcon
      v-show="isActive"
      name="menu-arrow"
      class="menu__icon"
      aria-hidden="true"
    />
    <span class="menu__link-text">{{ label }}</span>
  </button>
</template>

<style lang="scss">
@use "./action.scss";
</style>
