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
    // the head script already decided; just mirror it into state
    set(document.documentElement.lang === 'en' ? 'en' : 'fr');
  }, []);

  // Next's metadata rewrites <title>/<meta> after hydration and on navigation; keep ours winning.
  useEffect(() => {
    applyMeta(lang);
    const mo = new MutationObserver(() => {
      if (document.title !== META[lang].title) applyMeta(lang);
    });
    mo.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => mo.disconnect();
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    set(l);
    document.documentElement.lang = l;
    try { localStorage.setItem(KEY, l); } catch {}
  }, []);

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

/** Inline bilingual text: <T fr="…" en="…" /> */
export function T({ fr, en }: { fr: React.ReactNode; en: React.ReactNode }) {
  // both are in the HTML; CSS shows the one matching <html lang>, so there is no French flash
  return (<><span lang="fr" data-l="fr">{fr}</span><span lang="en" data-l="en">{en}</span></>);
}

/** Runs in <head>, before first paint: sets <html lang> from the saved or browser language. */
export const META = {
  fr: { title: "Résone — Artisanes du textile | Abidjan, Côte d'Ivoire",
        description: "Résone, entreprise de création et de conseil artistique. Artisanat textile, direction artistique, ingénierie créative et innovation scénographique." },
  en: { title: "Résone — Textile artisans | Abidjan, Côte d'Ivoire",
        description: "Résone, a creative and artistic consulting company. Textile craftsmanship, art direction, creative engineering and scenographic innovation." },
};

/** Tab title and meta description follow the language. */
function applyMeta(l: Lang) {
  document.title = META[l].title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', META[l].description);
}

export const LANG_SCRIPT = `try{var l=localStorage.getItem('${KEY}');if(l!=='fr'&&l!=='en')l=(navigator.language||'').toLowerCase().indexOf('fr')===0?'fr':'en';document.documentElement.lang=l;var m=l==='en'?${JSON.stringify(META.en)}:null;if(m){document.addEventListener('DOMContentLoaded',function(){document.title=m.title;var d=document.querySelector('meta[name="description"]');if(d)d.setAttribute('content',m.description)})}}catch(e){}`;

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
