import { imageSize } from 'image-size';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import type { Piece } from '@/data/types';

export type Sized = Piece & { width: number; height: number; wide: boolean; portfolio: boolean };

/** Read the JPEG's real size at build time, so width/height can never be guessed.
 *  A missing file fails the build, on purpose. */
export function size(piece: Piece, portfolio: boolean): Sized {
  const file = path.join(process.cwd(), 'public', 'img', `${piece.slug}.jpg`);
  const { width, height } = imageSize(readFileSync(file));
  return { ...piece, width, height, wide: width / height > 1.3, portfolio };
}
