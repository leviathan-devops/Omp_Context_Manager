import { describe, expect, test } from "bun:test";
import ompContextManagerExtension, { OMP_CM_ARGS_SHAPE } from "../src/index";
import { OMP_CM_ACTIONS } from "../src/tool/cm";

describe("extension entry", () => {
  test("lists the seven named actions", () => {
    const result = ompContextManagerExtension();
    expect(result.tool).toBe("omp-context-manager");
    expect(result.actions).toEqual([...OMP_CM_ARGS_SHAPE.action.actions]);
    expect(result.actions).toEqual(OMP_CM_ACTIONS);
  });
});
