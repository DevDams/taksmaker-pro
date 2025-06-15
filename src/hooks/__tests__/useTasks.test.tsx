import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useTasks } from "../useTasks";

describe("useTasks", () => {
  it("should return tasks functions", () => {
    const { result } = renderHook(() => useTasks());

    expect(result.current).toBeDefined();
    expect(typeof result.current).toBe("object");
  });

  it("should initialize without errors", () => {
    expect(() => renderHook(() => useTasks())).not.toThrow();
  });
});
