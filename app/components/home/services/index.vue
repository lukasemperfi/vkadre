<script setup lang="ts">
import type { MenuItem } from "~/components/ui/menu/index.vue";
const servicesApi = useServicesApi();

const { data: services } = await useAsyncData("services", () =>
  servicesApi.getServices(),
);

const servicesTabs = computed<MenuItem[]>(() =>
  (services.value ?? []).map((service) => ({
    id: service.id,
    label: service.title,
  })),
);

const activeServiceId = ref<string | null>(null);

watchEffect(() => {
  if (!activeServiceId.value && servicesTabs.value.length) {
    activeServiceId.value = servicesTabs.value[0]?.id ?? null;
  }
});

const activeService = computed(() => {
  const id = activeServiceId.value;
  if (!id) return null;
  return (services.value ?? []).find((s) => s.id === id) ?? null;
});

const onTabClick = (item: MenuItem) => {
  activeServiceId.value = item.id;
};
</script>

<template>
  <section class="services">
    <div class="app-container">
      <div class="services__wrapper">
        <div class="services-tabs">
          <div class="services-tabs__aside">
            <h2 class="services-tabs__title h-2">Услуги</h2>
            <UiMenu :items="servicesTabs">
              <template #item="{ item }">
                <UiMenuButton
                  :label="item.label"
                  @click="onTabClick(item)"
                  :is-active="activeServiceId === item.id"
                />
              </template>
            </UiMenu>
          </div>
          <div class="services-tabs__content">
            <div class="services-tabs__content-title">
              {{ activeService?.title }}
            </div>
            <HomeServicesCard v-if="activeService" :service="activeService" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.services {
  &__wrapper {
    padding-bottom: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
    border-bottom: 1px solid var(--gray);
  }

  &__title {
    margin-bottom: globalFunctions.fluidValue(16px, 40px, 320px, 1440px);
  }

  .services-tabs {
    display: flex;
    justify-content: space-between;
    gap: globalFunctions.fluidValue(24px, 138px, 320px, 1440px);

    @media (max-width: 1024px) {
      flex-direction: column;
      align-items: flex-start;
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
        .menu__items {
          gap: 35px;
        }

        .menu__link {
          gap: 13px;
          font-family: var(--font-family);
          font-weight: 500;
          font-size: 18px;
          color: var(--black);
        }
      }
    }
    &__title {
      margin-bottom: globalFunctions.fluidValue(16px, 41px, 320px, 1440px);
    }
    &__content {
      flex: 1 1 715px;
      padding-top: globalFunctions.fluidValue(24px, 33px, 320px, 1440px);

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
}
</style>
