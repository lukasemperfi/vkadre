<script setup lang="ts">
const client = useSupabaseClient();

const {
  data: services,
  pending,
  error,
} = await useAsyncData("services", async () => {
  const { data } = await client
    .from("services")
    .select("*")
    .order("created_at", { ascending: false });
  console.log("data", data);

  return data;
});
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
