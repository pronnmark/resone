# 0004 — Gallery images come from the Canva-hosted files

Date: 2026-09-29. Status: accepted, temporary.

**Context.** The studio offered raw phone photos but has not sent them. Canva's own
export of the deck carries a watermark, and the deck is view-only to us.

**Decision.** Re-cut the gallery from the media files hosted inside the studio's own Canva
deck, retrieved through the logged-in browser. This removes the watermark and burned-in
credit strips. It is not the raw phone originals.

**Consequences.** Some images are small and upscaled, about half are Canva derivatives, and
two (`bukchon`, `outils`) are still deck crops. Replace with the phone originals when the
studio sends them; `src/lib/images.ts` reads dimensions from disk, so a swap is one file.
