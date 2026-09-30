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

**Imagery method.** The original photographs are **not retrievable through the Canva MCP**.
An editing transaction exposes an `asset_id` for every image fill, but `canva_get-assets`
answers `permission_denied` for all of the studio's own uploads — they belong to the
original deck's team, not to the team that owns this copy. The only assets that do resolve
are Canva stock elements and gradients, which are backgrounds, not artwork. The original
deck, `DAHU40YlOW4` (*"PORTFOLIO RESONE 2026"*, 30 pages, owned by Omara Ré), is shared
with us **view-only**, so it refuses an editing transaction too.

**They are retrievable through the browser session** (2026-09-29). With the original deck's
view page open in the logged-in Chrome, a same-origin
`fetch('/_ajax/documents/DAHU40YlOW4/resources?extension=QfeIrUNytfkym9l1axLW2A&includeMedia&includeOrphaned&limit=100&media=<ID>%3A1…')`
returns, per media ID, signed `media.canva.com/v2/image-resize/…/watermark:F/…` renditions
up to `SCREEN_3X` — native size, capped at 2400 px on the long edge. Media IDs are the
`MA…` tokens in the view page's HTML. The URLs are signed over their exact path (changing
the size returns 403) and expire within hours; they download with `curl`, but Python's
default User-Agent gets a 403. All 113 studio rasters (58 originals plus Canva-derived
cut-outs) were pulled this way into `~/Documents/resone-originals/` on pbox — **outside the
repo on purpose**: they include the registration certificates and the inspiration boards
(§6), and weigh 99 MB.

The gallery was cut from **3840×2160 page exports** before that route was found. That is not a fallback of
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

**Tenor Sans.** Confirmed by the studio — this is the brand face, not an inference.

For the record, my own optical reading of the deck disagreed: the heading "Artisanes du
textile" has a **single-storey `a`**, which Tenor Sans does not have, and it matched
Poppins Light when rendered at matched cap-height. Tenor Sans is almost certainly the
face behind the letterspaced `RÉSONE` wordmark and the caps throughout, with the deck
mixing a second geometric face for some body settings. **The brand's answer wins.** The
whole site is Tenor Sans; if that ever changes it is one token, `--font` in
`assets/css/styles.css`.

### 3.2 One family, one weight

| Token | Family | Weights | Used for |
|---|---|---|---|
| `--font` | **Tenor Sans** | 400 — the only one it ships | Everything |

This is the single most important constraint in the design. **Tenor Sans has no bold and
no light.** Hierarchy is therefore carried entirely by:

- **size** — 10 px tracked caps for labels, 13.5 px for body, 16 px for the lead
- **letter-spacing** — `.28em` on labels, `.44em` on the wordmark, `0` on body
- **case** — uppercase for every label, eyebrow, nav item and footer line
- **colour** — `--ink` → `--ink-soft` → `--ink-mute` → `--ash` as emphasis falls away

Never add `font-weight: 500+` to fake emphasis: the browser will synthesise a smeared
faux-bold. A CI check for this is in the verification list — every element must compute
to `font-weight <= 400`.

Subset `latin` + `latin-ext`. French needs é, è, ê, à, ô, ç and the copy uses "Ré",
"œuvres", "Côte d'Ivoire", "métissée" — `latin` alone breaks these.

### 3.3 The wordmark

```
R É S O N  E
```

The spacing is **not uniform tracking.** The deck sets the literal string
`Ré s o  n   e`, so the gaps widen toward the end of the word. That irregularity is the
mark's signature and reproducing it was measured, not eyeballed:

1. The cover was exported at 1920 px and the wordmark's per-glyph ink runs found by
   column-wise threshold analysis.
2. Gaps were taken ink-edge to ink-edge, and converted to `em` using the `R`'s 33 px cap
   height at Tenor Sans's 0.70 em cap ratio → an implied 47.1 px font size.

| pair | gap |
|---|---|
| R → É | `0.127em` |
| É → S | `0.403em` |
| S → O | `0.424em` |
| O → N | `0.806em` |
| N → E | `1.230em` |

Tenor Sans's own side bearings were then measured in the browser at letter-spacing 0
(`0.145 / 0.065 / 0.115 / 0.170 / 0.240 em`) and subtracted, giving the per-letter
`margin-right` values in `.head__mark i:nth-child(n)`. The live header was re-measured
against the Canva render and agrees to **within 0.008 em — 0.15 px at the 19 px header
size.**

- Each letter is its own `<i>`; the accessible name comes from `aria-label="Résone,
  accueil"` on the link, so splitting the glyphs costs nothing to a screen reader.
