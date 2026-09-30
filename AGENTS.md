# resone — portfolio site for the textile-art studio Résone

Marketing site for **Résone**, a textile-art and artistic-direction studio in Abidjan run by
the sisters Omara Ré and Inès Ré. A Next.js (App Router, static export) site; `next build` writes plain HTML to `out/`, served by
nginx. Live at <https://resone.hostbun.cc> on Coolify (hostbun). Start with
[`docs/purpose.md`](./docs/purpose.md) (why it exists) and [`CONTEXT.md`](./CONTEXT.md)
(the studio's terms).

## Commands

```sh
npm install
npm run dev                                          # dev server on :3000
npm run build                                        # static export to out/ (typechecks and lints)
npm run typecheck && npm run lint
python3 -m http.server 8080 --directory out          # serve the built site; on pbox use a named systemd-run unit
coolify deploy uuid acvae9ersrbyxdoasohtyru3         # deploy; then poll: coolify deploy get <deployment-uuid>
```

There is no test suite or CI (see Working rules). Verify with the checklist below. Pushing to
`main` does **not** deploy: one owner deploys, on purpose.

## Hard stops

- **Do not publish the business-registration certificates** (deck pages 28–29) or the
  *inspirations* boards. They carry registration numbers and are not the studio's work.
  Keep deck exports and `~/Documents/resone-originals/` out of the repo and the image.
- **Do not point `resone.africa` at this site.** The studio's GoDaddy site and `@resone.africa`
  mail live there; moving it is their call. Never touch their MX records. See the deploy runbook.
- **The Dockerfile is a security boundary.** The runtime stage ships only `out/`. The repo root holds
  `target.md`, `AGENTS.md` and `reference/`; never `COPY` them into either stage. After any Dockerfile
  change re-check that `target.md`, `AGENTS.md`, `Dockerfile`, `nginx.conf`, `reference/`, `package.json`
  and `.mcp.json` return 404 in production.
- **Never introduce a price.** The studio ruled it out (2026-09-29); pieces read *sur demande*.
  See `docs/adr/0001-no-prices-no-cart.md`.
- **New copy needs the studio, not an agent.** French text is verbatim from the deck; do not
  translate, rewrite or "improve" it, accents and ligatures included.

## Working rules

**Design rules** (full values in [`target.md`](./target.md), intent in [`aesthetic.md`](./aesthetic.md)):

0. **Do not add sections. Every page is header → mosaic → footer.** The studio killed a hero, five
   text bands and an info strip (*"less is more, just delete"*). A check asserts
   `document.querySelectorAll('section:not(.works)').length === 0` on all four pages. New copy goes
   in a caption, the contact card or the footer, or it does not ship.
1. **No colour outside `target.md` §2.** Sample a new hue from the artwork and add it to the table first.
2. **Never hard-code a colour in a rule.** Use the `--token`; a `#` outside `:root` is a bug.
3. **Text is `--ink` `#391316`, not black.**
   - **3a. The wordmark's irregular letter spacing is deliberate** (per-letter `margin-right`,
     `target.md` §3.3). Never replace it with one `letter-spacing`.
   - **3b. Tenor Sans, one weight (400).** Hierarchy is size, tracking, case, colour, never `font-weight`.
4. **Copy is verbatim French from the deck** (see Hard stops).
5. **Minimal dependencies.** Next, React and `image-size` only. No jQuery, GSAP, lightbox library, Tailwind or icon pack.
6. **Accessibility is not optional.** Keyboard-complete, visible focus, AA contrast,
   `prefers-reduced-motion` honoured. `--ash` is decorative only, never body text.
7. **Nothing from `reference/` goes into the live page.**

**How the repo works:**

- **One page, Next.js static export.** `src/app/page.tsx` renders the whole site (portfolio groups,
  Atelier, À propos, Contact). Captions, alt text and style groups live in `src/data/pieces.ts`; the
  French copy there is verbatim from the deck. Styles are `src/app/globals.css` (one stylesheet, tokens
  in `:root`). Images are in `public/img/`.
- A tile's `width`/`height`/`--ar` are read from the JPEG at build time by `src/lib/images.ts`;
  never write those numbers by hand. A missing image fails the build.
- **No UI library, no Tailwind, no animation or lightbox package.** Next, React and `image-size` are
  the only runtime dependencies. The lightbox is the native `<dialog>` in `src/components/Lightbox.tsx`.
- Client components are `Lightbox`, `Tile`, `Reveal`, `Newsletter`; the rest render on the server.
- **Explore by style:** every style group is visible on one scroll, each under its `.works__label`
  heading (Ombres chinoises · HANOKA · Patchwork). **No tabs, filters or toggles that hide content**
  (studio, 2026-09-30: people would miss it). Keep the styles at three; add pieces to a group,
  never a new heading. Tiles are one uniform size in a `.grid`. The inquiry link in the lightbox
  shows on portfolio pieces only.
- **Images:** ≤1400px long edge, JPEG q82, `-strip`, progressive, never upscaled. 27 images, about
  3 MB. Gallery images come from the studio's Canva-hosted files, not phone originals; the blurry deck crops
  `bukchon`, `outils` and `apprentis-sages` were cut. See `docs/adr/0004-canva-hosted-images.md`. Render a
  grid-annotated proof before choosing a crop.
- **Browser support:** Baseline Widely Available needs no fallback. Newly Available features are
  progressive enhancement only (`dialog[closedby]`, `@starting-style`, `transition-behavior:
  allow-discrete`). The lightbox must still work with all three unsupported.
- **No CI, deliberately:** a static site with no tests and one human owner who deploys by hand.
  The verification checklist below is the gate.

**Verifying a change.** Do not call a visual change done without looking at the rendered page.

1. Serve it and load it in a real browser.
2. Tab through the page: every control reachable, focus always visible.
3. Open a tile with the keyboard, page with the arrow keys, close with Esc.
4. Check 380px, 768px and 1440px wide; no horizontal overflow.
5. Toggle `prefers-reduced-motion`; all motion stops.
6. On touch, every link and button is at least 44px in both directions.
7. No new hex literals outside `:root`.
8. Run `npm run build`; it must typecheck and lint clean.

## Reference

| Topic | File |
|---|---|
| Why the site exists, who it is for, what is open | [`docs/purpose.md`](./docs/purpose.md) |
| The studio's vocabulary | [`CONTEXT.md`](./CONTEXT.md) |
| Decisions (no prices, four pages, filter, images) | [`docs/adr/`](./docs/adr/) |
| What it should feel like | [`aesthetic.md`](./aesthetic.md) |
| Palette, type, layout, provenance | [`target.md`](./target.md) |
| What the studio asked for, and status | [`requirements-2026-09-26.md`](./requirements-2026-09-26.md) |
| Hosting, Coolify, brand domain, previewing on pmac | [`docs/runbooks/deploy.md`](./docs/runbooks/deploy.md) |
| Canva deck, MCP limits, fetching the original images | [`docs/runbooks/canva.md`](./docs/runbooks/canva.md) |
