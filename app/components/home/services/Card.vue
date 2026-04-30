<script setup lang="ts">
import type { ServiceWithRelations } from "~/composables/api/supabase/types";

type Props = {
  service: ServiceWithRelations;
};

defineProps<Props>();
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
      <p v-if="service.description" class="service-card__description">
        {{ service.description }}
      </p>

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
  display: grid;
  grid-template-columns: 1fr;
  gap: globalFunctions.fluidValue(16px, 24px, 320px, 1440px);
  width: 100%;
  max-width: 715px;
}

.service-card__figure {
  margin: 0;
  width: 100%;
  aspect-ratio: 715 / 239;
  background: #c4c4c4;
  overflow: hidden;
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
  display: grid;
  gap: globalFunctions.fluidValue(14px, 20px, 320px, 1440px);
}

.service-card__description {
  margin: 0;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: var(--black);
}

.service-card__cta {
  max-width: 276px;
  width: 100%;

  :deep(.ui-button) {
    width: 100%;
  }
}
</style>
