# Omp_Context_Manager — MIGRATION MANIFEST

Date: 2026-09-18. Operator order: "create a proper git repo and project
workspace folder for omp context manager - migrate everything into it
properly". Convention: Thanatos tree + jarvis-project-git-shelf
(one folder = one repo; nested repo; parent ignores it like
`PLUTUS/agent/`).

## New root

`/home/leviathan/JARVIS_WORKSPACE/Shared_Workspace/Omp_Context_Manager/`
Repo: nested `.git`, branch `omp-cm/main` (this session's cwd stays
Shared_Workspace; no /move ordered).

## Source → dest (SHA-gated, 0 mismatches)

| source | dest | sha256 (before = after) |
|---|---|---|
| `reports/Omp_Context_Manager_ShowMe.md` | `reports/Omp_Context_Manager_ShowMe.md` | `869b4fea…59b8cf` |
| `reports/Trident_Context_Manager_ShowMe.md` | `reports/Trident_Context_Manager_ShowMe.md` | `c1265ff8…440f43` |
| `reports/Notes_Phase2_Phase3_ShowMe.md` | `reports/Notes_Phase2_Phase3_ShowMe.md` | `0ef99247…5395c9` (COPY, original kept — notes system lives outside this repo) |

Move method: plain `mv` (parent repo does not track these files —
`git mv` refused "not under version control"; they were untracked).
Hashes taken before (this session) and after — all match.

## New files (scaffold, this migration)

`package.json` · `tsconfig.json` · `.gitignore` · `src/index.ts` ·
`src/tool/cm.ts` · `src/store/db.ts` · `src/seal/carrier.ts` ·
`src/hooks/wiring.ts` · `src/ui/deck.ts` · `src/cmd/deck.ts` ·
`src/engines/advisors.ts` · `tests/belt.test.ts`
Proof: `bun x tsc --noEmit` exit 0 · `bun test` 5/0/7.

## Uncommitted at migration

Parent tree dirty before and after (GM_Cards modifications, untracked
dirs) — untouched by this migration. Baseline commit covers ONLY
Omp_Context_Manager/. No commit made in the parent repo.

## Exclusions

- `node_modules/` — absent, never created (contracts only).
- `*.sqlite*` — no store yet (wave A creates it).
- Notes ShowMe original kept at `reports/` — OMP-CM holds a copy.
- Old location husks: `reports/Omp_*` and `reports/Trident_Context*`
  no longer exist at parent (moved); nothing else was in scope.

## Path fixes

None — scaffold uses relative imports only; reports reference absolute
TCM/OMP source paths (read-only port sources, intentionally absolute).
