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
    <Transition name="ui-modal-drawer" :css="!props.disableTransition">
      <div v-if="isOpen" class="ui-modal-drawer-group">
        <div class="ui-modal-drawer-group__positioner">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.ui-modal-drawer-group {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}

.ui-modal-drawer-group__positioner {
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  width: 100%;
  min-height: 100%;
  padding: 0;
}

.ui-modal-drawer-enter-active,
.ui-modal-drawer-leave-active {
  transition: opacity 0.3s ease;

  :deep(.ui-modal-drawer-content) {
    transition: transform 0.3s ease;
  }
}

.ui-modal-drawer-enter-from,
.ui-modal-drawer-leave-to {
  opacity: 0;

  :deep(.ui-modal-drawer-content) {
    transform: translateX(100%);
  }
}
</style>
