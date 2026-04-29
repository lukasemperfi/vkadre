<script setup lang="ts">
type Pic = {
  width: number;
  height: number;
  seed: string;
};

const galleryColumns: Pic[][] = [
  [
    { width: 175, height: 172, seed: "w-a1" },
    { width: 175, height: 292, seed: "w-a2" },
  ],
  [
    { width: 232, height: 296, seed: "w-b1" },
    { width: 232, height: 168, seed: "w-b2" },
  ],
  [
    { width: 232, height: 172, seed: "w-c1" },
    { width: 232, height: 296, seed: "w-c3" },
  ],
  [
    { width: 232, height: 268, seed: "w-d1" },
    { width: 232, height: 195, seed: "w-d2" },
  ],
  [
    { width: 232, height: 296, seed: "w-e1" },
    { width: 232, height: 168, seed: "w-e2" },
  ],
];

function picsumSrc(pic: Pic) {
  return `https://picsum.photos/seed/${pic.seed}/${pic.width}/${pic.height}`;
}

const galleryColumnGapClasses = [
  "works__col--gap-40",
  "works__col--gap-40",
  "works__col--gap-36",
  "works__col--gap-41",
  "works__col--gap-40",
] as const;
</script>

<template>
  <section class="works">
    <div class="app-container">
      <h2 class="works__title">Наши работы</h2>

      <div class="works__grid">
        <div
          v-for="(column, ci) in galleryColumns"
          :key="ci"
          class="works__col"
          :class="galleryColumnGapClasses[ci]"
        >
          <figure
            v-for="pic in column"
            :key="pic.seed"
            class="works__pic"
            :style="{
              width: `${pic.width}px`,
              height: `${pic.height}px`,
            }"
          >
            <img
              class="works__img"
              :src="picsumSrc(pic)"
              :width="pic.width"
              :height="pic.height"
              alt="Фотография — пример работы"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.works {
  position: relative;
}

.works__title {
  margin-bottom: globalFunctions.fluidValue(32px, 48px, 320px, 1440px);
}

.works__gallery {
  position: relative;
  max-width: 1247px;
  margin-inline: auto;
  overflow: visible;
}

.works__spline {
  position: absolute;
  pointer-events: none;
  background: url("/images/spline.png") center / contain no-repeat;
}

.works__spline--mirror {
  transform: matrix(-1, 0, 0, 1, 0, 0);
}

.works__spline--a {
  width: 692px;
  height: 654px;
  left: 973px;
  top: -103px;
  opacity: 0.6;
  filter: blur(270px);

  z-index: 0;
  will-change: filter;
}

.works__spline--b {
  width: 1348px;
  height: 1274px;
  left: -360px;
  top: 407px;

  opacity: 0.45;
  filter: blur(120px);
  z-index: 0;

  @media (max-width: globalBreakpoints.$breakpoint-lg) {
    opacity: 0.25;
    filter: blur(80px);
  }
}

.works__grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 175px) repeat(4, minmax(0, 232px));
  column-gap: 36px;
  align-items: start;
}

.works__col {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.works__col--gap-40 {
  gap: 40px;
}

.works__col--gap-36 {
  gap: 36px;
}

.works__col--gap-41 {
  gap: 41px;
}

.works__pic {
  position: relative;
  margin: 0;
  overflow: hidden;
  flex-shrink: 0;
}

.works__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: globalBreakpoints.$breakpoint-md) {
  .works__grid {
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 12px;

    scrollbar-width: thin;
    -webkit-overflow-scrolling: touch;
  }

  .works__spline--a,
  .works__spline--b {
    opacity: 0.2;
  }
}
</style>
