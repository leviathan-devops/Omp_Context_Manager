# OMP CONTEXT MANAGER — BLUEPRINT

Target: omp-context-manager extension (UNBUILT — blueprint for commit)
Date: 2026-09-18. Mode: BLUEPRINT. Base pattern: trident-context-manager
(the REAL tree, mapped 2026-09-17). Anchors: OMP = pi-coding-agent src;
TCM = Trident_Agent/Active_Projects/trident-context-manager.

## §0 THE ONE-SENTENCE MISSION

A tool-gated team layer over OMP subagents: persistent task-scoped
workers indexed by category+token, recalled across sessions and weeks,
pinned as a deck at top-of-context, sealed across compactions with
byte-exact pins — TCM's kernel law on OMP's extension surface.

## §1 MASTER VIEW (entry → every stage → terminal)

```
┌────────────────────────────┐
│ omp runtime session        │
│ events fire hooks          │
└─────────────┬──────────────┘
              ▼
┌────────────────────────────┐
│ EVENT WIRING 6 keys        │
│ harvest gate deck seal     │
└──────┬──────────────┬──────┘
       │              ▼
       │   ┌────────────────────────┐
       │   │ DECK OVERLAY ui.custom │
       │   │ roster drill pin spawn │
       │   └───────────┬────────────┘
       ▼               ▼
┌────────────────────────────┐
│ TOOL 7 actions belt        │
│ spawn recall deck seal     │
│ status resume release      │
└─────────────┬──────────────┘
              ▼
┌────────────────────────────┐
│ STORE store.sqlite WAL     │
│ workers FTS pins deck log  │
└─────────────┬──────────────┘
              ▼
┌────────────────────────────┐
│ CARRIER byte-exact pins    │
│ next window + ledger       │
└────────────────────────────┘
```

Boxes W=30 col 30; deck W=26 col 26; junctions col 8/21.

## §2 COMPONENT TREE (the shape of the new code)

```
┌──────────────────────────────┐
│ <omp-context-manager>        │
│ extensions/omp-cm/index.ts   │
│ wires: 6 events + 1 tool     │
└───────────────┬──────────────┘
        ┌───────┴────────┐
        ▼                ▼
┌─────────────┐  ┌─────────────┐
│ <Tool>      │  │ <Overlay>   │
│ tool/cm.ts  │  │ ui/deck.ts  │
│ 7 actions   │  │ ui.custom   │
└──────┬──────┘  └──────┬──────┘
       ▼                ▼
┌─────────────┐  ┌─────────────┐
│ <Store>     │  │ <Seal>      │
│ store/db.ts │  │ seal/v7.ts  │
│ WAL + FTS5  │  │ 7 stages    │
└──────┬──────┘  └──────┬──────┘
       └───────┬────────┘
               ▼
     ┌──────────────────┐
     │ <Carrier>        │
     │ seal/carrier.ts  │
     │ pins + pointers  │
     └──────────────────┘
```

Parent W=32 col 32, children W=15 col 15, carrier W=20.

## §3 FILE TREE

```
┌────────────────────────┐
│ extensions/omp-cm/     │
├────────────────────────┤
│ ├─ index.ts  wire 6+1  │
│ ├─ tool/cm.ts belt 7   │
│ ├─ store/db.ts WAL FTS │
│ ├─ seal/v7.ts stages   │
│ ├─ seal/carrier.ts     │
│ ├─ ui/deck.ts overlay  │
│ └─ cmd/deck.ts slash   │
└────────────────────────┘
```

W=26 col 26. index registers: `pi.registerTool` +
6 `pi.on(...)` + `/context-deck` custom command.

## §4 EVENT WIRING MAP (the 6 keys)

```
┌────────────────────────────┐
│ tool_result                │
│ → harvest digest120        │
└─────────────┬──────────────┘
              ▼
┌────────────────────────────┐
│ tool_call                  │
│ → gate BLOCK pin only      │
└─────────────┬──────────────┘
              ▼
┌────────────────────────────┐
│ before_agent_start         │
│ → inject deck card         │
└─────────────┬──────────────┘
              ▼
┌────────────────────────────┐
│ session_before_compact     │
│ → auto-seal once           │
└─────────────┬──────────────┘
              ▼
┌────────────────────────────┐
│ context                    │
│ → carrier strip+unshift    │
└─────────────┬──────────────┘
              ▼
┌────────────────────────────┐
│ agent_end                  │
│ → status flip + ledger     │
└────────────────────────────┘
```

All W=30 col 30. Anchors: `extensions/types.ts` events
at :1204-1212 (tool_call/tool_result), BeforeAgentStart
:685, Context :674, SessionBeforeCompact :63-74;
HookUIContext.custom at hooks/types.ts:113. TCM precedent:
`compaction-hooks.ts:158-166` the 7-key map this maps from.

## §5 MECHANISM — spawn/reuse (the reuse-first law)

```
┌────────────────────────────┐
│ IN: category tokens task   │
│ on spawn args              │
│   hits = fts query cat+tok │
│   if hit and status live   │
│     return worker + note   │
│   if hit and parked        │
│     revive via registry    │
│   else                     │
│     row = insert worker    │
│     task batch agent       │
│     bind sessionFile       │
│   ledger spawn|reuse       │
│ OUT: worker row + verdict  │
└────────────────────────────┘
```

W=30 col 30. Law: NO task call may bypass this gate —
deny-by-default (the team-execution enforcement; only
the tool spawns fleet workers).

## §6 MECHANISM — seal 7 stages (TCM verbatim core)

