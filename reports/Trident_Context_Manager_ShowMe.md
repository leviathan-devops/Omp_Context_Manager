# TRIDENT CONTEXT MANAGER — FULL REPORT

Target: the REAL tree at `Trident_Agent/Active_Projects/…`
Date: 2026-09-17. Status: BUILT (v5, 2026-09-09). Mode: EXPLAIN + PLAN.
Correction: the 22:49 entry scoped the wrong base and said ABSENT.
The tree EXISTS — verified `ls` this turn, every file below read.

## Verbatim requirements (your words)

- "get full context on trident context manager from opencode
  shared workspace trident agent active projects"
- "analyze that against omps hook surface and sdk"
- "create an omp context manager tool that works exactly the same
  way … subagent sessions as nodes on a graph or cards in a deck"
- "persistent and long horizon use … access sessions from days or
  weeks ago by token + category easily"
- "floating ui + deck of pinned subagents for top-of-context
  visibility … primary set of subagents through a session"
- "team based execution strategy … enforced with tools"

## ONE-PARAGRAPH SUMMARY

The trident-context-manager is a complete opencode 1.14.51 plugin
combining Epoch Seal v7 with Hive Mind 4.0 in a wave-manager-shaped
chassis: one 10-table master sqlite per workspace
(sessionKey-scoped on every path), a 7-key hook plane
(observe-only sensors + 2 actuators), a 7-stage seal kernel
(FREEZE→CENSUS→CLUSTER→DISTILL→RENDER→VERIFY→DELIVER+PERSIST)
with the armada classifier and the 59-template distiller, an
18-action belt-gated tool surface, advisory engines
(lexicons/DIM/meta/capture/quality/model-client), a 5-phase
checkpoint pipeline, canon writers, and a loss harness — proven
at 402/0/1553 battery, tsc 0, FR7 1M-token replay, 2 container
drives, 2 dogfoods. It outputs one thing: the carrier block in
the next window, plus checkpoints, canon, and loss evidence.

## THE LIFECYCLE MAP

```
┌────────────────────────────┐
│ HOOK PLANE 7 keys          │
│ capture gate seal carry    │
└─────────────┬──────────────┘
              ▼
┌────────────────────────────┐
│ 18-ACTION TOOL             │
│ belt allowlist branches    │
└─────────────┬──────────────┘
              ▼
┌──────────────────────┐
│ SEAL KERNEL          │
│ 7 stages + seams     │
└──────────┬───────────┘
           ▼
┌────────────────────────────┐
│ CARRIER +PERSIST           │
│ next window + sqlite       │
└────────────────────────────┘
```

Layer flow: hook plane W=30 col 30 · tool W=30 col 30 ·
kernel W=24 col 24, junction col 12 · deliver W=30 col 30.

## THE ARCHITECTURE — per module

### 1. ENTRY + BINDING (index.ts 23L, binding.ts 29L)

```
┌──────────────────────┐
│ ENTRY default only   │
│ thin, no side fx     │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ BINDING hooks+tools  │
│ Record keyed         │
└──────────────────────┘
```

W=24 col 24 both, junction col 12. Interfaces: default
plugin fn only (any extra named export drops the plugin —
the loader law); `createContextManagerBinding(deps)` →
`{hooks, tools:{[CM_TOOL_NAME]:tool}}`. Failure: array
tool value silently no-ops (the S1 finding). Anchors:
index.ts:1-23, binding.ts:1-29.

### 2. TOOL CORE (context-manager.ts 743L, 18 actions)

```
┌────────────────────────────┐
│ CM_ARGS_SHAPE flat         │
│ allowlist belt top         │
└─────────────┬──────────────┘
              ▼
┌────────────────────────────┐
│ BRANCHES pre|sess scoped   │
│ checkpoint pipeline        │
└────────────────────────────┘
```

W=30 col 30 both. Actions: compaction-prep status health
report pin unpin heal resume release config
post-compaction-warhead update-canon-docs prune-tool-data
hive-capture hive-forget save-checkpoint generate-report
task-queue (`tool/context-manager.ts:55-59`). Config/health/
release run pre-session; the rest scope via scopeStores +
sessionKey regex (`cm-db.ts`). Failure: belt refusal on
bad action/arg; session-scoped without key refuses LOUD.

### 3. MASTER DB (cm-db.ts 238L + stores.ts 561L)

```
┌────────────────────────────┐
│ cm-db WAL pool retry       │
│ ONE file per workspace     │
└─────────────┬──────────────┘
              ▼
┌────────────────────────────┐
│ 10 TABLES sessionKey PK    │
│ seal 5 chassis 4 queue 1   │
└────────────────────────────┘
```

