export interface UiPhotoGridItem {
  id: string | number;
  src: string;
  alt?: string;
}

export type UiPhotoGridVariant = "desktop" | "mobile";

/**
 * The repeating design unit equals 10 photos (5 columns × 2 rows).
 * Pass `items` in multiples of BLOCK_SIZE for predictable layout.
 */
export const UI_PHOTO_GRID_BLOCK_SIZE = 10 as const;
