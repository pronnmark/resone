'use client';

import Image from 'next/image';
import type { Sized } from '@/lib/images';
import { useLightbox } from './Lightbox';

export function Tile({ p, priority = false }: { p: Sized; priority?: boolean }) {
  const open = useLightbox();
  return (
    <button
      className={`w${p.wide ? ' w--wide' : ''}`}
      style={{ '--ar': (p.width / p.height).toFixed(3) } as React.CSSProperties}
      type="button"
      onClick={() => open(p.slug)}
    >
      <Image src={`/img/${p.slug}.jpg`} width={p.width} height={p.height} alt={p.alt} priority={priority} />
      <span className="w__cap"><b>{p.title}</b><i>{p.detail}</i></span>
    </button>
  );
}
