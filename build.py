#!/usr/bin/env python3
"""
Generate the four static pages.

This is NOT a build step in the bundler sense — it emits plain HTML that is
committed and served directly, and the site works with this file deleted. It
exists for one reason: the pages share a header and footer, and hand-copying
them is how they drift. Edit the templates here, run `python3 build.py`, commit
the generated HTML.

Every image's aspect ratio is read from the file on disk, so `--ar` and the
width/height attributes can never disagree with the actual JPEG.
"""

import os
import re
import subprocess
import sys
import unicodedata

ROOT = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(ROOT, "assets", "img")

# Four pages, per the studio review of 2026-09-26: the landing page IS the
# portfolio ("when they enter the website they land on that portfolio"), and
# installations folded into the atelier ("when it comes to installation and
# atelier, it could be fused in one ... workshop, atelier, studio"). Portfolio is
# in the nav so it can carry the current-page rule on the landing page — the
# studio asked for it to read as pre-selected.
NAV = [
    ("index.html#works", "Portfolio"),
    ("index.html#atelier", "Atelier"),
    ("index.html#apropos", "À propos"),
    ("index.html#contact", "Contact"),
]

# slug -> (title, detail).  Copy is transcribed from the deck; do not paraphrase.
CAP = {
    "oeuvres/ivresse-ecarlate":        ("« Ivresse écarlate »", "Créton, popeline, tissu sky — 180 × 180 cm"),
    "oeuvres/ivresse-ecarlate-situ":   ("« Ivresse écarlate »", "Ombres chinoises, en situation"),
    "oeuvres/apprentis-sages":         ("« Apprentis Sages »", "Popeline, cretonne — 100 × 50 cm"),
    "oeuvres/accords-vitamines":       ("« Accords vitaminés »", "Popeline, tissu « sky », crétonne, perles — 105 × 65 cm"),
    "oeuvres/architecture-eau":        ("L'architecture de l'eau", "Mosaïque en jeans — recyclées, découpées, assemblées"),
    "oeuvres/mosaique-portee":         ("L'architecture de l'eau", "L'envers de la tapisserie, chaque pièce numérotée et brodée à la main"),
    "oeuvres/pieces-decoupees":        ("Pièces découpées", "Trèfle, cœur et pique — la mécanique de guitare"),

    "vetements/elephant-print":        ("Le haut « Elephant print »", "Patchwork signature vêtement — sur demande"),
    "vetements/fee-des-jeans":         ("« Fée des jeans »", "Patchwork signature vêtement"),
    "vetements/fee-des-jeans-dos":     ("« Fée des jeans »", "Dos, empiècement denim"),
    "vetements/pochette-ensemble":     ("Pochette & ensemble", "Créton jeans"),
    "vetements/haut-peche":            ("Haut pêche", "Patchwork denim aux épaules"),
    "vetements/jupe-denim":            ("Ensemble jupe denim", "Grain de beauté brodé"),
    "vetements/ensemble-peche":        ("Ensemble pêche", "Panneau patchwork denim"),
    "vetements/detail-denim":          ("Détail", "Assemblage denim et popeline"),
    "vetements/haut-peche-poche":      ("Haut pêche", "Poche et ceinture"),
    "vetements/tablier-eventail":      ("Le tablier de l'artisan", "Patchwork signature personnalisé"),
    "vetements/tablier":               ("Le tablier de l'artisan", "Sur mesure"),

    "installations/hanoka-maria":      ("HANOKA", "Installation textile murale inspirée du hanok — 200 × 96 cm"),
    "installations/hanoka-mur":        ("HANOKA", "En exposition à l'atelier"),
    "installations/hanoka-ombre":      ("HANOKA", "Jeu d'ombre sur le mur"),
    "installations/exposition":        ("Montage scénographique", "Éventail, dés, table ébène, tabouret en cuir et créton jeans"),
    "installations/decors-architecture":("Décors inspirés de l'architecture", "Pans de murs textiles"),
    "installations/bukchon":           ("Bukchon Hanok Village, Séoul", "La référence"),

    "atelier/ines-decoupe":            ("Inès Ré", "La découpe, à contre-jour"),
    "atelier/couture":                 ("Quatre-mains", "Assemblage du patchwork"),
    "atelier/outils":                  ("Les outils", "Ciseaux, aiguille, fils"),
    "atelier/eventail":                ("L'éventail", "Accessoire scénographique"),
    "atelier/soeurs-re":               ("Les sœurs Ré", "Omara Ré & Inès Ré"),
    "atelier/reference-ines":          ("Créative Côte d'Ivoire", "Incubation 2026 — Ministère de la Culture"),
}

