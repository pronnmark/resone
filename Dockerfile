# Static site. Nothing is built — the HTML in the repo is what ships.
#
# The COPY list is explicit on purpose: this repo also holds target.md,
# AGENTS.md, build.py and reference/ (full Canva page exports), none of which
# belong on a public host. Serving the repo root would publish all of it.
# If you add a page, add it here too.
FROM nginx:1.27.4-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY index.html oeuvres.html vetements.html installations.html \
     atelier.html contact.html /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1
