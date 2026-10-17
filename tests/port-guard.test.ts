import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import type { Server } from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  ForbiddenPortError,
  assertMockBindPort,
  assertNotForbiddenPort,
  bindMockServer,
  refuseLiveConnect,
  scanTextForForbiddenPorts,
} from "../src/net/port-guard";

const SRC_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src");
const GUARD_FILE = path.join(SRC_DIR, "net", "port-guard.ts");

function listTypeScriptFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listTypeScriptFiles(full));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".ts")) {
      files.push(full);
    }
  }
  return files;
}

function closeServer(server: Server): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}

function expectForbidden(run: () => void, port: number, op: "connect" | "listen"): void {
  let caught: unknown;
  try {
    run();
  } catch (error) {
    caught = error;
  }
  expect(caught).toBeInstanceOf(ForbiddenPortError);
  if (!(caught instanceof ForbiddenPortError)) {
    return;
  }
  expect(caught.port).toBe(port);
  expect(caught.op).toBe(op);
}

describe("port guard", () => {
  test("refuses a planted connect to 8090 before any socket", () => {
    expectForbidden(() => refuseLiveConnect(8090), 8090, "connect");
  });

  test("refuses a planted connect to 18090 before any socket", () => {
    expectForbidden(() => refuseLiveConnect(18090), 18090, "connect");
  });

  test("refuses a planted listen on 8090 before any socket", () => {
    expectForbidden(() => assertNotForbiddenPort(8090, "listen"), 8090, "listen");
  });

  test("refuses a planted listen on 18090 before any socket", () => {
    expectForbidden(() => assertNotForbiddenPort(18090, "listen"), 18090, "listen");
  });

  test("does not open a live connection for any other port", () => {
    expect(() => refuseLiveConnect(1)).toThrow(/offline_lane_no_live_connect/);
  });

  test("mocks may bind port 0 and refuse the judge ports", () => {
    expect(() => assertMockBindPort(8090)).toThrow(/mock_bind_must_be_port_0/);
    expect(() => assertMockBindPort(18090)).toThrow(/mock_bind_must_be_port_0/);
    expect(() => assertMockBindPort(0)).not.toThrow();
  });

  test("scanner flags planted judge ports and ignores clean text", () => {
    const planted = [
      'fetch("http://127.0.0.1:8090/health")',
      'fetch("http://127.0.0.1:18090/health")',
    ].join("\n");
    expect(scanTextForForbiddenPorts(planted).map((hit) => hit.port)).toEqual([8090, 18090]);
    expect(scanTextForForbiddenPorts("listen(0)\n")).toEqual([]);
  });

  test("the guard module names both judge ports", () => {
    const ports = scanTextForForbiddenPorts(readFileSync(GUARD_FILE, "utf8")).map((hit) => hit.port);
    expect(ports).toContain(8090);
    expect(ports).toContain(18090);
  });

  test("source files other than the guard do not name judge ports", () => {
    const planted = 'const target = "127.0.0.1:8090";\n';
    expect(scanTextForForbiddenPorts(planted).map((hit) => hit.port)).toEqual([8090]);

    const files = listTypeScriptFiles(SRC_DIR).filter((file) => path.resolve(file) !== path.resolve(GUARD_FILE));
    expect(files.length).toBeGreaterThan(0);
    for (const file of files) {
      expect(scanTextForForbiddenPorts(readFileSync(file, "utf8"))).toEqual([]);
    }
  });

  test("mock server binds 127.0.0.1 on an ephemeral port", async () => {
    let bound: { server: Server; port: number } | undefined;
    try {
      bound = await bindMockServer();
      expect(bound.port).toBeGreaterThan(0);
      expect(bound.port).not.toBe(8090);
      expect(bound.port).not.toBe(18090);
      const address = bound.server.address();
      expect(address).not.toBeNull();
      expect(typeof address).toBe("object");
      if (address && typeof address === "object") {
        expect(address.address).toBe("127.0.0.1");
        expect(address.port).toBe(bound.port);
      }
    } finally {
      if (bound) {
        await closeServer(bound.server);
      }
    }
  });
});
