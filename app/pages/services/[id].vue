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

// const packages = [
//   {
//     id: "5cf3706e-ea3a-4180-9404-f9c89989b67a",
//     price: 990,
//     currency: "UAH",
//     service_id: "dc3a1e83-165e-4072-811a-5c172fff9fcc",
//     location_id: null,
//     photo_count: 10,
//     duration_minutes: 10,
//   },
//   {
//     id: "361e4485-f572-4072-8d31-cfa243087c58",
//     price: 1990,
//     currency: "UAH",
//     service_id: "dc3a1e83-165e-4072-811a-5c172fff9fcc",
//     location_id: null,
//     photo_count: 20,
//     duration_minutes: 20,
//   },
//   {
//     id: "f753f33d-d26d-4810-a134-bd5e62e67dd3",
//     price: 2990,
//     currency: "UAH",
//     service_id: "dc3a1e83-165e-4072-811a-5c172fff9fcc",
//     location_id: null,
//     photo_count: 30,
//     duration_minutes: 30,
//   },
//   {
//     id: "98a0c484-7874-4372-b0e2-c0db237e13ae",
//     price: 199,
//     currency: "UAH",
//     service_id: "dc3a1e83-165e-4072-811a-5c172fff9fcc",
//     location_id: null,
//     photo_count: 0,
//     duration_minutes: 0,
//   },
// ];
</script>
<template>
  <div class="service-page">
    <div class="app-container">
      <div class="service-page__header">
        <button><UiIcon name="fill-arrow-left" />Назад</button>
        <h1 class="service-page__title">{{ service?.title }}</h1>
      </div>
      <section class="works">
        <UiPhotoGrid :items="photos" />
        <div class="works__info">
          <div class="works__info-description">
            Самый доступный вид фотосессии, в результате которой Вы получите
            качественные снимки уже на следующий день. Они проходят только по
            нашему расписанию. Фотографии с экспресс-фотосессий идеальны для
            публикаций в социальных сетях, для резюме, инстаграма, сайта
            знакомств и даже семейного альбома!
          </div>
          <div class="works__info-packages">
            <PackagesBlock :packages="service?.service_packages" />
          </div>
        </div>
      </section>
      <section>
        <Calendar />
      </section>
      <section>
        <UiCallBlock />
      </section>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
