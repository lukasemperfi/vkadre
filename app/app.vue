<script setup lang="ts">
const portfolioApi = usePortfolioApi();
const photographersApi = usePhotographersApi();
const servicesApi = useServicesApi();

// const { data } = await useAsyncData("portfolio", () =>
//   portfolioApi.getPortfolios(),
// );

// const { data: photographers } = await useAsyncData("photographers", () =>
//   photographersApi.getPhotographers(),
// );

// const { data: photographer } = await useAsyncData("photographer", () =>
//   photographersApi.getPhotographer("e6962b83-8db9-4665-9552-56d9bc9ed3ae"),
// );

const { data: services } = await useAsyncData("services", () =>
  servicesApi.getServices(),
);

console.log("services", services.value);

// console.log("photographers", photographers.value);
// console.log("photographer", photographer.value);
</script>

<template>
  <div>
    <h1>Hello World</h1>
  </div>
</template>

<style scoped lang="scss">
h1 {
  font-family: var(--font-family);
  font-size: globalFunctions.fluidValue(16px, 32px, 320px, 1440px);
}
</style>
