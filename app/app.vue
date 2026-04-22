<script setup lang="ts">
const portfolioApi = usePortfolioApi();

const { data } = await useAsyncData("portfolio", () =>
  portfolioApi.getPortfolios(),
);
</script>

<template>
  <div>
    <h1>Hello World</h1>
  </div>
</template>

<style scoped lang="scss">
h1 {
  font-family: var(--font-family);
}
</style>
