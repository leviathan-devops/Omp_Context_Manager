// src/net/port-guard.ts — refuse the live Jev judge ports. Mocks bind port 0.
// Nothing in this module opens a connection to 8090 or 18090.

import { createServer, type Server } from "node:net";

export const FORBIDDEN_PORTS = [8090, 18090] as const;
export type ForbiddenPort = (typeof FORBIDDEN_PORTS)[number];

/** OS-assigned port. The only port a mock may listen on. */
export const MOCK_BIND_PORT = 0;

export class ForbiddenPortError extends Error {
  readonly port: number;
  readonly op: "connect" | "listen";

  constructor(port: number, op: "connect" | "listen") {
    super(`forbidden_port: ${op} ${port}`);
    this.name = "ForbiddenPortError";
    this.port = port;
    this.op = op;
  }
}

export function isForbiddenPort(port: number): port is ForbiddenPort {
  return port === 8090 || port === 18090;
}

/** Refuse before any socket is created. */
export function assertNotForbiddenPort(port: number, op: "connect" | "listen"): void {
  if (isForbiddenPort(port)) {
    throw new ForbiddenPortError(port, op);
  }
}

/** Mocks may bind the ephemeral port only. */
export function assertMockBindPort(port: number): void {
  if (port !== MOCK_BIND_PORT) {
    throw new Error(`mock_bind_must_be_port_0: got ${port}`);
  }
}

/**
 * Classify a connect. Forbidden ports throw ForbiddenPortError.
 * Any other port throws offline_lane_no_live_connect. No socket is opened.
 */
export function refuseLiveConnect(port: number): void {
  assertNotForbiddenPort(port, "connect");
  throw new Error("offline_lane_no_live_connect");
}

export interface PortHit {
  port: ForbiddenPort;
  index: number;
  rule: "forbidden-judge-port";
}

const FORBIDDEN_PORT_SOURCE = String.raw`\b(?:18090|8090)\b`;

export function scanTextForForbiddenPorts(text: string): PortHit[] {
  const hits: PortHit[] = [];
  const pattern = new RegExp(FORBIDDEN_PORT_SOURCE, "g");
  for (const match of text.matchAll(pattern)) {
    const raw = match[0];
    if (raw !== "8090" && raw !== "18090") {
      continue;
    }
    hits.push({
      port: raw === "8090" ? 8090 : 18090,
      index: match.index ?? 0,
      rule: "forbidden-judge-port",
    });
  }
  return hits;
}

function listenEphemeral(): Promise<{ server: Server; port: number }> {
  assertMockBindPort(MOCK_BIND_PORT);
  assertNotForbiddenPort(MOCK_BIND_PORT, "listen");
  return new Promise((resolve, reject) => {
    const server = createServer();
    const onError = (error: Error) => {
      reject(error);
    };
    server.once("error", onError);
    server.listen(MOCK_BIND_PORT, "127.0.0.1", () => {
      server.off("error", onError);
      const address = server.address();
      if (address === null || typeof address === "string") {
        server.close(() => reject(new Error("mock_bind_no_port")));
        return;
      }
      resolve({ server, port: address.port });
    });
  });
}

function closeServer(server: Server): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}

/** Listen on 127.0.0.1:0. Caller closes the server. Never connects out. */
export async function bindMockServer(): Promise<{ server: Server; port: number }> {
  const bound = await listenEphemeral();
  if (isForbiddenPort(bound.port)) {
    await closeServer(bound.server);
    throw new ForbiddenPortError(bound.port, "listen");
  }
  return bound;
}
