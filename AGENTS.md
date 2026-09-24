# AGENTS.md — resone

Marketing site for **Résone** (`resone.africa`), a textile-art and artistic-direction
studio in Abidjan, Côte d'Ivoire, run by the sisters Omara Ré and Inès Ré.

**Read [`target.md`](./target.md) before touching anything visual.** It holds the palette,
the type scale, the layout model and the provenance for every one of those decisions. This
file covers how to work in the repo; `target.md` covers what the thing is supposed to look
like. When the two disagree, `target.md` wins on design and this file wins on process.

---

## Stack

Plain static site. **No framework, no bundler, no package.json, no dependencies.**

```
build.py                   generates the six pages — see below
index.html                 GENERATED — do not hand-edit
oeuvres.html               GENERATED
vetements.html             GENERATED
installations.html         GENERATED
atelier.html               GENERATED
contact.html               GENERATED
assets/css/styles.css      all styles; design tokens live at the top in :root
assets/js/main.js          reveal-on-scroll, lightbox, header state, mobile nav
assets/img/works/*.jpg     the nine gallery works
assets/img/studio/*.jpg    atelier, founders, and reference photography
reference/                 Canva exports kept for design re-verification
target.md                  design source of truth
```

Run it with any static server:

```sh
python3 -m http.server 8080 --directory .
```

### build.py

The six pages share a header and a footer, and hand-copying those is how they drift. So
the HTML is generated:

```sh
python3 build.py      # rewrites all six .html files
```

This is **not** a bundler and it is not a dependency: it emits plain HTML that is
committed and served directly, and the site works perfectly with `build.py` deleted. It
reads every image's real pixel size off disk, so a tile's `--ar` and its `width`/`height`
attributes can never disagree with the actual JPEG.

- **Never hand-edit the generated `.html` files** — the next `build.py` run overwrites them.
- Page contents, captions (`CAP`) and alt text (`ALT`) all live in `build.py`.
- Add or re-crop an image, then re-run `build.py` and commit both the image and the HTML.

Nothing else needs a build step, and nothing else should acquire one.

---

## Hard rules

0. **Do not add sections. Every page is header → mosaic → footer.** Nothing else.
   A text-only section is what this design is defined against: the studio killed a hero,
   then five text bands, then a four-column info strip, with the instruction *"less is
   more, just delete"*. A check asserts
   `document.querySelectorAll('section:not(.works)').length === 0` on all six pages — if
   you are about to make that fail, you are going the wrong way. New copy goes in a work
   caption, the contact card, or the footer, or it does not ship.
1. **Never introduce a colour that is not in `target.md` §2.** All tokens are measured
   pixel values from the Canva deck. If a new piece genuinely needs a new hue, sample it
   from the artwork, add it to the table with its provenance, then use it — in that order.
2. **Never hard-code a colour in a rule.** Use the `--token`. If you are typing `#` outside
   the `:root` block in `styles.css`, stop.
3. **Text is `--ink` `#391316`, not black.** The warm oxblood is the single most
   characteristic thing about this identity. Do not "fix" it to `#000` or `#1a1a1a`.
3a. **The wordmark's letter spacing is irregular on purpose.** The deck sets
   `Ré s o  n   e`, so the gaps widen toward the end. It is reproduced with per-letter
   `margin-right` values measured off the Canva render and verified to 0.008em
   (`target.md` §3.3). Never replace it with a single `letter-spacing` — that flattens
   the mark.
3b. **The face is Tenor Sans and it has exactly one weight (400).** There is no bold and
   no light. Hierarchy comes from size, letter-spacing, case and colour — never
   `font-weight`. Setting 500+ makes the browser synthesise a smeared faux-bold. Do not
   add a second family "for headings"; the whole point is one voice.
4. **Copy is verbatim French from the deck.** Do not translate, rewrite, correct, or
   "improve" it. `œuvres`, `Côte d'Ivoire`, `quatre-mains`, `métissée` — accents and
   ligature included. New copy needs the studio, not an agent.
5. **Do not add dependencies.** No jQuery, no GSAP, no lightbox library, no Tailwind, no
   icon pack. Everything here is ~400 lines of CSS and ~150 of JS for a reason.
6. **Accessibility is not optional.** Keyboard-complete, visible focus, AA contrast,
   `prefers-reduced-motion` honoured. Contrast pairs are listed in `target.md` §2.2 —
   `--ash` is decorative only and must never carry body text.
7. **Do not commit anything from `reference/` into the live page.** Those are full deck
   pages kept for re-deriving the design; they are not site assets.

## Browser support

**Baseline Widely Available** may be used without fallbacks.

Newly Available features are permitted as **progressive enhancement only**, and each needs
a graceful degradation path of no more than a few lines and no dependency. Currently in use
on that basis: `dialog[closedby]`, `@starting-style`, `transition-behavior: allow-discrete`.
The lightbox must still open, navigate and close correctly with all three unsupported —
test that before changing it.

---

## Design tokens

Defined once, in `:root` in `assets/css/styles.css`, mirroring `target.md` §2.

```
Foundation   --paper #F6F6F5   --bone #EAE9E5   --bone-deep #E2E0DC
             --sand  #D3C6B8   --ash  #AB9F98

Ink          --ink #391316   --ink-wine #4C2A2C   --ink-cocoa #59473A
             --ink-soft #78615A   --ink-mute #88726D

Accent       --terracotta #B2917A   --clay #D2B9A5   --saffron #E8CE8A
             --gold #B99E6C   --indigo #232C45   --indigo-deep #1B2235
             --ember #552D1A   --noir #150E0B
```

