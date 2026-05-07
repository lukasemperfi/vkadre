<script setup lang="ts">
import type { MenuItem } from "~/components/ui/menu/index.vue";
const route = useRoute();
const router = useRouter();

const menuItems = [
  { id: "my_data", label: "Мои данные" },
  { id: "upcoming", label: "Предстоящие фотосессии" },
  { id: "past", label: "Прошедшие фотосессии" },
];

const effectiveActiveServiceId = computed<string | null>(() => {
  return (route.query.tab as string) || menuItems[0]?.id || null;
});

const activeServiceId = computed({
  get: () => effectiveActiveServiceId.value,
  set: (val) => {
    if (val) {
      router.push({ query: { ...route.query, tab: val } });
    }
  },
});

const activeService = computed(() => {
  const id = effectiveActiveServiceId.value;
  if (!id) return null;
  return (menuItems ?? []).find((s) => s.id === id) ?? null;
});

const onTabClick = (item: MenuItem) => {
  router.push({ query: { ...route.query, tab: item.id } });
};

const onLogout = () => {
  console.log("Выход из системы...");
};
</script>

<template>
  <section class="services">
    <div class="app-container">
      <h2 class="services__title h-2">Личный кабинет</h2>
      <div class="services__wrapper">
        <div class="services-tabs">
          <div class="services-tabs__aside">
            <UiMenu :items="menuItems">
              <template #item="{ item }">
                <UiMenuButton
                  :label="item.label"
                  :is-active="effectiveActiveServiceId === item.id"
                  @click="onTabClick(item)"
                />
              </template>
              <UiMenuButton
                label="Выйти"
                class="logout-button"
                @click="onLogout"
              />
            </UiMenu>
          </div>
          <div class="services-tabs__content">
            <div class="services-tabs__content-title">
              {{ activeService?.label }}
            </div>
            <div class="services-tabs__content-body">tab content</div>
          </div>
        </div>
        <div class="services__accordion">
          <UiAccordion v-model="activeServiceId">
            <UiAccordionItem
              v-for="menuItem in menuItems"
              :key="menuItem.id"
              :value="menuItem.id"
            >
              <UiAccordionTrigger>{{ menuItem.label }}</UiAccordionTrigger>
              <UiAccordionContent> tab content accordion </UiAccordionContent>
            </UiAccordionItem>
            <UiButton
              label="Выйти"
              class="logout-button"
              @click="onLogout"
              variant="outline"
            />
          </UiAccordion>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.services {
  padding-top: 40px;

  &__wrapper {
    padding-bottom: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
    border-bottom: 1px solid var(--gray);
  }

  &__title {
    margin-bottom: globalFunctions.fluidValue(24px, 60px, 320px, 1440px);
  }

  .services-tabs {
    display: flex;
    justify-content: space-between;
    gap: globalFunctions.fluidValue(24px, 138px, 768px, 1440px);

    @media (max-width: 1250px) {
      flex-direction: column;
    }

    @media (max-width: 768px) {
      display: none;
    }

    &__aside {
      border: 1px solid var(--gray);
      padding-top: 31px;
      padding-left: 34px;
      padding-right: 4px;
      padding-bottom: 54px;
      flex: 1 1 396px;

      :deep(.menu) {
        max-height: 617px;
        overflow-y: auto;

        @media (max-width: 1250px) {
          max-height: 335px;
        }

        .menu__items {
          gap: 35px;
          margin-right: 34px;

          @media (max-width: 1250px) {
            display: grid;
            grid-template-columns: repeat(
              auto-fill,
              minmax(260px, max-content)
            );
            justify-content: space-between;
          }
        }

        .menu__link {
          gap: 13px;
          font-family: var(--font-family);
          font-weight: 500;
          font-size: 18px;
          color: var(--black);
          white-space: nowrap;
        }
      }
    }
    &__title {
      margin-bottom: globalFunctions.fluidValue(16px, 41px, 320px, 1440px);
    }
    &__content {
      flex: 1 1 715px;

      &-title {
        font-family: var(--font-family);
        font-weight: 600;
        font-size: globalFunctions.fluidValue(18px, 24px, 320px, 1440px);
        text-transform: uppercase;
        color: var(--black);
        margin-bottom: globalFunctions.fluidValue(16px, 33px, 320px, 1440px);
      }
    }
  }
  &__accordion {
    display: none;
    &-title {
      margin-bottom: 20px;
    }
    @media (max-width: 768px) {
      display: block;
    }

    .logout-button {
      margin-top: 40px;
    }
  }
}
</style>
