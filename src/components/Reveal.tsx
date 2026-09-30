'use client';

import { useEffect, useRef } from 'react';

/** Fade a block in as it scrolls into view. The hidden state is only armed from
 *  here, so a failed script can never leave content at opacity 0. */
export function Reveal({ className, cols, children }: { className: string; /** columns at [wide, large, medium, small] container widths */ cols?: number[]; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('js');
    el.classList.add('reveal');
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect(); }
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={className} style={cols ? ({ '--cols': cols[0], '--cols-l': cols[1], '--cols-m': cols[2], '--cols-s': cols[3] } as React.CSSProperties) : undefined}>{children}</div>;
}
