import { describe, expect, it } from "vitest";
import { toSinhala } from "../src";

describe("large number options and scale systems", () => {
  describe("backward compatibility (default behavior)", () => {
    it("preserves exact existing outputs when options are omitted", () => {
      expect(toSinhala(0)).toBe("බිංදුව");
      expect(toSinhala(21)).toBe("විසි එක");
      expect(toSinhala(99)).toBe("අනූ නවය");
      expect(toSinhala(100)).toBe("සියය");
      expect(toSinhala(999)).toBe("නවසිය අනූ නවය");
      expect(toSinhala(1000)).toBe("දහස");
      expect(toSinhala(9999)).toBe("නවදහස් නවසිය අනූ නවය");
      expect(toSinhala(100000)).toBe("එකසියදහස");
      expect(toSinhala(999999)).toBe("නවසිය අනූනවදහස් නවසිය අනූ නවය");
    });

    it("preserves exact existing outputs when style is standard", () => {
      expect(toSinhala(100000, { style: "standard" })).toBe("එකසියදහස");
      expect(toSinhala(999999, { style: "standard" })).toBe("නවසිය අනූනවදහස් නවසිය අනූ නවය");
    });
  });

  describe("style: 'laksha'", () => {
    it("converts exact laksha values", () => {
      expect(toSinhala(100000, { style: "laksha" })).toBe("ලක්ෂය");
      expect(toSinhala(200000, { style: "laksha" })).toBe("ලක්ෂ දෙක");
      expect(toSinhala(500000, { style: "laksha" })).toBe("ලක්ෂ පහ");
    });

    it("converts laksha with remainders", () => {
      expect(toSinhala(100001, { style: "laksha" })).toBe("ලක්ෂ එක");
      expect(toSinhala(125000, { style: "laksha" })).toBe("ලක්ෂ විසිපන්දහස");
      expect(toSinhala(125250, { style: "laksha" })).toBe("ලක්ෂ විසිපන්දහස් දෙසිය පනහ");
      expect(toSinhala(999999, { style: "laksha" })).toBe("ලක්ෂ නවය අනූනවදහස් නවසිය අනූ නවය");
    });
  });

  describe("largeNumberSystem: 'sinhala'", () => {
    it("converts Sinhala large numbers", () => {
      expect(toSinhala(100000, { largeNumberSystem: "sinhala" })).toBe("ලක්ෂය");
      expect(toSinhala(200000, { largeNumberSystem: "sinhala" })).toBe("ලක්ෂ දෙක");
      expect(toSinhala(1000000, { largeNumberSystem: "sinhala" })).toBe("දසලක්ෂය");
      expect(toSinhala(10000000, { largeNumberSystem: "sinhala" })).toBe("කෝටිය");
      expect(toSinhala(100000000, { largeNumberSystem: "sinhala" })).toBe("දසකෝටිය");
    });
  });

  describe("largeNumberSystem: 'international'", () => {
    it("converts International scale values", () => {
      expect(toSinhala(1000000, { largeNumberSystem: "international" })).toBe("මිලියනය");
      expect(toSinhala(2000000, { largeNumberSystem: "international" })).toBe("මිලියන දෙක");
      expect(toSinhala(10000000, { largeNumberSystem: "international" })).toBe("මිලියන දහය");
      expect(toSinhala(100000000, { largeNumberSystem: "international" })).toBe("මිලියන සියය");
      expect(toSinhala(1000000000, { largeNumberSystem: "international" })).toBe("බිලියනය");
      expect(toSinhala(2000000000, { largeNumberSystem: "international" })).toBe("බිලියන දෙක");
      expect(toSinhala(1000000000000, { largeNumberSystem: "international" })).toBe("ට්රිලියනය");
    });

    it("converts International scale values with remainders", () => {
      expect(toSinhala(1000001, { largeNumberSystem: "international" })).toBe("මිලියන එක");
      expect(toSinhala(1250000, { largeNumberSystem: "international" })).toBe("මිලියන දෙසිය පනස්දහස");
      expect(toSinhala(999999999, { largeNumberSystem: "international" })).toBe(
        "මිලියන නවසිය අනූ නවය නවසිය අනූනවදහස් නවසිය අනූ නවය"
      );
    });
  });

  describe("support up to Number.MAX_SAFE_INTEGER (9,007,199,254,740,991)", () => {
    it("converts Number.MAX_SAFE_INTEGER", () => {
      const result = toSinhala(Number.MAX_SAFE_INTEGER);
      expect(result).toBe(
        "ක්වොඩ්රිලියන නවය ට්රිලියන හත බිලියන එකසිය අනූ නවය මිලියන දෙසිය පනස් හතර හත්සිය හතළිස්දහස් නවසිය අනූ එක"
      );
    });

    it("converts negative Number.MAX_SAFE_INTEGER", () => {
      const result = toSinhala(-Number.MAX_SAFE_INTEGER);
      expect(result).toBe(
        "ඍණ ක්වොඩ්රිලියන නවය ට්රිලියන හත බිලියන එකසිය අනූ නවය මිලියන දෙසිය පනස් හතර හත්සිය හතළිස්දහස් නවසිය අනූ එක"
      );
    });

    it("throws RangeError for unsafe integers exceeding MAX_SAFE_INTEGER", () => {
      expect(() => toSinhala(9007199254740992)).toThrow(RangeError);
    });
  });

  describe("combinations and edge cases", () => {
    it("does not affect 0-999 conversion", () => {
      expect(toSinhala(123, { largeNumberSystem: "international" })).toBe("එකසිය විසි තුන");
      expect(toSinhala(123, { style: "laksha", largeNumberSystem: "sinhala" })).toBe("එකසිය විසි තුන");
    });

    it("supports combinations of style and largeNumberSystem", () => {
      expect(
        toSinhala(125000, {
          style: "laksha",
          largeNumberSystem: "sinhala",
        })
      ).toBe("ලක්ෂ විසිපන්දහස");

      expect(
        toSinhala(125000, {
          style: "laksha",
          largeNumberSystem: "international",
        })
      ).toBe("ලක්ෂ විසිපන්දහස");
    });
  });
});
