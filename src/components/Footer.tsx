import { Newsletter } from './Newsletter';
import { T } from './Lang';

export function Footer() {
  return (
    <footer className="foot" id="pied">
      <Newsletter />
      <div className="foot__rule" />
      <span className="foot__glyph" aria-hidden="true">
        <svg viewBox="0 0 120 70" focusable="false">
          <circle cx="46" cy="14" r="6.5" fill="currentColor" />
          <path d="M6 52 L58 40 L70 26 L82 50 L96 30 L112 44" fill="none" stroke="currentColor"
                strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <p className="foot__line">
        <a href="mailto:omara@resone.africa">omara@resone.africa</a>
        <a href="mailto:ines@resone.africa">ines@resone.africa</a>
        <a href="https://instagram.com/beautyssspot" rel="noopener">@beautyssspot</a>
      </p>
      <p className="foot__fine"><T fr="Membre de l'" en="Member of the " /><a href="https://www.facebook.com/oiaong/" rel="noopener"><T fr="Organisation Internationale de l'Artisanat (OIA)" en="Organisation Internationale de l'Artisanat (OIA)" /></a></p>
      <p className="foot__fine"><T fr="Atelier — Riviera 3, Abidjan, Côte d'Ivoire" en="Studio — Riviera 3, Abidjan, Côte d'Ivoire" /></p>
      <p className="foot__fine">© {new Date().getFullYear()} Résone — <T fr="l'art de faire résonner · Crédit photo : Résone" en="the art of making things resonate · Photo credit: Résone" /></p>
    </footer>
  );
}