ALT = {
    "oeuvres/ivresse-ecarlate":        "Intérieur tamisé baigné d'une lumière orange, sol en damier noir et or et palmier en ombre chinoise.",
    "oeuvres/ivresse-ecarlate-situ":   "La tenture « Ivresse écarlate » installée dans une pièce, une personne assise devant.",
    "oeuvres/apprentis-sages":         "Triptyque en ombres chinoises : trois silhouettes de karatékas en mouvement.",
    "oeuvres/accords-vitamines":       "Tapisserie où une guitare devient un avocatier, sur un parterre de pétales pourpres.",
    "oeuvres/architecture-eau":        "Grande mosaïque murale composée de tessons de jean dans des bleus délavés.",
    "oeuvres/mosaique-portee":         "Une artisane déploie la mosaïque en jeans pour en montrer l'envers.",
    "oeuvres/pieces-decoupees":        "Pièces de feutrine découpées en forme de trèfle, de cœur et de pique sur un plan de travail.",

    "vetements/elephant-print":        "Haut jaune safran à manches courtes, empiècements patchwork en denim aux épaules.",
    "vetements/fee-des-jeans":         "T-shirt blanc « fée des jeans » sur cintre, épaules en patchwork de denim.",
    "vetements/fee-des-jeans-dos":     "Dos du t-shirt « fée des jeans », empiècement patchwork sur les manches.",
    "vetements/pochette-ensemble":     "Pochette en denim à cordon, posée près d'un ensemble pêche à panneau patchwork.",
    "vetements/haut-peche":            "Haut couleur pêche à manches patchwork en denim et popeline.",
    "vetements/jupe-denim":            "Haut jaune et jupe en denim noir portant le grain de beauté brodé.",
    "vetements/ensemble-peche":        "Ensemble pêche avec un large panneau de patchwork en denim.",
    "vetements/detail-denim":          "Détail d'assemblage : pièces de denim et de popeline cousues bord à bord.",
    "vetements/haut-peche-poche":      "Haut pêche vu de face, poche plaquée et ceinture nouée.",
    "vetements/tablier-eventail":      "Tablier d'artisan en denim à patchwork rose et bordeaux, présenté avec un éventail.",
    "vetements/tablier":               "Tablier d'artisan en polycoton bleu marine, orné d'un patchwork géométrique.",

    "installations/hanoka-maria":      "Une enfant tient un éventail devant HANOKA, panneau textile mural aux briques roses et bleues.",
    "installations/hanoka-mur":        "HANOKA installé sur un mur de l'atelier, une silhouette passe devant.",
    "installations/hanoka-ombre":      "L'ombre d'une personne projetée sur le panneau textile HANOKA.",
    "installations/exposition":        "Montage scénographique dans une pièce sombre : éventail, table en ébène et tabouret en cuir.",
    "installations/decors-architecture":"Décor textile mural évoquant une façade à claustras, une personne assise devant.",
    "installations/bukchon":           "Maison traditionnelle coréenne du village de Bukchon à Séoul, référence du projet HANOKA.",

    "atelier/ines-decoupe":            "Inès Ré à l'atelier, penchée sur une découpe textile devant une fenêtre à contre-jour.",
    "atelier/couture":                 "Une artisane en haut rouge assemble à la main un patchwork géométrique.",
    "atelier/outils":                  "Ciseaux de couturière, aiguille et deux bobines de fil rouge et bleu.",
    "atelier/eventail":                "Éventail en papier plissé, ouvert.",
    "atelier/soeurs-re":               "Omara et Inès Ré face à face, en discussion autour d'un carnet et d'une tasse.",
    "atelier/reference-ines":          "Inès Ré présentant Résone sur scène lors du programme Créative Côte d'Ivoire.",
}

