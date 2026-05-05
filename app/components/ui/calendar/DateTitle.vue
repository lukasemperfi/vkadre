<script setup lang="ts">
import { CalendarDate } from "@internationalized/date";

withDefaults(
  defineProps<{
    month: CalendarDate | null;
  }>(),
  {
    month: null,
  },
);
</script>

<template>
  <div class="date-title">
    {{
      month
        ?.toDate("UTC")
        .toLocaleDateString("ru-RU", {
          month: "long",
          year: "numeric",
        })
        .replace(/\s*г\.$/, "")
    }}
  </div>
</template>

<style scoped lang="scss">
.date-title {
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 18px;
  color: var(--black);
  text-transform: capitalize;
  margin-block: 24px;
}
</style>