- **Do not collapse this to a single `letter-spacing`.** It would flatten the mark into
  something the studio would not recognise. If the size changes, nothing needs
  recalculating — the values are in `em`.

### 3.4 Scale

Small and tight, in px, matching koralie's register. No fluid display sizes, because
there is no display type left on the page.

| Role | Size | Tracking | Case | Colour |
|---|---|---|---|---|
| Wordmark (h1) | `clamp(15px, 1.5vw, 19px)` | `.44em` | upper | `--ink` |
| Header subtitle | `10.5px` | `.26em` | lower | `--ink-mute` |
| Nav | `10.5px` | `.2em` | upper | `--ink-soft` |
| Column heading (h2) | `10.5px` | `.28em` | upper | `--ink-mute` |
| Lead | `16px` | `.01em` | sentence | `--ink` |
| Body | `13.5px` | `0` | sentence | `--ink-soft` |
| Tile title | `13px` | `.04em` | sentence | `--paper` |
| Tile detail | `9.5px` | `.12em` | upper | `--clay` |
| Footer | `10px` | `.16em` | upper | `--ash` |

Body line-height `1.72`.

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

koralie.com was re-examined properly, at full page height, and it is far more austere
than a first read suggests. What it actually does:

- **No hero.** No headline, no intro, no full-viewport anything. The header is ~90 px
  tall and the first image starts immediately beneath it.
- **No section headings at all.** Not one word of chrome between images.
- **The whole page is one dense mosaic** — justified rows, edge to edge, ~10 px gutters,
  images of mixed aspect packed tight. 8,561 px of page, essentially all of it artwork.
- Type is tiny: wordmark ~14 px with wide tracking, nav ~9 px.
- One line of identity under the wordmark (`koralie carmen flores`), and that is the
  entire copy above the fold.

Résone follows that model.

| koralie.com | Résone |
|---|---|
| Header: wordmark left, micro-nav right, one subtitle line | Same |
| `ART / INSTALLATION / MURAL / ABOUT / CONTACT \| SHOP` | `PORTFOLIO / ATELIER / À PROPOS / CONTACT` + Instagram |
| Straight into a justified image mosaic, no hero | Same |
| Zero copy between images | **Diverges** — one style label per group on the portfolio |
| Full-size lightbox from any tile | `<dialog>` lightbox, prev/next, Esc, light-dismiss |
| Tiny footer | One-line footer |

**One deliberate divergence, added 2026-09-26.** koralie has no section headings at all.
The portfolio now carries three, because the studio asked to *"explore by style"* and to
be able to *"section it"* — *"we have three main styles right now"*. Each group is still
a `<section class="works">`, so hard rule 0's check holds, but the labels are genuinely
chrome between images and that is a real departure from the koralie model. They are the
only such copy on the page. If the studio would rather have the grouping without the
words, delete `.works__label` and the labels go with it; the grouping survives.

**The text sections stay deleted.** An intermediate build kept the deck's argument —
manifesto, four signatures, about, contact — as a four-column strip under the mosaic. The
studio's verdict was *"still sections without images, less is more, just delete"*, so it
is gone, and the 2026-09-26 review did not reopen it. The prose that review did ask for
went to `apropos.html` as a card in a mosaic row, not back onto the home page.

| Build | Height | Text sections |
|---|---|---|
| First pass — hero + five bands | 8,060 px | 5 |
| Second — mosaic + info strip | 3,138 px | 1 |
| Third — koralie density, 10 px gutters | 2,984 px | 0 |
| **Current — studio review of 2026-09-26** | **2,164 px** | **0** |

> **The density is no longer koralie's.** On 2026-09-26 the studio asked for smaller
> images with space around them — *"the pictures could be smaller, let some air and
> space visually"*, *"more air — symmetric, symmetry, margins"*. The gutters went from a
> flat 10 px to `clamp(14px, 1.5vw, 20px)`, the page edge from `clamp(12px, 2.4vw, 34px)`
> to `clamp(18px, 5vw, 72px)`, and the mosaic is now capped at a 1280 px measure and
> centred. Row packing changed from a greedy aspect-sum threshold to a DP partition that
> minimises deviation from a 380 px target height, because the greedy version stranded
> leftovers in a final row of a wildly different height and the studio explicitly asked
> for symmetry. Home-page rows are now 507 / 277 / 358 / 386 px where they were
> 553 / 366 / 568 / 455 / 688 px.
>
> **This does not reopen the text sections.** The *"less is more, just delete"* verdict
> below was about prose, and it stands. See `requirements-2026-09-26.md` §B1.

### Site structure

Four pages, since the studio review of 2026-09-26. Every one is the same three things:
header → mosaic → footer. There is no fourth element on any page, and no text-only
section anywhere.

