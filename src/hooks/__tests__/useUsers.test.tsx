import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useUsers } from "../useUsers";

describe("useUsers", () => {
  it("should return users functions", () => {
    const { result } = renderHook(() => useUsers());

    expect(result.current).toBeDefined();
    expect(typeof result.current).toBe("object");
  });

  it("should have getUserById function", () => {
    const { result } = renderHook(() => useUsers());

    expect(result.current.getUserById).toBeDefined();
    expect(typeof result.current.getUserById).toBe("function");
  });

  it("should initialize without errors", () => {
    expect(() => renderHook(() => useUsers())).not.toThrow();
  });
});
