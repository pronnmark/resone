import Link from 'next/link';

const NAV = [
  ['/#works', 'Portfolio'],
  ['/#atelier', 'Atelier'],
  ['/#apropos', 'À propos'],
  ['/#contact', 'Contact'],
] as const;

export function Header() {
  return (
    <header className="head">
      <div className="head__top">
        <h1 className="head__mark">
          <Link href="/" aria-label="Résone, accueil">
            <i>R</i><i>É</i><i>S</i><i>O</i><i>N</i><i>E</i>
          </Link>
        </h1>
        <nav className="nav" aria-label="Navigation principale">
          {NAV.map(([href, label], n) => (
            <a key={href} href={href} className={n === 0 ? 'is-here' : undefined}>{label}</a>
          ))}
          <a className="nav__ig" href="https://instagram.com/beautyssspot" rel="noopener" aria-label="Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
            </svg>
          </a>
        </nav>
      </div>
      <p className="head__sub">portfolio — l&apos;art de faire résonner — abidjan</p>
    </header>
  );
}
