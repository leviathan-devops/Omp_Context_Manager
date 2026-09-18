# Notes Phases 2+3 — Show-Me PLAN

Target: /notes map overlay (P2) + researcher spawn (P3)
Generated: 2026-09-17. Status: PLANNING. Artifact: PLAN (DPL1-lite).
Phase 1 (built 2026-09-17, verified this turn): thread `notes` open,
raw-exec `/notes` custom command, `notes` receipt skill.

## 0. Verbatim requirements (the operator's words)

- "create a thread that is user gated and name it Notes"
- "whatever i type is pushed as an entry into the notes thread directly
  doesnt even go through the agent - executes raw code"
- "agent should still get the skill activation turn so it has awarness
  of the note i pushed passively non itnerrupting"
- "/notes add (default if no command selected), map (needs to open a hub
  visual of the notes thread that i can scroll and see same way as the
  active jobs and subagents from /hub ~ i should be able to access all
  the micro threads, the thread db for notes, scroll, etc etc)"
- "spawn a research agent from a thread entry directly ~ accessible
  through the hub view only where i can click an entry, there is a
  spawn research agent action, has input for dispatch prompt that is
  sent appended beneath the note trigger in quotes"
- "section 2 of the prompt is a pre written dispatch prompt template
  from the E tree of trident-dispatch-templates"

## EXPLAIN — Phase 1 as built (the ground Phase 2+3 stand on)

`/notes <text>` is a TypeScript custom command
(`~/.omp/agent/commands/notes/index.ts:21`, 83 lines). `execute()`
routes (`index.ts:29-35`), exec's
`bun omp-threads.ts append notes <title> notes <text>`
(`index.ts:53-61`, `appendEntry` at `omp-threads.ts:417`), returns a
`[notes]` receipt (`index.ts:79`). The agent never writes; it reads
`skill://notes` (36 lines) and acks in one line.

```
┌──────────────────────┐
│ /notes <text>        │
│ custom cmd, raw-exec │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ append→sqlite        │
│ omp-threads.ts       │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ [notes] receipt      │
│ passive agent ack    │
└──────────────────────┘
```

Measured numbers (this turn): `notes/index.ts` 83 lines;
`omp-threads.ts` 702; `desk-orchestrator.ts` 931 (`dispatchDesk`
at :194); `jarvis-manager.ts` 301; `agent-hub.ts` 1131;
`trident-dispatch-templates/SKILL.md` 1222 (E3 at :295-421).
`loadCustomCommands` → `green, review, notes`, `errors: []`.
Harness-tested receipt round-trips into `omp/notes` (discover hit).

## Core insight

The overlay runs in raw-exec land (no agent, no judgement), but the
E3 law demands an agent fill `[FILEPATHS]`/`[CONTEXT]` to 150+ lines
and preflight before dispatch — and `dispatchDesk` spawns a real
Orca tile. So Phase 3 is a two-half handoff: the hub composes
Section 1 (quote + user context) and records provenance in code;
the agent composes Section 2 (E3) and dispatches. Hub-only access
falls out by construction — the button exists only in the overlay.

## Scope (14 items)

Phase 2 — map: (1) add/map routing; (2) map overlay component;
(3) entries pane; (4) micro-threads pane; (5) thread-obj pane;
(6) scroll + keyboard nav; (7) Esc kill path, zero diff;
(8) read-only law in overlay. Phase 3 — spawn: (9) per-entry
spawn action, hub-only; (10) editor input for dispatch context;
(11) Section 1 composition; (12) requested-row provenance;
(13) agent E3 fill + `dispatchDesk` scout call; (14) linkage back
(dispatched/complete rows + receipt entry).

## Success criteria (every one command/ledger/eyes-verifiable)

| # | Criterion | Verify |
|---|---|---|
| 1 | loads clean | lists notes (user), errors [] |
| 2 | `/notes map` opens overlay | eyes: 3 panes render, scroll works |
| 3 | Esc writes nothing | sqlite sha before == after |
| 4 | micros + objs visible | drill one micro, one obj |
| 5 | spawn provenanced | obj row shows requested |
| 6 | researcher dispatched | desk row live + receipt entry in `omp/notes` |
| 7 | linkage closes | obj row → dispatched → complete |

