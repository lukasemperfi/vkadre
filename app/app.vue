<script setup lang="ts">
const portfolioApi = usePortfolioApi();
const photographersApi = usePhotographersApi();
const servicesApi = useServicesApi();
const locationsApi = useLocationsApi();
const locationReviewsApi = useLocationReviewsApi();

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

// const { data: locations } = await useAsyncData("locations", () =>
//   locationsApi.getLocations(),
// );
// const { data: location } = await useAsyncData("location", () =>
//   locationsApi.getLocation("04c94e39-31da-4183-a53a-c1bca6168191"),
// );

// console.log("locations", locations.value);
// console.log("location", location.value);

// const { data: locationReviews } = await useAsyncData("locationReviews", () =>
//   locationReviewsApi.getLocationReviews(),
// );

// console.log("locationReviews", locationReviews.value);

// async function submit() {
//   const data = await locationReviewsApi.addLocationReview({
//     user_name: "Иван",
//     user_city: "Москва",
//     location_id: "04c94e39-31da-4183-a53a-c1bca6168191",
//     content: "Отличное место",
//   });
//   console.log("inserted row:", data);
// }
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
