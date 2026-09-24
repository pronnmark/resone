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

  const targets = [...$$('.row'), ...$$('.info__col')];

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

  const show = (i) => {
    index = (i + tiles.length) % tiles.length;

    const tile = tiles[index];
    const img  = $('img', tile);

    lbImg.src = tile.dataset.full;
    lbImg.alt = img ? img.alt : '';
    lbTitle.textContent  = tile.dataset.title  || '';
    lbDetail.textContent = tile.dataset.detail || '';
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
  $('[data-lb-prev]',  lb).addEventListener('click', () => show(index - 1));
  $('[data-lb-next]',  lb).addEventListener('click', () => show(index + 1));

  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); show(index - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
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
    news.reset();
  });

  $('#year').textContent = String(new Date().getFullYear());
})();
