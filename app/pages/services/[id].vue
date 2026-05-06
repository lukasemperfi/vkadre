<script setup lang="ts">
const photos = [
  { id: 1, src: "https://picsum.photos/seed/w-a1/232/195", alt: "" },
  { id: 2, src: "https://picsum.photos/seed/w-a2/232/195", alt: "" },
  { id: 3, src: "https://picsum.photos/seed/w-a3/232/195", alt: "" },
  { id: 4, src: "https://picsum.photos/seed/w-a4/232/195", alt: "" },
  { id: 5, src: "https://picsum.photos/seed/w-a5/232/195", alt: "" },
  { id: 6, src: "https://picsum.photos/seed/w-a6/232/195", alt: "" },
  { id: 7, src: "https://picsum.photos/seed/w-a7/232/195", alt: "" },
  { id: 8, src: "https://picsum.photos/seed/w-a8/232/195", alt: "" },
  { id: 9, src: "https://picsum.photos/seed/w-a9/232/195", alt: "" },
  { id: 10, src: "https://picsum.photos/seed/w-a10/232/195", alt: "" },
  { id: 11, src: "https://picsum.photos/seed/w-a11/232/195", alt: "" },
  { id: 12, src: "https://picsum.photos/seed/w-a12/232/195", alt: "" },
  { id: 13, src: "https://picsum.photos/seed/w-a13/232/195", alt: "" },
  { id: 14, src: "https://picsum.photos/seed/w-a14/232/195", alt: "" },
  { id: 15, src: "https://picsum.photos/seed/w-a15/232/195", alt: "" },
  { id: 16, src: "https://picsum.photos/seed/w-a16/232/195", alt: "" },
  { id: 17, src: "https://picsum.photos/seed/w-a17/232/195", alt: "" },
  { id: 18, src: "https://picsum.photos/seed/w-a18/232/195", alt: "" },
  { id: 19, src: "https://picsum.photos/seed/w-a19/232/195", alt: "" },
  { id: 20, src: "https://picsum.photos/seed/w-a20/232/195", alt: "" },
  { id: 21, src: "https://picsum.photos/seed/w-a21/232/195", alt: "" },
  { id: 22, src: "https://picsum.photos/seed/w-a22/232/195", alt: "" },
  { id: 23, src: "https://picsum.photos/seed/w-a23/232/195", alt: "" },
  { id: 24, src: "https://picsum.photos/seed/w-a24/232/195", alt: "" },
  { id: 25, src: "https://picsum.photos/seed/w-a25/232/195", alt: "" },
  { id: 26, src: "https://picsum.photos/seed/w-a26/232/195", alt: "" },
  { id: 27, src: "https://picsum.photos/seed/w-a27/232/195", alt: "" },
  { id: 28, src: "https://picsum.photos/seed/w-a28/232/195", alt: "" },
  { id: 29, src: "https://picsum.photos/seed/w-a29/232/195", alt: "" },
  { id: 30, src: "https://picsum.photos/seed/w-a30/232/195", alt: "" },
].slice(0, 10);

const route = useRoute();
const serviceId = route.params.id || "";
const servicesApi = useServicesApi();

const { data: service } = await useAsyncData("service", () =>
  servicesApi.getService(serviceId as string),
);

const isOtherServicesVisible = ref(false);