| Page | Contents | Tiles |
|---|---|---|
| `index.html` | **the portfolio** — the whole body of work, masterpiece first | 22 |
| `atelier.html` | les sœurs Ré, le travail, la référence, et l'espace d'exposition | 8 |
| `apropos.html` | one photograph beside a card of the deck's own À-propos copy | 1 |
| `contact.html` | one photograph beside a contact card | 1 |

It was six. `oeuvres.html`, `vetements.html` and `installations.html` are gone: the
studio asked to land straight on the portfolio and see everything, and to fuse
installations into the atelier. The work itself — including the HANOKA panels — sits in
the portfolio; only the two exhibition/space photographs moved to `atelier.html`. All 30
catalogued images still appear somewhere, and the three retired URLs `301` to `/` in
`nginx.conf` rather than 404, because they were published.

Nav carries the four pages plus an Instagram glyph; the wordmark is also home. Portfolio
is in the nav so the landing page reads as pre-selected, which the studio asked for. The
current page gets a `--terracotta` hairline under it — **not** a weight change, because
Tenor Sans has no second weight (§3.2).

`apropos.html` and `contact.html` are the two pages that carry prose, and in both cases
it is labelled lines in a tile-shaped card sitting inside a mosaic row — not a text
section. The automated check
`document.querySelectorAll('section:not(.works)').length === 0` holds on all four pages.
The À-propos copy is quoted verbatim from §6, which reserved it for exactly this page.

### How the mosaic works

Each tile sets `--ar` to its aspect ratio and the CSS does:

```css
.row { display: flex; gap: var(--gap); }
.w   { flex: var(--ar) 1 0; min-width: 0; aspect-ratio: var(--ar); }
```

Flex-basis `0` with `flex-grow` set to the aspect ratio divides a row's width in
proportion to aspect; `aspect-ratio` then resolves every tile in that row to the
**same height**, and the row fills the container exactly. No JS, no masonry library.

**`min-width: 0` is load-bearing.** Flex items default to `min-width: auto`, which pins
them to the image's intrinsic width — three 900 px-wide photos then demand 2,800 px in a
1,440 px row and the page scrolls sideways. This was a real bug in the first pass.

Rows wrap to two-up under 880 px and one-up under 520 px. The header stacks under 640 px
so the five tracked-out nav links can wrap — no burger, they are tiny.

## 6. Content (verbatim from the deck)

Do not paraphrase. This copy is the studio's own.

> **Most of what follows is reference, not page content.** The manifesto, the four
> signatures and the À-propos paragraphs were on the site and were deleted — see §5. They
> are kept here because they are the brand's own words and belong in the record, and
> because a future About page would use them. **Adding them back to the home page is a
> regression, not a feature.** What the page actually carries is: the wordmark, the
> subtitle line, twelve work captions, and the footer.

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

### The image catalogue

30 images, extracted systematically rather than by eye. The editing transaction gives
`containerElement.position` and `.dimension` for every image fill in 1920×1080 page
coordinates, so every frame in the deck can be enumerated and cut exactly:

| | |
|---|---|
| image fills in the deck | 174 |
| oversized / background covers | 70 |
| known Canva stock gradients | 56 |
| smaller than 90×90 | 18 |
| **real photographic frames** | **79** (57 unique assets) |
| kept after curation | **30** |

Dropped on purpose: deck typography and title cards, the Côte d'Ivoire outline, the
Créative CI logo, blurred denim fills, and the *inspirations* boards — those are
reference photographs of pools, villas, vineyards, flamenco and karate that the studio
collected, not work they made and not theirs to publish.

**Deliberately excluded: three business-registration certificates** (`p28_2`, `p29_1`,
`p29_2`). They carry registration numbers and company details and were never intended
for a public site. Do not add them back.

Titles, media and dimensions are transcribed from the deck's own captions.

| Folder | Images |
|---|---|
| `oeuvres/` | ivresse-ecarlate · ivresse-ecarlate-situ · apprentis-sages · accords-vitamines · architecture-eau · mosaique-portee · pieces-decoupees |
| `vetements/` | elephant-print · fee-des-jeans · fee-des-jeans-dos · jupe-denim · haut-peche · haut-peche-poche · ensemble-peche · pochette-ensemble · detail-denim · tablier-eventail · tablier |
| `installations/` | hanoka-maria · hanoka-mur · hanoka-ombre · decors-architecture · exposition |
| `atelier/` | soeurs-re · ines-decoupe · couture · eventail |

Captions and alt text live in `build.py` (`CAP` and `ALT`), which is the one place they
are written.

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

