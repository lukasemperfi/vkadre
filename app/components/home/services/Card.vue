<script setup lang="ts">
import type { ServiceWithRelations } from "~/composables/api/supabase/types";

type Props = {
  service: ServiceWithRelations;
};

const props = defineProps<Props>();

console.log(props.service);
</script>

<template>
  <article class="service-card">
    <figure class="service-card__figure">
      <NuxtImg
        v-if="service.main_image"
        :src="service.main_image"
        :alt="service.title"
        format="webp"
        class="service-card__image"
      />
      <div v-else class="service-card__placeholder" aria-hidden="true"></div>
    </figure>

    <div class="service-card__body">
      <div
        v-if="service.description"
        v-html="service.description"
        class="service-card__description"
      ></div>

      <HomeServicesPrices
        v-if="service.service_packages?.length"
        :packages="service.service_packages"
        class="service-card__prices"
      />

      <div class="service-card__cta">
        <UiButton variant="outline" size="lg" label="Заказать фотосессию" />
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.service-card {
  width: 100%;
  max-width: 715px;
}

.service-card__figure {
  width: 100%;
  aspect-ratio: 715 / 239;
  background: #c4c4c4;
  overflow: hidden;
  margin-bottom: globalFunctions.fluidValue(24px, 41px, 320px, 1440px);
}

.service-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.service-card__placeholder {
  width: 100%;
  height: 100%;
  background: #c4c4c4;
}

.service-card__body {
}

.service-card__description {
  display: flex;
  flex-direction: column;
  gap: 27px;
  margin: 0;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: var(--black);
  margin-bottom: globalFunctions.fluidValue(24px, 40px, 320px, 1440px);
}

.service-card__cta {
  margin-top: globalFunctions.fluidValue(24px, 40px, 320px, 1440px);
  max-width: 276px;
  width: 100%;

  :deep(.ui-button) {
    width: 100%;
  }
}
</style>
