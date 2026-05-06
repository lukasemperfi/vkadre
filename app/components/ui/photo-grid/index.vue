<script setup lang="ts">
import { UI_PHOTO_GRID_BLOCK_SIZE, type UiPhotoGridItem } from "./types";

interface Props {
  items: UiPhotoGridItem[];
  eager?: boolean;
  mobileVariant?: "default" | "mobile-flat";
}

const props = withDefaults(defineProps<Props>(), {
  eager: false,
  mobileVariant: "default",
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
  <div
    class="ui-photo-grid"
    :class="{ 'ui-photo-grid_mobile-flat': mobileVariant === 'mobile-flat' }"
  >
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

  &_mobile-flat {
    @media (max-width: globalBreakpoints.$breakpoint-xs-max) {
      flex-direction: row;
      column-gap: 8px;
      overflow-x: auto;

      :deep(.ui-photo-grid-block) {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 256px;
        grid-template-columns: none;
        grid-template-rows: 1fr;
        column-gap: 8px;
        width: auto;
        max-height: none;
        aspect-ratio: auto;
      }

      :deep(.ui-photo-grid-block__item) {
        grid-column: auto;
        grid-row: auto;

        width: 100%;
        aspect-ratio: 256/347;
        display: block;
      }
    }
  }
}
</style>
