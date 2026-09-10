# saymyfood-web — permanent rules

This repository is the SayMyFood marketing site plus the Apple Fight browser game
under `test/alpha/game/`. These rules hold for every session, not just one task.

## What this repository is

A plain static site. Files are served exactly as they sit on disk — GitHub Pages
puts them on the wire unchanged. There is no build step, no bundler, no
transpiler, no framework.

- **Never** add dependencies, `package.json`, `node_modules`, build tooling, or
  CDN imports. If a feature needs a library, it does not belong here.
  (The one existing exception is `auth/callback/index.html`, which imports the
  Supabase client from a CDN as an ES module. Do not extend that pattern.)
- Plain HTML, CSS and JavaScript that a browser can run as-is.

## Cache busting: one hand-bumped number

Every local stylesheet and script reference on every page carries the same version
marker — `site.css?v=1`, `i18n.js?v=1`, `../../apple.js?v=1` and so on. Without it a
returning visitor keeps the cached copy of a changed `.css` or `.js` file.

- **Bump the number on every deploy that changes a `.css` or `.js` file**, on every
  page at once: `?v=1` becomes `?v=2` everywhere. It is one number for the whole
  site, not a per-file version — a single find-and-replace of `?v=N"` is the whole job.
- The pages that carry it: `index.html`, `privacy.html`, `terms.html`,
  `delete-account.html`, `auth/callback/index.html`, `test/alpha/index.html`,
  `test/alpha/game/index.html`. A new page or a new `<link>`/`<script>` gets the
  current number too.
- No hashes, no build step, no tooling. A hand-bumped integer is the entire mechanism.

## Working rules

- **After every edit to a `.js` file, run `node --check <file>`** and quote the
  result. This is the only syntax gate that exists here — there is no test
  framework, and none should be created.
- **Commit per logical unit.** Stage with `git add <file>` naming each file.
  Never `git add .` — untracked task files and run journals must not slip in.
- **`git push` is the owner's job and is forbidden to the agent.** So is every
  `eas` command, `expo publish`, and any build or deploy command.
- **Never write to Supabase** from a task: no SQL, no RLS changes, no schema
  edits. Schema work is done by the owner before the run starts.

## Four languages, always

Every user-facing string exists in **en, ru, es and pt** (pt is pt-BR). Adding one
UI string means adding four entries. Mark the ru/es/pt versions with a comment
saying `owner will proofread`. A missing key must render as the key name, never
as an empty string — that is what makes a gap visible.

The chosen language is shared across the whole site through the `smf_lang`
localStorage key.

## The task file and the journal

- The task file for this repository is **`prompt-web.md`**. It is gitignored and
  must never be committed. The app repository NutrientAI has its own `prompt.md`;
  the names differ on purpose, because a task once got pasted into the wrong
  project and run with stale text.
- The journal is **`RUN_LOG.md`**, also gitignored. It is **appended to**, never
  overwritten. Each numbered block records what was done, which files changed,
  what proves it works, and the short commit hash. A skipped block says so and
  why.
- A finished run ends with the exact line `RUN_STATUS: ALL_BLOCKS_COMPLETE` at the
  end of `RUN_LOG.md`. The launcher watches for it.

## The two Supabase projects

The site talks to two separate Supabase projects. Do not confuse them.

| Project ref | What lives there | Who on the site uses it |
| --- | --- | --- |
| `rdzpmomnzacmfortgqad` | `apple_scores` table and the `submit_score` RPC | `test/alpha/game/board.js` — the Apple Fight leaderboard, read and write |
| the production app project (`dwbytualmguxxtceywtg`) | `tester_requests` table, the `request_tester_access` RPC, the `tester-notify` edge function | the site's tester signup, and `auth/callback/index.html` for email confirmation and password recovery |

The game project holds nothing but scores. The app project holds real user data —
be correspondingly careful.

Both publishable keys are in the source on purpose: they ship inside every copy of
the client anyway. Row-level security, not secrecy of the key, is what protects
the data.

## Launching an unattended run

    powershell -ExecutionPolicy Bypass -File .\run_night_web.ps1

The launcher archives any previous `RUN_LOG.md` into `night_logs/`, does a short
preflight call to check the agent answers, then feeds `prompt-web.md` to
`claude --dangerously-skip-permissions` and retries with `--continue` until the
completion marker appears.