W=30 col 30 both. WAL + busy5000 + NORMAL + 3-retry +
IMMEDIATE + per-path refcount pool (the ★ slot-steal fix).
Every table `sessionKey TEXT NOT NULL` composite PK
(`stores.ts:70-125`). Tables: packets checkpoints
active_pins store_index events_ledger epoch_registry
registry_calls manifest tracker task_queue. Live rows
(copied sqlite, counted via bun this turn): packets 6,
checkpoints 68, pins 3, index 6, ledger 204, rest 0.
Anchors: stores.ts:35-68 row types, :70-125 DDL.

### 4. SEAL KERNEL (seal-v7.ts 247L, 7 stages)

```
┌──────────────────────┐
│ FREEZE armada P/W/K  │
│ CENSUS CLUSTER       │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ DISTILL 59 matrix    │
│ RENDER carrier       │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ VERIFY DELIVER       │
│ dual ALWAYS          │
└──────────────────────┘
```

W=24 col 24, junctions col 12. Stage law (`seal-v7.ts:125`):
spans → classify → ingest (DROP skipped; empty graph +
spans THROWS COMPACT_CENSUS_EMPTY) → census → clusters(2)
→ distill (mass law cap; demands + zero warheads THROWS)
→ pins (byte-exact + budget demote) + pointers
(resolvability-gated, DANGLING loudly) → 5.5 canon stub
(MANUAL degradation) → 5.6 loss seam → verify totals →
DELIVER dual ALWAYS (steer + carry) + persist packets +
checkpoint(mode AB) + seal ledger. Budget register:
floor 2000 / ceiling 25000 / divisor 400 / min 12 /
max 60 / glue 400 (`seal-v7.ts:48-70`). Anchors:
125-141 freeze, 143-155 census/cluster/distill,
157-188 render, 190-195 seams, 196-218 verify/deliver.

### 5. ARMADA (armada.ts 127L) + GRAPH (146L)

Classifier: FAMILIES_V1 6 families (ruling/demand/gate/
decision/bug/work) — score = base + hits×0.18 + kindBonus
0.25 − opposed×0.3; ADMIT 0.42; band [0.45,0.60]; zero
hits + no bonus = family does not fire (`armada.ts:99-122`).
Graph: 10 node kinds P/W/K/S/DROP, 20k cap, P never
evicted — ingest/link/resolveDemand/census/clusters/
frontierDemands. Detector-only law: regexes detect, the
score + orchestrator decide.

### 6. DISTILLER (210L) + CARRIER (54L)

```
┌──────────────────────┐
│ 59 MATRIX triggers   │
│ fill 60 target 36    │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ CARRIER 3 sections   │
│ verbatim laws where  │
└──────────────────────┘
```

W=24 col 24, junction col 12. Matrix 59 rows +
TEMPLATE_IDS; trigger60/target36/30-90tok. `renderCarrier`
(`carrier.ts:24-42`): `## VERBATIM STATE` pins with why,
`## CONTINUITY LAWS` warheads, `## WHERE THINGS LIVE`
pointers; markers `[EPOCH-CARRIER epoch=E]`…
`[END-CARRIER]`. `pinIntegrity` = sha16 match + text
match + why non-empty (`carrier.ts:52-54`).

### 7. HOOKS (7-key, compaction-hooks.ts:158-166)

Keys: `event` observe · `tool.execute.before` gate ·
`tool.execute.after` harvest · `session.compacting` seal ·
`messages.transform` carrier · `autocontinue` arm ·
`chat.message` observe user-text. Gate
(`context-gate.ts` 388L): HIGH→BLOCK, LOW→WARN/ALLOW,
grace ALLOW; BLOCK propagates as thrown
`{action:BLOCK, code:CM_*}` (never swallowed).
Capture (`capture-plane.ts` 324L): bound 5000
drop-oldest, live 400, digest 120, 50ms/60ch, identity
guard first, evidence JSONL per fire. Compacting
(`compacting.ts` 166L): auto-seal ONCE per session,
CM_AUTO_SEAL=1 opt-in, never throws. Carrier
(`carrier-plane.ts` 198L): APPEND-only pending list,
most-recent-first render, deliver strip+unshift+consume,
heal once.

### 8. ENGINES (advisory, never hot-path)

```
┌────────────────────────────┐
│ LEXICONS 6 registers       │
│ DIM META CAPTURE QUALITY   │
└─────────────┬──────────────┘
              ▼
┌────────────────────────────┐
│ ADVISE via carrier+seal    │
│ model key env only         │
└────────────────────────────┘
```

