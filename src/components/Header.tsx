import Link from 'next/link';
import { Nav } from './Nav';
import { T } from './Lang';

export function Header() {
  return (
    <header className="head">
      <div className="head__top">
        <h1 className="head__mark">
          <Link href="/" aria-label="Résone">
            <i>R</i><i>É</i><i>S</i><i>O</i><i>N</i><i>E</i>
          </Link>
        </h1>
        <Nav />
      </div>
      <p className="head__sub"><T fr="entreprise de création et de conseil artistique — artisanat textile — abidjan" en="creative and artistic consulting company — textile craftsmanship — abidjan" /></p>
    </header>
  );
}
