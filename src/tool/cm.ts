// src/tool/cm.ts — THE 7-ACTION TOOL SURFACE (contract stub, wave A fills branches).
// Clone shape: trident-context-manager/src/tool/context-manager.ts:95-114
// (ACTION_ARG_ALLOWLIST + execute-top belt). Belt is the SOLE enforcer.

import { OMP_CM_ARGS_SHAPE, type OmpCmAction } from "../index";

/** THE PER-ACTION ARG ALLOWLIST — the single source of truth for the belt. */
export const ACTION_ARG_ALLOWLIST: Record<OmpCmAction, readonly string[]> = {
  spawn: ["action", "category", "tokens", "task", "agent"],
  recall: ["action", "category", "tokens", "query"],
  deck: ["action", "id", "op"],
  seal: ["action"],
  status: ["action"],
  resume: ["action", "id"],
  release: ["action", "id"],
};

export const OMP_CM_ACTIONS = Object.keys(ACTION_ARG_ALLOWLIST) as OmpCmAction[];

export function beltCheck(action: string, args: Record<string, unknown>): { ok: true } | { ok: false; refused: string } {
  if (!(ACTION_ARG_ALLOWLIST as Record<string, readonly string[]>)[action]) {
    return { ok: false, refused: `unknown_action: ${action} — valid: ${OMP_CM_ACTIONS.join("|")}` };
  }
  const allowed = ACTION_ARG_ALLOWLIST[action as OmpCmAction];
  const shape = OMP_CM_ARGS_SHAPE["action"].actions;
  void shape;
  for (const k of Object.keys(args)) {
    if (k !== "action" && !allowed.includes(k)) {
      return { ok: false, refused: `bad_arg: ${k} not allowed for action=${action} — allowed: ${allowed.join(",")}` };
    }
  }
  return { ok: true };
}
