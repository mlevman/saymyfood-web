# Apple Fight — leaderboard table

Run once in the Supabase SQL editor (same project as `request_tester_access`):

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

Until the table exists the game keeps scores in the browser's localStorage and says so on the board screen.

Files: `index.html` (screens, controls), `game.js` (engine), `art.js` (line art), `board.js` (scores).
Previous version (v1, accepted as the base): `../game-v1-base/` — a full copy; to roll back, copy its four files over this folder.
Scoring: hit on the neighbour +200 · apples colliding mid-air +50 · each heart kept at round end +200 · round cleared 500 / 700 / 1000 · speed bonus (120s − round time) × 15, counted down in the HUD · hardcore doubles the total after round 3.

Controls — keyboard: ← → / A D move, hold **Space** and release to throw, hold **E** or ↓ by the tree to pick apples. Touch: on-screen buttons.
