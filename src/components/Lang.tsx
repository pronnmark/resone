'use client';

import { enPieces } from '@/data/pieces.en';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type Lang = 'fr' | 'en';
const KEY = 'resone-lang';
const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'fr', setLang: () => {} });
export const useLang = () => useContext(Ctx);

/** French is the default and what the static HTML ships; English is chosen by the
 *  visitor (or their browser) after hydration and remembered. */
export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, set] = useState<Lang>('fr');

  useEffect(() => {
    let l: Lang | null = null;
    try { l = localStorage.getItem(KEY) as Lang | null; } catch {}
    if (l !== 'fr' && l !== 'en') l = navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en';
    set(l);
  }, []);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const setLang = useCallback((l: Lang) => {
    set(l);
    try { localStorage.setItem(KEY, l); } catch {}
  }, []);

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

/** Inline bilingual text: <T fr="…" en="…" /> */
export function T({ fr, en }: { fr: React.ReactNode; en: React.ReactNode }) {
  return <>{useLang().lang === 'en' ? en : fr}</>;
}

export function usePiece<P extends { slug: string; title: string; detail: string; alt: string }>(p: P): P {
  const { lang } = useLang();
  return lang === 'en' && enPieces[p.slug] ? { ...p, ...enPieces[p.slug] } : p;
}

export function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="lang" role="group" aria-label="Langue / Language">
      {(['fr', 'en'] as const).map((l) => (
        <button key={l} type="button" lang={l} className={lang === l ? 'is-here' : undefined}
                aria-pressed={lang === l} onClick={() => setLang(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
