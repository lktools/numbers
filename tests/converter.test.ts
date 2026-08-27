import { describe, expect, it } from "vitest";

import { toSinhala, numberToSinhala } from "../src";

describe("toSinhala (0 to 999)", () => {
  describe("units (0 - 9)", () => {
    it("converts 0 to 9 correctly", () => {
      expect(toSinhala(0)).toBe("බිංදුව");
      expect(toSinhala(1)).toBe("එක");
      expect(toSinhala(2)).toBe("දෙක");
      expect(toSinhala(3)).toBe("තුන");
      expect(toSinhala(4)).toBe("හතර");
      expect(toSinhala(5)).toBe("පහ");
      expect(toSinhala(6)).toBe("හය");
      expect(toSinhala(7)).toBe("හත");
      expect(toSinhala(8)).toBe("අට");
      expect(toSinhala(9)).toBe("නවය");
    });
  });

  describe("teens (10 - 19)", () => {
    it("converts 10 to 19 correctly", () => {
      expect(toSinhala(10)).toBe("දහය");
      expect(toSinhala(11)).toBe("එකොළහ");
      expect(toSinhala(12)).toBe("දොළහ");
      expect(toSinhala(13)).toBe("දහතුන");
      expect(toSinhala(14)).toBe("දහහතර");
      expect(toSinhala(15)).toBe("පහළොව");
      expect(toSinhala(16)).toBe("දහසය");
      expect(toSinhala(17)).toBe("දහහත");
      expect(toSinhala(18)).toBe("දහඅට");
      expect(toSinhala(19)).toBe("දහනවය");
    });
  });

  describe("tens and combinations (20 - 99)", () => {
    it("converts exact tens", () => {
      expect(toSinhala(20)).toBe("විස්ස");
      expect(toSinhala(30)).toBe("තිහ");
      expect(toSinhala(40)).toBe("හතළිහ");
      expect(toSinhala(50)).toBe("පනහ");
      expect(toSinhala(60)).toBe("හැට");
      expect(toSinhala(70)).toBe("හැත්තෑව");
      expect(toSinhala(80)).toBe("අසූව");
      expect(toSinhala(90)).toBe("අනූව");
    });

    it("converts tens with remainder", () => {
      expect(toSinhala(21)).toBe("විසි එක");
      expect(toSinhala(35)).toBe("තිස් පහ");
      expect(toSinhala(42)).toBe("හතළිස් දෙක");
      expect(toSinhala(71)).toBe("හැත්තෑ එක");
      expect(toSinhala(75)).toBe("හැත්තෑ පහ");
      expect(toSinhala(79)).toBe("හැත්තෑ නවය");
      expect(toSinhala(99)).toBe("අනූ නවය");
    });
  });

  describe("hundreds (100 - 999)", () => {
    it("converts exact hundreds", () => {
      expect(toSinhala(100)).toBe("සියය");
      expect(toSinhala(200)).toBe("දෙසිය");
      expect(toSinhala(300)).toBe("තුන්සිය");
      expect(toSinhala(400)).toBe("හාරසිය");
      expect(toSinhala(500)).toBe("පන්සිය");
      expect(toSinhala(600)).toBe("හයසිය");
      expect(toSinhala(700)).toBe("හත්සිය");
      expect(toSinhala(800)).toBe("අටසිය");
      expect(toSinhala(900)).toBe("නවසිය");
    });

    it("converts hundreds with remainders", () => {
      expect(toSinhala(101)).toBe("එකසිය එක");
      expect(toSinhala(105)).toBe("එකසිය පහ");
      expect(toSinhala(115)).toBe("එකසිය පහළොව");
      expect(toSinhala(150)).toBe("එකසිය පනහ");
      expect(toSinhala(250)).toBe("දෙසිය පනහ");
      expect(toSinhala(345)).toBe("තුන්සිය හතළිස් පහ");
      expect(toSinhala(789)).toBe("හත්සිය අසූ නවය");
      expect(toSinhala(999)).toBe("නවසිය අනූ නවය");
    });
  });

  describe("full 0-999 range sanity check", () => {
    it("converts every integer from 0 to 999 without throwing non-empty string", () => {
      for (let i = 0; i <= 999; i++) {
        const result = toSinhala(i);
        expect(typeof result).toBe("string");
        expect(result.length).toBeGreaterThan(0);
        expect(numberToSinhala(i)).toBe(result);
      }
    });
  });
});
