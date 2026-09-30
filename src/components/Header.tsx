import Link from 'next/link';
import { Nav } from './Nav';

export function Header() {
  return (
    <header className="head">
      <div className="head__top">
        <h1 className="head__mark">
          <Link href="/" aria-label="Résone, accueil">
            <i>R</i><i>É</i><i>S</i><i>O</i><i>N</i><i>E</i>
          </Link>
        </h1>
        <Nav />
      </div>
      <p className="head__sub">portfolio — l&apos;art de faire résonner — abidjan</p>
    </header>
  );
}
