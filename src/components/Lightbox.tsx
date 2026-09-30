'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { Sized } from '@/lib/images';

const MAIL = 'omara@resone.africa,ines@resone.africa';
const Ctx = createContext<(slug: string) => void>(() => {});
export const useLightbox = () => useContext(Ctx);

/** Owns the <dialog>. `items` is the flat, page-ordered list of every tile. */
export function LightboxProvider({ items, children }: { items: Sized[]; children: React.ReactNode }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [i, setI] = useState(0);
  const it = items[i];

  const step = useCallback((d: number) => setI((n) => (n + d + items.length) % items.length), [items.length]);

  const open = useCallback((slug: string) => {
    opener.current = document.activeElement as HTMLElement;
    setI(Math.max(0, items.findIndex((p) => p.slug === slug)));
    dlg.current?.showModal();
  }, [items]);

  // Safari has no dialog[closedby] yet: supply light-dismiss by hand.
  useEffect(() => {
    const d = dlg.current;
    if (!d || 'closedBy' in HTMLDialogElement.prototype) return;
    const onClick = (e: MouseEvent) => {
      if (e.target !== d) return;
      const r = d.getBoundingClientRect();
      const inside = e.clientY >= r.top && e.clientY <= r.bottom && e.clientX >= r.left && e.clientX <= r.right;
      if (!inside) d.close();
    };
    d.addEventListener('click', onClick);
    return () => d.removeEventListener('click', onClick);
  }, []);

  const subject = encodeURIComponent(`Renseignements — ${it.title}`);
  const body = encodeURIComponent(`Bonjour,\n\nJe souhaite me renseigner sur la pièce ${it.title}.\n`);

  return (
    <Ctx.Provider value={open}>
      {children}
      <dialog
        ref={dlg}
        className="lb"
        id="lb"
        {...{ closedby: 'any' }}
        aria-label={`${it.title} — œuvre en taille réelle`}
        onClose={() => opener.current?.focus()}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
          if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
        }}
      >
        <button className="lb__x" type="button" aria-label="Fermer" onClick={() => dlg.current?.close()}>&times;</button>
        <button className="lb__nav lb__nav--prev" type="button" aria-label="Œuvre précédente" onClick={() => step(-1)}>&#8249;</button>
        <button className="lb__nav lb__nav--next" type="button" aria-label="Œuvre suivante" onClick={() => step(1)}>&#8250;</button>
        <figure className="lb__fig">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="lb__img" src={`/img/${it.slug}.jpg`} alt={it.alt} />
          <figcaption className="lb__cap">
            <span className="lb__title">{it.title}</span>
            <span className="lb__detail">{it.detail}</span>
            <a className="lb__ask" hidden={!it.portfolio} href={`mailto:${MAIL}?subject=${subject}&body=${body}`}>
              Se renseigner sur cette pièce
            </a>
          </figcaption>
        </figure>
      </dialog>
    </Ctx.Provider>
  );
}
