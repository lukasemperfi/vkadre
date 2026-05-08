<script setup lang="ts">
const route = useRoute();
const authApi = useAuthApi();

const menuItems = [
  { id: "my-data", label: "Мои данные", to: "/profile" },
  { id: "upcoming", label: "Предстоящие фотосессии", to: "/profile/upcoming" },
  { id: "past", label: "Прошедшие фотосессии", to: "/profile/past" },
];

const activeMenuItem = computed(() => {
  return menuItems.find((item) => item.to === route.path) || menuItems[0];
});

const onLogout = async () => await authApi.signOut();

const handleTabChange = (val: any) => {
  if (val && typeof val === "string") {
    navigateTo(val);
  }
};
</script>

<template>
  <NuxtLayout name="default">
    <section class="profile">
      <div class="app-container">
        <h2 class="profile__title h-2">Личный кабинет</h2>
        <div class="profile__wrapper">
          <div class="profile-tabs">
            <aside class="profile-tabs__aside">
              <div class="profile-tabs__aside-wrapper">
                <UiMenu :items="menuItems">
                  <template #item="{ item }">
                    <UiMenuButton
                      :label="item.label"
                      :is-active="route.path === item.to"
                      @click="navigateTo(item.to)"
                    />
                  </template>
                  <UiMenuButton
                    label="Выйти"
                    class="logout-button"
                    @click="onLogout"
                  />
                </UiMenu>
              </div>
            </aside>

            <main class="profile-tabs__content">
              <div class="profile-tabs__content-title">
                {{ activeMenuItem?.label }}
              </div>
              <slot />
            </main>
          </div>

          <div class="profile__accordion">
            <UiAccordion
              :model-value="route.path"
              @update:model-value="handleTabChange"
            >
              <UiAccordionItem
                v-for="item in menuItems"
                :key="item.id"
                :value="item.to"
              >
                <UiAccordionTrigger>{{ item.label }}</UiAccordionTrigger>
                <UiAccordionContent>
                  <slot />
                </UiAccordionContent>
              </UiAccordionItem>
            </UiAccordion>
            <UiButton
              label="Выйти"
              class="logout-button"
              @click="onLogout"
              variant="outline"
            />
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.profile {
  padding-top: 40px;

  &__wrapper {
    padding-bottom: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
    border-bottom: 1px solid var(--gray);
  }

  &__title {
    margin-bottom: globalFunctions.fluidValue(24px, 60px, 320px, 1440px);
  }

  .profile-tabs {
    display: flex;
    justify-content: space-between;
    gap: globalFunctions.fluidValue(24px, 138px, 768px, 1440px);

    @media (max-width: 1200px) {
      flex-direction: column;
    }

    @media (max-width: 768px) {
      display: none;
    }

    &__aside {
      flex: 1 1 396px;

      @media (max-width: 1200px) {
        flex: 0;
      }
      &-wrapper {
        border: 1px solid var(--gray);
        padding-top: 32px;
        padding-left: 32px;
        padding-right: 4px;
        padding-bottom: 39px;
      }

      :deep(.menu) {
        max-height: 617px;
        min-width: 290px;
        overflow-y: auto;

        @media (max-width: 1250px) {
          max-height: 335px;
        }

        .menu__items {
          gap: 35px;
          margin-right: 34px;

          // @media (max-width: 1250px) {
          //   display: grid;
          //   grid-template-columns: repeat(
          //     auto-fill,
          //     minmax(260px, max-content)
          //   );
          //   justify-content: space-between;
          // }
        }

        .menu__link {
          gap: 13px;
          font-family: var(--font-family);
          font-weight: 500;
          font-size: 18px;
          color: var(--gray);
          white-space: nowrap;

          &--active {
            color: var(--black);
          }
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
      width: 100%;
    }
  }
}
</style>
