// src/cmd/deck.ts — THE /context-deck COMMAND CONTRACT (wave B implements).
// CustomCommand shape: execute(args, ctx: HookCommandContext) =>
// string (prompt to LLM) | void (fire-and-forget). Map opens the overlay
// via ctx.ui.custom and returns "" (handled, LLM not called).

export const DECK_COMMAND_NAME = "context-deck";

export const DECK_COMMAND_DESCRIPTION =
  "Open the pinned-worker deck overlay (roster, drill, pin, spawn). Usage: /context-deck";
