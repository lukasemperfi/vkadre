<script setup lang="ts">
const services = [
  {
    id: 1,
    label: "Фотосессия",
    value: "Фотосессия",
  },
  {
    id: 2,
    label: "Видеосессия",
    value: "Видеосессия",
  },
  {
    id: 3,
    label: "Репортаж",
    value: "Репортаж",
  },
  {
    id: 4,
    label: "Другое",
    value: "Другое",
  },
];

const selectedService = ref<string | number | undefined>(undefined);
const name = ref<string | undefined>(undefined);
const phone = ref<string | undefined>(undefined);
</script>

<template>
  <section class="contacts">
    <div class="app-container">
      <div class="contacts__wrapper">
        <h2 class="contacts__title">
          Звоните, мы всегда рады поговорить <br />
          с вами!
        </h2>
        <ul class="contacts__info">
          <li>+380971234567</li>
          <li>FB.com/vkadre</li>
          <li>VKADRE@GMAIL.COM</li>
        </ul>
        <form class="contacts__form contacts-form">
          <div class="contacts-form__title">Напишите нам</div>
          <div class="contacts-form__fields">
            <UiInput placeholder="Имя" v-model="name">
              <template #right>
                <UiIcon name="mark" class="contacts-form__icon" v-if="name" />
              </template>
            </UiInput>
            <UiInput placeholder="Телефон" v-model="phone" />
            <UiSelect
              v-model="selectedService"
              :options="services"
              placeholder="Интересующая услуга"
            />
          </div>
          <UiButton
            type="submit"
            variant="outline"
            class="contacts-form__button"
            >Заказать звонок</UiButton
          >
        </form>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
.contacts {
  &__wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, max-content);
    column-gap: 24px;
    justify-content: space-between;
    grid-template-areas:
      "title form"
      "info form";

    @media (max-width: globalBreakpoints.$breakpoint-md) {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      column-gap: 0;
      grid-template-areas:
        "title"
        "info"
        "form";
    }
  }

  &__title {
    font-family: var(--font-family);
    font-weight: 600;
    font-size: globalFunctions.fluidValue(24px, 48px, 320px, 1440px);
    line-height: globalFunctions.fluidValue(34px, 67px, 320px, 1440px);
    text-transform: uppercase;
    color: var(--black);
    margin-top: 38px;
    max-width: 552px;
    grid-area: title;

    @media (max-width: globalBreakpoints.$breakpoint-md) {
      margin-top: 0;
      margin-bottom: 24px;
      max-width: 100%;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: globalFunctions.fluidValue(10px, 18px, 320px, 1440px);
    font-family: var(--font-family);
    font-weight: 600;
    font-size: globalFunctions.fluidValue(14px, 18px, 320px, 1440px);
    text-transform: uppercase;
    align-self: center;
    color: var(--black);
    align-self: start;
    grid-area: info;

    @media (max-width: globalBreakpoints.$breakpoint-xs) {
      font-weight: 500;
    }
  }

  .contacts-form {
    border: 1px solid var(--gray);
    padding-block: globalFunctions.fluidValue(24px, 40px, 320px, 1440px);
    padding-inline: globalFunctions.fluidValue(24px, 44px, 320px, 1440px);
    background-color: #ffffff;
    width: 552px;
    justify-self: end;
    grid-area: form;

    @media (max-width: globalBreakpoints.$breakpoint-md) {
      width: 100%;
      border-inline: none;
      border-bottom: 1px solid var(--gray);
      padding-inline: 0;
      padding-block: 40px;
      margin-top: 40px;
    }

    &__title {
      font-family: var(--font-family);
      font-weight: 600;
      font-size: globalFunctions.fluidValue(24px, 32px, 320px, 1440px);
      text-transform: uppercase;
      color: var(--black);
      margin-bottom: globalFunctions.fluidValue(24px, 40px, 320px, 1440px);
    }
    &__fields {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-bottom: globalFunctions.fluidValue(24px, 60px, 320px, 1440px);
    }

    &__button {
      width: 62.4%;

      @media (max-width: globalBreakpoints.$breakpoint-md) {
        width: 100%;
      }
    }

    &__icon {
      color: var(--black);
    }
  }
}
</style>
