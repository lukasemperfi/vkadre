<script setup lang="ts">
const menuItems = [
  { id: "portfolio", label: "Портфолио", to: "/portfolio" },
  { id: "services", label: "Услуги", to: "/services" },
  { id: "locations", label: "Локации", to: "/locations" },
];
</script>

<template>
  <footer class="footer">
    <div class="app-container">
      <div class="footer__wrapper">
        <UiMenu :items="menuItems" class="footer__menu" />
        <ul class="footer__contacts footer__text">
          <li>+380971234567</li>
          <li>FB.com/vkadre</li>
          <li>VKADRE@GMAIL.COM</li>
        </ul>
        <hr class="footer__divider" />
        <div class="footer__copyright footer__text">2022 © VKADRE.COM</div>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
.footer {
  $bp-xs: 550px;
  padding-top: globalFunctions.fluidValue(46px, 80px, 320px, 1440px);
  padding-bottom: globalFunctions.fluidValue(35px, 62px, 320px, 1440px);
  background-color: #ffffff;
  &__wrapper {
    display: grid;
    grid-template-columns: max-content max-content 1fr;
    grid-template-rows: repeat(3, 1fr);
    row-gap: 10px;
    width: 100%;

    @media (max-width: $bp-xs) {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      row-gap: 42px;
    }
  }

  :deep(.footer__menu.menu) {
    display: contents;
    .menu__items {
      display: grid;
      grid-template-rows: subgrid;
      grid-row: 1/-1;

      @media (max-width: $bp-xs) {
        grid-template-rows: auto;
        grid-row: auto;
        gap: 10px;
      }
    }

    .menu__link {
      font-family: var(--font-family);
      font-weight: 500;
      font-size: 14px;
      text-transform: uppercase;
      align-self: center;
      color: var(--black);
    }
  }

  &__contacts {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: 1/-1;
    margin-left: 9.1vw;

    @media (max-width: $bp-xs) {
      grid-template-rows: auto;
      grid-row: auto;
      gap: 13px;
      margin-left: 0;
    }

    li {
      align-self: center;
    }
  }

  &__copyright {
    grid-row: 3/-1;
    align-self: end;
    justify-self: end;

    @media (max-width: $bp-xs) {
      grid-row: auto;
      justify-self: left;
    }
  }

  &__text {
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 14px;
    text-transform: uppercase;
    align-self: center;
    color: var(--black);
  }

  &__divider {
    display: none;
    width: 100%;
    height: 1px;
    background-color: var(--gray);

    @media (max-width: $bp-xs) {
      display: block;
    }
  }
}
</style>
