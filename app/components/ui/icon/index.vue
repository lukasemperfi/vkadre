<script setup lang="ts">
import { computed, useAttrs } from "vue";

interface Props {
  name: string;
}

const props = defineProps<Props>();
const attrs = useAttrs();

defineOptions({
  inheritAttrs: false,
});

const icons = import.meta.glob<string>("@/assets/icons/*.svg", {
  eager: true,
  query: "?raw",
  import: "default",
});

const iconsByName = Object.fromEntries(
  Object.entries(icons)
    .map(([path, svg]) => {
      const name = path.split("/").pop()?.replace(".svg", "");
      return name ? [name, svg] : null;
    })
    .filter((entry): entry is [string, string] => Boolean(entry)),
);

const svg = computed(() => {
  const value = iconsByName[props.name] ?? null;

  if (!value && import.meta.dev) {
    console.warn(`Icon "${props.name}" not found in "@/assets/icons"`);
  }

  return value;
});

const mergedAttrs = computed(() => {
  const a = { ...attrs } as Record<string, unknown>;

  const hasA11yLabel =
    Object.prototype.hasOwnProperty.call(a, "aria-label") ||
    Object.prototype.hasOwnProperty.call(a, "aria-labelledby");

  if (!hasA11yLabel && !Object.prototype.hasOwnProperty.call(a, "role")) {
    a["aria-hidden"] = "true";
  }

  if (!Object.prototype.hasOwnProperty.call(a, "focusable")) {
    a["focusable"] = "false";
  }

  return a;
});
</script>

<template>
  <span v-if="svg" class="icon" v-bind="mergedAttrs" v-html="svg" />
</template>

<style scoped>
.icon {
  display: inline-block;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
}

.icon :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
  fill: currentColor;
}
</style>
