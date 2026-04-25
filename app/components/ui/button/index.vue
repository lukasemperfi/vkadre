<script setup lang="ts">
type UiButtonProps = {
  label?: string;
  disabled?: boolean;
};

const props = withDefaults(defineProps<UiButtonProps>(), {
  label: "Button",
  disabled: false,
});
</script>

<template>
  <button :disabled="props.disabled">
    <slot>{{ props.label }}</slot>
  </button>
</template>

<style scoped></style>
