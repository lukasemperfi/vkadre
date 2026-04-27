<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: "chevron" | "arrow";
    carousel?: any;
  }>(),
  {
    variant: "arrow",
    carousel: null,
  },
);
</script>

<template>
  <div class="nav-buttons" :class="`variant_${variant}`">
    <UiCarouselPrevNav :carousel="carousel" :variant="variant" />
    <UiCarouselNextNav :carousel="carousel" :variant="variant" />
  </div>
</template>

<style scoped lang="scss">
.nav-buttons {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.variant_arrow {
  gap: 20px;
}
.variant_chevron {
  gap: 8px;
}
</style>
