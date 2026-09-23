/* ============================================================================
   RÉSONE — interaction
   No dependencies. Everything here is progressive enhancement: with JS off the
   page still reads, every work image is visible, and all captions are present.
   ========================================================================= */

(() => {
  'use strict';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* ── header state ──────────────────────────────────────────────────────
     Bone + blur once we are past the top of the hero. Read in an rAF so the
     scroll listener never touches layout synchronously.                    */

  const head = $('#head');
  let ticking = false;

  const syncHead = () => {
    head.classList.toggle('is-stuck', window.scrollY > 40);
    ticking = false;
  };

  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(syncHead);
  }, { passive: true });

  syncHead();

  /* ── mobile nav ────────────────────────────────────────────────────── */

  const burger = $('.burger');
  const nav    = $('#nav');

  const setNav = (open) => {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  };

  burger.addEventListener('click', () => {
    setNav(burger.getAttribute('aria-expanded') !== 'true');
  });

  // any in-page jump closes the panel
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) setNav(false);
  });

  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setNav(false);
      burger.focus();
    }
  });

  // reset the panel if the viewport grows past the mobile breakpoint
  matchMedia('(min-width: 861px)').addEventListener('change', (e) => {
    if (e.matches) setNav(false);
  });

  /* ── reveal on scroll ──────────────────────────────────────────────────
     Elements stagger within whichever batch the observer hands us, so a row
     of tiles cascades instead of snapping in together.                     */

  const revealables = $$('.reveal');

  if (reduced.matches || !('IntersectionObserver' in window)) {
    revealables.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry, i) => {
          entry.target.style.setProperty('--d', `${i * 60}ms`);
          entry.target.classList.add('is-in');
          obs.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealables.forEach((el) => io.observe(el));
  }

  /* ── lightbox ──────────────────────────────────────────────────────────
     The tiles in the DOM are the only source of truth; nothing is duplicated
     into a JS array, so adding a work means editing markup only.           */

  const lb       = $('#lb');
  const lbImg    = $('#lb-img');
  const lbTitle  = $('#lb-title');
  const lbDetail = $('#lb-detail');
  const tiles    = $$('.work__btn');

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

  const open = (i, from) => {
    opener = from;
    show(i);
    lb.showModal();
  };

  tiles.forEach((tile, i) => {
    tile.addEventListener('click', () => open(i, tile));
  });

  $('[data-lb-close]', lb).addEventListener('click', () => lb.close());
  $('[data-lb-prev]',  lb).addEventListener('click', () => show(index - 1));
  $('[data-lb-next]',  lb).addEventListener('click', () => show(index + 1));

  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); show(index - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
  });

  // showModal() moves focus into the dialog; put it back where it came from
  lb.addEventListener('close', () => {
    lbImg.removeAttribute('src');
    if (opener) { opener.focus(); opener = null; }
  });

  /* Safari has no dialog[closedby] yet — supply light-dismiss by hand.
     A click on the backdrop reports the <dialog> itself as the target, so
     compare the pointer against the dialog's own box to tell the two apart. */
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
     No backend yet (target.md §9). Validate, acknowledge, do not pretend to
     have stored anything.                                                  */

  const news = $('#news');
  const msg  = $('#news-msg');

  news.addEventListener('submit', (e) => {
    e.preventDefault();

    const field = $('#email');

    if (!field.checkValidity()) {
      msg.dataset.state = 'error';
      msg.textContent = 'Merci de saisir une adresse e-mail valide.';
      field.focus();
      return;
    }

    delete msg.dataset.state;
    msg.textContent = 'Merci. Écrivez-nous à omara@resone.africa en attendant la mise en ligne de la newsletter.';
    news.reset();
  });

  /* ── footer year ───────────────────────────────────────────────────── */

  $('#year').textContent = String(new Date().getFullYear());
})();
