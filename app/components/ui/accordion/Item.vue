<script setup lang="ts">
import { computed, inject, provide, reactive } from "vue";
import {
  UI_ACCORDION_ITEM_KEY,
  UI_ACCORDION_KEY,
  type UiAccordionItemContext,
  type UiAccordionItemKey,
} from "./context";

type Props = {
  value: UiAccordionItemKey;
  disabled?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const root = inject(UI_ACCORDION_KEY);

if (!root) {
  throw new Error("UiAccordionItem must be used inside UiAccordion");
}

const itemContext = reactive({
  itemKey: computed(() => props.value),
  isOpen: computed(() => root.isOpen(props.value)),
  disabled: computed(() => props.disabled),
  buttonId: computed(
    () => `ui-accordion-${root.uid}-btn-${String(props.value)}`,
  ),
  panelId: computed(
    () => `ui-accordion-${root.uid}-panel-${String(props.value)}`,
  ),
  toggle: () => {
    if (props.disabled) return;
    root.toggle(props.value);
  },
}) as UiAccordionItemContext;

provide(UI_ACCORDION_ITEM_KEY, itemContext);
</script>

<template>
  <div
    class="accordion__item"
    :data-open="itemContext.isOpen ? 'true' : 'false'"
    :data-disabled="itemContext.disabled ? 'true' : 'false'"
  >
    <slot :open="itemContext.isOpen" :disabled="itemContext.disabled" />
  </div>
</template>

<style scoped lang="scss">
.accordion__item {
  width: 100%;
}

.accordion__item:not(:last-child) {
  border-bottom: 1px solid rgba(23, 26, 30, 0.1);
}

.accordion__item[data-disabled="true"] {
  opacity: 0.5;
}
</style>