W=30 col 30 both. Lexicons (failure 30KB flow 16.6
storage 13.5 meta 10.8 relevance 10.5 loop 10KB, eval
A-first). DIM: fire_score product, thresholds
0.6/0.75/0.6, cooldowns, advisory-only consult. Meta:
HALT>SUPPRESS>ESCALATE via carrier, sqlite-only input.
Model: deepseek-v4-flash, retries 429/5xx, breaker 3/60s,
key env-only. Capture: gold bar conf≥0.75, Jaccard 0.6,
caps 400/300/500. Quality: 7 checks, audit-only.

### 9. CHECKPOINT + CANON + LOSS

Pipeline 326L: P1 gather sync → batch P2/P3/P4a ONE
allSettled → P4b merge → manifest LAST → P5 report.
Ship 5 docs atomic; canon 11 docs dual-gen (legacy
graph + truth Phase-3, cap 4/seal); loss census/survival
(byte-exact only) / heal-loop>2 on the ledger bus.

## TREES

File tree (shown=19 total=52 capped=33, dir list):

```
┌────────────────────────┐
│ src/                   │
├────────────────────────┤
│ ├─ index bind entry    │
│ ├─ tool/ 10 action fab │
│ ├─ hooks/ 6 gate+carry │
│ ├─ seal/ 11 kernel db  │
│ ├─ checkpoint/ 6 pipe  │
│ ├─ engines/ 9 + 7 lex  │
│ ├─ autopilot/ canon    │
│ └─ harness/ loss       │
└────────────────────────┘
```

W=26 col 26. Call tree — the seal hot path:

```
┌──────────────────────┐
│ runSealV7            │
│ seal/seal-v7.ts:125  │
└───────────┬──────────┘
            ▼
  classifySpan armada.ts:99
    graph.ingest session-graph
      distill distiller
        renderCarrier carrier.ts:24
          writePackets stores.ts
```

## RUNTIME TRACE — one auto-seal firing

TIMELINE: CM_AUTO_SEAL=1 · buffer filling (50ms
batches, evidence JSONL per fire) · threshold 0.8 hit.

STEP 1 — CAPTURE (event hook):

```
┌────────────────────────────┐
│ capturePlane(event)        │
│ harvestSpan sid 400ch max  │
│ counters text/toolAfter++  │
│ evidence line appended     │
└────────────────────────────┘
```

W=30 col 30. STEP 2 — GATE (tool.execute.before):

```
┌────────────────────────────┐
│ contextGateBefore in/out   │
│ HIGH→throw BLOCK CM_*      │
│ LOW→WARN grace→ALLOW       │
│ → propagates, no swallow   │
└────────────────────────────┘
```

STEP 3 — ROUTING (seal vs skip):

```
┌────────────────────────────┐
│ Q1: threshold? YES 0.8+    │
│ Q2: sealed? NO once-guard  │
│ Q3: budget? EPOCHS left    │
│ → runSealV7, not skip      │
│ IF sealed → skip silently  │
└────────────────────────────┘
```

STEP 4 — SEAL (numbered): 1 freeze+ingest 2 census
3 clusters(2) 4 distill mass-cap 5 render pins+pointers
5.5 canon stub MANUAL 5.6 loss census 6 verify totals
7 deliver dual + persist + ledger. STEP 5 — DELIVERY:
carrier-plane `deliverCarrier` strip-stale + unshift +
consume; autocontinue arm fires warhead.

OBSERVER (quiet case): hooks observe-only — no prompts,
no aborts, no injects (cron grep proves 0). Grace law:
store unreadable → ALLOW + repair later. Empty spans →
ALLOW. Escalation: BLOCK only on HIGH pin/pair/artifact.

## THE BUG LEDGER (v5: 10, verbatim evidence)

| # | bug | fix | evidence |
|---|---|---|---|
| 1 ★ | slot-steal closed handle | refcount pool | 402/0 |
| 2 | truth count -1 via pipe | file-redirect | 6/0/34 |
| 3 | TS1117 duplicate op key | merged shape key | tsc 0 |
| 4 | recentTasks ms ties | id DESC tiebreak | 13/13 |
| 5 | SF-AST /tmp literals | mkdtemp synthesize | files landed |
| 6 | comment-only catch | real logging | accepted |
| 7 | st-cm-2 stale rename | →compaction-prep | PASS |
| 8 | st-cm-11 stale autoseal | inverted assert | PASS |
| 9 | manifest ghost (spec lost) | as-built 1164L regen | gaps [] |
| 10 | 17-vs-18 arithmetic | +task-queue = 18 | count-asserted |

