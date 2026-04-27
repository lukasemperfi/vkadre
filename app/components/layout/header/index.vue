<script setup lang="ts">
const menuItems = [
  { id: "portfolio", label: "Портфолио", to: "/portfolio" },
  { id: "services", label: "Услуги", to: "/services" },
  { id: "locations", label: "Локации", to: "/locations" },
];

const isMenuOpen = ref(false);
const isAuth = ref(true);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <header class="header">
    <div class="app-container">
      <div class="header__shell">
        <div class="header__row">
          <div class="header__logo-wrapper">
            <NuxtLink to="/" class="header__logo" @click="closeMenu">
              <UiIcon name="logo" class="header__logo-icon" />
            </NuxtLink>
            <div class="header__logo-text">
              <div>Качественные</div>
              <div>фотографии</div>
              <div>в кратчайшие сроки</div>
            </div>
          </div>

          <div class="header__menu-contacts-wrapper">
            <UiMenu :items="menuItems" class="header__menu" />
            <ul class="header__contacts header__text">
              <li>+380971234567</li>
              <li>FB.com/vkadre</li>
              <li>VKADRE@GMAIL.COM</li>
            </ul>
            <div class="header__actions">
              <!-- <HeaderAccountMenu >
              <Icon name="profile" class="header__icon" />
            </HeaderAccountMenu> -->

              <div class="header__profile profile">
                <UiIconButton class="profile__icon-btn">
                  <UiIcon v-if="isAuth" name="user-m" class="profile__icon" />
                  <UiIcon v-else name="key" />
                </UiIconButton>

                <div class="profile__text header__text">
                  {{ isAuth ? "Личный кабинет" : "Войти" }}
                </div>
              </div>
            </div>
          </div>
          <UiIconButton
            class="header__menu-btn"
            :aria-expanded="isMenuOpen"
            aria-controls="header-mobile-menu"
            aria-label="Open menu"
            @click="toggleMenu"
          >
            <UiIcon name="menu-m" class="header__menu-btn-icon" />
          </UiIconButton>
        </div>

        <!-- Mobile menu -->
        <LayoutHeaderMobileMenu
          v-model="isMenuOpen"
          :items="menuItems"
          :is-auth="isAuth"
        />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  background: #fff;
  padding-top: 22px;

  &__shell {
    display: flex;
    flex-direction: column;
    gap: globalFunctions.fluidValue(0px, 16px, 320px, 1440px);
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: globalFunctions.fluidValue(12px, 47px, 320px, 1440px);
    border-bottom: 1px solid var(--gray);
    padding-bottom: globalFunctions.fluidValue(20px, 24px, 320px, 1440px);

    @media (max-width: 1440px) {
      display: grid;
      grid-template-columns: repeat(4, max-content);
      justify-content: space-between;
    }

    @media (max-width: 900px) {
      grid-template-columns: repeat(2, max-content);
    }
  }

  &__logo-wrapper {
    display: flex;
    align-items: center;
    gap: globalFunctions.fluidValue(12px, 50px, 320px, 1440px);
  }

  &__logo-icon {
    width: globalFunctions.fluidValue(40px, 69px, 320px, 1440px);
    height: globalFunctions.fluidValue(40px, 72px, 320px, 1440px);
  }

  &__logo-text {
    display: flex;
    flex-direction: column;
    gap: globalFunctions.fluidValue(0px, 9px, 320px, 1440px);
    text-transform: uppercase;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: globalFunctions.fluidValue(12px, 16px, 320px, 1440px);
    color: var(--black);
  }

  &__menu-contacts-wrapper {
    display: grid;
    grid-template-columns: repeat(3, max-content);
    grid-template-rows: repeat(3, 1fr);
    row-gap: 10px;

    @media (max-width: 1440px) {
      grid-template-columns: subgrid;
      grid-column: 2/-1;
    }

    @media (max-width: 900px) {
      display: none;
    }
  }

  :deep(.header__menu.menu) {
    display: contents;
    .menu__items {
      display: grid;
      grid-template-rows: subgrid;
      grid-row: 1/-1;
    }

    .menu__link {
      font-family: var(--font-family);
      font-weight: 500;
      font-size: globalFunctions.fluidValue(12px, 14px, 320px, 1440px);
      text-transform: uppercase;
      align-self: center;
      color: var(--black);
    }
  }

  &__contacts {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: 1/-1;
    margin-left: 73px;

    @media (max-width: 1440px) {
      margin-left: 0;
    }

    li {
      align-self: center;
    }
  }

  &__actions {
    display: contents;
  }

  .profile {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: 1/-1;
    margin-left: 112px;

    @media (max-width: 1440px) {
      margin-left: 0;
    }

    &__icon-btn {
      grid-row: 1/3;
      align-self: center;
    }

    &__icon {
      width: 20px;
      height: 20px;
    }
  }

  &__menu-btn {
    display: none;

    @media (max-width: 900px) {
      display: flex;
    }
  }

  &__text {
    font-family: var(--font-family);
    font-weight: 500;
    font-size: globalFunctions.fluidValue(12px, 14px, 320px, 1440px);
    text-transform: uppercase;
    align-self: center;
    color: var(--black);
  }
}
</style>
