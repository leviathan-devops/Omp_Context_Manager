// src/ui/deck.ts — THE DECK OVERLAY CONTRACT (wave B implements).
// Pattern: pi-coding-agent tools.ts example ui.custom (Container+SettingsList).
// Kill path: Esc -> done(), zero writes. Headless: skip overlay, text-only.

export const DECK_KEYS = "j/k scroll · r revive · p pin · s spawn · e esc";

export interface DeckWorkerView {
  id: string;
  category: string;
  status: string;
  lastTokens: string;
  pinned: boolean;
}