```
┌────────────────────────────┐
│ ★1 SLOT-STEAL              │
│ single cache killed peer   │
│ fix: Map path→refcount     │
│ proof: sandbox+402/0       │
└────────────────────────────┘
```

W=30 col 30. Root mechanism: `openCmDb` held ONE slot —
a second `Stores` on another root closed the first's
live handle mid-seal ("Database has closed"). Fix keeps
per-path entries with refcounts (W1 pool).

## THE NUMBERS

```
┌────────────────────────────┐
│ battery 402/0/1553/37      │
│ tsc exit 0                 │
│ dist 86231dec 207517B      │
│ FR7 1056ms 131MB 100pct    │
│ script 35/0/1skip 36 scen  │
│ container 27 rows S1-S5    │
│ sqlite 6/68/3/6/204 live   │
│ spec 1164L tests 37 files  │
└────────────────────────────┘
```

W=30 col 30. Commands: `wc -l` per file (table above),
27 top + 10 unit tests counted, live sqlite via bun copy
counts, dist sha `86231dec…` from CURRENT_STATE, FR7
1056ms/131MB from v5 report.

## FILE MANIFEST (delta v5 session)

NEW: checkpoint 6 + task_queue + autoseal tests + 19
scenarios + gen-1m/replay + as-built spec 1164L +
namespaces + W8-W12 audits + Reports v3/v4/v5 +
Checkpoints ×2. MODIFIED: context-manager (18),
stores (queue+pool), cm-db (pool), tracker/gate
(scoping), compacting (autoseal), canon (Phase-3),
tests, st-cm-2/11. INVARIANT: kernel math, carrier
law, gate patterns, budget register shape.

## EXPLAIN → PLAN (the OMP port)

Core insight: the OMP twin keeps kernel math verbatim
(classify/distill/carrier/gates) and re-homes the chassis:
opencode hooks → `HookAPI.on` + `ExtensionAPI` events
(before→`tool_call` BLOCK, after→`tool_result` digest,
compacting→`session_before_compact`, transform→`context`
messages, autocontinue→`session_stop`, chat→
`before_agent_start`); 18 actions → `registerTool` +
allowlist belt; master sqlite → workers + FTS
category/token + pins deck + sha ledger; reuse-first law
(registry+index lookup before ANY spawn — subagents as
persistent task-scoped workers); deck via `ui.custom` +
`/context-deck`; team execution deny-by-default; recall =
token+category → sessionFile JSONL (days/weeks old).

Scope (12): extension scaffold · actions port · allowlist
belt · workers+FTS store · pins deck table · reuse-first
gate · deck overlay · /context-deck cmd · team gate ·
recall query · seal consult (classify+carrier advise) ·
checkpoint snapshot.

| Angle | pass token | fail token |
|---|---|---|
| TOOLS | 18-enum verbatim | unknown_action |
| FIREWALL | BLOCK CM_* | silent ALLOW |
| STATE | sha unchanged | drift |
| ERRORS | LOUD refuse | fabricated key |
| INTEGRATION | requested→desk row | no row |

Handoff: DPL1 under trident-deep-planning, or build agent
with `floating-projects` entries (22:42 notes, 22:49 TCM,
22:58 correction, 23:00 real map) as mission. No writes
until ordered.

## Self-check

- Modes: EXPLAIN (tree exists, read first-hand) + PLAN
  (OMP twin unbuilt). Ingredients: 6/6 loaded via
  skill:// reads (4 ascii + engineering-report +
  trident-deep-planning). show-me SKILL.md read first.
- Ruler: lifecycle/tool/db/engines/nums boxes W=30
  col 30; kernel/seal/distill/entry boxes W=24 col 24
  junctions col 12; file box W=26 col 26; trace boxes
  W=30 col 30. Max line 30 — all ≤ 76. No bare
  junctions, no dangling arrows, no floating labels.
- Anchors: index 1-23, binding 1-29, tool 55-59/63-114,
  cm-db 238L, stores 35-68/:70-125, seal-v7 48-70/
  125-141/143-218/231-247, armada 99-122, carrier
  24-42/52-54, hooks :158-166, gate 1-103, capture
  1-123, carrier-plane 29-97, spec 1164L, tests 37,
  sqlite 6/68/3/6/204, CURRENT_STATE, v5 report.
- Caps: file tree shown=19 total=52 capped=33 disclosed.
- Detectors: 8 sections carry diagrams+tables+evidence;
  bugs carry mechanism boxes; numbers carry commands;
  gaps named below.
- Gaps: MASTER_CONTEXT/ EMPTY dir; git tree dirty
  (unrelated paths); FR7 numbers from v5 (not re-run);
  real-LLM baseline queued per v5 §NEEDED.
