<script setup lang="ts">
const selectedDateEvents = ref([]);
const currentSelectedDate = ref(null);

const handleDayClick = ({ date, events }: { date: any; events: any }) => {
  console.log("Выбранная дата:", date.toString());
  console.log("События этого дня:", events);

  currentSelectedDate.value = date;
  selectedDateEvents.value = events;
};
</script>
<template>
  <UiCalendarDatePicker @day-click="handleDayClick" />
</template>
<style scoped lang="scss"></style>
