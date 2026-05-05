<script setup lang="ts">
interface Props {
  defaultTab?: string | number;
}

const emit = defineEmits<{
  (
    e: "change",
    payload: { active: string | number; prev: string | number },
  ): void;
}>();

const props = defineProps<Props>();
const activeTab = defineModel<string | number>({ default: "" });

if (props.defaultTab && !activeTab.value) {
  activeTab.value = props.defaultTab;
}

const setActiveTab = (id: string | number) => {
  const previousTab = activeTab.value;

  if (previousTab !== id) {
    emit("change", { active: id, prev: previousTab });
    activeTab.value = id;
  }
};

provide("tabsContext", {
  activeTab,
  setActiveTab,
});
</script>

<template>
  <slot />
</template>
