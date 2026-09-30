# Résone — Aesthetic

What the site should *feel* like, and how to decide when a case isn't covered. This is the
judgement layer. The measured values (hex, sizes, spacing, the wordmark) live in
[`target.md`](./target.md) and are not repeated here. If a token and this file disagree,
`target.md` wins on the value and this file wins on the intent.

Sources: the Canva deck (*Portfolio Résone 2026*), the studio's voice memos of 2026-09-26,
and the built site. Where a line below is my reading and not the studio's word, it says so.

## The one sentence

**A quiet gallery, lit from behind.** Warm paper, oxblood ink, and the work as the only
light on the page.

## Where it comes from

The studio's own words, in order of how much weight they carry:

- *"luxury minimalist"*, *"let some air and space"*, *"symmetry, margins"* — the brief.
- *"a digital gallery"*, not a shop; a cart *"could feel cheap"*. So: a place you look, not a
  place you buy.
- *"des œuvres qui éclairent"* and *"l'art de faire résonner"* — the work is made of light and
  matter, and the name is about resonance. The site should let the work carry the room.
- The three styles are ombres chinoises (light through cloth), HANOKA (a lit interior) and
  patchwork (cut denim, hand-numbered). The common thread is **cloth, light and the hand.**

## The five ideas

1. **The work is the only colour.** The ground is neutral and warm. The saturated tones on
   the page — amber, red, indigo — all come from a photograph, never from the interface.
   Colour that doesn't belong to a piece doesn't ship. (`target.md` §2.4)
2. **Air is a material.** Space around a piece is what tells the visitor it is precious. When
   in doubt, remove something or make it smaller, never add something or make it louder.
3. **One voice.** One family (Tenor Sans), one weight. Hierarchy comes from size, tracking,
   case and tone, never from bold. It reads as calm because nothing is shouting.
4. **Warm, never black-and-white.** Ink is oxblood, paper is bone. Pure black and pure white
   are both wrong here, and the difference is what makes it feel handmade, not corporate.
5. **The maker's mark, not a logo wall.** The grain de beauté is signed discreetly on every
   piece, so the site signs discreetly too: one small mark in the footer, not a banner.

## What it is not

The studio ruled several things out. These are part of the aesthetic, not just the feature list:

- **Not a shop.** No cart, no prices, no "buy". Interest goes to *contact us*, and a piece
  says *sur demande*. (Ruled 2026-09-29; see `requirements-2026-09-26.md` C10.)
- **Not a hero.** No swiping banner, no headline over an image. It *"seems too commercial."*
- **Not text bands.** *"Less is more, just delete."* Every page is header, mosaic, footer.
- **Not a template.** The studio saw the watermark and said it makes a site look copied. A
  stray stock texture or a placeholder image costs more trust here than on most sites.

## Light and dark

The page is light (bone) and stays light. Darkness arrives in three places only, and each
is a deliberate change of room:

- **The lightbox** (`--noir`): you step in front of one piece. Nothing else competes.
- **The caption gradient**: a soft dark fade so a title reads over any photograph.
- **The footer** (oxblood): the page closes like a curtain.

Do not add a dark section, a dark mode, or a dark hero. The ombres chinoises pieces already
provide the darkness, and they lose their effect if the surrounding page is dark too.
*(My reading: the site is a room you look into, so the dark belongs inside the work.)*

## Motion

Slow and soft, like a lamp coming up. Fade and a small rise, about half a second, staggered
a little. Nothing bounces, slides in from the side, or loops. Under
`prefers-reduced-motion` all of it stops and the page is fully usable without it.
Values: `target.md` §7.

## Photography

The photographs are the design. So:

- **Show the whole piece.** No cropping to fill a grid cell; rows are justified so every piece
  keeps its own proportions. (This is also why we did not copy insane51's uniform crops.)
- **Cut-outs sit on paper.** Garments shown without a background sit on `--paper`, so they
  read like objects in a lookbook, not stickers.
- **Masterpiece first.** *Ivresse écarlate* opens the portfolio; it is the studio's own
  choice of lead.
- **Quality over quantity.** Fewer, better pieces beat a fuller page. A weak or upscaled image
  is worse than an empty slot. The phone originals the studio offered are the next upgrade.
- **Credit and watermarks.** Never ship a visible watermark or a credit strip burned into an
  image; the credit is in the footer.

## Voice

The site speaks French, in the studio's words, quietly and briefly. Captions are the piece's
name and its materials and size, nothing more. There are no exclamation marks, no
marketing verbs, and no "discover" or "shop". When the site must ask something of the visitor
it is an invitation: *Se renseigner sur cette pièce*, *Écrivez-nous, nous en parlons.*
New copy needs the studio (`AGENTS.md`, rule 4).

## Decision test

When a case isn't covered, ask in this order. If any answer is no, don't ship it.

1. Does it make the **work** more visible, or does it draw attention to the interface?
2. Would it still feel right on a **phone**, where most of the audience is? (~80%, per the memos)
3. Could a visitor take it for a **shop**? If so, cut it.
4. Is it something the studio said, or could plausibly stand behind, and not just my taste?
5. Is there **less** of it than the last version? Prefer removing.

## Reference points

- **koralie.com** — the austere justified mosaic and the tiny header. We took the structure
  and gave it more air.
- **insane51.com** — the filter row and captions under images. We took the filter, not the
  uniform crops or the full-width bands. (Chosen by the studio on 2026-09-26.)
- **Jaipur Rugs and Indian designer sites** — the luxury-minimalist tone the studio named.
- **The deck itself** — warm bone ground, oxblood type, thin gold rules. The site is a
  patient translation of that deck into a page.

## Known tensions

Honest list of where the aesthetic is not fully met yet:

- **Image quality** falls short of "luxury": some pieces are upscaled from small Canva copies,
  and `bukchon` carries a faint ghost wordmark. Fixed only by the studio's phone originals.
- **Captions sit on the image** (hover on desktop, always visible on touch). insane51 puts
  them beneath, which is airier. Not done; worth trying if the studio wants more air.
- **English** is missing, and a French-only page is a real limit for buyers abroad. Blocked on
  the studio's copy.
- **Day/night slider** would be the most on-brand interaction (the same piece by day and lit at
  night) and is blocked on real photo pairs.
