<script setup lang="ts">
import { useEventListener } from "@vueuse/core";

type MenuItem = {
  id: string;
  label: string;
  to?: string;
};

type Props = {
  modelValue: boolean;
  items: MenuItem[];
  isAuth: boolean;
};

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit("update:modelValue", v),
});

function close() {
  isOpen.value = false;
}

useEventListener(window, "resize", () => {
  if (isOpen.value) close();
});

function onKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return;
  if (e.key === "Escape") close();
}

function lockScroll(lock: boolean) {
  if (typeof document === "undefined") return;
  document.documentElement.style.overflow = lock ? "hidden" : "";
  document.body.style.overflow = lock ? "hidden" : "";
}

watch(
  () => isOpen.value,
  (open) => lockScroll(open),
  { immediate: true },
);

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  lockScroll(false);
  window.removeEventListener("keydown", onKeydown);
});

function onItemClick(payload: { item: MenuItem; event: MouseEvent }) {
  close();
}
</script>

<template>
  <Teleport to="body">
    <Transition name="mobile-menu" appear>
      <div
        v-if="isOpen"
        id="header-mobile-menu"
        class="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Меню"
      >
        <div class="app-container">
          <div class="mobile-menu__top">
            <div class="mobile-menu__profile">
              <UiIconButton class="mobile-menu__profile-btn" @click="close">
                <UiIcon name="user-m" class="mobile-menu__profile-icon" />
              </UiIconButton>
              <div class="mobile-menu__profile-text">
                {{ props.isAuth ? "Личный кабинет" : "Войти" }}
              </div>
            </div>

            <UiIconButton
              class="mobile-menu__close"
              aria-label="Close menu"
              @click="close"
            >
              <UiIcon name="cross" class="mobile-menu__close-icon" />
            </UiIconButton>
          </div>

          <UiMenu
            :items="props.items"
            class="mobile-menu__nav"
            @item-click="onItemClick"
          />

          <div class="mobile-menu__bottom">
            <ul class="mobile-menu__contacts" role="list">
              <li>+380971234567</li>
              <li>FB.COM/VKADRE</li>
              <li>VKADRE@GMAIL.COM</li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
@use "./_variables.scss" as *;

.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: #fff;
  color: var(--black);
  display: none;
  flex-direction: column;
  min-height: 0;
  min-height: 100vh;
  min-height: 100dvh;

  @media (max-width: 900px) {
    display: flex;
  }

  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 0;
    min-height: 100vh;
    min-height: 100dvh;
  }

  &__top {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-top: $padding-top;
  }

  &__profile {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  &__profile-icon {
    width: 20px;
    height: 20px;
  }

  &__profile-text {
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    text-transform: uppercase;
    white-space: nowrap;
  }

  &__close-icon {
    width: 18px;
    height: 18px;
  }

  &__nav {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    display: flex;
    align-items: flex-start;
    padding-block: 13.75vh;

    :deep(.menu__items) {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 35px;
    }

    :deep(.menu__link) {
      font-weight: 600;
      font-size: 24px;
      text-transform: uppercase;
      gap: 12px;
    }
  }

  &__active-icon {
    width: 18px;
    height: 18px;
    transform: rotate(-90deg);
  }

  &__bottom {
    flex: 0 0 auto;
    margin-top: auto;
    border-top: 1px solid var(--gray);
    padding-top: 40px;
    padding-bottom: 48px;
  }

  &__divider {
    height: 1px;
    background: currentColor;
    opacity: 0.1;
    margin-bottom: 24px;
  }

  &__contacts {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    text-transform: uppercase;
  }
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 180ms ease,
    transform 220ms ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

.mobile-menu-enter-to,
.mobile-menu-leave-from {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .mobile-menu-enter-active,
  .mobile-menu-leave-active {
    transition: none;
  }
}
</style>
