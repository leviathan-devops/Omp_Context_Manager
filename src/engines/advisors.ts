// src/engines/advisors.ts — THE ADVISORY ENGINE CONTRACT (wave D consults).
// TCM law: engines advise via carrier + seal consult, never hot-path.
// DIM thresholds precedent: 0.6/0.75/0.6 (dim.ts); ADMIT 0.42, band
// [0.45, 0.60] (armada.ts:65-66).

export const ADMIT = 0.42;
export const AMBIGUITY_BAND: [number, number] = [0.45, 0.6];
export const SEAL_THRESHOLD = 0.8;
export const DIGEST_CHARS = 120;
export const HARVEST_BUFFER_BOUND = 5000;
