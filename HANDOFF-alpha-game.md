# SayMyFood — closed-test page + Apple Fight game — developer handoff

Prepared 2026-09-08. Everything below is plain static HTML/CSS/JS: no build step, no framework, no bundler.
Drop the files on any static host (Cloudflare Pages, Netlify, nginx, GitHub Pages) and they work.

---

## 1. What this delivery contains

| Path (in the archive) | What it is |
|---|---|
| `alpha/test/rocket.html` | **The closed-test signup page — the accepted variant.** Rocket on the pad; on submit it lifts off. |
| `alpha/test/trace.html` | Alternative visual for the same page (logo S drawn by a moving spark). Not chosen — keep or delete. |
| `alpha/test/preview.html` | Internal chooser linking the two variants. **Do not deploy.** |
| `alpha/test/shared.css` | Styles shared by both variants of the signup page. |
| `alpha/test/shared.js` | i18n (EN/RU/ES/PT), language dropdown, e-mail validation, Supabase submit, success state. |
| `alpha/test/game/` | The Apple Fight browser game (index.html, game.js, art.js, ui.js, board.js, README.md). |
| `alpha/test/game-v1-base/` | Frozen earlier version of the game, kept as a rollback point. Not deployed. |
| `site.css` | The existing site stylesheet. Both pages depend on it — **already in the repo**, listed here only because the paths must resolve. |
| `brand/saymyfood-mark.png` | The logo used by the header, footer, rocket window. **Already in the repo.** |

### Path assumptions (important)

The pages reference the shared assets with relative paths, matching the current site layout:

```
/                       site root
├── index.html          existing landing
├── site.css            existing stylesheet          <-- referenced as ../../site.css
├── privacy.html  terms.html  delete-account.html    existing legal pages
├── brand/
│   └── saymyfood-mark.png                           <-- referenced as ../../brand/...
└── alpha/
    └── test/
        ├── rocket.html            <-- the signup page
        ├── shared.css  shared.js
        └── game/
            ├── index.html         <-- the game
            └── game.js  art.js  ui.js  board.js
```

If you mount the signup page at a different depth, fix the `../../` prefixes in `rocket.html` (4 refs) and `game/index.html` (3 refs). Nothing else contains absolute or hard-coded URLs except the Supabase endpoint.

---

## 2. The signup page (`alpha/test/rocket.html`)

### Purpose
The first page a prospective tester lands on. It explains what SayMyFood is, links to the landing page, and collects one thing: the e-mail of the user's **Google** account (Play only shows a closed test to accounts on the tester list).

### Behaviour
1. User types an e-mail and presses the button (or Enter).
2. Client-side validation: `/^[^@\s]+@[^@\s]+\.[^@\s]+$/` and length ≤ 254. On failure a localised error appears under the field; nothing is sent.
3. On success the rocket ignites and flies up (~1.3 s), the form fades out and the confirmation copy fades in.
4. The confirmation says: we will write within a day, the mail carries the install link and the access code, check spam. Plus: nothing to pay, no card, no auto-renewal.

### Backend call
```js
supabase.rpc('request_tester_access', { p_email, p_lang, p_website })
```
- `p_lang` — 'en' | 'ru' | 'es' | 'pt', the UI language at submit time.
- `p_website` — honeypot field, hidden off-screen; a filled value means a bot. **Server side must reject a non-empty `p_website`** (currently the client just forwards it).
- Expected return: `{ ok: true }`, or `{ ok: false, reason: 'busy' | ... }` — 'busy' shows a rate-limit message, anything else shows the invalid-address message.
- The Supabase JS client is imported dynamically from jsdelivr **only when the user submits**, so the page itself has no third-party requests on load.

Credentials currently in `shared.js`:
```
SUPABASE_URL = https://dwbytualmguxxtceywtg.supabase.co
SUPABASE_KEY = sb_publishable_2hGC7tD47epR2YYFR-HyCg_Bmqyc5F9   (publishable anon key)
```

