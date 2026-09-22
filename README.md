# St. Kevin's GAA Club Website

Red & black club site for St. Kevin's GAA (Staplestown, Co. Kildare), with a
built-in admin panel so non-technical club members can edit everything.

## Running locally

```bash
npm install
npm run dev    # site at http://localhost:5173
npm run cms    # admin backend — run in a second terminal
```

Then open **http://localhost:5173/admin/index.html**, click **Login** (no
password locally) and edit away. Publishing writes to `content/` and the site
updates instantly.

## What's editable through /admin

| Section | What it controls |
| --- | --- |
| News Articles | One entry per article: headline, date, category, photo, text |
| Club Lotto | Current jackpot, next draw, and the list of draw results/winners |
| Fixtures & Results | Upcoming games and recent scores |
| Training Schedule | Weekly sessions per team |
| Photo Gallery | Photos + captions |
| Social Wall | The posts shown on the Social page |
| Club Details & Sponsors | Contact info, social links, sponsor list |

All content lives in `content/` as JSON; uploaded photos go to `public/uploads/`.

## Syncing real data

```bash
npm run sync:fixtures   # fixtures & results from kildaregaa.ie
npm run sync:lotto      # lotto jackpot, draws & winners from stkevinsgfc.ie
```

- `sync:fixtures` pulls St. Kevin's fixtures and results from the club's team
  page on the official Kildare GAA website and overwrites `content/fixtures.json`.
  Source: https://kildaregaa.ie/fixtures-results/team/st-kevins/798cebcc-b326-17ad-9412-3450fd131979/
- `sync:lotto` pulls the current jackpot, next draw date, play-online link and
  recent draw history from the club's ClubZap site and overwrites
  `content/lotto.json` (keeping the `entriesClose` line from /admin).
  Source: https://stkevinsgfc.ie/draws

Both replace manual /admin edits to their sections when run. Once the site is
on GitHub, these can run automatically on a nightly schedule via a GitHub
Action. Both fail loudly (leaving the previous data untouched) if the source
page layout changes.

## Builds

```bash
npm run build           # production build → dist/
npm run build:preview   # single-file review build → dist-preview/ (open index.html directly)
```

## Going live (one-time setup) — everything on free tiers

Note: Netlify's old Identity/Git Gateway login is deprecated for new sites,
so editor logins use **DecapBridge** (free) instead.

1. Push this project to a GitHub repository (public keeps GitHub Actions
   unlimited and free).
2. On [netlify.com](https://netlify.com) (free tier): **Add new site → Import
   from GitHub**. Build settings are read automatically from `netlify.toml`.
3. Editor logins: DONE — DecapBridge site linked to this repo (backend config
   in `public/admin/config.yml`). Invite/remove editors by email at
   [decapbridge.com](https://decapbridge.com) → Manage collaborators.
   ⚠️ The GitHub access token given to DecapBridge expires **September 2027**
   — regenerate it at github.com/settings/personal-access-tokens (Contents +
   Pull requests, read/write, repo St-Kevins-GAA only) and paste the new one
   into the DecapBridge site settings.
4. Get Involved form: Netlify → Forms → enable, and add a notification email
   to the club secretary.
5. The nightly fixtures/lotto sync (`.github/workflows/sync.yml`) starts
   running automatically once the repo is on GitHub.

After that, every Publish in the admin commits to GitHub and Netlify redeploys
the site automatically (live in ~1 minute). Total running cost: €0 — the only
optional cost is a custom domain (e.g. stkevinsgaa.ie, ~€25/year).

## Verification scripts

Playwright-based checks used during development (`node <script> <output-dir>`):

- `shoot.mjs` — screenshots every page of the dev site
- `check-dist.mjs` — verifies a build works from `file://`
- `check-cms.mjs` — verifies admin loads and content pipeline works
- `check-publish.mjs` — end-to-end publish through the admin UI
