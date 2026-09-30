'use client';

import { useEffect, useState } from 'react';

const NAV = [
  ['works', 'Portfolio'],
  ['atelier', 'Atelier'],
  ['apropos', 'À propos'],
  ['contact', 'Contact'],
] as const;

/** Nav that marks the section currently in view (hairline + aria-current). */
export function Nav() {
  const [here, setHere] = useState<string>('works');

  useEffect(() => {
    // every .works section reports in; the three style groups all mean "Portfolio"
    const els = Array.from(document.querySelectorAll<HTMLElement>('section.works'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setHere(NAV.some(([id]) => id === e.target.id) && e.target.id !== 'works' ? e.target.id : 'works');
        });
      },
      // a section is "here" once it crosses the upper third of the viewport
      { rootMargin: '-15% 0px -70% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="nav" aria-label="Navigation principale">
      {NAV.map(([id, label]) => (
        <a key={id} href={`#${id}`} className={here === id ? 'is-here' : undefined} aria-current={here === id ? 'location' : undefined}>
          {label}
        </a>
      ))}
      <a className="nav__ig" href="https://instagram.com/beautyssspot" rel="noopener" aria-label="Instagram">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
        </svg>
      </a>
    </nav>
  );
}
