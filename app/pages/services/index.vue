<script setup lang="ts">
const { getServices } = useServicesApi();

const PER_PAGE = 9;
const currentPage = ref(1);
const isFinished = ref(false);
const isLoading = ref(false);

const allServices = ref<any[]>([]);

const { data: initialData } = await useAsyncData("services", () =>
  getServices(1, PER_PAGE),
);

if (initialData.value) {
  allServices.value = [...initialData.value];
  if (initialData.value.length < PER_PAGE) isFinished.value = true;
}

const loadMore = async () => {
  if (isLoading.value || isFinished.value) return;

  isLoading.value = true;
  currentPage.value++;

  try {
    const newData = await getServices(currentPage.value, PER_PAGE);

    if (newData.length < PER_PAGE) {
      isFinished.value = true;
    }

    if (newData.length > 0) {
      allServices.value.push(...newData);
    }
  } catch (error) {
    console.error("Failed to load services:", error);
    currentPage.value--;
  } finally {
    isLoading.value = false;
  }
};

const getFirstParagraph = (description: string) => {
  return description.split("</p>")[0] + "</p>";
};
</script>

<template>
  <div class="services-page">
    <div class="app-container">
      <div class="services-page__header">
        <h1 class="services-page__title">Услуги</h1>
        <div class="services-page__subtitle">
          За 3 года работы мы организовали более 10 000 фотосессий в Одессе
        </div>
      </div>

      <div class="services-page__content">
        <div class="services-page__list">
          <div
            class="service-card"
            v-for="service in allServices"
            :key="service.id"
          >
            <div class="service-card__image">
              <NuxtImg
                :src="service.main_image"
                :alt="service.title"
                format="webp"
                class="service-card__image-img"
              />
            </div>
            <div class="service-card__body">
              <h3 class="service-card__title">{{ service.title }}</h3>
              <div
                class="service-card__description"
                v-html="getFirstParagraph(service.description || '')"
              />
            </div>
          </div>
        </div>

        <div v-if="!isFinished" class="services-page__pagination">
          <UiButton
            class="services-page__pagination-btn"
            label="Загрузить еще"
            variant="outline"
            :loading="isLoading"
            :disabled="isLoading"
            @click="loadMore"
          />
        </div>
      </div>
      <UiCallBlock />
    </div>
  </div>
</template>

<style scoped lang="scss">
.services-page {
  padding-top: globalFunctions.fluidValue(40px, 72px, 320px, 1440px);
  &__header {
    margin-bottom: globalFunctions.fluidValue(40px, 60px, 320px, 1440px);
  }

  &__content {
    padding-bottom: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
    border-bottom: 1px solid var(--gray);
  }

  &__title {
    font-family: var(--font-family);
    font-weight: 600;
    font-size: globalFunctions.fluidValue(24px, 48px, 320px, 1440px);
    text-transform: uppercase;
    color: var(--black);
    margin-bottom: 8px;
  }
  &__subtitle {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;

    line-height: 26px;
    color: var(--black);
  }

  .service-card {
    &__image {
      overflow: hidden;
      aspect-ratio: 395/376;
      margin-bottom: globalFunctions.fluidValue(16px, 40px, 320px, 1440px);

      &-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__title {
      font-family: var(--font-family);
      font-weight: 600;
      font-size: 16px;
      text-transform: uppercase;
      color: var(--black);
      margin-bottom: 16px;
    }

    &__description {
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 16px;
      line-height: 26px;
      color: var(--black);

      @media (max-width: globalBreakpoints.$breakpoint-xs) {
        font-size: 14px;
        line-height: 22px;
      }
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;

    @media (max-width: 1360px) {
      grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
    }

    .service-card {
      &__image {
        @media (max-width: 680px) {
          aspect-ratio: 272/180;
        }
      }
    }
  }

  &__pagination {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }

  &__pagination-btn {
  }
}
</style>
