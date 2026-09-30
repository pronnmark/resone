import { Newsletter } from './Newsletter';

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
      <p className="foot__fine">Atelier — Riviera 3, Abidjan, Côte d&apos;Ivoire</p>
      <p className="foot__fine">© {new Date().getFullYear()} Résone — l&apos;art de faire résonner · Crédit photo : Résone</p>
    </footer>
  );
}
