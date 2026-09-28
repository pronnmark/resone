# Résone — studio review of 2026-09-26

Requirements extracted from three voice memos recorded by the studio on 2026-09-26
(18:24 · 18:43 · 19:15, 38 min total), reviewed against the site as it stands.

**Transcripts:** `~/transcripts/pmac-voicememos-latest/` on pbox — `.txt` plain and
`.vtt` timestamped, one pair per memo.

## Why this file exists, and what it outranks

Every commit in this repo is from **2026-09-24**. These memos are from **2026-09-26** —
two days later. So where a memo contradicts `target.md`, the memo is the newer
instruction and `target.md` §5/§9 are stale on those specific points.

`target.md` declares itself the design authority, so **this file does not rewrite it.**
It records what the studio said and flags which sections are now superseded. Folding
these into `target.md` is the studio's call, not an agent's.

### Transcript reliability

Memo 3 has degraded audio. The first pass fell into a whisper repetition loop (109
repeats of one phrase) in the most decision-dense stretch; it was re-run with `-mc 0`
and both versions are kept (`.txt` and `.mc0.txt`). The decisions below were taken
from agreement across both. Anything resting on a single unclear pass is marked
**(low confidence)**.

---

## A. Already satisfied — no work

| Requirement | Where it's already true |
|---|---|
| No auto-swiping hero banner — *"it seems too commercial"* | No hero anywhere; `target.md` §5 already forbids it |
| Click an image to see it bigger | `<dialog>` lightbox, `assets/js/main.js:35` |
| **No shopping cart** — *"if you make it like an internet shop, it could feel cheap"* | No cart/checkout markup exists anywhere in the repo |
| Each piece has a name — *"we did, we have a name for each piece"* | `CAP` dict, `build.py:31`+ |
| Mobile-first; ~80% arrive on a phone and scroll | Breakpoints at 880 / 640 / 520 px, `assets/css/styles.css` |
| Masterpiece leads the landing page | First tile is `oeuvres/ivresse-ecarlate` (`build.py:109`). **Confirm with studio** — identification is inferred from *"I saw you put this as the main picture"* |

## B. Supersedes `target.md` — design reversals

### B1. Image density — the headline finding

`target.md` §5 adopts koralie.com wholesale: *"the whole page is one dense mosaic —
justified rows, edge to edge, ~10 px gutters."* `--gap: 10px` at
`assets/css/styles.css:43` implements exactly that.

The studio now asks for the opposite:

> *"the pictures could be smaller, get some — let some air and space visually"*
> *"either we let some margin a bit more, or we find another way a bit more minimalist, less pictures"*
> *"we found another website where there is more air — symmetric, symmetry, margins"*
> *"definitely have the pictures smaller, to make it luxury minimalist"*

**Do not confuse this with §5's other studio verdict.** *"Still sections without images,
less is more, just delete"* was about deleting **text** sections, and it still stands.
This new input is about **image size and density**, which §5 never addressed and which
the koralie model actively contradicts. The studio has not flip-flopped; these are two
different axes.

New reference direction: **Jaipur Rugs** and Indian designer sites.

### B2. Six pages → four

`build.py:22` `NAV` is `oeuvres · vetements · installations · atelier · contact`.
Memo 2 settles on:

> **Portfolio (landing) · Workshop · About · Contact**

with, from memo 1, *"when it comes to installation and atelier, it could be fused in
one… workshop, atelier, workshop, studio."* Installations is only ~5 photographs of a
single piece, which is the stated reason to fold it in.

### B3. French only → French **and** English

`index.html` is `lang="fr"`; `target.md` §9 lists "French only" as a known gap. The
studio now asks for both: *"we could do an English and French version — yeah, that's
super."*

### B4. Watermarks: gap → unblocked

`target.md` §9 documents the deck watermarks as unremovable without source files and
says *"ask the studio for the source photographs."* In memo 2 the studio **agrees to
provide them**: *"I will prepare a folder with the raw images."* The gap is being
unblocked from the studio side.