Type: **Poppins** (200/300/400/500) for everything structural, **Playfair Display** 400
italic for pull quotes and work titles only. Subset `latin` + `latin-ext` — dropping
`latin-ext` breaks the French accents. Rationale and the optical identification that led
to Poppins are in `target.md` §3.

The three identity motifs — dot grid, *grain de beauté*, Côte d'Ivoire outline — are
described in `target.md` §4. The dot grid is pure CSS and the other two are inline SVG;
none of them are image files. Keep it that way.

---

## Canva is the design origin

The design derives from Canva design `DAHWDWi4hD0` — *"Copy of PORTFOLIO RESONE 2026"*,
a 29-page 1920×1080 presentation. Reached through the **Canva MCP server**, installed at
project scope in `.mcp.json` (OAuth; re-auth with `mcp({action:"auth-start", server:"canva"})`).

Useful calls:

```js
canva_get-design         { design_id: "DAHWDWi4hD0" }
canva_get-design-pages   { design_id }                       // 29 pages + thumbnails
canva_get-design-content { design_id, content_types:["richtexts"], pages:[…] }   // all copy
canva_export-design      { design_id, format:{type:"png", pages:[…], width, height} }
```

Two things that will waste your time if you do not know them:

- **Canva does not expose font metadata.** An editing transaction returns geometry, text
  and fills, but no `fontFamily`. The typeface was identified optically (`target.md` §3.1).
  Do not go looking for a font API; it is not there.
- **The studio's original photographs cannot be downloaded.** Image fills carry an
  `asset_id`, but `canva_get-assets` returns `permission_denied` for all 25 of them — they
  belong to the original deck's team, not the team owning this copy. Only the 10 Canva
  stock gradients resolve. Do not burn time retrying this. Re-cut imagery from a
  **3840×2160 `canva_export-design`** instead; Canva renders those from the full-resolution
  sources, so a 4K page export carries genuinely more detail than a 1600-wide one
  (measured: +24% edge energy).
- **Thumbnail URLs are signed over their dimensions and their `fallback` parameter.**
  Reordering or dropping query params returns `400 Bad Request`, and changing `width:`/
  `height:` in the path returns `403`. For any resolution other than the 596px thumbnail,
  use `canva_export-design`, which returns clean pre-signed S3 URLs.

Export URLs expire. `reference/` holds a full-resolution page 1 and a 29-page contact sheet
so the palette and type can be re-verified offline.

---

## Working on this repo

- `index.html` is meant to stay a single file. It is a one-page site; splitting it buys
  nothing without a build step.
- Page order is fixed by `target.md` §5. Adding a section means updating `target.md` first
  — and the default answer is don't.
- **The mosaic is justified flex, and `min-width: 0` on `.w` is load-bearing.** Flex items
  default to `min-width: auto`, which pins them to the image's intrinsic width; three
  900 px photos then demand 2,800 px inside a 1,440 px row and the page scrolls sideways.
  If you ever see horizontal overflow, check that first.
- A tile's inline `--ar` must equal its image's real aspect ratio *and* its `width`/
  `height` attributes. `build.py` guarantees this by measuring the file; that is the
  reason it exists. Never write those numbers by hand.
- **Never publish the three business-registration certificates** from deck pages 28–29.
  They carry registration numbers and company details. They are excluded on purpose
  (`target.md` §6), as are the *inspirations* boards, which are reference photographs the
  studio collected rather than work they made.
- Work entries live **only** in the markup. `main.js` reads `data-full` / `data-title` /
  `data-detail` straight off the `.work__btn` elements, so adding a piece means editing
  `index.html` and nothing else. Do not reintroduce a parallel array in JS.
- Images: ≤1200px long edge, JPEG q84, `-strip`, explicit `width`/`height` in the markup so
  CLS stays at zero. The whole gallery budget is ~500KB.
- The gallery images are **crops from a 4K deck export**, not the studio's original files.
  A few still carry a faint ghost wordmark. Say so if you are asked whether the site is
  ready to publish — see `target.md` §9.
- When re-cutting an image, render a grid-annotated proof first
  (`convert page.png -resize 800x450` plus 10% gridlines) and pick the crop off that.
  Guessing percentages and eyeballing the result wastes more passes than the proof costs.

## Verifying a change

No test suite. Before calling a visual change done:

1. Serve it and load it in a real browser.
2. Tab through the entire page — every interactive element reachable, focus always visible.
3. Open a work tile with the keyboard, page through with the arrow keys, close with Esc.
4. Check it at 380px, 768px and 1440px wide.
5. Toggle `prefers-reduced-motion` and confirm all motion stops.
6. On a touch viewport, confirm every link and button is at least 44px in both
   directions — 10px tracked caps give an 18px box otherwise.
6. Confirm no new hex literals landed outside `:root`.

Do not report a visual change as done without having actually looked at the rendered page.

## Handing a preview to a human

The browser is on **pmac**; anything served here is on **pbox**. A `localhost` URL in a
reply is useless to the user. Open a loopback SSH forward on pmac, verify the URL from
pmac, and hand over that address — never a bare pbox `localhost` link, and never launch a
browser on pbox.
