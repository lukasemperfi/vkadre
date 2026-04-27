<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Props {
  items: any[];
  options?: Partial<SwiperOptions>;
  variant?: string;
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  options: () => ({}),
  variant: "default",
});

const defaultOptions: SwiperOptions = {
  modules: [Navigation, Pagination, Autoplay],
  slidesPerView: 1,
  spaceBetween: 20,
};

const swiperConfig = computed(() => {
  const merged: SwiperOptions = {
    ...defaultOptions,
    ...props.options,
  };

  return Object.fromEntries(
    Object.entries(merged).filter(([, v]) => v !== null && v !== undefined),
  ) as Record<string, unknown>;
});
</script>

<template>
  <div class="v-carousel" :class="`v-carousel--${variant}`">
    <Swiper v-bind="swiperConfig">
      <SwiperSlide v-for="(item, index) in items" :key="index">
        <slot name="item" :item="item" :index="index" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>