## C. New requirements — repo work

| # | Requirement | Source |
|---|---|---|
| C1 | Lower image density: larger gutters, real page margins, smaller tiles | Memo 1 |
| C2 | "Explore by style" — group the portfolio by artistic signature | Memo 1 |
| C3 | Fuse `installations` into `atelier`, renamed **Workshop** | Memo 1 |
| C4 | Fold `oeuvres` + `vetements` into a style-sectioned **Portfolio** landing page | Memos 1–2 |
| C5 | **Add an About page — none exists today** | Memos 1–2 |
| C6 | EN + FR locales | Memo 1 |
| C7 | Day/night comparison for the light pieces — a slider showing the same work in daylight and lit at night | Memos 1, 3 |
| C8 | Cut-out treatment (background removed) for highlighting individual garments | Memo 1 |
| C9 | Taxonomy: every piece is an **artwork**; every artwork belongs to a **style**; **no collections** | Memo 3 |
| C10 | Conversion path is *"if interested, contact us"*, never a cart | Memo 3 |
| C11 | Separate pages get their own URL; keep redundancy between them low | Memo 2 |

### The three styles (C2/C9)

Memo 1: *"I would say we have three main styles."*

| Style | Existing tiles (`build.py:31`+) |
|---|---|
| Textile inspired by traditional architecture — **HANOKA** | `installations/hanoka-*`, `installations/bukchon`, `installations/decors-architecture` |
| **Chinese shadow technique** — artwork with light | `oeuvres/ivresse-ecarlate`, `oeuvres/ivresse-ecarlate-situ` |
| **Patchwork** | all of `vetements/*`, `oeuvres/architecture-eau`, `oeuvres/mosaique-portee` |

Tiles that do not map cleanly and need a studio decision: `oeuvres/apprentis-sages`,
`oeuvres/accords-vitamines`, `oeuvres/pieces-decoupees`, and all of `atelier/*`
(process photography rather than pieces).

Memo 3 also names a content-type axis — *"we have the artworks, we have the murals, we
have the wearables"* — which maps onto œuvres / installations / vêtements.
**(low confidence** — recovered only in the `mc0` pass, and it may be describing the
reference site's nav rather than Résone's own.**)**

## D. Blocked on the studio — not repo work

| # | Ask | Note |
|---|---|---|
| D1 | Folder of **raw, un-watermarked images**, straight off the phone, no Canva export | Canva recompresses; this also resolves `target.md` §9 |
| D2 | **Day/night photo pairs** for each light piece | They noted the reference site fakes it with a filter and want real shots |
| D3 | **English copy** | Someone has to write it; C6 is blocked until then |
| D4 | **Style grouping decision** | Studio said *"I don't know how to group"*; agreed fallback is named folders, or hand over everything |
| D5 | **Partners / clients list** | Raised as a possible section, never settled |
| D6 | **Confirm the masterpiece** | See table A |

Not a site task, recorded because it was discussed: each new model or style must be
registered with the international IP office, **~10 000 FCFA per model**.

## E. Pre-existing issues found during this review

These are **not** from the memos. They surfaced while checking the site against them.

1. **`target.md` §5 contradicts `build.py`.** The §5 nav table says
   `ŒUVRES / ATELIER / À PROPOS / CONTACT`, but `build.py:22` is
   `oeuvres / vetements / installations / atelier / contact`. There is **no À propos
   page in the repo at all** — the doc describes a page that was never built.

2. **`target.md` §8 image-weight claim is stale.** It states the whole set is
   ≈1.3 MB; actual is **3.01 MB across 30 files**. The companion claim in the same
   sentence does hold — every image is ≤1400 px on the long edge.

3. **The newsletter form is a dead end on all six pages.** `assets/js/main.js:98`
   validates an address, stores nothing, and replies *"Merci — écrivez-nous à
   omara@resone.africa en attendant."* Asking for an address and discarding it is a
   trust problem regardless of the memos. The studio never mentioned a newsletter, and
   it sits awkwardly beside the C10 decision that the conversion path is "contact us".
   Worth an explicit keep-or-cut ruling.

