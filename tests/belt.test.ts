import { describe, expect, test } from "bun:test";
import { ACTION_ARG_ALLOWLIST, OMP_CM_ACTIONS, beltCheck } from "../src/tool/cm";
import { OMP_CM_HOOK_KEYS } from "../src/hooks/wiring";

describe("belt", () => {
  test("enumerates 7 actions", () => {
    expect(OMP_CM_ACTIONS).toHaveLength(7);
  });
  test("refuses unknown action", () => {
    const r = beltCheck("bogus", {});
    expect(r.ok).toBe(false);
  });
  test("refuses out-of-scope arg", () => {
    const r = beltCheck("recall", { task: "x" });
    expect(r.ok).toBe(false);
  });
  test("accepts in-scope args", () => {
    expect(beltCheck("spawn", { category: "r", tokens: "t", task: "t", agent: "scout" }).ok).toBe(true);
    expect(beltCheck("recall", { query: "q" }).ok).toBe(true);
    expect(beltCheck("deck", { id: "w1", op: "pin" }).ok).toBe(true);
  });
  test("wiring exposes 6 keys", () => {
    expect(OMP_CM_HOOK_KEYS).toHaveLength(6);
  });
});
