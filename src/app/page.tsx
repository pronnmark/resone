import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { LightboxProvider } from '@/components/Lightbox';
import { T, LangProvider } from '@/components/Lang';
import { enLabels } from '@/data/pieces.en';
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
    <LangProvider><LightboxProvider items={all}>
      <a className="skip" href="#works"><T fr="Aller au contenu" en="Skip to content" /></a>
      <Header />
      <main>
        {groups.map((g, n) => {
          const id = slugify(g.label);
          return (
            <section key={id} className="works" id={n === 0 ? 'works' : undefined} aria-labelledby={id}>
              <h2 className="works__label" id={id}><T fr={g.label} en={enLabels[g.label] ?? g.label} /></h2>
              <Reveal className="grid" cols={[colsFor(g.tiles.length, 4), colsFor(g.tiles.length, 3), colsFor(g.tiles.length, 2), colsFor(g.tiles.length, 2)]}>
                {g.tiles.map((t, k) => <Tile key={t.slug} p={t} priority={n === 0 && k < 3} />)}
              </Reveal>
            </section>
          );
        })}

        <section className="works" id="atelier" aria-labelledby="h-atelier">
          <h2 className="works__label" id="h-atelier"><T fr="Atelier" en="Studio" /></h2>
          <Reveal className="grid" cols={[colsFor(atelierTiles.length, 4), colsFor(atelierTiles.length, 3), colsFor(atelierTiles.length, 2), colsFor(atelierTiles.length, 2)]}>{atelierTiles.map((t) => <Tile key={t.slug} p={t} />)}</Reveal>
        </section>

        <section className="works" id="apropos" aria-labelledby="h-apropos">
          <h2 className="works__label" id="h-apropos"><T fr="À propos" en="About" /></h2>
          <Reveal className="row">
            <Tile p={about} />
            <div className="card">
              <p className="card__row"><b>Résone</b>
                <span><T fr="entreprise de création et de conseil artistique" en="creative and artistic consulting company" /></span></p>
              <p className="card__row"><b><T fr="Manifeste" en="Manifesto" /></b>
                <span><T fr="nous développons un univers texturé, coloré et géométrique, en quatre-mains, cousu main." en="we develop a textured, colourful and geometric universe, four-handed and hand-sewn." /></span></p>
              <p className="card__row"><b><T fr="À propos" en="About" /></b>
                <span><T
                  fr="Franco-mauriciennes basées en Côte d'Ivoire, nous apportons un bout d'ici et un bout d'ailleurs dans chacune de nos œuvres. Notre identité métissée s'exprime à travers un travail artisanal à quatre-mains et dans la synergie de différents corps de métiers. Nos œuvres sont imprégnées d'imaginaires et d'univers poétiques, de fusions culturelles."
                  en="Franco-Mauritian and based in Côte d'Ivoire, we bring a bit of here and a bit of elsewhere to each of our works. Our mixed identity is expressed through four-handed craftsmanship and through the synergy of different trades. Our works are steeped in imaginaries and poetic universes, in cultural fusions." /></span></p>
              <p className="card__row"><b><T fr="Le grain de beauté" en="The beauty mark" /></b>
                <span><T fr="Le grain de beauté, au dessus de la bouche, est notre marque, apposée discrètement sur nos créations sous cette forme." en="The beauty mark above the lip is our signature, discreetly placed on our creations in this form." /></span></p>
              <p className="card__row"><b><T fr="Savoir-faire" en="Expertise" /></b>
                <span><T fr="Artisanat textile" en="Textile craftsmanship" /></span>
                <span><T fr="Direction artistique" en="Art direction" /></span>
                <span><T fr="Ingénierie créative" en="Creative engineering" /></span>
                <span><T fr="Innovation scénographique" en="Scenographic innovation" /></span></p>
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
              <p className="card__row"><b><T fr="Atelier" en="Studio" /></b>
                <span>Riviera 3, Abidjan</span>
                <span><T fr="Côte d'Ivoire" en="Côte d'Ivoire" /></span></p>
              <p className="card__row"><b><T fr="Sur mesure" en="Made to measure" /></b>
                <span><T fr="Une pièce à votre image ?" en="A piece in your image?" /></span>
                <span><T fr="Écrivez-nous, nous en parlons." en="Write to us, let's talk." /></span></p>
              <p className="card__row"><b>Instagram</b>
                <a href="https://instagram.com/beautyssspot" rel="noopener">@beautyssspot</a></p>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </LightboxProvider></LangProvider>
  );
}
