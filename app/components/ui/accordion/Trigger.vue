<script setup lang="ts">
import { inject } from "vue";
import { UI_ACCORDION_ITEM_KEY } from "./context";

const item = inject(UI_ACCORDION_ITEM_KEY);

if (!item) {
  throw new Error("UiAccordionTrigger must be used inside UiAccordionItem");
}
</script>

<template>
  <button
    class="accordion__button"
    type="button"
    :id="item.buttonId"
    :aria-expanded="item.isOpen ? 'true' : 'false'"
    :aria-controls="item.panelId"
    :disabled="item.disabled"
    @click="item.toggle()"
  >
    <span class="accordion__title">
      <slot :open="item.isOpen" />
    </span>

    <span
      class="accordion__icon"
      :class="{ 'accordion__icon--open': item.isOpen }"
      aria-hidden="true"
    >
      <slot name="icon" :open="item.isOpen">
        <UiIcon name="strong-cross" />
      </slot>
    </span>
  </button>
</template>

<style scoped lang="scss">
.accordion__button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 24px;
  background: transparent;
  border: 0;
  color: var(--black);
  cursor: pointer;
  text-align: left;
}

.accordion__button:disabled {
  cursor: not-allowed;
}

.accordion__title {
  font-weight: 600;
  font-size: 16px;
  line-height: 140%;
  text-transform: uppercase;
  letter-spacing: 0.01em;
}

.accordion__icon {
  width: 15px;
  height: 15px;
  flex: 0 0 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 200ms ease;
  transform: rotate(0deg);
  transform-origin: 50% 50%;
}

.accordion__icon--open {
  transform: rotate(45deg);
}

@media (prefers-reduced-motion: reduce) {
  .accordion__icon {
    transition: none;
  }
}
</style>
