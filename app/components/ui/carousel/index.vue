<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

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
  modules: [Autoplay],
  slidesPerView: 1,
  spaceBetween: 20,
};

const swiperInstance = ref<SwiperType | null>(null);
const swiperConfig = computed(() => {
  const merged: SwiperOptions = {
    ...defaultOptions,
    ...props.options,
  };

  return Object.fromEntries(
    Object.entries(merged).filter(([, v]) => v !== null && v !== undefined),
  ) as Record<string, unknown>;
});

const slidePrev = () => swiperInstance.value?.slidePrev();
const slideNext = () => swiperInstance.value?.slideNext();

const isBeginning = ref(true);
const isEnd = ref(false);

const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper;
  isBeginning.value = swiper.isBeginning;
  isEnd.value = swiper.isEnd;
};

const onSlideChange = (swiper: SwiperType) => {
  isBeginning.value = swiper.isBeginning;
  isEnd.value = swiper.isEnd;
};

defineExpose({
  slidePrev,
  slideNext,
  isBeginning,
  isEnd,
});
</script>

<template>
  <div class="carousel">
    <Swiper
      v-bind="swiperConfig"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <SwiperSlide v-for="(item, index) in items" :key="index">
        <slot name="item" :item="item" :index="index" />
      </SwiperSlide>
      <slot name="controls" :slideNext="slideNext" :slidePrev="slidePrev" />
    </Swiper>
  </div>
</template>
