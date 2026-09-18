// src/hooks/wiring.ts — THE 6-KEY EVENT MAP (contract stub, wave C wires).
// TCM precedent: trident-context-manager/src/hooks/compaction-hooks.ts:158-166.

export const OMP_CM_HOOK_KEYS = [
  "tool_result",
  "tool_call",
  "before_agent_start",
  "session_before_compact",
  "context",
  "agent_end",
] as const;

export type OmpCmHookKey = (typeof OMP_CM_HOOK_KEYS)[number];

export const HOOK_CONTRACT: Record<OmpCmHookKey, string> = {
  tool_result: "harvest digest120 into worker spans (F-11 law)",
  tool_call: "gate BLOCK on pin-integrity HIGH only, grace-ALLOW else",
  before_agent_start: "inject pinned deck card (one line per worker)",
  session_before_compact: "auto-seal once (CM_AUTO_SEAL opt-in for multi)",
  context: "carrier strip-stale + unshift, byte-exact law",
  agent_end: "worker status flip + ledger row",
};
