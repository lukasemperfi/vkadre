<script setup lang="ts">
import { UI_PHOTO_GRID_BLOCK_SIZE, type UiPhotoGridItem } from "./types";

interface Props {
  items: UiPhotoGridItem[];
  /**
   * When true, the first block uses eager loading and high fetchpriority.
   * Use for the first visible grid (e.g. above the fold or first slider page).
   */
  eager?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  eager: false,
});

const blocks = computed<UiPhotoGridItem[][]>(() => {
  const chunks: UiPhotoGridItem[][] = [];
  for (let i = 0; i < props.items.length; i += UI_PHOTO_GRID_BLOCK_SIZE) {
    chunks.push(props.items.slice(i, i + UI_PHOTO_GRID_BLOCK_SIZE));
  }
  return chunks;
});

if (import.meta.dev && props.items.length % UI_PHOTO_GRID_BLOCK_SIZE !== 0) {
  console.warn(
    `[UiPhotoGrid] items.length (${props.items.length}) is not a multiple of ${UI_PHOTO_GRID_BLOCK_SIZE}. ` +
      `The last block will be incomplete and may render with empty cells.`,
  );
}
</script>

<template>
  <div class="ui-photo-grid">
    <UiPhotoGridBlock
      v-for="(block, blockIndex) in blocks"
      :key="blockIndex"
      :items="block"
      :eager="eager && blockIndex === 0"
    />
  </div>
</template>

<style lang="scss" scoped>
.ui-photo-grid {
  display: flex;
  flex-direction: column;
  row-gap: globalFunctions.fluidValue(16px, 36px, 320px, 1440px);

  @media (max-width: globalBreakpoints.$breakpoint-xs-max) {
    overflow-x: auto;
    margin-right: globalFunctions.fluidValue(-24px, -96px, 320px, 1440px);
    row-gap: 8px;
  }
}
</style>