## Container test angles (5, tool-result-bound tokens)

| Angle | Probe | Pass token | Fail token |
|---|---|---|---|
| TOOLS | load cmds | notes (user), errors [] | load failure |
| STATE | open map, Esc | sqlite sha unchanged | sha changed |
| ERRORS | closed-slug append | NOTE_FAILED receipt | silent write |
| BOUNDARY | bare cancel | NOTE_CANCELLED, no row | row written |
| INTEGRATION | spawn click | obj `requested` + desk row | no row, no desk |

## 1. Master graph (entry → stages → terminal)

```
┌──────────────────────┐
│ /notes <text>        │
│ entry: custom cmd    │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ §1 ROUTE             │
│ add=def map=overlay  │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ §2 ADD raw-exec      │
│ append→sqlite        │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ §3 MAP hub overlay   │
│ entries micro db     │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ §4 RECEIPT passive   │
│ one-line ack         │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ §5 SPAWN researcher  │
│ E3 + dispatchDesk    │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ DONE linked desk     │
│ thread-obj updated   │
└──────────────────────┘
```

§2/§4 ship in Phase 1. §1 routing is the seam both phases extend.
§3 is Phase 2. §5 is Phase 3. DONE closes the loop in the thread.

## 2. Mechanism pseudocode (inputs top, outputs bottom)

ROUTE — `notes/index.ts execute()` (§1, extends Phase 1):

```
┌────────────────────────────┐
│ IN: args ctx               │
│ onExecute(args, ctx)       │
│   strip leading add        │
│   if args == [map]         │
│     return mapStub         │
│   text = join(args)        │
│   if text empty            │
│     text = ui.input        │
│     if empty return cancel │
│   title = firstLine[:80]   │
│   rc = exec append         │
│   if rc != 0 return FAILED │
│   notify ok                │
│   return receipt           │
│ OUT: receipt string        │
└────────────────────────────┘
```

MAP LOAD — `notes/map.ts` (§3, Phase 2, read-only):

```
┌────────────────────────────┐
│ IN: slug=notes             │
│ entries = exec list        │
│ micros = exec toc          │
│ objs = exec thread-obj     │
│ render 3 panes             │
│ on Esc: done, no write     │
│ OUT: overlay, zero diff    │
└────────────────────────────┘
```

SPAWN — overlay action + agent half (§5, Phase 3):

```
┌────────────────────────────┐
│ IN: entry + user ctx       │
│ sec1 = quote(entry)+ctx    │
│ obj add requested          │
│ append spawn-request       │
│ return sec1 as prompt      │
│ agent fills E3, dispatches │
│ OUT: desk + linked rows    │
└────────────────────────────┘
```

## 3. Trees (edges that matter)

File tree — the new code (ascii-graph file tree):

```
┌────────────────────────┐
│ ~/.omp/agent/commands/ │
├────────────────────────┤
│ ├─ index.ts  route+exe │
│ └─ map.ts  overlay new │
└────────────────────────┘
```

```
┌────────────────────────┐
│ managed-skills/notes/  │
├────────────────────────┤
│ ├─ SKILL.md  receipt   │
└────────────────────────┘
```

Component tree — the map overlay (`notes/map.ts`):

```
┌──────────────────┐
│ <NotesMap>       │
│ notes/map.ts     │
│ panes: 3         │
└────────┬─────────┘
         ▼
┌──────────────────┐
│ <EntryList>      │
│ exec: list       │
└────────┬─────────┘
         ▼
┌──────────────────┐
│ <MicroPane>      │
│ exec: toc+read   │
└────────┬─────────┘
         ▼
┌──────────────────┐
│ <ObjPane>+<Spawn>│
│ thread-obj+desk  │
└──────────────────┘
```

Call tree — the spawn handoff (boxed root, 2-space depth):

```
┌──────────────────────┐
│ overlay spawn action │
│ notes/map.ts         │
└───────────┬──────────┘
            ▼
  thread-obj add requested
  notes exec thread-obj
    append spawn-request
    notes exec omp-threads.ts
      return Section1 prompt
        agent fills E3 template
          dispatchDesk scout
          desk-orchestrator.ts:194
```

