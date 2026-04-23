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

// const { data: services } = await useAsyncData("services", () =>
//   servicesApi.getServices(),
// );

// const { data: service } = await useAsyncData("service", () =>
//   servicesApi.getService("0c500e26-cdbf-4472-a87f-da2da0e7bafd"),
// );

// console.log("photographers", photographers.value);
// console.log("photographer", photographer.value);
// console.log("services", services.value);
// console.log("service", service.value);
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