const otherServiceCategories = [
  { id: "1", title: "Экспресс-фотосессии", icon: "timer-small" },
  { id: "2", title: "Индивидуальная фотосессия", icon: "person" },
  { id: "3", title: "Экспресс-видеосъемка", icon: "camera" },
  { id: "4", title: "Семейная фотосессия", icon: "people" },
  { id: "5", title: "Фотосессии в Красной поляне", icon: "cloud" },
  { id: "6", title: "Фотоконтент", icon: "picture" },
  { id: "7", title: "Фотосессия Дня Рождения", icon: "buklet" },
  { id: "8", title: "Фотосессия беременности", icon: "pregnancy" },
  { id: "9", title: "Фотосессия в парке", icon: "bible" },
  { id: "10", title: "Love Story", icon: "heart" },
  { id: "11", title: "Студийная фотосессия", icon: "flag" },
  { id: "12", title: "Предметная фотосессия", icon: "diamond" },
  { id: "13", title: "Фотосессия в кафе", icon: "cup" },
  { id: "14", title: "Фотосессия в номере отеля", icon: "hook" },
  { id: "15", title: "Домашняя фотосессия", icon: "house" },
  { id: "16", title: "Свадебная фотосессия", icon: "rings" },
  { id: "17", title: "Интерьерная фотосессия", icon: "interior" },
  { id: "18", title: "Фотосессия под ключ", icon: "key" },
  { id: "19", title: "Фотопикник", icon: "cart" },
  { id: "20", title: "Ночная фотосессия", icon: "moon" },
];

const cutedOtherServiceCategories = computed(() => {
  return [
    otherServiceCategories.slice(0, 6),
    otherServiceCategories.slice(6, otherServiceCategories.length),
  ];
});

console.log(
  "cutedOtherServiceCategories",
  cutedOtherServiceCategories.value,
  "otherServiceCategories",
  otherServiceCategories,
);
</script>
<template>
  <div class="service-page">
    <div class="app-container">
      <div class="service-page__header">
        <NuxtLink class="service-page__back-button" to="/services">
          <UiIcon name="fill-arrow-left" />Назад
        </NuxtLink>
        <h1 class="service-page__title h-2">{{ service?.title }}</h1>
      </div>
      <section class="works">
        <UiPhotoGrid :items="photos" />
        <div class="works__info">
          <div class="works__info-description" v-html="service?.description" />

          <div class="works__info-packages">
            <PackagesBlock :packages="service?.service_packages ?? []" />
          </div>
        </div>
      </section>
      <section>
        <Calendar />
      </section>
      <section class="other-services">
        <div class="other-services__title h-2">Другие услуги</div>
        <div class="other-services__list">
          <div
            class="other-service-card"
            v-for="(category, index) in otherServiceCategories"
            :key="category.id"
            :class="{
              'other-service-card_cutted': index > 5,
              'other-service-card_cutted_show': isOtherServicesVisible,
            }"
          >
            <div class="other-service-card__icon">
              <UiIconButton>
                <UiIcon :name="category.icon" />
              </UiIconButton>
            </div>
            <div class="other-service-card__title">{{ category.title }}</div>
          </div>
        </div>
        <div class="other-services__bottom">
          <UiButton
            label="Показать все"
            variant="outline"
            @click="isOtherServicesVisible = true"
            v-show="!isOtherServicesVisible"
          />
        </div>
      </section>
      <section>
        <UiCallBlock />
      </section>
    </div>
  </div>
</template>
<style scoped lang="scss">
.service-page {
  &__header {
    display: flex;
    align-items: baseline;
    gap: 28px;
    margin-top: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
    margin-bottom: globalFunctions.fluidValue(40px, 60px, 320px, 1440px);
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

      :deep(.service-prices) {
        @media (max-width: $tablet-breakpoint) {
          border: none;
          padding: 0;
        }

        .service-prices__list {
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

  .other-services {
    $mobile-breakpoint: 505px;

    margin-top: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
    &__title {
      margin-bottom: globalFunctions.fluidValue(24px, 60px, 320px, 1440px);
    }

    &__list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 34px;
    }

    .other-service-card {
      display: flex;
      align-items: center;
      gap: 16px;

      &_cutted {
        @media (max-width: $mobile-breakpoint) {
          display: none;
        }

        &_show {
          @media (max-width: $mobile-breakpoint) {
            display: flex;
          }
        }
      }

      &__title {
        font-family: var(--font-family);
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        text-transform: uppercase;
        color: var(--black);
        max-width: 145px;
      }
    }

    &__bottom {
      display: none;
      @media (max-width: $mobile-breakpoint) {
        margin-top: 40px;
        display: flex;

        .ui-button {
          width: 100%;
        }
      }
    }
  }
}
</style>
