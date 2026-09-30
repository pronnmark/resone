# Deploy and hosting

Live at **https://resone.hostbun.cc** — Coolify on hostbun.

| | |
|---|---|
| Coolify app | `acvae9ersrbyxdoasohtyru3` (project `resone` / `ktu46efynjfp1itlniys3azb`) |
| Server | `hostbun` — `s7mov7fdpeuluwwd0gmvcols` |
| Source | `git@gitlab.hostbun.cc:2224/devdashco/resone.git`, branch `main`, **private** |
| Build | `dockerfile` → `registry.hostbun.cc/resone:<sha>` |
| TLS | Let's Encrypt, auto-renewed by the Coolify proxy |

`*.hostbun.cc` is a wildcard A record at the Coolify proxy, so a new subdomain needs **no
DNS work** — set the domain on the app and the proxy and certificate follow.

## The brand domain is not ours to point

`resone.africa` is registered (GoDaddy, created 2025-12-07, expires 2027-12-07) and is
**already serving a GoDaddy website-builder site** titled "Resone Africa". Its
nameservers are `ns03/ns04.domaincontrol.com` and its MX is `secureserver.net`, which is
where the studio's `@resone.africa` mail lives.

So `resone.hostbun.cc` is the FQDN for now. Moving to `resone.africa` needs the studio's
GoDaddy DNS access and **would replace the site they already have there** — that is their
call, not an agent's. When it is approved: add the domain to the Coolify app *after* DNS
points at the proxy, never before, or Let's Encrypt will fail issuance and burn attempts
against the rate limit. Do not touch their MX records.

Deploy: `coolify deploy uuid acvae9ersrbyxdoasohtyru3`, then poll
`coolify deploy get <deployment-uuid>` to a terminal state. Pushing to `main` does not
deploy by itself — this app has no push trigger, and that is deliberate: one owner.

**The Dockerfile's COPY list is a security boundary, not a convenience.** The repo holds
`target.md`, `AGENTS.md` and `reference/` (full Canva page exports with
pricing and internal notes). Serving the repo root would publish all of it. Verified
404 in production: `target.md`, `AGENTS.md`, `package.json`, `Dockerfile`, `nginx.conf`,
`reference/`, `.mcp.json`. **Add a page → add it to the COPY list**, and re-check those
404s afterwards.

Two gotchas that cost time:

- The Coolify API rejects `ssh://git@host:port/path` for a deploy-key app. It wants
  `git@host:port/path` — `user@host:path` form.
- The repo needs the `coolify-deploy` deploy key enabled on it in GitLab, or the clone
  fails. Copy the key from an existing `devdashco` project.

## Handing a preview to a human

The browser is on **pmac**; anything served here is on **pbox**. A `localhost` URL in a
reply is useless to the user. Open a loopback SSH forward on pmac, verify the URL from
pmac, and hand over that address — never a bare pbox `localhost` link, and never launch a
browser on pbox.
