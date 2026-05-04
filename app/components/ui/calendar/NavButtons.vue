<script setup lang="ts">
const props = withDefaults(defineProps<{ prevDisabled?: boolean }>(), {
  prevDisabled: false,
});

const emit = defineEmits<{
  (e: "prev"): void;
  (e: "next"): void;
}>();
</script>
<template>
  <div class="ui-calendar-nav-buttons">
    <button
      class="ui-calendar-nav-buttons__button"
      @click="emit('prev')"
      :disabled="prevDisabled"
    >
      <UiIcon name="chevron-left" />
    </button>
    <button class="ui-calendar-nav-buttons__button">
      <UiIcon name="chevron-right" @click="emit('next')" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.ui-calendar-nav-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__button {
    width: 30px;
    height: 30px;
    display: flex;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    @media (hover: hover) {
      &:hover {
        background-color: rgba(0, 0, 0, 0.03);
      }
    }

    &:disabled {
      opacity: 0.5;
      cursor: default;

      &:hover {
        background-color: transparent;
      }
    }
  }
}
</style>
