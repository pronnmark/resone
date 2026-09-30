# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

<!-- Labelled INFERRED: init interview was not answered live; every fact below comes from AGENTS.md, docs/purpose.md, CONTEXT.md and the ADRs. Confirm with the studio. -->

## Users
- People who commission custom textile pieces (the made-to-measure apron for a wine house is the one named example). INFERRED.
- Hosts looking for a lit piece for an evening; institutions and partners. INFERRED.
- About 80% of visits are expected on a phone, scrolling one page (studio memo, 2026-09-26).

## Product Purpose
Digital portfolio of Résone, a textile-art and artistic-direction studio in Abidjan run by the sisters Omara Ré and Inès Ré. It shows three bodies of work (ombres chinoises, HANOKA, patchwork), Atelier, À propos and Contact, and leads a visitor to one action: write to the studio. It is a gallery, not a shop. Success (unconfirmed): a visitor understands the three styles in one scroll, remembers the masterpiece, and knows how to write to Omara or Inès.

## Positioning
Artists, not a boutique: hand-made, quatre-mains (two pairs of hands), Franco-Mauritian, each style registered as a model. The site must not read as an internet shop.

## Operating Context
Static Next.js export served by nginx, deployed by one owner on Coolify (hostbun) at resone.hostbun.cc. Images come from the studio's Canva-hosted files. Copy is French, verbatim from the studio's deck.

## Capabilities and Constraints
- Single scroll: header, mosaic, footer. No added sections, tabs, filters or toggles that hide content.
- No prices, no cart (docs/adr/0001). Pieces read *sur demande*.
- Copy is verbatim French; no agent rewriting or translation. English copy is undecided.
- Do not publish business-registration certificates or the inspirations boards.
- Do not point resone.africa at this site; never touch the studio's MX records.
- Newsletter has no backend yet. Partners section and day/night slider are undecided.
- Minimal dependencies: Next, React, image-size.

## Brand Commitments
Wordmark RÉSONE with deliberately irregular letter spacing; Tenor Sans, one weight; text in ink #391316, not black; the grain de beauté is the only motif; tagline *l'art de faire résonner*. Palette and type are fixed in target.md.

## Evidence on Hand
24 gallery images in public/img (Canva-hosted; the blurry deck crops were cut). No testimonials, press or prices exist; do not fabricate them.

## Product Principles
1. The work leads; the interface recedes.
2. Less is more: delete before adding.
3. Every path ends in "write to us".
4. Verbatim studio voice over agent polish.
5. Phone first, without a watermark, and real.

## Accessibility & Inclusion
Keyboard-complete, visible focus, AA contrast, prefers-reduced-motion honoured, 44px touch targets. French-language UI (lang="fr").
