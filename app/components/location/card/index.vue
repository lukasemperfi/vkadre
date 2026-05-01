<script setup lang="ts">
import type { LocationRow } from "~/composables/api/supabase/types";

type Props = {
  location: LocationRow;
};

const props = defineProps<Props>();
</script>

<template>
  <article class="location-card">
    <figure class="location-card__figure">
      <NuxtImg
        v-if="location.image_url"
        :src="location.image_url"
        :alt="location.title"
        format="webp"
        class="location-card__image"
      />
      <div v-else class="location-card__placeholder" aria-hidden="true"></div>
    </figure>

    <div class="location-card__body">
      <h3 class="location-card__title">{{ location.title }}</h3>

      <div v-if="location.city" class="location-card__location">
        <UiIcon name="location" class="location-card__icon" />
        <span class="location-card__city">г. {{ location.city }}</span>
      </div>

      <p v-if="location.description" class="location-card__description">
        {{ location.description }}
      </p>
    </div>
  </article>
</template>

<style scoped lang="scss">
.location-card {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.location-card__figure {
  width: 100%;
  aspect-ratio: 395 / 376;
  background: #c4c4c4;
  overflow: hidden;
  margin-bottom: globalFunctions.fluidValue(16px, 40px, 320px, 1440px);

  @media (max-width: globalBreakpoints.$breakpoint-sm) {
    aspect-ratio: 272 / 180;
  }
}

.location-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.location-card__placeholder {
  width: 100%;
  height: 100%;
  background: #c4c4c4;
}

.location-card__body {
  display: flex;
  flex-direction: column;
}

.location-card__title {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 140%;
  text-transform: uppercase;
  color: var(--black, #171a1e);
  margin-bottom: 17px;
}

.location-card__location {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin-bottom: 17px;
}

.location-card__icon {
  width: 18px;
  height: 18px;
  opacity: 0.3;
  color: var(--black, #171a1e);
}

.location-card__city {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: var(--black, #171a1e);
}

.location-card__description {
  font-style: normal;
  font-weight: 400;
  font-size: globalFunctions.fluidValue(14px, 16px, 320px, 1440px);
  line-height: globalFunctions.fluidValue(22px, 26px, 320px, 1440px);
  color: var(--black, #171a1e);
}
</style>
