import sizes from '@/data/sizes.json';
import type { Piece } from '@/data/types';

export type Sized = Piece & { width: number; height: number; wide: boolean; portfolio: boolean };

/** Width/height come from src/data/sizes.json, generated from the JPEGs by scripts/sizes.mjs
 *  (runs before dev and build). A missing image throws, on purpose. */
export function size(piece: Piece, portfolio: boolean): Sized {
  const s = (sizes as Record<string, number[]>)[piece.slug];
  if (!s) throw new Error(`No image for ${piece.slug}; run npm run sizes`);
  const [width, height] = s;
  return { ...piece, width, height, wide: width / height > 1.3, portfolio };
}
