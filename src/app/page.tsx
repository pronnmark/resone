import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { LightboxProvider } from '@/components/Lightbox';
import { Reveal } from '@/components/Reveal';
import { Tile } from '@/components/Tile';
import { atelier, aboutPiece, contactPiece, styles } from '@/data/pieces';
import { size } from '@/lib/images';

// One scroll, every group visible: no tabs, filters or toggles that hide content.
/** Columns for a group of n tiles at a given maximum. One row when it fits;
 *  otherwise the count with the best-balanced last row: an exact divisor first,
 *  a lone stranded tile never. On wide layouts it may step one column past `max`
 *  when that is the only way to avoid the stranded tile (13 = 5+5+3). */
function colsFor(n: number, max: number, min = 2): number {
  if (n <= max) return Math.max(n, min);
  const top = max >= 4 ? max + 1 : max;
  let best = max;
  let bestScore = Infinity;
  for (let c = top; c >= min; c--) {
    const rem = n % c;
    const score = rem === 0 ? 0 : rem === 1 ? 100 : c - rem + (c > max ? 1 : 0);
    if (score < bestScore) { best = c; bestScore = score; }
  }
  return best;
}

const slugify = (s: string) =>
  'style-' + s.normalize('NFKD').replace(/[^\x00-\x7F]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function Home() {
  const groups = styles.map((s) => ({ ...s, tiles: s.pieces.map((p) => size(p, true)) }));
  const atelierTiles = atelier.map((p) => size(p, false));
  const about = size(aboutPiece, false);
  const contact = size(contactPiece, false);
  const all = [...groups.flatMap((g) => g.tiles), ...atelierTiles, about, contact];

  return (
    <LightboxProvider items={all}>
      <a className="skip" href="#works">Aller au contenu</a>
      <Header />
      <main>
        {groups.map((g, n) => {
          const id = slugify(g.label);
          return (
            <section key={id} className="works" id={n === 0 ? 'works' : undefined} aria-labelledby={id}>
              <h2 className="works__label" id={id}>{g.label}</h2>
              <Reveal className="grid" cols={[colsFor(g.tiles.length, 5), colsFor(g.tiles.length, 4), colsFor(g.tiles.length, 3), colsFor(g.tiles.length, 2)]}>
                {g.tiles.map((t, k) => <Tile key={t.slug} p={t} priority={n === 0 && k < 3} />)}
              </Reveal>
            </section>
          );
        })}

        <section className="works" id="atelier" aria-labelledby="h-atelier">
          <h2 className="works__label" id="h-atelier">Atelier</h2>
          <Reveal className="grid" cols={[colsFor(atelierTiles.length, 5), colsFor(atelierTiles.length, 4), colsFor(atelierTiles.length, 3), colsFor(atelierTiles.length, 2)]}>{atelierTiles.map((t) => <Tile key={t.slug} p={t} />)}</Reveal>
        </section>

        <section className="works" id="apropos" aria-labelledby="h-apropos">
          <h2 className="works__label" id="h-apropos">À propos</h2>
          <Reveal className="row">
            <Tile p={about} />
            <div className="card">
              <p className="card__row"><b>Résone</b>
                <span>entreprise de création et de conseil artistique</span></p>
              <p className="card__row"><b>Manifeste</b>
                <span>nous développons un univers texturé, coloré et géométrique, en quatre-mains, cousu main.</span></p>
              <p className="card__row"><b>À propos</b>
                <span>Franco-mauriciennes basées en Côte d&apos;Ivoire, nous apportons un bout d&apos;ici
                et un bout d&apos;ailleurs dans chacune de nos œuvres. Notre identité métissée
                s&apos;exprime à travers un travail artisanal à quatre-mains et dans la synergie de
                différents corps de métiers. Nos œuvres sont imprégnées d&apos;imaginaires et
                d&apos;univers poétiques, de fusions culturelles.</span></p>
              <p className="card__row"><b>Le grain de beauté</b>
                <span>Le grain de beauté, au dessus de la bouche, est notre marque, apposée
                discrètement sur nos créations sous cette forme.</span></p>
              <p className="card__row"><b>Savoir-faire</b>
                <span>Artisanat textile</span>
                <span>Direction artistique</span>
                <span>Ingénierie créative</span>
                <span>Innovation scénographique</span></p>
            </div>
          </Reveal>
        </section>

        <section className="works" id="contact" aria-labelledby="h-contact">
          <h2 className="works__label" id="h-contact">Contact</h2>
          <Reveal className="row">
            <Tile p={contact} />
            <div className="card">
              <p className="card__row"><b>Omara Ré</b>
                <a href="mailto:omara@resone.africa">omara@resone.africa</a>
                <a href="tel:+2250170826363">+225 01 70 82 63 63</a></p>
              <p className="card__row"><b>Inès Ré</b>
                <a href="mailto:ines@resone.africa">ines@resone.africa</a>
                <a href="tel:+2250586162606">+225 05 86 16 26 06</a></p>
              <p className="card__row"><b>Atelier</b>
                <span>Riviera 3, Abidjan</span>
                <span>Côte d&apos;Ivoire</span></p>
              <p className="card__row"><b>Sur mesure</b>
                <span>Une pièce à votre image ?</span>
                <span>Écrivez-nous, nous en parlons.</span></p>
              <p className="card__row"><b>Instagram</b>
                <a href="https://instagram.com/beautyssspot" rel="noopener">@beautyssspot</a></p>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </LightboxProvider>
  );
}
