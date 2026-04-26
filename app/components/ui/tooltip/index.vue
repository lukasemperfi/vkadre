<script setup lang="ts">
import { autoUpdate, flip, offset, shift, useFloating } from "@floating-ui/vue";
import { onClickOutside, onKeyStroke } from "@vueuse/core";
import { computed, nextTick, ref, watch } from "vue";

type UiInfoTooltipProps = {
  text: string;
  placement?: "top" | "top-start" | "top-end";
  offsetPx?: number;
};

const props = withDefaults(defineProps<UiInfoTooltipProps>(), {
  placement: "top-start",
  offsetPx: 8,
});

const isOpen = ref(false);

const referenceEl = ref<HTMLElement | null>(null);
const floatingEl = ref<HTMLElement | null>(null);

const { x, y, strategy, update } = useFloating(referenceEl, floatingEl, {
  placement: computed(() => props.placement),
  whileElementsMounted: autoUpdate,
  middleware: computed(() => [
    offset(props.offsetPx),
    flip(),
    shift({ padding: 8 }),
  ]),
});

const floatingStyles = computed(() => ({
  position: strategy.value,
  left: `${x.value ?? 0}px`,
  top: `${y.value ?? 0}px`,
  zIndex: 50,
}));

const triggerClass = computed(() => ["info-tooltip__trigger"]);

function toggle() {
  isOpen.value = !isOpen.value;
}

function close() {
  isOpen.value = false;
}

onClickOutside(
  floatingEl,
  () => {
    if (!isOpen.value) return;
    close();
  },
  {
    ignore: [referenceEl],
    capture: true,
  },
);

onKeyStroke("Escape", () => {
  if (!isOpen.value) return;
  close();
});

watch(isOpen, async (open) => {
  if (!open) return;
  await nextTick();
  update();
});
</script>

<template>
  <span
    ref="referenceEl"
    :class="triggerClass"
    role="button"
    tabindex="0"
    aria-haspopup="dialog"
    :aria-expanded="isOpen ? 'true' : 'false'"
    @click="toggle"
    @keydown.enter.prevent="toggle"
    @keydown.space.prevent="toggle"
  >
    <slot name="trigger" />
  </span>

  <Transition name="info-tooltip-fade">
    <div
      v-if="isOpen"
      ref="floatingEl"
      class="info-tooltip"
      :style="floatingStyles"
      role="tooltip"
    >
      <div class="info-tooltip__body">
        {{ props.text }}
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.info-tooltip__trigger {
  display: inline-flex;
  align-items: center;
}

.info-tooltip {
  width: max-content;
  max-width: 284px;
  background: #ffffff;
  box-shadow: 0px 14px 40px rgba(0, 0, 0, 0.15);
  padding: 16px;
  pointer-events: auto;
  display: flex;
  flex-direction: column;
}

.info-tooltip__body {
  color: #171a1e;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
}

.info-tooltip-fade-enter-active,
.info-tooltip-fade-leave-active {
  transition:
    opacity 120ms ease,
    transform 120ms ease;
}

.info-tooltip-fade-enter-from,
.info-tooltip-fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
