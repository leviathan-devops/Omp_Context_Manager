// src/index.ts — THE EXTENSION ENTRY (thin-entry law: single default export).
// Registers the 7-action tool + 6 event wirings + /context-deck command.
// Port precedent: trident-context-manager/src/index.ts:1-23 (default-only
// plugin export) + binding.ts:1-29 ({hooks, tools} record merge).
// OMP contracts: ExtensionAPI.registerTool (extensions/types.ts:1219),
// HookUIContext.custom (hooks/types.ts:113).

export const OMP_CM_TOOL_NAME = "omp-context-manager";

export type OmpCmAction =
  | "spawn"
  | "recall"
  | "deck"
  | "seal"
  | "status"
  | "resume"
  | "release";

/** THE FLAT ARGS SHAPE — every arg the tool accepts, with its owning action. */
export const OMP_CM_ARGS_SHAPE: Record<string, { actions: OmpCmAction[]; describe: string }> = {
  action: {
    actions: ["spawn", "recall", "deck", "seal", "status", "resume", "release"],
    describe: "THE CONTROL SURFACE — MANDATORY, no default. spawn|recall|deck|seal|status|resume|release.",
  },
  category: {
    actions: ["spawn", "recall"],
    describe: "action=spawn/recall: the worker category (e.g. research, build, audit).",
  },
  tokens: {
    actions: ["spawn", "recall"],
    describe: "action=spawn/recall: the semantic token string indexed in FTS.",
  },
  task: {
    actions: ["spawn"],
    describe: "action=spawn ONLY: the task prompt for the worker.",
  },
  agent: {
    actions: ["spawn"],
    describe: "action=spawn ONLY: the subagent type (scout|task|reviewer).",
  },
  query: {
    actions: ["recall"],
    describe: "action=recall ONLY: the FTS search text over category+tokens.",
  },
  id: {
    actions: ["deck", "resume", "release"],
    describe: "action=deck/resume/release: the worker row id.",
  },
  op: {
    actions: ["deck"],
    describe: "action=deck ONLY: pin | unpin | list.",
  },
};

export default function ompContextManagerExtension(): { tool: string; actions: OmpCmAction[] } {
  return {
    tool: OMP_CM_TOOL_NAME,
    actions: [...OMP_CM_ARGS_SHAPE.action.actions],
  };
}
