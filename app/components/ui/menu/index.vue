<script setup lang="ts">
export interface MenuItem {
  id: string;
  label: string;
  to?: string;
}
interface Props {
  items: MenuItem[];
  ariaLabel?: string;
}

withDefaults(defineProps<Props>(), {
  ariaLabel: "Меню",
});

const emit = defineEmits<{
  "item-click": [payload: { item: MenuItem; event: MouseEvent }];
}>();

function emitItemClick(e: MouseEvent, item: MenuItem) {
  emit("item-click", { item, event: e });
}

function onItemClick(
  e: MouseEvent,
  item: MenuItem,
  navigate: (e: MouseEvent) => void,
) {
  emitItemClick(e, item);
  navigate(e);
}
</script>

<template>
  <nav class="menu" :aria-label="ariaLabel">
    <ul class="menu__items" role="list">
      <li v-for="item in items" :key="item.id" class="menu__item">
        <template v-if="$slots.item">
          <slot name="item" :item="item" :onItemClick="(e: MouseEvent) => emitItemClick(e, item)" />
        </template>
        <template v-else>
          <UiMenuLink
            v-if="item.to"
            :to="item.to"
            :label="item.label"
            @click="emitItemClick($event, item)"
          />
          <span v-else class="menu__link menu__link--static">
            <span class="menu__link-text">{{ item.label }}</span>
          </span>
        </template>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.menu {
  &__items {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: globalFunctions.fluidValue(6px, 10px, 320px, 1440px);
  }

  &__item {
    display: block;
    min-width: 0;
  }
}
</style>
