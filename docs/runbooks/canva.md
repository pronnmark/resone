# Canva is the design origin

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
- **The studio's original photographs cannot be downloaded through the MCP.**
  `canva_get-assets` returns `permission_denied` for every studio upload, and the original
  deck `DAHU40YlOW4` is view-only to us. Do not burn time retrying that. They *are*
  reachable through the logged-in Chrome (`cb`): the view page's own
  `/_ajax/documents/DAHU40YlOW4/resources` endpoint returns signed, unwatermarked
  renditions — method in `target.md` §1. All 113 are already on pbox in
  `~/Documents/resone-originals/`; use those before re-fetching. They stay out of the repo
  (certificates, inspiration boards, 99 MB).
- **Thumbnail URLs are signed over their dimensions and their `fallback` parameter.**
  Reordering or dropping query params returns `400 Bad Request`, and changing `width:`/
  `height:` in the path returns `403`. For any resolution other than the 596px thumbnail,
  use `canva_export-design`, which returns clean pre-signed S3 URLs.

Export URLs expire. `reference/` holds a full-resolution page 1 and a 29-page contact sheet
so the palette and type can be re-verified offline.

## Whole-deck export (verified 2026-09-29)

`canva_export-design` on `DAHWDWi4hD0` with `pages:[1..29]` at 1920×1080 returns all 29 pages
as signed PNGs (expiring). They carry the deck watermark, so use them for reference and copy,
not as gallery images. Keep them outside the repo: pages 28–29 are the registration
certificates. A copy sits in `~/Documents/resone-originals/pages-copy/`.
