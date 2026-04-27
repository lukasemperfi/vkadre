<script setup lang="ts">
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
            <UiIcon name="strong-cross" class="mobile-menu__close-icon" />
          </UiIconButton>
        </div>

        <nav class="mobile-menu__nav" aria-label="Меню">
          <ul class="mobile-menu__items" role="list">
            <li
              v-for="item in props.items"
              :key="item.id"
              class="mobile-menu__item"
            >
              <NuxtLink
                v-if="item.to"
                v-slot="{ href, navigate, isActive }"
                :to="item.to"
                custom
              >
                <a
                  :href="href"
                  class="mobile-menu__link"
                  :aria-current="isActive ? 'page' : undefined"
                  @click="
                    (e) => {
                      navigate(e);
                      close();
                    }
                  "
                >
                  <UiIcon
                    v-show="isActive"
                    name="menu-arrow"
                    class="mobile-menu__active-icon"
                    aria-hidden="true"
                  />
                  <span class="mobile-menu__link-text">{{ item.label }}</span>
                </a>
              </NuxtLink>
              <span v-else class="mobile-menu__link mobile-menu__link--static">
                <span class="mobile-menu__link-text">{{ item.label }}</span>
              </span>
            </li>
          </ul>
        </nav>

        <div class="mobile-menu__bottom">
          <div class="mobile-menu__divider" />
          <ul class="mobile-menu__contacts" role="list">
            <li>+380971234567</li>
            <li>FB.COM/VKADRE</li>
            <li>VKADRE@GMAIL.COM</li>
          </ul>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 180ms ease,
    transform 220ms ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(0px);
}

.mobile-menu-enter-to,
.mobile-menu-leave-from {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .mobile-menu-enter-active,
  .mobile-menu-leave-active {
    transition: none;
  }
}

.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: #fff;
  color: var(--black);
  display: flex;
  flex-direction: column;
  padding: 24px;
  min-height: 100vh;
  min-height: 100dvh;

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 48px;
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
    flex: 1;
    display: flex;
    align-items: center;
  }

  &__items {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
  }

  &__link {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    color: var(--black);
    font-family: var(--font-family);
    font-weight: 600;
    font-size: 24px;
    line-height: 140%;
    text-transform: uppercase;

    &:focus-visible {
      outline: 2px solid #d8d8d8;
      outline-offset: 3px;
    }

    &--static {
      cursor: default;
      opacity: 0.6;
    }
  }

  &__active-icon {
    width: 18px;
    height: 18px;
    transform: rotate(-90deg);
  }

  &__bottom {
    margin-top: 40px;
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
</style>
