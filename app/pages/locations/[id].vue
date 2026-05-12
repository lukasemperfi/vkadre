<script setup lang="ts">
const photos = [
  { id: 1, src: "https://picsum.photos/seed/w-a1/1900/1200", alt: "" },
  { id: 2, src: "https://picsum.photos/seed/w-a2/1900/1200", alt: "" },
  { id: 3, src: "https://picsum.photos/seed/w-a3/1900/1200", alt: "" },
  { id: 4, src: "https://picsum.photos/seed/w-a4/1900/1200", alt: "" },
  { id: 5, src: "https://picsum.photos/seed/w-a5/1900/1200", alt: "" },
  { id: 6, src: "https://picsum.photos/seed/w-a6/1900/1200", alt: "" },
  { id: 7, src: "https://picsum.photos/seed/w-a7/1900/1200", alt: "" },
  { id: 8, src: "https://picsum.photos/seed/w-a8/1900/1200", alt: "" },
  { id: 9, src: "https://picsum.photos/seed/w-a9/1900/1200", alt: "" },
  { id: 10, src: "https://picsum.photos/seed/w-a10/1900/1200", alt: "" },
  { id: 11, src: "https://picsum.photos/seed/w-a11/1900/1200", alt: "" },
  { id: 12, src: "https://picsum.photos/seed/w-a12/1900/1200", alt: "" },
  { id: 13, src: "https://picsum.photos/seed/w-a13/1900/1200", alt: "" },
  { id: 14, src: "https://picsum.photos/seed/w-a14/1900/1200", alt: "" },
  { id: 15, src: "https://picsum.photos/seed/w-a15/1900/1200", alt: "" },
  { id: 16, src: "https://picsum.photos/seed/w-a16/1900/1200", alt: "" },
  { id: 17, src: "https://picsum.photos/seed/w-a17/1900/1200", alt: "" },
  { id: 18, src: "https://picsum.photos/seed/w-a18/1900/1200", alt: "" },
  { id: 19, src: "https://picsum.photos/seed/w-a19/1900/1200", alt: "" },
  { id: 20, src: "https://picsum.photos/seed/w-a20/1900/1200", alt: "" },
  { id: 21, src: "https://picsum.photos/seed/w-a21/1900/1200", alt: "" },
  { id: 22, src: "https://picsum.photos/seed/w-a22/1900/1200", alt: "" },
  { id: 23, src: "https://picsum.photos/seed/w-a23/1900/1200", alt: "" },
  { id: 24, src: "https://picsum.photos/seed/w-a24/1900/1200", alt: "" },
  { id: 25, src: "https://picsum.photos/seed/w-a25/1900/1200", alt: "" },
  { id: 26, src: "https://picsum.photos/seed/w-a26/1900/1200", alt: "" },
  { id: 27, src: "https://picsum.photos/seed/w-a27/1900/1200", alt: "" },
  { id: 28, src: "https://picsum.photos/seed/w-a28/1900/1200", alt: "" },
  { id: 29, src: "https://picsum.photos/seed/w-a29/1900/1200", alt: "" },
  { id: 30, src: "https://picsum.photos/seed/w-a30/1900/1200", alt: "" },
].slice(0, 10);

const route = useRoute();
const locationsApi = useLocationsApi();

const locationId = computed(() => route.params.id as string);

const { data: location, refresh } = await useAsyncData(
  `location-${locationId.value}`,
  () => locationsApi.getLocation(locationId.value),
);