### Demo mode — read this before you test
```js
const LIVE = /(^|\.)saymyfood\.app$/.test(location.hostname);
const DEMO = /[?&]demo/.test(location.search) || !LIVE;
```
Off the production hostname the submit **does not touch the network**: it waits 500 ms, plays the animation and shows the success state, so the page can be reviewed locally or on a preview URL. On `saymyfood.app` the real RPC fires. Adding `?demo` forces demo mode even in production — useful for showing the animation to someone. If you move the site to another domain, update the `LIVE` regex or the form will silently stop submitting.

### i18n
All copy lives in the `T` object at the top of `shared.js` — four languages, one flat key set. Language is picked from `localStorage.smf_lang`, else `navigator.language`, else English; the dropdown writes the choice back to `localStorage` so the legal pages stay in sync. Adding a language = one more entry in `T` plus one `<button data-lang>` in the markup.

### Accessibility / motion
`prefers-reduced-motion` is honoured: the rocket simply fades instead of flying, embers do not spawn. The status message is a `role="status"` live region.

---

## 3. The iOS consolation prize → the game

At the bottom of the signup page there is a dashed block: *"On an iPhone? The closed test is Android-only for now… a quick apple fight →"* linking to `game/index.html`. It exists because we cannot let an iPhone user into a Play closed test, and a dead end felt worse than a joke. Localised in all four languages.

## 4. Apple Fight (`alpha/test/game/`)

A hand-rolled canvas game, ~700 lines total, zero dependencies. Logical field is a fixed **960 × 540**; the canvas is CSS-scaled to fit, so all coordinates in the code are logical pixels.

### Files
- **index.html** — shell: header, 16:9 frame, five overlay screens (intro / round clear / final / leaderboard / scoring table), touch pad, all CSS.
- **game.js** — the engine: state, physics, enemy AI, rounds, scoring, HUD. Exposes `window.GAME`.
- **art.js** — every drawing routine (`window.ART`): characters, trees, fence, apple, hearts, debris.
- **ui.js** — i18n, screen flow, keyboard and touch input, leaderboard rendering.
- **board.js** — leaderboard read/write (`window.BOARD`).

### Rules
- Two throwers either side of a fence: the player (boy or girl) on the left, a moustached neighbour on the right.
- 5 hearts and 5 apples each. A hit costs one heart and grants 0.9 s of invulnerability.
- Apples are finite: stand by your own tree and hold *Pick* to gather them one at a time — you cannot dodge while gathering, which is the core risk/reward loop.
- Throwing is a **charge**: hold the button, release to throw. Power sets the arc; everyone's maximum range is ~740 logical px (from your own tree to the neighbour's).
- **Two apples colliding in mid-air destroy each other** with a burst.
- Three rounds. The neighbour gets much faster each round (speed 200 → 300 → 420) and slightly more accurate (aim spread 52 → 42 → 32 px, reaction 0.8 → 0.6 → 0.45 s). Deliberate: the speed jump is what the player *sees*, the accuracy creep is what actually raises difficulty.
- Hero choice is cosmetic-plus: the girl moves faster (320 vs 270), the boy reaches full charge faster (0.62 s vs 0.82 s). Same range for both.
- **Hardcore** (checkbox on the intro screen): hearts do **not** refill between rounds, and the grand total is **doubled** after round three. The chosen hero gains red-pink eyes and a red hat (boy) or bow (girl) — the same #F2717A used for hardcore names on the leaderboard.

### Scoring (single source of truth: `AW` in game.js)
```js
const AW = { hit:200, clash:50, heart:200, round:[500,700,1000], speed:15, speedFrom:120 };
```
| Event | Points |
|---|---|
| Hit on the neighbour | +200 (floating "+200" at the point of impact) |
| Two apples colliding in mid-air | +50 |
| Each heart still held at round end | +200 |
| Round cleared | +500 / +700 / +1000 |
| Speed bonus | (120 − round time in s) × 15, never negative |
| Hardcore | whole total × 2 after round 3 |

