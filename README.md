# Résone

**Résone** is a textile-art and artistic-direction studio in Abidjan, Côte d'Ivoire, run
by the sisters **Omara Ré** and **Inès Ré**. This repo is its portfolio site, live at
<https://resone.hostbun.cc> (the brand domain `resone.africa` is not ours to point yet —
see `AGENTS.md`).

Everything below is from the studio's own words (the Canva deck *Portfolio Résone 2026*
and the voice memos of 2026-09-26). Where the sources are silent it says so.

## Who they are

> *Franco-mauriciennes basées en Côte d'Ivoire, nous apportons un bout d'ici et un bout
> d'ailleurs dans chacune de nos œuvres. Notre identité métissée s'exprime à travers un
> travail artisanal à quatre-mains et dans la synergie de différents corps de métiers.*

Two sisters, French and Mauritian, working from an atelier in **Riviera 3, Abidjan**. Their
positioning line is *entreprise de création et de conseil artistique*. In 2026 they were
incubated in the Ministry of Culture's **Créative Côte d'Ivoire** programme; Inès presented
Résone on stage on 23 June 2026.

## The name and the tagline

*Résone* is *résonner* (to resound) and, in the deck's own wordplay, **RÉSONNER / RAISONNER**
(to resound / to reason). The tagline is ***l'art de faire résonner***. The signature
gesture is a **grain de beauté**, the beauty mark above the lip, embroidered discreetly
onto every piece — it is their maker's mark, and the site's only motif.

## What they make

> *un univers texturé, coloré et géométrique, en quatre-mains, cousu main.*

Four offers: **artisanat textile · direction artistique · ingénierie créative · innovation
scénographique**. In practice the work falls into three styles, named by the studio itself
on 2026-09-26:

1. **Ombres chinoises** — textile artworks made to be lit from behind, in the Chinese
   shadow technique. The masterpiece is *Ivresse écarlate* (180 × 180 cm, créton,
   popeline, tissu sky). Also *Apprentis Sages* and *Accords vitaminés*.
2. **HANOKA** — textile wall installations inspired by traditional architecture, from the
   Korean hanok (the reference photograph is a house in Bukchon, Seoul). Wall panels,
   window lattices, shadow play on the wall.
3. **Patchwork** — recycled denim cut and reassembled into mosaics (*L'architecture de
   l'eau*, every piece numbered and embroidered by hand) and into signature garments: the
   *Elephant print* top, *Fée des jeans*, the peach sets, and *le tablier de l'artisan*,
   made to measure.

Each piece is an **artwork**, each artwork belongs to **one style**, and there are **no
collections**. The site shows **no prices** (studio's ruling, 2026-09-29): pieces read *sur demande*, each
lightbox has a *Se renseigner sur cette pièce* email link, and the contact card invites
custom-piece requests. It is not a shop: the studio
ruled out a cart because *"it could feel cheap"*. The path is *if interested, contact us*.

## The pieces, in the studio's own words

From the deck's pages (French, paraphrased here; the verbatim copy is in `target.md` §6).

- **« Ivresse écarlate »** (180 × 180 cm) sets *"une ambiance tamisée, hypnotique et
  sophistiquée"* for intimate and festive evenings. The ombres chinoises are *"des œuvres
  qui éclairent"*: pieces of matter and light made *de fil en aiguille*, staging perspective,
  precision and elegance.
- **« Apprentis Sages »** (100 × 50 cm) is a triptych from a trip to **Korhogo**: karate
  pupils at the cultural centre, the path of discipline through sport, and a Côte d'Ivoire –
  Japan fusion. The white belt, the blue belt and the coming mastery are its three stages.
- **« Accords vitaminés »** (105 × 65 cm): a guitar turns into an avocado tree, its sound box
  a metaphor for the fruit. Purple petals come from flamenco dancers, and butterflies bring the
  notes that make the new chords. Nature is the source.
- **L'architecture de l'eau** is a wall tapestry made of **282** recycled, cut, assembled denim
  pieces, one per pixel of a stylised water reflection. Its back shows every piece numbered and
  embroidered by hand. The inspiration is swimming pools as works of art.
- **Le tablier de l'artisan** (made to measure) honours the working craftsperson.
  One version answers a wine house's brief: navy polycotton, geometric patchwork in titanium,
  bordeaux and pale pink, seen as vineyards from the air.
- **HANOKA** (200 × 96 cm) is a textile wall piece inspired by the Korean hanok (Bukchon,
  Seoul). Maria, a 7-year-old neighbour, poses in front of it, and it is staged at the atelier
  with a fan, dice, an ebony table and a leather stool that Résone also made.
- **The garments** (*Elephant print*; *Fée des jeans*) are *patchwork signature*.

Their concept line: *nous inventons des concepts artistiques qui transforment la matière en
récits visuels et immersifs, nourris par l'observation des cultures et des modes de vie.*

## What is not known

The deck gives no founding date, no account of how the sisters learned the craft, no client or
partner list (the studio raised one and never settled it), and no English copy. The wine-house
apron is the one named commission, and the client is not named. A real "our story" page needs
the studio, not an agent.

## What the site is

A static site, four pages — **Portfolio · Atelier · À propos · Contact** — each one a
header, a mosaic of work, and a footer. No hero, no text bands, no framework. The
portfolio opens on the masterpiece and can be filtered by style. Click a piece for the
full image. French only for now; English waits on the studio (`requirements-2026-09-26.md`).

Design reference: [insane51.com](https://insane51.com) for the filter row and the air
around the work, and Jaipur Rugs and Indian designer sites for the luxury-minimalist tone
the studio described.

## Run it

```sh
python3 build.py                                    # regenerates the four .html files
python3 -m http.server 8080 --directory .           # then open http://localhost:8080
```

## Where things are

| | |
|---|---|
| `AGENTS.md` | how to work here, hard rules, hosting and deploy |
| `docs/purpose.md` | who we are, what we are doing and why — start here |
| `CONTEXT.md` | the studio's terms |
| `docs/adr/` | decisions that would otherwise be re-argued (no prices, four pages, filter, images) |
| `aesthetic.md` | what the site should feel like, what it is not, and how to decide edge cases |
| `target.md` | palette, type, layout model and the provenance of each design choice |
| `requirements-2026-09-26.md` | what the studio asked for in the voice memos, and what is done |
| `build.py` | the pages, captions and alt text — the `.html` files are generated |
| `reference/` | Canva page exports for design re-checks; never published |

## State of the images

The gallery is cut from the files hosted in the studio's own Canva deck, so the watermark
is gone. They are **not** the raw phone files the studio offered to send, and some are
small. Photos straight off the phone are the real upgrade (`target.md` §9).
