#!/usr/bin/env python3
"""
Generate the six static pages.

This is NOT a build step in the bundler sense — it emits plain HTML that is
committed and served directly, and the site works with this file deleted. It
exists for one reason: six pages share a header and footer, and hand-copying
them is how they drift. Edit the templates here, run `python3 build.py`, commit
the generated HTML.

Every image's aspect ratio is read from the file on disk, so `--ar` and the
width/height attributes can never disagree with the actual JPEG.
"""

import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(ROOT, "assets", "img")

NAV = [
    ("oeuvres.html", "Œuvres"),
    ("vetements.html", "Vêtements"),
    ("installations.html", "Installations"),
    ("atelier.html", "Atelier"),
    ("contact.html", "Contact"),
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

    "vetements/elephant-print":        ("Le haut « Elephant print »", "Patchwork signature vêtement — 59 000 FCFA"),
    "vetements/fee-des-jeans":         ("« Fée des jeans »", "Patchwork signature vêtement"),
    "vetements/fee-des-jeans-dos":     ("« Fée des jeans »", "Dos, empiècement denim"),
    "vetements/pochette-ensemble":     ("Pochette & ensemble", "Créton jeans"),
    "vetements/haut-peche":            ("Haut pêche", "Patchwork denim aux épaules"),
    "vetements/jupe-denim":            ("Ensemble jupe denim", "Grain de beauté brodé"),
    "vetements/ensemble-peche":        ("Ensemble pêche", "Panneau patchwork denim"),
    "vetements/detail-denim":          ("Détail", "Assemblage denim et popeline"),
    "vetements/haut-peche-poche":      ("Haut pêche", "Poche et ceinture"),
    "vetements/tablier-eventail":      ("Le tablier de l'artisan", "Patchwork signature personnalisé"),
    "vetements/tablier":               ("Le tablier de l'artisan", "Sur mesure — 175 000 FCFA"),

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
        sub="artisanes du textile — l'art de faire résonner — abidjan",
        items=["oeuvres/ivresse-ecarlate", "oeuvres/architecture-eau", "installations/hanoka-maria",
               "oeuvres/apprentis-sages", "vetements/elephant-print",
               "vetements/tablier-eventail", "atelier/ines-decoupe", "oeuvres/accords-vitamines",
               "installations/exposition", "vetements/jupe-denim", "atelier/soeurs-re",
               "installations/decors-architecture", "oeuvres/mosaique-portee", "vetements/fee-des-jeans"],
    ),
    "oeuvres.html": dict(
        title="Œuvres — Résone",
        desc="Tapisseries, ombres chinoises et mosaïques en jeans de l'atelier Résone.",
        sub="œuvres — tapisseries, ombres chinoises, mosaïques",
        items=["oeuvres/ivresse-ecarlate", "oeuvres/apprentis-sages", "oeuvres/accords-vitamines",
               "oeuvres/architecture-eau", "oeuvres/mosaique-portee",
               "oeuvres/ivresse-ecarlate-situ", "oeuvres/pieces-decoupees"],
    ),
    "vetements.html": dict(
        title="Vêtements — Résone",
        desc="Patchwork signature vêtement : hauts, ensembles, pochettes et le tablier de l'artisan.",
        sub="vêtements — patchwork signature, sur mesure",
        items=["vetements/elephant-print", "vetements/fee-des-jeans",
               "vetements/fee-des-jeans-dos", "vetements/jupe-denim", "vetements/haut-peche",
               "vetements/haut-peche-poche", "vetements/ensemble-peche", "vetements/pochette-ensemble",
               "vetements/detail-denim", "vetements/tablier-eventail", "vetements/tablier"],
    ),
    "installations.html": dict(
        title="Installations — Résone",
        desc="HANOKA, pans de murs textiles et montages scénographiques.",
        sub="installations — pans de murs, scénographie",
        items=["installations/hanoka-maria", "installations/hanoka-mur", "installations/hanoka-ombre",
               "installations/decors-architecture", "installations/exposition", "installations/bukchon"],
    ),
    "atelier.html": dict(
        title="Atelier — Résone",
        desc="L'atelier Résone à la Riviera 3, Abidjan. Les sœurs Ré, le travail à quatre-mains.",
        sub="atelier — riviera 3, abidjan",
        items=["atelier/soeurs-re", "atelier/ines-decoupe", "atelier/couture",
               "atelier/outils", "atelier/eventail", "atelier/reference-ines"],
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


def rows(items, target=2.35):
    """Greedy pack into justified rows: keep adding until the aspect sum is
    wide enough, so every row lands on a sensible height."""
    out, cur, s = [], [], 0.0
    for it in items:
        w, h = dims(it)
        ar = w / h
        cur.append((it, w, h, ar))
        s += ar
        if s >= target and len(cur) >= 2:
            out.append(cur)
            cur, s = [], 0.0
    if cur:
        if out and len(cur) == 1:      # never strand a single wide tile
            out[-1].extend(cur)
        else:
            out.append(cur)
    return out


def esc(t):
    return (t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
             .replace('"', "&quot;"))


def head(page, cfg, first_img):
    links = "\n".join(
        f'      <a href="{href}"{" class=\"is-here\"" if href == page else ""}>{esc(label)}</a>'
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
    <h1 class="head__mark"><a href="index.html" aria-label="Résone, accueil">RÉSON<span>E</span></a></h1>

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
<footer class="foot" id="contact">
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
    </figcaption>
  </figure>
</dialog>

<script src="assets/js/main.js" defer></script>
</body>
</html>
"""


def mosaic(items):
    out = ['<main>\n<section class="works" id="works" aria-label="Œuvres">\n']
    n = 0
    for row in rows(items):
        out.append('  <div class="row">\n')
        for slug, w, h, ar in row:
            n += 1
            title, detail = CAP[slug]
            alt = ALT[slug]
            load = ('fetchpriority="high"' if n <= 2 else 'loading="lazy"')
            out.append(
                f'    <button class="w" style="--ar:{ar:.3f}" type="button"\n'
                f'            data-full="assets/img/{slug}.jpg"\n'
                f'            data-title="{esc(title)}"\n'
                f'            data-detail="{esc(detail)}">\n'
                f'      <img src="assets/img/{slug}.jpg" width="{w}" height="{h}" {load} decoding="async"\n'
                f'           alt="{esc(alt)}">\n'
                f'      <span class="w__cap"><b>{esc(title)}</b><i>{esc(detail)}</i></span>\n'
                f'    </button>\n\n')
        out.append('  </div>\n\n')
    out.append('</section>\n</main>\n')
    return "".join(out)


CONTACT_BODY = """<main>
<section class="works" id="works" aria-label="Contact">
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
      <p class="card__row"><b>Instagram</b>
        <a href="https://instagram.com/beautyssspot" rel="noopener">@beautyssspot</a></p>
    </div>
  </div>
</section>
</main>
"""


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
        write(page, head(page, cfg, cfg["items"][0]) + mosaic(cfg["items"]) + FOOT)
        written.append((page, len(cfg["items"])))

    w, h = dims("atelier/soeurs-re")
    cfg = {
        "title": "Contact — Résone",
        "desc": "Contacter Résone — Omara Ré et Inès Ré, atelier Riviera 3, Abidjan.",
        "sub": "contact — riviera 3, abidjan",
    }
    write("contact.html",
          head("contact.html", cfg, "atelier/soeurs-re")
          + CONTACT_BODY % {"ar": w / h, "w": w, "h": h} + FOOT)
    written.append(("contact.html", 1))

    for p, n in written:
        print(f"  {p:22s} {n:2d} images")
    print(f"\n{len(written)} pages, {len(CAP)} images catalogued")


if __name__ == "__main__":
    main()