PAGES = {
    "index.html": dict(
        title="Résone — Artisanes du textile | Abidjan, Côte d'Ivoire",
        desc="Résone, entreprise de création et de conseil artistique. Artisanat textile, "
             "direction artistique, ingénierie créative et innovation scénographique.",
        sub="portfolio — l'art de faire résonner — abidjan",
        # "Explore by style" — the studio named three (2026-09-26): the Chinese
        # shadow technique, textile inspired by traditional architecture (HANOKA),
        # and patchwork. Masterpiece first. Which group the denim mosaic and the
        # cut-piece studies belong to is a judgement call, not the studio's word —
        # see requirements-2026-09-26.md D4.
        groups=[
            # « Apprentis Sages » is a 2.53 panorama among four portraits at
            # 0.60–0.90. Left in catalogue order the packer had to put the three
            # narrowest tiles in one row and it resolved to 840px, twice the
            # target. Pairing the panorama with the masterpiece gives 389/586
            # and keeps « Ivresse écarlate » first, which the studio confirmed.
            ("Ombres chinoises & tapisseries", [
                "oeuvres/ivresse-ecarlate", "oeuvres/apprentis-sages",
                "oeuvres/ivresse-ecarlate-situ", "oeuvres/accords-vitamines",
                "oeuvres/pieces-decoupees",
            ]),
            ("HANOKA — l'architecture traditionnelle", [
                "installations/hanoka-maria", "installations/hanoka-mur",
                "installations/hanoka-ombre", "installations/decors-architecture",
            ]),
            # Three styles, as the studio said (memo 1) — not five headings.
            # Within Patchwork the order is by kind of object: the mosaic
            # pieces, then the garments, then the aprons.
            ("Patchwork & mosaïque denim", [
                "oeuvres/architecture-eau", "oeuvres/mosaique-portee",
                "vetements/detail-denim",
                "vetements/elephant-print", "vetements/fee-des-jeans",
                "vetements/fee-des-jeans-dos", "vetements/jupe-denim",
                "vetements/haut-peche", "vetements/haut-peche-poche",
                "vetements/ensemble-peche", "vetements/pochette-ensemble",
                "vetements/tablier-eventail", "vetements/tablier",
            ]),
        ],
    ),
    "atelier.html": dict(
        title="Atelier — Résone",
        desc="L'atelier Résone à la Riviera 3, Abidjan. Les sœurs Ré, le travail à "
             "quatre-mains, et l'espace d'exposition.",
        sub="atelier — riviera 3, abidjan",
        # atelier + the two exhibition/space photographs that came from
        # installations. The HANOKA pieces themselves are work, so they sit in
        # the portfolio, not here.
        items=["atelier/soeurs-re", "atelier/ines-decoupe", "atelier/couture",
               "atelier/outils", "atelier/eventail", "atelier/reference-ines",
               "installations/exposition", "installations/bukchon"],
    ),
}


def dims(slug):
    """Read a JPEG's real pixel size. Failing loudly here is the point: a missing
    or unreadable image must stop the build, never emit a tile whose --ar and
    width/height are guesses."""
    p = os.path.join(IMG, slug + ".jpg")
    try:
        out = subprocess.run(["identify", "-format", "%w %h", p],
                             capture_output=True, text=True, check=True).stdout
        w, h = out.split()
        return int(w), int(h)
    except (subprocess.CalledProcessError, ValueError, FileNotFoundError) as e:
        sys.exit(f"build.py: cannot read dimensions of {p}: {e}")