```
┌──────────────────────┐
│ FREEZE harvest spans │
│ classify P/W/K/S     │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ CENSUS graph counts  │
│ CLUSTER label-prop   │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ DISTILL 59 matrix    │
│ mass-cap law         │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ RENDER pins+pointers │
│ byte-exact sha16     │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ VERIFY integrity     │
│ DELIVER dual always  │
└──────────────────────┘
```

W=24 col 24, junctions col 12. Ported from
`seal-v7.ts:125-229`; budget register floor 2000 /
ceiling 25000 / divisor 400 / 12-60 / glue 400
(`seal-v7.ts:48-70`). Pins: sha16+text+why or DROP
(`carrier.ts:52-54`).

## §7 MECHANISM — deck overlay

```
┌────────────────────────────┐
│ IN: ctx.ui.custom factory  │
│ mount DeckOverlay          │
│   roster = workers query   │
│   keys j/k scroll r revive │
│   p pin s spawn e esc      │
│   drill = transcript tail  │
│ on pin: deck slot write    │
│ on esc: done zero writes   │
│ OUT: pinned card inject    │
└────────────────────────────┘
```

W=30 col 30. Pattern: tools.ts example `ui.custom`
(Container+SettingsList). Pinned card also text-injected
each `before_agent_start` — survives compaction.

## §8 INTERFACES TABLE

| export | contract | anchor |
|---|---|---|
| registerTool cm | 7 actions + belt | types.ts:1219 |
| ACTION_ARG_ALLOWLIST | per-action args | TCM :95-114 |
| openStore | WAL+busy5000+retry3 | TCM cm-db.ts |
| workers table | id cat tok file st | this §9 |
| fts query | cat+tok match | sqlite FTS5 |
| renderCarrier | 3 sections | carrier.ts:24 |
| pinIntegrity | sha+text+why | carrier.ts:52 |
| ui.custom overlay | roster deck | hooks.ts:113 |

Constants (named, never magic): WORKER_DECK_MAX=5,
DIGEST_CHARS=120, BUFFER_BOUND=5000, SEAL_THRESHOLD=0.8,
ADMIT=0.42, BAND=[0.45,0.60] (TCM `armada.ts:65-66`,
`capture-plane.ts:36-44`, `constants.ts` precedent).

## §9 STORE SCHEMA

```sql
CREATE TABLE workers (
  id TEXT PRIMARY KEY, category TEXT NOT NULL,
  tokens TEXT NOT NULL, sessionFile TEXT,
  agentId TEXT, status TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE VIRTUAL TABLE workers_fts USING fts5(
  category, tokens, content=workers
);
CREATE TABLE pins (
  spanSha TEXT, text TEXT, why TEXT,
  workerId TEXT, PRIMARY KEY(spanSha)
);
CREATE TABLE deck (
  slot INTEGER PRIMARY KEY, id TEXT NOT NULL
);
CREATE TABLE events_ledger (
  seq INTEGER PRIMARY KEY AUTOINCREMENT,
  ts INTEGER NOT NULL, actor TEXT NOT NULL,
  op TEXT NOT NULL, payload TEXT NOT NULL
);
```

Schema law from TCM `stores.ts:70-125`: composite keys,
sessionKey column on every scoped table (here: workers
carry agentId; pins global by spanSha like TCM).

## §10 FAILURE MODES

| component | failure | behavior |
|---|---|---|
| store | sqlite locked | retry3 then WARN null |
| gate | store unreadable | ALLOW + repair law |
| seal | census empty | THROW COMPACT_CENSUS_EMPTY |
| seal | pin mismatch | DROP + degradation |
| spawn | agent unknown | preflight refuse LOUD |
| recall | zero hits | empty list, no fabricate |
| overlay | no UI headless | skip, cmd text-only |
| deck | slot overflow | oldest unpinned |

## §11 OPEN DECISIONS (fork + default)

1. Extension home: user `~/.omp/agent/extensions/` vs
   project. DEFAULT: user (fleet spans projects).
2. Recall depth: row only vs transcript tail. DEFAULT:
   row + last-40-lines tail on demand.
3. Seal trigger: manual only vs auto-once. DEFAULT:
   auto-once at 0.8, CM_AUTO_SEAL for multi (TCM law).
4. Workers scope: per-project vs global. DEFAULT:
   global store, category prefixes project.
5. Deck inject: full card vs one-line. DEFAULT:
   one-line per pinned worker + full card on ask.

## §12 BUILD WAVES

| wave | files | gate |
|---|---|---|
| A store+spawn | db.ts tool/cm spawn | recall hits row |
| B deck | ui/deck cmd/deck | esc zero-diff |
| C wiring | index.ts 6 events | harvest counters |
| D seal | v7.ts carrier.ts | pin byte-exact |
| E battery | tests 5 files | all green |

## Self-check

- Mode: BLUEPRINT (design before commit; unbuilt).
- Ingredients: ascii-diagrams + ascii-graph +
  ascii-visualize + ascii-simulator + trident-deep-planning,
  all loaded this session (skill:// reads on record).
- Ruler: §1 boxes W=30 col 30, deck W=26 col 26,
  junction cols 8 and 21; §2 parent W=32 col 32,
  children W=15 col 15, carrier W=20 col 20; §3 W=26;
  §4 six boxes W=30 col 30; §5/§7 W=30 col 30; §6 W=24
  col 24 junctions col 12. Max line 40 — all ≤ 76.
- Anchors: every table row carries file:line; constants
  cite TCM precedent lines; wiring cites OMP types lines.
- Caps: none truncated, no shown=N owed.
