'use client';

import { useState } from 'react';
import { T, useLang } from './Lang';

// No backend yet (target.md §9): validate, acknowledge, don't pretend to store it.
export function Newsletter() {
  const en = useLang().lang === 'en';
  const [msg, setMsg] = useState<{ text: string; error: boolean }>({ text: '', error: false });
  return (
    <form
      className="news"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const f = e.currentTarget;
        const field = f.elements.namedItem('email') as HTMLInputElement;
        if (!field.checkValidity()) {
          setMsg({ text: en ? 'Invalid email address.' : 'Adresse e-mail invalide.', error: true });
          field.focus();
          return;
        }
        setMsg({ text: en ? 'Thank you — meanwhile, write to us at omara@resone.africa.' : 'Merci — écrivez-nous à omara@resone.africa en attendant.', error: false });
        f.reset();
      }}
    >
      <label htmlFor="email"><T fr="Recevoir des nouvelles de l'atelier" en="Get news from the studio" /></label>
      <div className="news__row">
        <input id="email" name="email" type="email" autoComplete="email" required placeholder={en ? 'your@email.com' : 'votre@email.com'} />
        <button type="submit"><T fr="S'inscrire" en="Subscribe" /></button>
      </div>
      <p className="news__msg" role="status" aria-live="polite" data-state={msg.error ? 'error' : undefined}>{msg.text}</p>
    </form>
  );
}