# Reference width the packer reasons about: --measure in styles.css. The rows are
# fluid at render time — this only decides which tiles share a row.
MEASURE = 1280
GAP = 20
ROW_H = 380          # target row height in px at MEASURE
ROW_MAX = 4          # never more than four tiles in a row


def rows(items, target_h=ROW_H, max_n=ROW_MAX):
    """Partition into justified rows, minimising squared deviation from a target
    row height.

    The greedy packer this replaces closed a row the moment its aspect sum passed
    a threshold, which left the leftovers stranded in a final row of a wildly
    different height — 553/366/568/455/688 px on the home page. The studio asked
    for "more symmetry, margins" (requirements-2026-09-26.md §B1), and uneven rows
    are the opposite of that. An exact DP over ~14 tiles is instant and gives
    507/277/358/386 instead.
    """
    meta = [(it, *dims(it)) for it in items]
    meta = [(it, w, h, w / h) for it, w, h in meta]
    n = len(meta)
    if n == 0:
        return []

    def height(i, j):
        """Resolved height if tiles [i, j) share one row at MEASURE."""
        span = sum(m[3] for m in meta[i:j])
        return (MEASURE - (j - i - 1) * GAP) / span

    INF = float("inf")
    best = [INF] * (n + 1)
    back = [0] * (n + 1)
    best[0] = 0.0
    for j in range(1, n + 1):
        for i in range(max(0, j - max_n), j):
            # a row of one is only tolerable as the very last row
            if j - i < 2 and j != n:
                continue
            cost = best[i] + (height(i, j) - target_h) ** 2
            if cost < best[j]:
                best[j], back[j] = cost, i

    out, j = [], n
    while j > 0:
        i = back[j]
        out.append(meta[i:j])
        j = i
    return out[::-1]


def esc(t):
    return (t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
             .replace('"', "&quot;"))


def head(page, cfg, first_img):
    links = "\n".join(
        f'      <a href="{href}"{" class=\"is-here\"" if href == "index.html#works" and page == "index.html" else ""}>{esc(label)}</a>'
        for href, label in NAV)
    return f"""<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(cfg['title'])}</title>
<meta name="description" content="{esc(cfg['desc'])}">
<meta name="theme-color" content="#EAE9E5">

<script>document.documentElement.classList.add('js');</script>

<meta property="og:type" content="website">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="Résone">
<meta property="og:title" content="{esc(cfg['title'])}">
<meta property="og:description" content="{esc(cfg['desc'])}">
<meta property="og:image" content="assets/img/{first_img}.jpg">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Tenor+Sans&display=swap">
<link rel="stylesheet" href="assets/css/styles.css">
</head>

<body>
<a class="skip" href="#works">Aller au contenu</a>

<header class="head">
  <div class="head__top">
    <h1 class="head__mark"><a href="index.html" aria-label="Résone, accueil"><i>R</i><i>É</i><i>S</i><i>O</i><i>N</i><i>E</i></a></h1>

    <nav class="nav" aria-label="Navigation principale">
{links}
      <a class="nav__ig" href="https://instagram.com/beautyssspot" rel="noopener" aria-label="Instagram">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/>
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/>
          <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"/>
        </svg>
      </a>
    </nav>
  </div>

  <p class="head__sub">{esc(cfg['sub'])}</p>
</header>
"""


