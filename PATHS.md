# PATHS — Omp_Context_Manager repo map (single source of truth)

## Lock ownership (DISJOINT)

| lock | owns (write) | reads |
|---|---|---|
| A STORE | src/store/ · tests/belt.test.ts (store half) | TCM cm-db.ts + stores.ts (read-only port source) |
| B DECK | src/ui/ · src/cmd/ | pi-coding-agent tools.ts example + hooks/types.ts:113 |
| C WIRING | src/index.ts · src/hooks/ | extensions/types.ts events :1204-1212, :685, :674, :63-74 |
| D SEAL | src/seal/ · src/engines/ | TCM seal-v7.ts:125-229, carrier.ts:24-54, armada.ts:99-122 |

## Design of record

- reports/Omp_Context_Manager_ShowMe.md — the blueprint (master view, mechanisms, schema, waves)
- reports/Trident_Context_Manager_ShowMe.md — the port source report (TCM as built)
- reports/Notes_Phase2_Phase3_ShowMe.md — adjacent /notes system plan (copy; source lives at parent reports/)

## Port sources (read-only, absolute by intent)

- TCM: `/home/leviathan/OPENCODE_WORKSPACE/Shared Workspace Context/Trident_Agent/Active_Projects/trident-context-manager/src/`
- OMP SDK: `/home/leviathan/node_modules/@oh-my-pi/pi-coding-agent/src/`

## Ship docs (append-only)

- MIGRATION_MANIFEST.md — this migration only; future moves append new sections
- reports/W1-LIVE-SYSTEM.md — offline W1 scope and what still needs Leviathan or Jev
- reports/secret-scan.md — redacted gitleaks report, report only
- reports/w1-watched-red.txt · reports/w1-watched-green.txt — red-then-green transcripts

## Offline lane (W1)

| path | role |
|---|---|
| .github/workflows/ci.yml | GitHub-hosted `ubuntu-latest` (free runner): `bun test` + `tsc` |
| src/net/port-guard.ts | refuse 8090/18090; mocks bind `127.0.0.1:0` |
| tests/entry.test.ts | extension entry lists the seven action names |
| tests/port-guard.test.ts | planted judge-port cases and the ephemeral bind |
| bun.lock | frozen install for CI |