- **Reveal on scroll** — `IntersectionObserver`, 14 px rise + fade, 520 ms, staggered
  70 ms. The `.reveal` class is applied **from JS, never in the markup**, so a script
  that fails to run can't leave anything stranded at `opacity: 0`. Disabled outright
  under `prefers-reduced-motion: reduce`.
- **Work tiles** — image scales to 1.04 over 900 ms; the caption is always in the DOM for
  screen readers and crawlers and fades up on hover/focus. Tiles are `<button>`s, so
  keyboard and touch get the same affordance as mouse. Under `hover: none` the caption is
  permanently visible — a touch user must never lose the titles.
- **Lightbox** — native `<dialog closedby="any">` opened with `showModal()`. Arrow keys
  page through all 12 tiles, Esc closes, backdrop closes, focus returns to the tile that
  opened it. A JS fallback supplies light-dismiss on Safari, which lacks `closedby`.
- **Header** — static, not sticky. At this page height a fixed bar costs more than it
  earns, and koralie's is static too.
- **Focus** — 2 px `--ink-wine` outline, 3 px offset, on every interactive element.
  **Never removed.** This has regressed twice on the newsletter input; a styled bottom
  border is reinforcement, not a focus indicator.

## 8. Performance & quality bar

- No framework, no bundler, no runtime dependency. Three files plus images.
- There is no hero. LCP is the first row of the mosaic, so its tiles carry
  `fetchpriority="high"` and everything below is `loading="lazy"`.
- Everything below the first row is `loading="lazy"` + `decoding="async"`. Every `<img>`
  carries explicit `width`/`height` matching its real intrinsic size, so CLS is 0 — and
  because the tiles also drive `aspect-ratio`, a wrong number visibly breaks the row.
- **No `content-visibility: auto`.** Tried and removed: it saved nothing measurable here
  while suppressing paint for offscreen content and degrading scroll anchoring. Do not
  reintroduce it without a profile showing a real win.
- Images are ≤1400 px on the long edge, JPEG q82, stripped. Whole set ≈ 3.0 MB
  across 30 files (verified 2026-09-28; the previous ≈1.3 MB figure was stale).
- Targets: Lighthouse ≥ 95 across the board, WCAG 2.2 AA, keyboard-complete, valid HTML.

### The verification list

Run these before calling any visual change done. All currently pass:

| Check | Expected |
|---|---|
| Horizontal overflow at 1440 / 820 / 390 | **0 px** at each |
| Justified rows | every tile in a row resolves to one height |
| `font-weight` on every element | **≤ 400** — no synthesised faux-bold |
| Computed family | `Tenor Sans` on body *and* headings |
| Images loaded | all, 0 broken |
| `width`/`height` vs intrinsic | 0 mismatches |
| Headings | exactly one `<h1>` |
| Tab stops | all reachable, **0 without a focus ring** |
| Lightbox | opens, ArrowRight advances, Esc closes, focus returns |
| Newsletter | invalid rejected, valid accepted |
| `prefers-reduced-motion` | 0 elements left hidden |
| JS disabled | 0 elements left hidden |
- **Browser support:** Baseline Widely Available without fallbacks. Newly Available features
  (`@starting-style`, `transition-behavior: allow-discrete`, `dialog[closedby]`) are used as
  progressive enhancement only, each with a graceful degradation path — the lightbox must
  still open, navigate and close correctly with all three unsupported.

## 9. Known gaps

- **Imagery is Canva-hosted uploads, not phone originals.** On 2026-09-29, 28 of the 30
  images were re-cut from the files inside the studio's own Canva deck (§1), which removes
  the deck watermark, the "Crédit photo" strips and the card borders. Framing was
  located by SIFT matching against the previous crop, so it is unchanged. **These are not
  the raw phone files the studio offered in memo 2.** About half of the sources are
  still Canva derivatives: the studio's own crops, and Canva's background-removed PNGs
  (elephant print, both *fée des jeans*, both tabliers, fan), flattened onto `--paper`.
  Several sources are small (471–860 px wide), which looks like WhatsApp compression, so
  some tiles are upscaled. Photographs taken straight off the phone would look better; the
  studio has said it will send them, and the layout takes them as drop-in replacements.
  Two files are still 4K deck crops: `installations/bukchon` is an iStock reference photo
  with a faint ghost wordmark, and `atelier/outils` has an original only 206 px wide,
  so its dark top corners were inpainted out.
- **Rights.** The photographs are credited "Crédit photo : Résone" in the deck. Confirm with
  the studio before publishing.
- **The exact Canva font is unconfirmed** — see §3.1. Poppins is an optical match, not a
  statement from the brand.
- Newsletter form has no backend; it is markup and validation only.
- French only. The deck is French; an EN locale is a later decision.