## 4. Runtime trace — `/notes map` open, scroll, Esc

TIMELINE (context converging):

T-EARLIER: `omp-threads.ts open notes log` → `OPEN omp/log notes`.
T-EARLIER: `/notes` appends land rows in `entries(slug=notes)`.
T-NOW: user types `/notes map` in the OMP TUI.

STEP 1 — ROUTE TO MAP:

```
┌────────────────────────────┐
│ execute { args: [map] }    │
│ args == [map] → map path   │
│ → no sqlite write          │
└────────────────────────────┘
```

STEP 2 — LOAD (three read-only execs, single commands, no pipes):

```
┌────────────────────────────┐
│ pi.exec bun omp-threads.ts │
│   micro-thread toc notes   │
│ pi.exec bun omp-threads.ts │
│   discover omp <filter>    │
│ pi.exec thread-obj list    │
│   notes                    │
│ → rows render in 3 panes   │
└────────────────────────────┘
```

STEP 3 — ROUTING (the add/map/bare fork):

```
┌────────────────────────────┐
│ Q1: args == [map]? YES     │
│ → overlay, zero writes     │
│ IF add/text → §2 append    │
│ IF bare → ui.input, cancel │
│ → NOTE_CANCELLED, no write │
└────────────────────────────┘
```

STEP 4 — DELIVERY:

```
┌────────────────────────────┐
│ ctx.ui.custom NotesMap     │
│ → fullscreen overlay       │
│ Esc → done(), return ""    │
│ → handled, LLM not called  │
└────────────────────────────┘
```

OBSERVER (the quiet case):

```
Map open wrote nothing: sqlite sha before == after.
No [notes] receipt (no append happened). No skill turn.
The silent overlay is the NORMAL case — proven by the
unchanged sha, not by prose.
```

ESCALATION: entry `s` key → spawn (§5 trace): `thread-obj add`
requested → `append spawn-request` → Section 1 returns as prompt
→ agent fills E3 → `dispatchDesk({wave, agent: scout})`.

## 5. Open decisions (fork + evidence + default)

1. Overlay vs markdown fallback. Overlay matches the /hub feel the
   operator asked for; markdown is a one-line change. DEFAULT: build
   `ui.custom` overlay, keep markdown as the cut-down fallback.
2. Map reads via CLI exec vs direct sqlite. CLI is the contract
   boundary (`appendEntry`/`parseBody` stay canonical). DEFAULT: exec
   the CLI, never import the db.
3. Spawn transport: Orca `dispatchDesk` tile vs in-session scout.
   Desk needs Orca up and is heavyweight; scout runs anywhere.
   DEFAULT: V1 scout fallback, V2 full desk tile.
4. Arg joining vs quote-aware parse. `parseCommandArgs` already
   flattens quotes (`command-args.ts`), so join is lossless here.
   DEFAULT: `args.join(" ")`, document the limit in the skill.
5. Skill home: managed (`notes`, dead-last priority 5) vs user.
   No name collision exists. DEFAULT: keep managed `notes`.

## Handoff

L2 (detailed workflow: overlay keymap, pane contracts, E3 weave
slots, thread-obj schema) + L3 (context library) are follow-on
passes under `trident-deep-planning`, or a build agent dispatched
with this file as the mission block. No disk writes beyond this
artifact until Phase 2 is ordered.

## Self-check

- Mode: PLAN (Phases 2+3 unbuilt) + tight EXPLAIN (Phase 1 built).
- Ingredients: ascii-diagrams + ascii-graph + ascii-visualize +
  ascii-simulator + trident-deep-planning, all read first-hand.
- Ruler: master boxes W=24 (borders end col 24), junctions ┬ col 12
  with ▼ col 12; pseudo boxes W=30; component boxes W=20,
  ┬ col 9 with ▼ col 10; file boxes W=26. Longest line 76
  display cols — all pass.
- Claims anchored: index.ts:21/:29-35/:53-61/:79,
  omp-threads.ts:393/:417/:634, desk-orchestrator.ts:194,
  agent-hub.ts:1-50, command-args.ts, E3 SKILL.md:295-421.
- Caps: no truncated output, no shown=N owed.
