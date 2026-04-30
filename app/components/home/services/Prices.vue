<script setup lang="ts">
import type { ServicePackageRow } from "~/composables/api/supabase/types";

type Props = {
  packages: ServicePackageRow[];
};

const props = defineProps<Props>();

function formatPackageLabel(p: ServicePackageRow) {
  const duration = p.duration_minutes ? `${p.duration_minutes} минут` : "";
  const photos = p.photo_count ? `${p.photo_count} фото` : "";

  if (duration && photos) return `${duration} - ${photos}`;
  if (duration) return duration;
  if (photos) return photos;
  return "Исходники (весь отснятый материал)";
}

function formatPrice(p: ServicePackageRow) {
  const currencies = {
    UAH: "грн.",
    USD: "$",
    EUR: "€",
  };
  const currency = currencies[p.currency as keyof typeof currencies];
  return `${p.price} ${currency}`;
}

function isSourceMaterialsPackage(p: ServicePackageRow) {
  return !p.duration_minutes && !p.photo_count;
}

const sortedPackages = computed(() =>
  [...(props.packages ?? [])].sort((a, b) => {
    const aIsSource = isSourceMaterialsPackage(a);
    const bIsSource = isSourceMaterialsPackage(b);

    if (aIsSource !== bIsSource) return aIsSource ? 1 : -1;

    const aDuration = a.duration_minutes ?? Number.POSITIVE_INFINITY;
    const bDuration = b.duration_minutes ?? Number.POSITIVE_INFINITY;
    return aDuration - bDuration;
  }),
);
</script>

<template>
  <div class="service-prices">
    <ul class="service-prices__list" role="list">
      <li v-for="p in sortedPackages" :key="p.id" class="service-prices__row">
        <div class="service-prices__label-wrapper">
          <span class="service-prices__label">{{ formatPackageLabel(p) }}</span>
          <span class="service-prices__dots" aria-hidden="true"></span>
        </div>
        <span class="service-prices__price">{{ formatPrice(p) }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.service-prices {
  width: 100%;
  border: 1px solid rgba(23, 26, 30, 0.1);
  padding-top: 20px;
  padding-left: 27px;
  padding-right: 27px;
  padding-bottom: 20px;

  @media (max-width: 1440px) {
    padding: 16px;
  }
}

.service-prices__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr max-content;
  gap: 8px;
}

.service-prices__row {
  display: grid;
  grid-template-columns: subgrid;
  align-items: baseline;
  gap: 12px;
  min-width: 0;
  grid-column: 1/-1;
}

.service-prices__label-wrapper {
  display: flex;
  gap: 8px;
  align-items: baseline;
}

.service-prices__label {
  font-weight: 500;
  font-size: 14px;
  line-height: 160%;
  color: rgba(116, 118, 120, 1);
  min-width: 0;
}

.service-prices__dots {
  flex: 1;
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