The speed window counts down in the HUD (2:00, turning red under 20 s). The bonus uses tenths of a second, so 63.1 s and 63.2 s give different scores — that is intentional, it keeps the leaderboard from clumping. The round-clear screen shows every line, including the bonus as a literal formula `(120 − 63.1) × 15 = +854`, points earned during the round, the round total and the running total.

### Controls
- Keyboard: `← →` or `A D` move · hold `Space` and release to throw · hold `E` (or `↓`/`S`) by your tree to gather.
- Touch: four buttons overlaid on the corners of the field, shown only for `pointer:coarse`. Portrait phones get a "turn your phone sideways" screen — the field is 16:9 and unplayable in portrait.
- `pointerdown`/`pointerup` with `touch-action:none`, so holding to charge works on mobile. Window blur releases all inputs.

### Leaderboard — needs one SQL migration
`board.js` talks to Supabase over plain REST (no client library). **Until the table exists the game silently falls back to `localStorage`** and says so on the board screen, so it is safe to deploy before the migration.

```sql
create table if not exists public.apple_scores (
  id bigserial primary key,
  name text not null check (char_length(name) between 1 and 24),
  score integer not null check (score between 0 and 1000000),
  hero text check (hero in ('boy','girl','boy-hard','girl-hard')),
  created_at timestamptz not null default now()
);
alter table public.apple_scores enable row level security;
create policy "apple_scores read"   on public.apple_scores for select to anon using (true);
create policy "apple_scores insert" on public.apple_scores for insert to anon with check (true);
create index if not exists apple_scores_score_idx on public.apple_scores (score desc);
```

Notes for the review:
- Insert is open to `anon` — anyone can POST an arbitrary score. Acceptable for a joke leaderboard; if it gets abused, move the insert behind an RPC that rate-limits by IP, the same shape as `request_tester_access`.
- Names are not moderated and not deduplicated, by design. Empty name renders as a localised "Unknown".
- `hero` carries the mode, hence the `-hard` suffixes; hardcore rows render in red.
- The board reads `?select=name,score,hero,created_at&order=score.desc&limit=500`.

### Known limitations / deliberate omissions
- No sound.
- No pause; opening the leaderboard mid-round pauses the loop, closing resumes.
- No persistence of an unfinished run — refresh restarts from the intro.
- The enemy AI is a small state machine (gather / fight), not a planner; it does not try to bait or camp the tree.
- `GAME.tick(dt)` and `GAME.dbg(side)` exist for manual stepping and for damaging a side — they were used for testing and are harmless to leave in.

---

## 5. Deployment checklist

1. Copy `alpha/` into the site root, preserving structure. Delete `alpha/test/preview.html` and `alpha/test/game-v1-base/` if you do not want them public (both are harmless but internal).
2. Decide whether to keep `alpha/test/trace.html`. If not, delete it — `shared.css`/`shared.js` are shared and must stay.
3. Confirm `site.css` and `brand/saymyfood-mark.png` resolve from `alpha/test/` as `../../`.
4. Run the `apple_scores` migration above.
5. Verify `request_tester_access` rejects a non-empty `p_website` and rate-limits by IP.
6. Check the `LIVE` hostname regex in `shared.js` matches the production domain, then submit one real address end-to-end and confirm the row lands.
7. Open the game on a real Android phone in landscape: four control buttons visible, charge-and-release works, portrait shows the rotate prompt.

## 6. Where the copy lives

Nothing is hard-coded in markup. Signup page: `T` in `alpha/test/shared.js`. Game: `T` in `alpha/test/game/ui.js`. Both are flat `{ en, ru, es, pt }` objects; keys are shared across languages, so a missing key falls back to the key name (visible immediately in testing).
