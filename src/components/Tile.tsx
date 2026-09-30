import type { Sized } from '@/lib/images';
import { useLightbox } from './Lightbox';
import { T, usePiece } from './Lang';
import { enPieces } from '@/data/pieces.en';

export function Tile({ p: base, priority = false }: { p: Sized; priority?: boolean }) {
  const p = usePiece(base);
  const open = useLightbox();
  return (
    <button
      className={`w${p.wide ? ' w--wide' : ''}`}
      style={{ '--ar': (p.width / p.height).toFixed(3) } as React.CSSProperties}
      type="button"
      onClick={() => open(p.slug)}
    >
      <span className="w__img">
        <img src={`/img/${p.slug}.jpg`} width={p.width} height={p.height} alt={p.alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" />
      </span>
      <span className="w__cap">
        <b><T fr={base.title} en={enPieces[base.slug]?.title ?? base.title} /></b>
        <i><T fr={base.detail} en={enPieces[base.slug]?.detail ?? base.detail} /></i>
      </span>
    </button>
  );
}