FOOT = """
<footer class="foot" id="pied">
  <form class="news" id="news" novalidate>
    <label for="email">Recevoir des nouvelles de l'atelier</label>
    <div class="news__row">
      <input id="email" name="email" type="email" autocomplete="email" required placeholder="votre@email.com">
      <button type="submit">S'inscrire</button>
    </div>
    <p class="news__msg" id="news-msg" role="status" aria-live="polite"></p>
  </form>

  <div class="foot__rule"></div>

  <span class="foot__glyph" aria-hidden="true">
    <svg viewBox="0 0 120 70" focusable="false">
      <circle cx="46" cy="14" r="6.5" fill="currentColor"/>
      <path d="M6 52 L58 40 L70 26 L82 50 L96 30 L112 44" fill="none"
            stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>

  <p class="foot__line">
    <a href="mailto:omara@resone.africa">omara@resone.africa</a>
    <a href="mailto:ines@resone.africa">ines@resone.africa</a>
    <a href="https://instagram.com/beautyssspot" rel="noopener">@beautyssspot</a>
  </p>

  <p class="foot__fine">Atelier — Riviera 3, Abidjan, Côte d'Ivoire</p>
  <p class="foot__fine">© <span id="year">2026</span> Résone — l'art de faire résonner · Crédit photo : Résone</p>
</footer>

<dialog class="lb" id="lb" closedby="any" aria-label="Œuvre en taille réelle">
  <button class="lb__x" type="button" data-lb-close aria-label="Fermer">&times;</button>
  <button class="lb__nav lb__nav--prev" type="button" data-lb-prev aria-label="Œuvre précédente">&#8249;</button>
  <button class="lb__nav lb__nav--next" type="button" data-lb-next aria-label="Œuvre suivante">&#8250;</button>
  <figure class="lb__fig">
    <img class="lb__img" id="lb-img" alt="">
    <figcaption class="lb__cap">
      <span class="lb__title" id="lb-title"></span>
      <span class="lb__detail" id="lb-detail"></span>
      <a class="lb__ask" id="lb-ask" href="mailto:omara@resone.africa,ines@resone.africa">Se renseigner sur cette pièce</a>
    </figcaption>
  </figure>
</dialog>

<script src="assets/js/main.js" defer></script>
</body>
</html>
"""


def slugs(cfg):
    """Flat tile list for a page, whether or not it is grouped by style."""
    if "groups" in cfg:
        return [s for _, group in cfg["groups"] for s in group]
    return cfg["items"]


def anchor(label):
    """ASCII id for a style group — the labels carry accents and ligatures."""
    flat = unicodedata.normalize("NFKD", label).encode("ascii", "ignore").decode()
    out = "".join(c.lower() if c.isalnum() else "-" for c in flat)
    return "style-" + re.sub(r"-+", "-", out).strip("-")


def mosaic(cfg):
    """One <section class="works"> per style group.

    The studio asked to "explore by style" and to be able to "section it".
    Every group is still a .works section, so hard rule 0's check —
    section:not(.works) === 0 — continues to hold. The label is the one piece
    of chrome between images on the page; see requirements-2026-09-26.md F1/F2.
    """
    groups = cfg.get("groups") or [(None, cfg["items"])]
    out, first = [], True
    out.append("<main>\n")
    for label, items in groups:
        if label is None:
            out.append('<section class="works" id="works" aria-label="Œuvres">\n')
        else:
            aid = anchor(label)
            out.append(f'<section class="works" data-style{' id="works"' if first else ''} aria-labelledby="{aid}">\n')
            out.append(f'  <h2 class="works__label" id="{aid}">{esc(label)}</h2>\n')
        out.extend(_tiles(items, eager=first))
        out.append("</section>\n\n")
        first = False
    out.append("</main>\n")
    return "".join(out)


def _tiles(items, eager):
    """One uniform grid per section: every tile the same size, real gaps between.
    (The studio asked for equal-size images with space around them; the old
    justified rows gave every tile a different size.) Wide panoramas are
    letterboxed rather than cropped — see .w--wide in styles.css."""
    out = ['  <div class="grid">\n']
    for n, slug in enumerate(items):
        w, h = dims(slug)
        ar = w / h
        title, detail = CAP[slug]
        alt = ALT[slug]
        load = 'fetchpriority="high"' if (eager and n < 3) else 'loading="lazy"'
        wide = " w--wide" if ar > 1.3 else ""
        out.append(
            f'    <button class="w{wide}" style="--ar:{ar:.3f}" type="button"\n'
            f'            data-full="assets/img/{slug}.jpg"\n'
            f'            data-title="{esc(title)}"\n'
            f'            data-detail="{esc(detail)}">\n'
            f'      <img src="assets/img/{slug}.jpg" width="{w}" height="{h}" {load} decoding="async"\n'
            f'           alt="{esc(alt)}">\n'
            f'      <span class="w__cap"><b>{esc(title)}</b><i>{esc(detail)}</i></span>\n'
            f'    </button>\n\n')
    out.append('  </div>\n\n')
    return out



