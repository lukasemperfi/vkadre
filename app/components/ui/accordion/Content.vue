<script setup lang="ts">
import { inject } from "vue";
import { UI_ACCORDION_ITEM_KEY } from "./context";

const item = inject(UI_ACCORDION_ITEM_KEY);

if (!item) {
  throw new Error("UiAccordionContent must be used inside UiAccordionItem");
}
</script>

<template>
  <div
    class="accordion__panel"
    :class="{ 'accordion__panel--open': item.isOpen }"
    :id="item.panelId"
    role="region"
    :aria-labelledby="item.buttonId"
  >
    <div class="accordion__panel-inner">
      <div class="accordion__content">
        <slot :open="item.isOpen" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.accordion__panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 220ms ease;
}

.accordion__panel--open {
  grid-template-rows: 1fr;
}

.accordion__panel-inner {
  overflow: hidden;
}

.accordion__content {
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  color: var(--black);
  padding-bottom: 24px;
}

@media (prefers-reduced-motion: reduce) {
  .accordion__panel {
    transition: none;
  }
}
</style>