## F. Collisions with `AGENTS.md` hard rules

Some of what the studio asked for is forbidden by the repo's own hard rules. These are
not things an agent may quietly override — they need a studio ruling.

1. **An About page collides with hard rule 0.** The rule is *"Do not add sections. Every
   page is header → mosaic → footer"*, enforced by
   `document.querySelectorAll('section:not(.works)').length === 0` on every page. It
   exists precisely because the studio previously killed a hero, five text bands and an
   info strip with *"less is more, just delete."* C5 asks for an About page, which is
   prose. **Either rule 0 bends or About ships as images with captions.** Note the
   history cuts both ways: the studio killed text sections in September and is now
   asking for one — worth confirming they mean prose and not another mosaic.

2. **"Explore by style" (C2) may or may not collide.** If the style groups are mosaic
   rows carrying captions, rule 0 holds and there is no conflict. If they need visible
   section headings, it fails the same check. Resolve when T2 lands.

3. **English copy is explicitly an agent-forbidden task.** Hard rule 4: *"Copy is
   verbatim French from the deck. Do not translate, rewrite, correct or 'improve' it…
   New copy needs the studio, not an agent."* This is why C6 is hard-blocked on D3.

4. **The day/night component (C7) must be hand-rolled.** Hard rule 5 forbids
   dependencies — no lightbox library, no GSAP. The existing lightbox is ~150 lines of
   plain JS; the comparison slider has to be built the same way.

---

## Task list

Ordered so that nothing blocks on something later. Every task marked **[studio]**
needs a person, not an agent.

### Phase 1 — decisions before code

| # | Task | Depends on |
|---|---|---|
| T1 | **[studio]** Rule on the density reversal (B1): how much bigger the gutters/margins, how much smaller the tiles. Needs a target, not just "more air" | — |
| T2 | **[studio]** Settle the style grouping (D4) and confirm the three styles + the unmapped tiles | — |
| T3 | **[studio]** Keep or cut the newsletter (E3) | — |
| T4 | **[studio]** Confirm the masterpiece (D6) | — |
| T4a | **[studio]** Rule on hard rule 0 vs the About page (F1) — does About ship as prose, or as images with captions? | — |
| T5 | Reconcile `target.md` §5's nav table with `build.py:22`, and correct the §8 weight figure (E1, E2) | — |

### Phase 2 — structure

| # | Task | Depends on |
|---|---|---|
| T6 | Fuse `installations` into `atelier`; rename to Workshop; update `NAV`/`PAGES` (C3) | T2 |
| T7 | Rebuild the landing page as Portfolio, sectioned by style (C2, C4) | T2, T6 |
| T8 | Build the About page (C5) | T4a |
| T9 | Collapse nav to Portfolio · Workshop · About · Contact (B2, C11) | T6, T8 |

### Phase 3 — visual

| # | Task | Depends on |
|---|---|---|
| T10 | Raise `--gap` and introduce page margins; reduce tile scale (C1, `styles.css:43`) | T1 |
| T11 | Re-verify the §8 checklist after T10 — 0 px horizontal overflow at 1440/820/390, justified rows, CLS 0 | T10 |
| T12 | Day/night comparison component (C7) | D2 |
| T13 | Cut-out treatment for garment highlights (C8) | D1 |

### Phase 4 — content

| # | Task | Depends on |
|---|---|---|
| T14 | Swap in raw un-watermarked images. `build.py` re-reads dimensions from disk, so this is drop-in (`target.md` §9) | D1 |
| T15 | EN/FR locale switch (C6, B3) | D3 |

**Critical path:** T1 → T10 → T11 is the visible change and depends only on one studio
decision. T14 is the highest-value content fix and is already unblocked by the studio's
own offer in memo 2.
