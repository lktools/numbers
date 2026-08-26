import { describe, expect, it } from "vitest";

import { toSinhala } from "../src";

describe("toSinhala hundreds", () => {
  it("converts exact hundreds", () => {
    expect(toSinhala(100)).toBe("සියය");
    expect(toSinhala(500)).toBe("පන්සිය");
  });

  it("converts hundreds with remainder", () => {
    expect(toSinhala(105)).toBe("එකසිය පහ");
    expect(toSinhala(250)).toBe("දෙසිය පනහ");
  });
});
