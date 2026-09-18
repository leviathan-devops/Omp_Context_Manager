// src/seal/carrier.ts — THE CARRIER CONTRACT (verbatim-law port target).
// Source of record: trident-context-manager/src/seal/carrier.ts:24-54.
// renderCarrier: 3 sections (VERBATIM STATE / CONTINUITY LAWS / WHERE THINGS
// LIVE) between [EPOCH-CARRIER epoch=E] ... [END-CARRIER].
// pinIntegrity: sha16 match + text match + why non-empty — else DROP.

export const CARRIER_CLOSE = "[END-CARRIER]";

export function carrierOpen(epochId: string): string {
  return `[EPOCH-CARRIER epoch=${epochId}]`;
}

export interface PinLine {
  spanSha: string;
  text: string;
  why: string;
  nodeId: string;
}

export interface PointerLine {
  label: string;
  epochId: string;
  ref: string;
}
