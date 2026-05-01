<script setup lang="ts">
import { computed, provide, ref, useId } from "vue";
import {
  UI_ACCORDION_KEY,
  type UiAccordionItemKey,
} from "./context";

type UiAccordionProps = {
  modelValue?: UiAccordionItemKey | null;
  defaultValue?: UiAccordionItemKey | null;
};

const props = withDefaults(defineProps<UiAccordionProps>(), {
  modelValue: undefined,
  defaultValue: null,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: UiAccordionItemKey | null): void;
}>();

const uncontrolledValue = ref<UiAccordionItemKey | null>(props.defaultValue);

const isControlled = computed(() => props.modelValue !== undefined);
const value = computed<UiAccordionItemKey | null>({
  get: () =>
    isControlled.value ? (props.modelValue ?? null) : uncontrolledValue.value,
  set: (v) => {
    if (!isControlled.value) uncontrolledValue.value = v;
    emit("update:modelValue", v);
  },
});

const uid = useId();

function isOpen(itemKey: UiAccordionItemKey) {
  return value.value === itemKey;
}

function toggle(itemKey: UiAccordionItemKey) {
  value.value = isOpen(itemKey) ? null : itemKey;
}

provide(UI_ACCORDION_KEY, {
  uid,
  isOpen,
  toggle,
});
</script>

<template>
  <div class="accordion">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.accordion {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}
</style>
