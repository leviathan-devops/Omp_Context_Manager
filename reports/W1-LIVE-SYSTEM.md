# W1 offline scope — Omp_Context_Manager

Branch `lane/omp-ctx-w1` from GitHub default `omp-cm/main` at `cce08fa`.
No process in this lane connected to Leviathan, `127.0.0.1:8090`, or `:18090`.
Mocks bind `127.0.0.1:0` only. Repo visibility, rulesets, and org settings were not changed.
Nothing was deleted.

## Watched red, then green

Existing belt suite on the GitHub tree, before any edit: **5 pass, 0 fail** (`bun test`, bun 1.4.3). There was no red test in the committed suite.

New tests were run once against the unfixed entry and a port-guard stub that did not refuse, did not scan, and did not bind. Result: **5 pass, 11 fail, exit 1**. Transcript: `reports/w1-watched-red.txt`.

The entry failure was deterministic. `ompContextManagerExtension()` returned the array indexes `"0"`…`"6"` because it used `Object.keys` on the actions array. The assertion expected `spawn|recall|deck|seal|status|resume|release`.

The port-guard failures were the planted bad cases: connect and listen on 8090 and 18090 did not throw, the scanner returned `[]` for planted `127.0.0.1:8090` and `:18090` text, and `bindMockServer` rejected with `not_implemented` instead of listening on port 0.

After the entry copy and the real guard: **16 pass, 0 fail, exit 0**. `tsc --noEmit` exit 0. Transcript: `reports/w1-watched-green.txt`. A second `bun test` run matched. Thresholds in `src/engines/advisors.ts` were not changed.

## What this PR does without a live system

- GitHub Actions on `ubuntu-latest` (hosted free runner): frozen `bun install`, `bun test`, `tsc --noEmit`.
- Extension entry returns the seven action names.
- Port guard refuses 8090 and 18090 before any socket. `refuseLiveConnect` never dials. `bindMockServer` listens on `127.0.0.1:0` and the caller closes that server.
- Secret scan report at `reports/secret-scan.md` (report only; history was not rewritten).

## BLOCKED — needs Leviathan, Jev, or a file this repo does not have

| item | why it is blocked |
|---|---|
| Load the extension into OMP | `registerTool`, `pi.on`, and `HookUIContext.custom` are in the OMP SDK at the absolute path in PATHS.md (`/home/leviathan/node_modules/@oh-my-pi/pi-coding-agent/src/`). That tree is not in this repo. Deploying to `~/.omp/agent/extensions/` is a live OMP session. |
| Wave A store open | The DDL is in `src/store/db.ts`. The open law (WAL, busy timeout, retry, IMMEDIATE) is a port of TCM `cm-db.ts`, which is not in this repo (`PATHS.md` port source under `/home/leviathan/OPENCODE_WORKSPACE/.../trident-context-manager/src/`). Not guessed. |
| Wave B deck overlay | `src/ui/deck.ts` and `src/cmd/deck.ts` are contracts. The overlay needs live `ui.custom`. |
| Wave C hook wiring | `src/hooks/wiring.ts` names six keys and does not handle payloads. Payload types are in the OMP SDK, not here. |
| Wave D seal | Blueprint §3 names `seal/v7.ts`. That file is not in the repo. `src/seal/carrier.ts` has the open/close markers and types only — no `renderCarrier` and no `pinIntegrity`. The TCM seal source is not here. |
| Jev judge and arming | `~/.jev-gates` mode, the ARMED flag, hooks, and the process on :8090 / :18090 are live Leviathan state. This PR only refuses those ports. |
| JAM extension hash and tracker migration | `extension/jarvis-manager.js` and `.omp-waves/tracker.sqlite` are not in this repo. They belong to the JARVIS tree / live OMP home. |
| Foreman dispatch, pane cleanup, orca-mcp | Not this repository. orca-mcp-bridge has no remote in the lane brief and was left untouched. |
| Rulesets and visibility | Not applied. This repo is already public. A ruleset would be an org/repo setting, which this lane does not change. |
| Leviathan unpushed commits | Not visible from this GitHub clone. Whether the Leviathan working tree is ahead of `cce08fa` is UNVERIFIED. This PR contains only GitHub history plus the offline W1 changes. |

## Stale

Inside the GitHub tree, the file list matches `MIGRATION_MANIFEST.md` (three ShowMe reports plus the wave-A scaffold). The blueprint still says UNBUILT, and the sources are still contracts, which matches commits `d25b0d5` and `cce08fa`. No half-migrated file showed up. Drift that exists only on Leviathan was not available to compare.
