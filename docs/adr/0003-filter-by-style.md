# 0003 — Explore by style with a filter row

Date: 2026-09-29. Status: superseded 2026-09-30 — the filter row was removed; every group now shows on one scroll, because hidden content gets missed. Groups and headings stay.

**Context.** The studio asked to *"explore by style"* and *"filter depending on the style"*,
with three styles. The reference (insane51.com) does this with a filter row over a grid.

**Decision.** Three groups (ombres chinoises, HANOKA, patchwork) plus a Tout / style filter
row, built in JS from the group labels. Groups are hidden, never removed. Keep the styles at
three; add pieces to a group, not new headings. We did not copy the reference's uniform
crops or full-width bands.

**Consequences.** With JS off every group is visible. The lightbox skips hidden groups. The
unmapped pieces are placed by judgement until the studio rules.
