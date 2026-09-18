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
