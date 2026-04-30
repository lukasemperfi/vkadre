<script setup lang="ts">
import type { ServicePackageRow } from "~/composables/api/supabase/types";

type Props = {
  packages: ServicePackageRow[];
};

const props = defineProps<Props>();

function formatPackageLabel(p: ServicePackageRow) {
  const duration = p.duration_minutes ? `${p.duration_minutes} мин` : "";
  const photos = p.photo_count ? `${p.photo_count} фото` : "";

  if (duration && photos) return `${duration} - ${photos}`;
  if (duration) return duration;
  if (photos) return photos;
  return "Пакет";
}

function formatPrice(p: ServicePackageRow) {
  const currency = (p.currency ?? "грн.").trim();
  return `${p.price} ${currency}`;
}

const sortedPackages = computed(() =>
  [...(props.packages ?? [])].sort(
    (a, b) => a.duration_minutes - b.duration_minutes,
  ),
);
</script>

<template>
  <div class="service-prices">
    <ul class="service-prices__list" role="list">
      <li v-for="p in sortedPackages" :key="p.id" class="service-prices__row">
        <span class="service-prices__label">{{ formatPackageLabel(p) }}</span>
        <span class="service-prices__dots" aria-hidden="true"></span>
        <span class="service-prices__price">{{ formatPrice(p) }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.service-prices {
  width: 100%;
  border: 1px solid rgba(23, 26, 30, 0.1);
  padding: globalFunctions.fluidValue(14px, 20px, 320px, 1440px);
}

.service-prices__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.service-prices__row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: baseline;
  gap: 12px;
  min-width: 0;
}

.service-prices__label {
  font-weight: 500;
  font-size: 14px;
  line-height: 160%;
  color: rgba(116, 118, 120, 1);
  min-width: 0;
}

.service-prices__dots {
  height: 1px;
  opacity: 0.1;
  background-image: radial-gradient(
    circle,
    rgba(23, 26, 30, 1) 0,
    rgba(23, 26, 30, 1) 1px,
    transparent 1px
  );
  background-size: 6px 2px;
  background-repeat: repeat-x;
  background-position: center;
}

.service-prices__price {
  font-weight: 700;
  font-size: 14px;
  line-height: 160%;
  color: var(--black);
  white-space: nowrap;
}
</style>
