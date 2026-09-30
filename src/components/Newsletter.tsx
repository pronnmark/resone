'use client';

import { useState } from 'react';

// No backend yet (target.md §9): validate, acknowledge, don't pretend to store it.
export function Newsletter() {
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
          setMsg({ text: 'Adresse e-mail invalide.', error: true });
          field.focus();
          return;
        }
        setMsg({ text: 'Merci — écrivez-nous à omara@resone.africa en attendant.', error: false });
        f.reset();
      }}
    >
      <label htmlFor="email">Recevoir des nouvelles de l&apos;atelier</label>
      <div className="news__row">
        <input id="email" name="email" type="email" autoComplete="email" required placeholder="votre@email.com" />
        <button type="submit">S&apos;inscrire</button>
      </div>
      <p className="news__msg" role="status" aria-live="polite" data-state={msg.error ? 'error' : undefined}>{msg.text}</p>
    </form>
  );
}