watch(locationId, async (newId) => {
  if (newId) {
    await refresh();

    if (import.meta.client) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
});

const packages = [
  {
    id: "5cf3706e-ea3a-4180-9404-f9c89989b67a",
    price: 990,
    currency: "UAH",
    service_id: "dc3a1e83-165e-4072-811a-5c172fff9fcc",
    location_id: null,
    photo_count: 10,
    duration_minutes: 10,
  },
  {
    id: "361e4485-f572-4072-8d31-cfa243087c58",
    price: 1990,
    currency: "UAH",
    service_id: "dc3a1e83-165e-4072-811a-5c172fff9fcc",
    location_id: null,
    photo_count: 20,
    duration_minutes: 20,
  },
  {
    id: "f753f33d-d26d-4810-a134-bd5e62e67dd3",
    price: 2990,
    currency: "UAH",
    service_id: "dc3a1e83-165e-4072-811a-5c172fff9fcc",
    location_id: null,
    photo_count: 30,
    duration_minutes: 30,
  },
  {
    id: "98a0c484-7874-4372-b0e2-c0db237e13ae",
    price: 199,
    currency: "UAH",
    service_id: "dc3a1e83-165e-4072-811a-5c172fff9fcc",
    location_id: null,
    photo_count: 0,
    duration_minutes: 0,
  },
];
</script>
<template>
  <div class="location-page">
    <div class="app-container">
      <div class="location-page__header">
        <NuxtLink class="location-page__back-button" to="/locations">
          <UiIcon name="fill-arrow-left" />Назад
        </NuxtLink>
        <h1 class="location-page__title h-2">{{ location?.title }}</h1>
      </div>
      <section class="works">
        <UiPhotoGrid :items="photos" mobile-variant="mobile-flat" />
        <div class="works__info">
          <div class="works__info-description" v-html="location?.description" />

          <div class="works__info-packages">
            <PackagesBlock :packages="packages" :showHeader="true" />
          </div>
        </div>
        <div class="photoshoot-block">
          <div class="photoshoot-block__description-wrapper">
            <div class="photoshoot-block__description">
              "Помимо экспресс-фотосессий в "Название локации", которые проходят
              по конкретному расписанию - вы можете заказать индивидуальную
              фотосессию для своих нужд с любой продолжительностью
            </div>
            <UiButton
              label="Заказать фотосессию"
              variant="outline"
              class="photoshoot-block__button"
            />
          </div>
          <div class="photoshoot-block__image-wrapper">
            <NuxtImg
              src="/images/location-img-1.jpg"
              alt=""
              class="photoshoot-block__image"
            />
          </div>
        </div>
      </section>
      <section>
        <LocationSlider />
      </section>
      <section>
        <UiCallBlock />
      </section>
    </div>
  </div>
</template>
<style scoped lang="scss">
.location-page {
  &__header {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    column-gap: 28px;
    row-gap: 20px;
    margin-top: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
    margin-bottom: globalFunctions.fluidValue(40px, 60px, 320px, 1440px);

    @media (max-width: globalBreakpoints.$breakpoint-xs) {
      flex-direction: column;
    }
  }

  &__title {
    font-size: globalFunctions.fluidValue(16px, 32px, 320px, 1440px);
  }

  &__back-button {
    font-family: var(--font-family);
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 0.17em;
    text-transform: uppercase;
    color: var(--black);
    display: flex;
    align-items: center;
    gap: 19px;
  }

  .works {
    $tablet-breakpoint: 1100px;

    padding-bottom: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
    margin-bottom: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
    border-bottom: 1px solid var(--gray);

    &__info {
      display: flex;
      justify-content: space-between;
      gap: 24px;
      margin-top: globalFunctions.fluidValue(40px, 60px, 320px, 1440px);

      @media (max-width: $tablet-breakpoint) {
        flex-direction: column;
        align-items: center;
      }
    }

    &__info-description {
      max-width: 608px;
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 16px;
      line-height: 26px;
      color: var(--black);
      display: flex;
      flex-direction: column;
      gap: 24px;

      @media (max-width: $tablet-breakpoint) {
        max-width: 100%;
      }
    }

    &__info-packages {
      max-width: 500px;
      min-width: 500px;

      @media (max-width: $tablet-breakpoint) {
        min-width: 100%;
        max-width: 100%;
      }

      :deep(.location-prices) {
        @media (max-width: $tablet-breakpoint) {
          border: none;
          padding: 0;
        }

        .location-prices__list {
          @media (max-width: $tablet-breakpoint) {
            border: 1px solid rgba(23, 26, 30, 0.1);
            padding: 16px;
          }
        }
      }

      :deep(.ui-button) {
        @media (max-width: $tablet-breakpoint) {
          width: 100%;
        }
      }
    }
  }

  .photoshoot-block {
    margin-top: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
    display: grid;
    grid-template-columns: 749fr 501fr;
    background-color: white;

    @media (max-width: 950px) {
      grid-template-columns: 1fr;
      gap: 24px;
      padding: 24px;
      padding-inline: globalFunctions.fluidValue(-24px, -96px, 320px, 1440px);
    }

    &__description-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 24px;
      padding: 45px;

      @media (max-width: 950px) {
        order: 2;
        padding: 0;
      }
    }

    &__description {
      max-width: 563px;
      justify-self: start;

      @media (max-width: 950px) {
        max-width: 100%;
      }
    }
    &__button {
      align-self: start;
      justify-self: start;

      @media (max-width: 950px) {
        width: 100%;
      }
    }
    &__image-wrapper {
      aspect-ratio: 501 / 320;

      @media (max-width: 950px) {
        order: 1;
        aspect-ratio: 2/1;
      }

      @media (max-width: 500px) {
        aspect-ratio: 501/320;
      }
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
