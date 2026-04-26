<script setup lang="ts">
import { computed, ref, useId } from "vue";

type AccordionItemKey = string | number;

export type UiAccordionItem = {
  key: AccordionItemKey;
  title: string;
  content?: string;
  disabled?: boolean;
};

type UiAccordionProps = {
  items: UiAccordionItem[];
  modelValue?: AccordionItemKey | null;
  defaultValue?: AccordionItemKey | null;
};

const props = withDefaults(defineProps<UiAccordionProps>(), {
  modelValue: undefined,
  defaultValue: null,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: AccordionItemKey | null): void;
}>();

const uncontrolledValue = ref<AccordionItemKey | null>(props.defaultValue);

const isControlled = computed(() => props.modelValue !== undefined);
const value = computed<AccordionItemKey | null>({
  get: () =>
    isControlled.value ? (props.modelValue ?? null) : uncontrolledValue.value,
  set: (v) => {
    if (!isControlled.value) uncontrolledValue.value = v;
    emit("update:modelValue", v);
  },
});

const uid = useId();

function isOpen(itemKey: AccordionItemKey) {
  return value.value === itemKey;
}

function toggle(itemKey: AccordionItemKey) {
  value.value = isOpen(itemKey) ? null : itemKey;
}

function buttonId(itemKey: AccordionItemKey) {
  return `ui-accordion-${uid}-btn-${String(itemKey)}`;
}

function panelId(itemKey: AccordionItemKey) {
  return `ui-accordion-${uid}-panel-${String(itemKey)}`;
}
</script>

<template>
  <div class="accordion">
    <div
      v-for="item in props.items"
      :key="item.key"
      class="accordion__item"
      :data-open="isOpen(item.key) ? 'true' : 'false'"
      :data-disabled="item.disabled ? 'true' : 'false'"
    >
      <button
        class="accordion__button"
        type="button"
        :id="buttonId(item.key)"
        :aria-expanded="isOpen(item.key) ? 'true' : 'false'"
        :aria-controls="panelId(item.key)"
        :disabled="item.disabled"
        @click="toggle(item.key)"
      >
        <span class="accordion__title">
          <slot name="title" :item="item">
            {{ item.title }}
          </slot>
        </span>

        <span class="accordion__icon" aria-hidden="true">
          <slot name="icon" :open="isOpen(item.key)">
            <UiIcon name="strong-cross" />
          </slot>
        </span>
      </button>

      <div
        class="accordion__panel"
        :id="panelId(item.key)"
        role="region"
        :aria-labelledby="buttonId(item.key)"
      >
        <div class="accordion__panel-inner">
          <div class="accordion__content">
            <slot name="content" :item="item">
              {{ item.content }}
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.accordion {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.accordion__item {
  width: 100%;
}

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

.accordion__panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 220ms ease;
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

.accordion__item:not(:last-child) {
  border-bottom: 1px solid rgba(23, 26, 30, 0.1);
}

.accordion__item[data-open="true"] {
  .accordion__panel {
    grid-template-rows: 1fr;
  }

  .accordion__icon {
    transform: rotate(45deg);
  }
}

.accordion__item[data-disabled="true"] {
  opacity: 0.5;

  .accordion__button {
    cursor: not-allowed;
  }
}

@media (prefers-reduced-motion: reduce) {
  .accordion__panel,
  .accordion__icon {
    transition: none;
  }
}
</style>
