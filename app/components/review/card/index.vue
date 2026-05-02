<script setup lang="ts">
import type { LocationReviewWithLocation } from "~/composables/api/supabase/types";

type Props = {
  review: LocationReviewWithLocation;
};

const props = defineProps<Props>();

const imageUrl = computed(() => props.review.locations?.image_url ?? null);
const locationTitle = computed(
  () => props.review.locations?.title ?? "Локация",
);
</script>

<template>
  <article class="review-card">
    <figure class="review-card__figure">
      <NuxtImg
        v-if="imageUrl"
        :src="imageUrl"
        :alt="locationTitle"
        format="webp"
        class="review-card__image"
      />
      <div v-else class="review-card__placeholder" aria-hidden="true"></div>
    </figure>

    <div class="review-card__content">
      <div class="review-card__quote-wrapper">
        <UiIcon name="quote" class="review-card__quote-icon" />
      </div>
      <div class="review-card__main">
        <h3 class="review-card__location">{{ locationTitle }}</h3>
        <p class="review-card__text">{{ review.content }}</p>
      </div>

      <div class="review-card__quote-wrapper">
        <UiIcon
          name="quote"
          class="review-card__quote-icon review-card__quote-icon_close"
        />
      </div>

      <div class="review-card__author">
        <p class="review-card__author-name">{{ review.user_name }}</p>
        <p v-if="review.user_city" class="review-card__author-city">
          г. {{ review.user_city }}
        </p>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.review-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10vw;
  width: 100%;
  position: relative;

  @media (max-width: globalBreakpoints.$breakpoint-sm) {
    flex-direction: column;
    gap: 24px;
  }

  &__figure {
    flex: none;
    width: globalFunctions.fluidValue(220px, 395px, 320px, 1440px);
    aspect-ratio: 395 / 486;
    background: #c4c4c4;
    overflow: hidden;
    position: relative;
    z-index: 1;

    @media (max-width: globalBreakpoints.$breakpoint-sm) {
      display: none;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    background: #c4c4c4;
  }

  &__content {
    flex: 1 1 auto;
    max-width: 637px;
  }
  &__quote-icon {
    &_close {
      transform: rotate(180deg);
    }
  }

  &__main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    width: 100%;
    margin-top: globalFunctions.fluidValue(16px, 36px, 320px, 1440px);
    margin-bottom: globalFunctions.fluidValue(16px, 40px, 320px, 1440px);
  }

  &__location {
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
    color: var(--black);
  }

  &__text {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: globalFunctions.fluidValue(14px, 16px, 320px, 1440px);
    line-height: globalFunctions.fluidValue(22px, 26px, 320px, 1440px);
    color: var(--black);
  }

  &__author {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    width: 100%;
    margin-top: globalFunctions.fluidValue(16px, 39px, 320px, 1440px);
  }

  &__author-name {
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 18px;
    color: var(--black);
  }

  &__author-city {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 14px;
    color: var(--black);
    opacity: 0.54;
  }
}
</style>
