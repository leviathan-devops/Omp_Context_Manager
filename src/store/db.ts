// src/store/db.ts — THE STORE CONTRACT (schema + open law, wave A implements).
// Precedent: trident-context-manager/src/tool/cm-db.ts:1-238 (WAL/busy5000/
// NORMAL/retry3/IMMEDIATE/grace) + src/seal/stores.ts:70-125 (sessionKey PK law).

export const OMP_CM_DB_FILE = "store.sqlite";
export const OMP_CM_BUSY_TIMEOUT_MS = 5000;
export const OMP_CM_RETRY_ATTEMPTS = 3;

export const WORKERS_DDL = `CREATE TABLE IF NOT EXISTS workers (
  id TEXT PRIMARY KEY, category TEXT NOT NULL,
  tokens TEXT NOT NULL, sessionFile TEXT,
  agentId TEXT, status TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);`;

export const WORKERS_FTS_DDL = `CREATE VIRTUAL TABLE IF NOT EXISTS workers_fts USING fts5(
  category, tokens, content=workers
);`;

export const PINS_DDL = `CREATE TABLE IF NOT EXISTS pins (
  spanSha TEXT, text TEXT, why TEXT,
  workerId TEXT, PRIMARY KEY(spanSha)
);`;

export const DECK_DDL = `CREATE TABLE IF NOT EXISTS deck (
  slot INTEGER PRIMARY KEY, id TEXT NOT NULL
);`;

export const LEDGER_DDL = `CREATE TABLE IF NOT EXISTS events_ledger (
  seq INTEGER PRIMARY KEY AUTOINCREMENT,
  ts INTEGER NOT NULL, actor TEXT NOT NULL,
  op TEXT NOT NULL, payload TEXT NOT NULL
);`;

export type WorkerStatus = "live" | "parked" | "released";

export interface WorkerRow {
  id: string;
  category: string;
  tokens: string;
  sessionFile: string | null;
  agentId: string | null;
  status: WorkerStatus;
  updated_at: number;
}

export const WORKER_DECK_MAX = 5;
