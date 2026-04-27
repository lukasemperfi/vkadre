<script setup lang="ts">
interface MenuItem {
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
</script>

<template>
  <nav class="menu" :aria-label="ariaLabel">
    <ul class="menu__items" role="list">
      <li v-for="item in items" :key="item.id" class="menu__item">
        <NuxtLink
          v-if="item.to"
          v-slot="{ isActive, href, navigate }"
          :to="item.to"
          custom
        >
          <a
            :href="href"
            class="menu__link"
            :class="{ 'menu__link--active': isActive }"
            :aria-current="isActive ? 'page' : undefined"
            @click="(e) => navigate(e)"
          >
            <UiIcon
              v-show="isActive"
              name="menu-arrow"
              class="menu__icon"
              aria-hidden="true"
            />
            <span class="menu__link-text">{{ item.label }}</span>
          </a>
        </NuxtLink>
        <span v-else class="menu__link menu__link--static">
          <span class="menu__link-text">{{ item.label }}</span>
        </span>
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

  &__link {
    display: inline-flex;
    align-items: center;
    gap: globalFunctions.fluidValue(4px, 6px, 320px, 1440px);
    max-width: 100%;
    font-family: var(--font-family);
    font-size: globalFunctions.fluidValue(14px, 16px, 320px, 1440px);
    font-weight: 500;
    line-height: 1.3;
    color: var(--black);
    text-decoration: none;
    border-radius: 2px;
    transition: color 0.2s ease;

    &--static {
      cursor: default;
      color: var(--gray);
    }

    &--active {
      color: var(--black);
    }

    &:not(.menu__link--static) {
      cursor: pointer;

      &:focus-visible {
        outline: 2px solid #d8d8d8;
        outline-offset: 3px;
      }
    }
  }

  &__item:hover .menu__link:not(.menu__link--static) .menu__link-text {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.2em;
    text-decoration-color: currentColor;
  }

  &__link-text {
    min-width: 0;
  }

  &__icon {
    width: 1em;
    min-width: 1em;
    height: 1em;
  }
}
</style>
