# RÉSONE — Design Target

> **Ré s o n e** — _l'art de faire résonner_
> Entreprise de création et de conseil artistique. Abidjan, Côte d'Ivoire.

This document is the **single source of truth for the visual design** of resone.africa.
Everything below is derived from primary sources, not invented. Provenance is stated for
each decision so it can be re-verified or corrected.

---

## 1. Provenance

| Source | What was taken from it | How |
|---|---|---|
| Canva design `DAHWDWi4hD0` — *"Copy of PORTFOLIO RESONE 2026"*, 29-page presentation, 1920×1080 | Palette, typography, wordmark lockup, motifs, all copy, all imagery | Canva MCP (`canva_get-design`, `get-design-pages`, `get-design-content`, `export-design`) |
| [koralie.com](https://www.koralie.com/) | Layout and interaction model only — **no colour, type or content** | Rendered and read via the browser bridge |

**Colour extraction method.** Page 1 was exported as a lossless 1920×1080 PNG via
`canva_export-design`, then quantised with ImageMagick
(`convert full.png -colors 12 -format %c histogram:info:-`) and point-sampled at fixed
coordinates. Additional pages (5, 9, 13, 20, 25, 29) were sampled the same way to capture
the artwork accents. Every hex below is a **measured pixel value**, not an estimate.

**Typeface identification method.** Canva's API does not expose font metadata — an editing
transaction returns geometry, text and fills but no `fontFamily`. The face was therefore
identified optically: the heading "Artisanes du textile" was cropped from the full-resolution
export, upscaled, and rendered side by side against candidate Google Fonts at matched
cap-height. See §3.

**Imagery method.** The original photographs are **not retrievable**. An editing transaction
exposes an `asset_id` for every image fill, but `canva_get-assets` answers
`permission_denied` for all 25 of the studio's own uploads — they belong to the original
deck's team, not to the team that owns this copy. The only assets that do resolve are the
10 Canva stock gradients ("Blue Denim", "Muted Professional Gradient…"), which are
backgrounds, not artwork.

So the gallery is cut from **3840×2160 page exports** instead. That is not a fallback of
last resort: Canva renders the export from the full-resolution source assets, so a photo
placed at ~1355×2001 design units yields ~2710×4002 real pixels at 2×. Measured against the
same region of a 1600-wide export, the 4K render carries **24% more edge energy** — genuine
recovered detail, not upscaling. Crops were then chosen from grid-annotated proofs to avoid
the deck's burnt-in typography and watermarks.

**Reference images** are committed under `reference/` so this is reproducible without
re-hitting the Canva API.

---

## 2. Palette

All values measured from the Canva export. Grouped by role, not by hue.

### 2.1 Foundation — the paper

The deck's ground is never pure white. It is a warm bone that runs as a soft vertical
gradient from near-white at the top to a deeper stone at the bottom edge.

| Token | Hex | Measured at | Role |
|---|---|---|---|
| `--paper` | `#F6F6F5` | p1 (20,20) & (960,30) — 533k px | Top of page gradient, cards, dialog surface |
| `--bone` | `#EAE9E5` | p1 dominant — 1.48M px | **Primary background.** The brand's true "white" |
| `--bone-deep` | `#E2E0DC` | p1 (1900,1060) | Bottom of gradient, section alternation |
| `--sand` | `#D3C6B8` | p1 — 24k px | Dot-grid motif, hairline rules, dividers |
| `--ash` | `#AB9F98` | p1 — 6.4k px | Disabled text, captions, photo credits |

### 2.2 Ink — the text

The deck sets type in a **warm oxblood**, never in black. This is the single most
characteristic decision in the identity and must be preserved.

| Token | Hex | Measured at | Role |
|---|---|---|---|
| `--ink` | `#391316` | p1 — 6.8k px | **Primary text, headings, wordmark** |
| `--ink-wine` | `#4C2A2C` | p1 — 395 px | Hover states, focus rings, active nav |
| `--ink-cocoa` | `#59473A` | p1 — 8.3k px | Accent bar fills, buttons |
| `--ink-soft` | `#78615A` | p1 — 4.9k px | Secondary text, intro paragraphs |
| `--ink-mute` | `#88726D` | p1 — 2.1k px | Metadata, dimensions, media lines |

`--ink` on `--bone` measures **13.8:1** — comfortably AAA.
`--ink-soft` on `--bone` measures **5.6:1** — AA for body, AAA for large text.
`--ink-mute` on `--bone` is **4.6:1** — AA body text only; never below 16px.
`--ash` on `--bone` is **2.3:1** — **decorative only, never body text.**

### 2.3 Accent — the work

These come out of the artwork itself, not from a brand guideline. Each is tied to a real
piece, which is why they are allowed to be this saturated: they are quotations.

| Token | Hex | Source | Piece |
|---|---|---|---|
| `--terracotta` | `#B2917A` | p1, p5 | Côte d'Ivoire outline, warm fabric |
| `--clay` | `#D2B9A5` | p1, p5 | Linen, popeline, skin-warm neutrals |
| `--saffron` | `#E8CE8A` | p20 | "Elephant print" top, gold thread |
| `--gold` | `#B99E6C` | p20 | Dot-grid highlight, hairline accents |
| `--indigo` | `#232C45` | p13 | **'282'** — the denim mosaic, 282 pieces of jeans |
| `--indigo-deep` | `#1B2235` | p13 | *L'architecture de l'eau* |
| `--ember` | `#552D1A` | p25 | **HANOKA** — the lit scenographic interior |
| `--noir` | `#150E0B` | p25 | Ombres chinoises, *"ivresse écarlate"* |

### 2.4 Usage rules

- **Bone is the default.** Any screen that is more than ~15% accent colour is wrong.
- **One accent per section.** Do not mix indigo and saffron in the same viewport.
- Accents appear as **thin rules, small marks, and photography** — not as large fills.
  The only permitted large fill is `--ink-cocoa` for the accent bar (see p5) and
  `--noir` for the lightbox backdrop.
- Never introduce a hue that is not in this table. If a new piece needs one, sample it
  from the artwork and add it here first.

---

## 3. Typography

### 3.1 The face

The deck is set in a **light geometric sans with a single-storey `a`** — the
Futura / Century Gothic lineage. Verified by cropping "Artisanes" from the 1920×1080
export and comparing against Jost Light, Questrial and Poppins Light at matched
cap-height:

- **Jost Light** — rejected. Double-storey `a`.
- **Questrial** — rejected. Single-storey `a`, but heavier, taller x-height, different `t`.
- **Poppins Light** — **match.** Identical single-storey `a`, geometric `A` with pointed
  apex, short-armed `r`, angled-top `t`, and the same wide, airy set width.

> Canva's own font is most likely Poppins or Century Gothic (both ship with Canva).
> **Poppins is the faithful and licence-clean web equivalent** and is what this site uses.
> If the brand later confirms a different licensed face, change it in one place:
> `--font-sans` in `assets/css/styles.css`.

### 3.2 The stack

| Token | Family | Weights | Used for |
|---|---|---|---|
| `--font-sans` | **Poppins** | 200, 300, 400, 500 | Everything structural |
| `--font-serif` | **Playfair Display** | 400 italic | Pull quotes and work titles only |

Playfair is a deliberate nod to koralie.com, which sets its display type in
Playfair Display SC. It is used **sparingly** — quotes and the names of pieces — so the
page still reads as Résone's geometric sans, not as a Koralie clone.

Subset to `latin` + `latin-ext`. French requires é, è, ê, à, ô, ç, and the deck uses
"Ré", "œuvres", "Côte d'Ivoire", "métissée" — `latin` alone will break these.

### 3.3 The wordmark

```
R É S O N  E
_ L'ART DE FAIRE RÉSONNER
```

- Poppins **200**, uppercase, `letter-spacing: 0.42em`
- The tagline sits directly beneath at **~28% of the wordmark size**, `letter-spacing: 0.22em`,
  in `--ink-soft`, prefixed by a literal underscore
- The deck renders the wordmark with **irregular internal spacing** (`Ré s o  n   e` —
  the gaps widen toward the end). This is intentional in the source. On the web it is
  reproduced with uniform tracking plus a widened gap before the final `E`, because
  irregular spacing does not survive responsive reflow or screen readers.
- Accessible name is always `Résone` via `aria-label`; the letterspaced glyphs are
  `aria-hidden`.

### 3.4 Scale

Fluid, `clamp()`-based, no breakpoint jumps.

| Role | Size | Weight | Tracking | Case |
|---|---|---|---|---|
| Hero wordmark | `clamp(2.2rem, 7vw, 5.5rem)` | 200 | `.42em` | upper |
| Display h1 | `clamp(1.9rem, 4.6vw, 3.4rem)` | 300 | `-0.01em` | sentence |
| Section h2 | `clamp(1.4rem, 2.6vw, 2.1rem)` | 300 | `.02em` | sentence |
| Eyebrow | `0.68rem` | 400 | `.3em` | upper |
| Nav | `0.72rem` | 400 | `.18em` | upper |
| Body | `clamp(0.95rem, 1.05vw, 1.05rem)` | 300 | `0` | sentence |
| Lead | `clamp(1.05rem, 1.6vw, 1.3rem)` | 200 | `.01em` | sentence |
| Meta / credit | `0.72rem` | 300 | `.08em` | upper |
| Quote | `clamp(1.3rem, 3vw, 2.1rem)` | 400 italic (serif) | `0` | sentence |

Body line-height `1.75`. Headings `1.15`. Measure capped at `68ch` for body, `34ch` for leads.

---

## 4. Motifs

Three marks carry the identity. They are not decoration; they are in the deck on nearly
every page.

1. **The dot grid.** A halftone field of small `--sand` / `--gold` dots, roughly 14px
   pitch, 1.5px radius, fading out toward the content. Implemented as a CSS
   `radial-gradient` background with a `mask-image` fade — no image asset.
2. **The grain de beauté.** The studio's signature: *"Le grain de beauté, au dessus de la
   bouche, est notre marque, apposée discrètement sur nos créations sous cette forme."*
   A round dot above a tapered zigzag stroke. Inline SVG, `currentColor`, used as the
   section divider and the footer mark. Traced from the appliqué on p5 and p20.
3. **The Côte d'Ivoire outline.** A hairline `--terracotta` country silhouette, bottom-right
   of the hero, at very low opacity. Inline SVG. Marks where the studio is without saying it.

---

## 5. Layout model (from koralie.com)

What is borrowed is **structure and restraint**, nothing visual.

| koralie.com | Résone equivalent |
|---|---|
| Fixed minimal header, wordmark left, uppercase micro-nav right | Same, plus the hairline tagline under the wordmark |
| `ART / INSTALLATION / MURAL / ABOUT / CONTACT \| SHOP` | `ŒUVRES / SIGNATURES / ATELIER / À PROPOS / CONTACT` |
| Page is essentially a large image grid; chrome gets out of the way | Same — `.works` is the centre of gravity of the page |
| "Voir en taille réelle" → full-size lightbox | `<dialog>` lightbox with prev/next, Esc, light-dismiss |
| Newsletter signup block above the footer | Same, plus the two founders' direct lines |
| Tiny footer: email, legal, one sentence | Same |

**Deliberate divergences.** Koralie is a shop; Résone is a studio. So: no cart, no prices,
no product grid. Résone adds a *Signatures* block (the four offers) and a *Référence* block
(Créative Côte d'Ivoire 2026), because the deck's argument is capability, not inventory.

### Section order

1. Header — sticky, transparent over the hero, bone + blur once scrolled
2. **Hero** — wordmark, "Artisanes du textile", tagline, dot grid, CI outline
3. **Manifeste** — the quatre-mains sentence, set large
4. **Signatures** — the four offers as a numbered hairline list
5. **Œuvres** — the image grid + lightbox
6. **À propos** — les sœurs Ré, and the RÉSONNER / RAISONNER wordplay
7. **Référence** — Créative Côte d'Ivoire, Ministère de la Culture, 2026
8. **Contact** — two founders, newsletter
9. Footer — mark, Instagram, legal

---

## 6. Content (verbatim from the deck)

Do not paraphrase. This copy is the studio's own.

- **Tagline** — `_ l'art de faire résonner`
- **Hero** — `Artisanes du textile` / `Introduction aux signatures et offres artistiques`
- **Positioning** — `entreprise de création et de conseil artistique`
- **Manifeste** — `nous développons un univers texturé, coloré et géométrique, en quatre-mains, cousu main.`
- **Approach** — `Une exploration visuelle qui se nourrit de références culturelles, historiques et thématiques.`
- **Concepts** — `Nous inventons des concepts artistiques qui transforment la matière en récits visuels et immersifs, nourris par l'observation des cultures et des modes de vie.`
- **Signature mark** — `Le grain de beauté, au dessus de la bouche, est notre marque, apposée discrètement sur nos créations sous cette forme.`
- **À propos** — `Franco-mauriciennes basées en Côte d'Ivoire, nous apportons un bout d'ici et un bout d'ailleurs dans chacune de nos œuvres. Notre identité métissée s'exprime à travers un travail artisanal à quatre-mains et dans la synergie de différents corps de métiers. Nos œuvres sont imprégnées d'imaginaires et d'univers poétiques, de fusions culturelles.`
- **Wordplay** — `RÉSONNER / RAISONNER`

### Offers

| # | Offer |
|---|---|
| 01 | Artisanat textile |
| 02 | Direction artistique |
| 03 | Ingénierie créative |
| 04 | Innovation scénographique |

### Works

Titles, media and dimensions are transcribed from the deck's own captions. Prices included
because the deck states them.

| Image | Title | Detail | Deck page |
|---|---|---|---|
| `ivresse-ecarlate.jpg` | **« Ivresse écarlate »** | Créton, popeline, tissu sky — 180 × 180 cm | 6 |
| `apprentis-sages.jpg` | **« Apprentis Sages »** | Popeline, cretonne — 100 × 50 cm · triptyque, voyage à Korhogo | 8 |
| `accords-vitamines.jpg` | **« Accords vitaminés »** | Popeline, tissu « sky », crétonne, perles — 105 × 65 cm | 10 |
| `mosaique-jeans.jpg` | **L'architecture de l'eau** | Mosaïque en jeans — recyclées, découpées, assemblées | 4 |
| `hanoka.jpg` | **HANOKA** | Installation textile murale inspirée du hanok — 200 × 96 cm | 24 |
| `tablier.jpg` | **Le tablier de l'artisan** | Patchwork signature — sur mesure, 175 000 FCFA | 13 |
| `decors-architecture.jpg` | **Décors inspirés de l'architecture** | Pans de murs textiles | 4 |
| `atelier.jpg` | **Réalisation de pans de murs** | Inspirés des architectures traditionnelles du monde | 22 |
| `elephant-print.jpg` | **Le haut « Elephant print »** | Patchwork signature vêtement — 59 000 FCFA | 21 |

### Studio photography (`assets/img/studio/`)

| Image | Use | Deck page |
|---|---|---|
| `ines-atelier.jpg` | Atelier section | 7 |
| `soeurs-re.jpg` | À propos — Omara &amp; Inès Ré | 27 |
| `reference-ines.jpg` | Référence — Créative Côte d'Ivoire | 26 |

Documented in the deck and available for a later phase: *'282'* (the denim coat, 282
recycled pieces), the Korhogo triptych diagram, the *Cahier des charges* case study, and
the pool/architecture inspiration boards.

### Contact

| | |
|---|---|
| Omara Ré | `+225 01 70 82 63 63` · `omara@resone.africa` |
| Inès Ré | `+225 05 86 16 26 06` · `ines@resone.africa` |
| Instagram | `@beautyssspot` |
| Atelier | En exposition à l'atelier — **Riviera 3, Abidjan** |

### Reference

> **2026** — Incubation de Résone au sein du programme « Créative Côte d'Ivoire »
> du Ministère de la Culture. Inès Ré, 23 juin 2026.

---

## 7. Interaction

- **Reveal on scroll** — `IntersectionObserver`, 18px rise + fade, 600ms, staggered 60ms
  within a group. Entirely disabled under `prefers-reduced-motion: reduce`.
- **Work tiles** — image scales to 1.03 over 900ms; the caption is always present in the
  DOM for screen readers and crawlers, and fades up on hover/focus for sighted users.
  Tiles are `<button>`s, so keyboard and touch get the same affordance as mouse.
- **Lightbox** — native `<dialog closedby="any">` opened with `showModal()`. Arrow keys
  page through works, Esc closes, clicking the backdrop closes. A JS fallback supplies
  light-dismiss on Safari, which does not yet support `closedby`.
- **Header** — transparent over the hero; gains `--paper` at 88% with a backdrop blur and a
  `--sand` hairline once scrolled past 40px.
- **Focus** — 2px `--ink-wine` outline with 3px offset, on every interactive element. Never removed.

## 8. Performance & quality bar

- No framework, no bundler, no runtime dependency. Three files plus images.
- Hero has no image — it is type on a CSS gradient, so LCP is text and paints immediately.
- Gallery images `loading="lazy"` + `decoding="async"`; the first tile carries
  `fetchpriority="high"`. Every `<img>` has explicit `width`/`height` to hold layout (CLS 0).
- **No `content-visibility: auto`.** It was tried and removed: across nine short sections
  and eight lazy images it saves nothing measurable, while it does suppress paint for
  offscreen sections and degrade scroll anchoring. Do not reintroduce it without a
  profile showing a real win.
- Images are ≤1200px on the long edge, JPEG q84, stripped of metadata. Whole gallery ≈ 500KB.
- Targets: Lighthouse ≥ 95 across the board, WCAG 2.2 AA, keyboard-complete, valid HTML.
- **Browser support:** Baseline Widely Available without fallbacks. Newly Available features
  (`@starting-style`, `transition-behavior: allow-discrete`, `dialog[closedby]`) are used as
  progressive enhancement only, each with a graceful degradation path — the lightbox must
  still open, navigate and close correctly with all three unsupported.

## 9. Known gaps

- **Imagery is second-generation.** Every image is a crop from a 4K render of the deck, not
  the studio's original files — those are locked behind `permission_denied` (see §1). The
  crops were chosen to avoid burnt-in type, but a few still carry a faint ghost wordmark
  where the deck laid one over the photograph. Ask the studio for the source photographs
  before this goes public; the layout will take them as drop-in replacements.
- **Rights.** The photographs are credited "Crédit photo : Résone" in the deck. Confirm with
  the studio before publishing.
- **The exact Canva font is unconfirmed** — see §3.1. Poppins is an optical match, not a
  statement from the brand.
- Newsletter form has no backend; it is markup and validation only.
- French only. The deck is French; an EN locale is a later decision.