CONTACT_BODY = """<main>
<section class="works" id="%(id)s" aria-label="Contact">
  <div class="row">
    <button class="w" style="--ar:%(ar).3f" type="button"
            data-full="assets/img/atelier/soeurs-re.jpg"
            data-title="Les sœurs Ré"
            data-detail="Omara Ré &amp; Inès Ré">
      <img src="assets/img/atelier/soeurs-re.jpg" width="%(w)d" height="%(h)d" fetchpriority="high" decoding="async"
           alt="Omara et Inès Ré face à face, en discussion autour d'un carnet et d'une tasse.">
      <span class="w__cap"><b>Les sœurs Ré</b><i>Omara Ré &amp; Inès Ré</i></span>
    </button>

    <div class="card">
      <p class="card__row"><b>Omara Ré</b>
        <a href="mailto:omara@resone.africa">omara@resone.africa</a>
        <a href="tel:+2250170826363">+225 01 70 82 63 63</a></p>
      <p class="card__row"><b>Inès Ré</b>
        <a href="mailto:ines@resone.africa">ines@resone.africa</a>
        <a href="tel:+2250586162606">+225 05 86 16 26 06</a></p>
      <p class="card__row"><b>Atelier</b>
        <span>Riviera 3, Abidjan</span>
        <span>Côte d'Ivoire</span></p>
      <p class="card__row"><b>Sur mesure</b>
        <span>Une pièce à votre image ?</span>
        <span>Écrivez-nous, nous en parlons.</span></p>
      <p class="card__row"><b>Instagram</b>
        <a href="https://instagram.com/beautyssspot" rel="noopener">@beautyssspot</a></p>
    </div>
  </div>
</section>
</main>
"""


# The studio asked for an About page on 2026-09-26. Every word below is the
# deck's own, quoted from target.md §6 — which reserved exactly this copy for
# "a future About page". Hard rule 4 forbids an agent writing new copy, and
# hard rule 0 forbids a text-only section, so this uses contact.html's shape:
# a tile-shaped card sitting inside a mosaic row, not a section of prose.
APROPOS_BODY = """<main>
<section class="works" id="%(id)s" aria-label="À propos">
  <div class="row">
    <button class="w" style="--ar:%(ar).3f" type="button"
            data-full="assets/img/atelier/reference-ines.jpg"
            data-title="Créative Côte d'Ivoire"
            data-detail="Incubation 2026 — Ministère de la Culture">
      <img src="assets/img/atelier/reference-ines.jpg" width="%(w)d" height="%(h)d" fetchpriority="high" decoding="async"
           alt="Inès Ré présentant Résone sur scène lors du programme Créative Côte d'Ivoire.">
      <span class="w__cap"><b>Créative Côte d'Ivoire</b><i>Incubation 2026 — Ministère de la Culture</i></span>
    </button>

    <div class="card">
      <p class="card__row"><b>Résone</b>
        <span>entreprise de création et de conseil artistique</span></p>
      <p class="card__row"><b>Manifeste</b>
        <span>nous développons un univers texturé, coloré et géométrique,
        en quatre-mains, cousu main.</span></p>
      <p class="card__row"><b>À propos</b>
        <span>Franco-mauriciennes basées en Côte d'Ivoire, nous apportons un bout d'ici
        et un bout d'ailleurs dans chacune de nos œuvres. Notre identité métissée
        s'exprime à travers un travail artisanal à quatre-mains et dans la synergie de
        différents corps de métiers. Nos œuvres sont imprégnées d'imaginaires et
        d'univers poétiques, de fusions culturelles.</span></p>
      <p class="card__row"><b>Le grain de beauté</b>
        <span>Le grain de beauté, au dessus de la bouche, est notre marque, apposée
        discrètement sur nos créations sous cette forme.</span></p>
      <p class="card__row"><b>Savoir-faire</b>
        <span>Artisanat textile</span>
        <span>Direction artistique</span>
        <span>Ingénierie créative</span>
        <span>Innovation scénographique</span></p>
    </div>
  </div>
</section>
</main>
"""




