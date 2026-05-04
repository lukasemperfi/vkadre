<script setup lang="ts">
import { computed, watch } from "vue";
import type { UiCalendarSession } from "./types";
import type { CalendarDate } from "@internationalized/date";

const MOBILE_DRAWER_MAX_WIDTH = 769;

interface Props {
  sessions: UiCalendarSession[];
  isOpen?: boolean;
  locale?: string;
  showDate?: boolean;
  currentDate?: CalendarDate | null;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  locale: "ru-RU",
  showDate: false,
  currentDate: null,
});

const emit = defineEmits<{
  "update:isOpen": [value: boolean];
  close: [];
}>();

function close(): void {
  emit("update:isOpen", false);
  emit("close");
}

const { width } = useWindowSize();
const shouldLockBodyScroll = computed(
  () => props.isOpen && width.value < MOBILE_DRAWER_MAX_WIDTH,
);
const isBodyScrollLocked = useScrollLock(document.body);

watch(
  shouldLockBodyScroll,
  (lock) => {
    isBodyScrollLocked.value = lock;
  },
  { immediate: true },
);

useEventListener(window, "resize", () => {
  if (props.isOpen) {
    close();
  }
});
</script>

<template>
  <Transition name="ui-calendar-drawer">
    <aside
      v-if="isOpen"
      class="ui-calendar-drawer"
      role="complementary"
      aria-label="Сессии выбранного дня"
    >
      <div class="ui-calendar-drawer__header">
        <div class="ui-calendar-drawer__header-date">
          {{
            currentDate?.toDate("UTC").toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
            })
          }}
        </div>
        <UiIconButton
          class="ui-calendar-drawer__close"
          aria-label="Закрыть"
          @click="close"
          variant="solid"
        >
          <UiIcon name="cross" />
        </UiIconButton>
      </div>
      <div class="ui-calendar-drawer__body">
        <div class="ui-calendar-drawer__list">
          <UiCalendarSessionCard
            v-for="session in sessions"
            :key="session.id"
            :session="session"
            :locale="locale"
            :show-date="showDate"
          />
        </div>
      </div>
    </aside>
  </Transition>
</template>

<style scoped lang="scss">
.ui-calendar-drawer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  width: 27.78vw;
  max-width: 100%;
  overflow-y: auto;
  background-color: #ffffff;
  font-family: var(--font-family);
  box-shadow: 0 14px 20px 0 rgba(0, 0, 0, 0.15);

  @media (max-width: 1439px) {
    width: 30vw;
  }

  @media (max-width: 1249px) {
    width: 50vw;
  }

  @media (max-width: globalBreakpoints.$breakpoint-sm) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    border: none;
    z-index: 99999;
  }

  &__header {
    position: sticky;
    top: 0;
    background-color: #ffffff;
    padding-inline: 24px;
    padding-block: 24px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__header-date {
    font-size: 24px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--black);
  }

  &__close-icon {
    width: 25px;
    height: 26px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 65px;
  }

  &__body {
    padding-inline: 24px;
    padding-top: 24px;
    padding-bottom: 48px;
  }
}

.ui-calendar-drawer-enter-active,
.ui-calendar-drawer-leave-active {
  transition: transform 0.3s ease;
}

.ui-calendar-drawer-enter-from,
.ui-calendar-drawer-leave-to {
  transform: translateX(100%);
}
</style>
