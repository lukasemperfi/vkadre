<script setup lang="ts">
import type { UiCalendarSession } from "./types";

interface Props {
  sessions: UiCalendarSession[];
  isOpen?: boolean;
  locale?: string;
  showDate?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  locale: "ru-RU",
  showDate: false,
});

const emit = defineEmits<{
  "update:isOpen": [value: boolean];
  close: [];
}>();

function close(): void {
  emit("update:isOpen", false);
  emit("close");
}
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
        <button
          type="button"
          class="ui-calendar-drawer__close"
          aria-label="Закрыть"
          @click="close"
        >
          <UiIcon name="cross" class="ui-calendar-drawer__close-icon" />
        </button>
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

  @media (max-width: globalBreakpoints.$breakpoint-sm) {
    width: 100%;
  }

  &__header {
    position: sticky;
    top: 0;
    background-color: #ffffff;
    padding-inline: 24px;
    padding-top: 14px;
  }

  &__close {
    align-self: flex-start;

    padding: 8px;
    margin-left: -8px;
    background: transparent;
    border: 0;
    line-height: 0;
    color: var(--black);
    cursor: pointer;
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
    padding-block: 56px;
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