def onepage(cfg):
    """The landing page is the whole site on one scroll: portfolio groups, then
    Atelier, À propos and Contact as further .works sections (rule 0 holds)."""
    body = mosaic(cfg).replace("</main>\n", "")
    aw, ah = dims("atelier/reference-ines")
    cw, ch = dims("atelier/soeurs-re")
    at = PAGES["atelier.html"]
    body += ('<section class="works" id="atelier" aria-labelledby="h-atelier">\n'
             '  <h2 class="works__label" id="h-atelier">Atelier</h2>\n')
    body += "".join(_tiles(at["items"], eager=False)) + "</section>\n\n"
    def part(tpl, label, sid, w, h):
        t = tpl % {"id": sid, "ar": w / h, "w": w, "h": h}
        t = t.replace("<main>\n", "").replace("</main>\n", "")
        t = t.replace("fetchpriority=\"high\"", "loading=\"lazy\"")
        return t.replace(f'aria-label="{label}">\n', f'aria-labelledby="h-{sid}">\n  <h2 class="works__label" id="h-{sid}">{label}</h2>\n', 1)
    body += part(APROPOS_BODY, "À propos", "apropos", aw, ah) + "\n"
    body += part(CONTACT_BODY, "Contact", "contact", cw, ch) + "\n"
    return body + "</main>\n"


def write(name, html):
    path = os.path.join(ROOT, name)
    try:
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(html)
    except OSError as e:
        sys.exit(f"build.py: cannot write {path}: {e}")


def main():
    written = []
    for page, cfg in PAGES.items():
        tiles = slugs(cfg)
        if page == "index.html":
            write(page, head(page, cfg, tiles[0]) + onepage(cfg) + FOOT)
        else:
            write(page, head(page, cfg, tiles[0]) + mosaic(cfg).replace('id="works"', 'id="atelier"', 1) + FOOT)
        written.append((page, len(tiles)))

    w, h = dims("atelier/reference-ines")
    cfg = {
        "title": "À propos — Résone",
        "desc": "Franco-mauriciennes basées en Côte d'Ivoire — Omara Ré et Inès Ré, "
                "un travail artisanal à quatre-mains.",
        "sub": "à propos — un travail à quatre-mains",
    }
    write("apropos.html",
          head("apropos.html", cfg, "atelier/reference-ines")
          + APROPOS_BODY % {"id": "works", "ar": w / h, "w": w, "h": h} + FOOT)
    written.append(("apropos.html", 1))

    w, h = dims("atelier/soeurs-re")
    cfg = {
        "title": "Contact — Résone",
        "desc": "Contacter Résone — Omara Ré et Inès Ré, atelier Riviera 3, Abidjan.",
        "sub": "contact — riviera 3, abidjan",
    }
    write("contact.html",
          head("contact.html", cfg, "atelier/soeurs-re")
          + CONTACT_BODY % {"id": "works", "ar": w / h, "w": w, "h": h} + FOOT)
    written.append(("contact.html", 1))

    for p, n in written:
        print(f"  {p:22s} {n:2d} images")
    print(f"\n{len(written)} pages, {len(CAP)} images catalogued")


if __name__ == "__main__":
    main()
