import { describe, expect, it } from "vitest";

import { toSinhala } from "../src";

describe("toSinhala edge cases", () => {
  it("rejects NaN", () => {
    expect(() => toSinhala(NaN)).toThrow();
  });

  it("rejects Infinity", () => {
    expect(() => toSinhala(Infinity)).toThrow();
  });

  it("rejects decimals", () => {
    expect(() => toSinhala(12.5)).toThrow();
  });

  it("supports negative numbers", () => {
    expect(toSinhala(-5)).toBe("ඍණ පහ");
  });
});
