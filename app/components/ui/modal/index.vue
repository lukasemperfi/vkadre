<script setup lang="ts">
import { UI_MODAL_INJECTION_KEY, type UiModalContext } from "./context";

const props = withDefaults(
  defineProps<{
    disableTransition?: boolean;
  }>(),
  {
    disableTransition: false,
  },
);

const isOpen = defineModel<boolean>("isOpen", { default: false });
defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits<{
  close: [];
}>();

const { close } = useBodyOverlay(isOpen);

watch(isOpen, (v, was) => {
  if (!v && was) {
    emit("close");
  }
});

const context: UiModalContext = {
  isOpen: isOpen,
  close,
  disableTransition: toRef(props, "disableTransition"),
};

provide(UI_MODAL_INJECTION_KEY, context);
</script>

<template>
  <Teleport to="body">
    <Transition name="ui-modal" :css="!props.disableTransition">
      <div v-if="isOpen" class="ui-modal-group">
        <div class="ui-modal-group__positioner">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.ui-modal-group {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}

.ui-modal-group__positioner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding-top: 5vh;
  padding-bottom: 5vh;

  @media (max-width: globalBreakpoints.$breakpoint-sm) {
    padding-top: 0;
    padding-bottom: 0;
  }
}

.ui-modal-enter-active,
.ui-modal-leave-active {
  transition: opacity 0.3s ease;

  :deep(.ui-modal) {
    transition: transform 0.3s ease;
  }
}

.ui-modal-enter-from,
.ui-modal-leave-to {
  opacity: 0;

  :deep(.ui-modal) {
    transform: scale(0.9) translateY(20px);
  }
}
</style>
