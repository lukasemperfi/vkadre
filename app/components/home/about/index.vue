<script setup lang="ts">
const benefits = [
  {
    id: 1,
    icon: "arrow-currency",
    title: "Доступно",
    content: "стоимость фотосессий от 990₴",
  },
  {
    id: 2,
    icon: "timer",
    title: "Быстро",
    content: "готовые фотографии вы получите уже на следующий день",
  },
  {
    id: 3,
    icon: "tower",
    title: "Качественно",
    content: "мы снимаем на профессиональную топовую технику.",
  },
  {
    id: 4,
    icon: "famous",
    title: "Индивидуально",
    content:
      "подходим к любому запросу и предоставляем весь спектр качественных услуг",
  },
];

const stats = [
  {
    id: 1,
    value: 100,
    caption: "счастливых клиентов",
  },
  {
    id: 2,
    value: 100,
    caption: "сделанных фотографий",
  },
  {
    id: 3,
    value: 100,
    caption: "роведённых фотосессий",
  },
  {
    id: 4,
    value: 100,
    caption: "авторских фотопроекта",
  },
  {
    id: 5,
    value: 3,
    unit: "года",
    caption: "активной работы",
  },
];
</script>

<template>
  <section class="about">
    <div class="app-container">
      <div class="about__layout">
        <div class="about__header">
          <h2 class="about__title">О Проекте</h2>
          <p class="about__description">
            Мы - команда профессиональных фотографов, и наш фотопроект
            специализируется на организации и проведении индивидуальных и
            экспресс-фотосессий в самых красивых локациях Одессы.
          </p>
        </div>
        <div class="about__benefits benefits">
          <HomeAboutBenefitsCard v-for="benefit in benefits" :key="benefit.id">
            <template #icon>
              <UiIcon :name="benefit.icon" />
            </template>
            <template #title>
              {{ benefit.title }}
            </template>
            <template #content>
              <p class="benefits-card__content">
                {{ benefit.content }}
                <UiTooltip
                  v-if="benefit.id === 2"
                  text="готовые фотографии вы получите уже на следующий день"
                >
                  <template #trigger>
                    <UiIcon
                      name="box-info"
                      class="benefits-card__content-icon"
                    />
                  </template>
                </UiTooltip>
              </p>
            </template>
          </HomeAboutBenefitsCard>
        </div>
        <div class="about__stats stats">
          <HomeAboutStatCard v-for="stat in stats" :key="stat.id">
            <template #value>
              {{ stat.value }}
            </template>
            <template #unit v-if="stat.unit">
              {{ stat.unit }}
            </template>
            <template #caption>
              {{ stat.caption }}
            </template>
          </HomeAboutStatCard>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about {
  &__layout {
  }

  &__header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: globalFunctions.fluidValue(16px, 40px, 320px, 1440px);
    margin-bottom: globalFunctions.fluidValue(44px, 60px, 320px, 1440px);
  }

  &__title {
    font-family: var(--font-family);
    font-weight: 600;
    font-size: globalFunctions.fluidValue(24px, 32px, 320px, 1440px);
    line-height: globalFunctions.fluidValue(34px, 45px, 320px, 1440px);
    text-transform: uppercase;
    color: var(--black);
    white-space: nowrap;
  }

  &__description {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: globalFunctions.fluidValue(14px, 16px, 320px, 1440px);
    line-height: globalFunctions.fluidValue(21px, 25px, 320px, 1440px);
    color: var(--black);
    max-width: 715px;
  }

  &__benefits {
    padding-bottom: globalFunctions.fluidValue(40px, 100px, 320px, 1440px);
    border-bottom: 1px solid var(--gray);
  }

  .benefits {
    $gap: globalFunctions.fluidValue(24px, 80px, 320px, 1440px);
    $col-min: 200px;

    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(min(#{$col-min}, 100%), 1fr)
    );
    gap: $gap;

    :deep(.benefits-card) {
      @media (max-width: globalBreakpoints.$breakpoint-xs) {
        display: grid;
        grid-template-columns: 36px 1fr;
        gap: 24px;
      }
    }

    .benefits-card:not(:last-child):after {
      content: "";
      display: block;
      width: 1px;
      height: 71.5%;
      background: rgba(0, 0, 0, 0.1);
      position: absolute;
      right: calc($gap / 2 * -1);
      top: 0;

      @media (max-width: 1439px) {
        display: none;
      }
    }

    :deep(.benefits-card:first-child) {
      .benefits-card__content {
        max-width: 247px;
      }
    }

    .benefits-card__content-icon {
      width: 16px;
      height: 16px;
      transform: translateY(3px);
    }
  }

  &__stats {
    padding-top: globalFunctions.fluidValue(40px, 64px, 320px, 1440px);
    padding-bottom: globalFunctions.fluidValue(40px, 60px, 320px, 1440px);
    border-bottom: 1px solid var(--gray);
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(110px, 110px));
    gap: 20px;
    justify-content: space-between;
  }
}
</style>
