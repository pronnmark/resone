/* ============================================================================
   RÉSONE — interaction

   No dependencies. Everything is progressive enhancement: with JS off the page
   still reads, every work is visible and every caption is in the markup.
   ========================================================================= */

(() => {
  'use strict';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* ── reveal ────────────────────────────────────────────────────────────
     The class is applied from here, never in the markup, so a failed script
     can't leave anything stuck at opacity 0.                               */

  const targets = $$('.row');

  if (!reduced.matches && 'IntersectionObserver' in window) {
    targets.forEach((el) => el.classList.add('reveal'));

    const io = new IntersectionObserver((entries, obs) => {
      entries.filter((e) => e.isIntersecting).forEach((e, i) => {
        e.target.style.setProperty('--d', `${i * 70}ms`);
        e.target.classList.add('is-in');
        obs.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });

    targets.forEach((el) => io.observe(el));
  }

  /* ── explore by style ──────────────────────────────────────────────────
     The studio asked to "explore by style" and to "filter depending on the
     style" (2026-09-26). The buttons are built here from the group labels, so
     without JS every group simply stays visible and there is nothing dead on
     the page. Hiding a group never removes it from the DOM.                */

  const groups = $$('main > section.works').filter((g) => $('.works__label', g));
  if (groups.length > 1) {
    const bar = document.createElement('div');
    bar.className = 'filter';
    bar.setAttribute('role', 'group');
    bar.setAttribute('aria-label', 'Explorer par style');
    const pick = (btn, group) => {
      $$('button', bar).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      groups.forEach((g) => { g.hidden = !!group && g !== group; });
      $$('.row', groups.find((g) => !g.hidden)).forEach((r) => r.classList.add('is-in'));
    };
    const add = (text, group) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = text;
      b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', () => pick(b, group));
      bar.append(b);
      return b;
    };
    const all = add('Tout', null);
    groups.forEach((g) => add($('.works__label', g).textContent.split(/\s[—&]\s/)[0], g));
    all.setAttribute('aria-pressed', 'true');
    groups[0].before(bar);
  }

  /* ── lightbox ──────────────────────────────────────────────────────────
     The tiles in the DOM are the only source of truth; nothing is duplicated
     into a JS array, so adding a work means editing markup only.           */

  const lb       = $('#lb');
  const lbImg    = $('#lb-img');
  const lbTitle  = $('#lb-title');
  const lbDetail = $('#lb-detail');
  const tiles    = $$('.w');

  let index  = 0;
  let opener = null;

  const shown = (t) => !t.closest('section').hidden;
  const step  = (dir) => {
    let i = index;
    for (let n = 0; n < tiles.length; n++) {
      i = (i + dir + tiles.length) % tiles.length;
      if (shown(tiles[i])) return i;
    }
    return index;
  };

  const show = (i) => {
    index = (i + tiles.length) % tiles.length;

    const tile = tiles[index];
    const img  = $('img', tile);

    lbImg.src = tile.dataset.full;
    lbImg.alt = img ? img.alt : '';
    lbTitle.textContent  = tile.dataset.title  || '';
    lbDetail.textContent = tile.dataset.detail || '';
    const ask = $('#lb-ask');
    if (ask) {
      ask.hidden = !$('.works__label', tile.closest('section'));
      const t = tile.dataset.title || '';
      ask.href = 'mailto:omara@resone.africa,ines@resone.africa'
        + '?subject=' + encodeURIComponent(`Renseignements — ${t}`)
        + '&body=' + encodeURIComponent(`Bonjour,\n\nJe souhaite me renseigner sur la pièce ${t}.\n`);
    }
    lb.setAttribute('aria-label', `${tile.dataset.title} — œuvre en taille réelle`);
  };

  tiles.forEach((tile, i) => {
    tile.addEventListener('click', () => {
      opener = tile;
      show(i);
      lb.showModal();
    });
  });

  $('[data-lb-close]', lb).addEventListener('click', () => lb.close());
  $('[data-lb-prev]',  lb).addEventListener('click', () => show(step(-1)));
  $('[data-lb-next]',  lb).addEventListener('click', () => show(step(1)));

  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); show(step(-1)); }
    if (e.key === 'ArrowRight') { e.preventDefault(); show(step(1)); }
  });

  // showModal() moves focus into the dialog; hand it back where it came from
  lb.addEventListener('close', () => {
    lbImg.removeAttribute('src');
    if (opener) { opener.focus(); opener = null; }
  });

  /* Safari has no dialog[closedby] yet — supply light-dismiss by hand. A click
     on the backdrop reports the <dialog> itself as the target, so compare the
     pointer against the dialog's own box to tell the two apart. */
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    lb.addEventListener('click', (e) => {
      if (e.target !== lb) return;
      const r = lb.getBoundingClientRect();
      const inside =
        e.clientY >= r.top  && e.clientY <= r.top  + r.height &&
        e.clientX >= r.left && e.clientX <= r.left + r.width;
      if (!inside) lb.close();
    });
  }

  /* ── newsletter ────────────────────────────────────────────────────────
     No backend yet. Validate, acknowledge, don't pretend to have stored it. */

  const news = $('#news');
  const msg  = $('#news-msg');

  news.addEventListener('submit', (e) => {
    e.preventDefault();
    const field = $('#email');

    if (!field.checkValidity()) {
      msg.dataset.state = 'error';
      msg.textContent = 'Adresse e-mail invalide.';
      field.focus();
      return;
    }

    delete msg.dataset.state;
    msg.textContent = 'Merci — écrivez-nous à omara@resone.africa en attendant.';
    // (no backend yet — target.md §9)
    news.reset();
  });

  $('#year').textContent = String(new Date().getFullYear());
})();
