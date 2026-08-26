import { describe, expect, it } from "vitest";

import { toSinhala } from "../src";

describe("toSinhala thousands (1000 - 999999)", () => {
  it("converts exact thousands", () => {
    expect(toSinhala(1000)).toBe("දහස");
    expect(toSinhala(2000)).toBe("දෙදහස");
    expect(toSinhala(3000)).toBe("තුන්දහස");
    expect(toSinhala(4000)).toBe("හාරදහස");
    expect(toSinhala(5000)).toBe("පන්දහස");
    expect(toSinhala(6000)).toBe("හයදහස");
    expect(toSinhala(7000)).toBe("හත්දහස");
    expect(toSinhala(8000)).toBe("අටදහස");
    expect(toSinhala(9000)).toBe("නවදහස");
    expect(toSinhala(10000)).toBe("දසදහස");
    expect(toSinhala(15000)).toBe("පහළොස්දහස");
    expect(toSinhala(20000)).toBe("විසිදහස");
    expect(toSinhala(21000)).toBe("විසිඑක්දහස");
    expect(toSinhala(50000)).toBe("පනස්දහස");
    expect(toSinhala(99000)).toBe("අනූනවදහස");
    expect(toSinhala(100000)).toBe("එකසියදහස");
    expect(toSinhala(105000)).toBe("එකසිය පන්දහස");
    expect(toSinhala(125000)).toBe("එකසිය විසිපන්දහස");
    expect(toSinhala(200000)).toBe("දෙසියදහස");
    expect(toSinhala(250000)).toBe("දෙසිය පනස්දහස");
    expect(toSinhala(500000)).toBe("පන්සියදහස");
    expect(toSinhala(999000)).toBe("නවසිය අනූනවදහස");
  });

  it("converts thousands with remainders", () => {
    expect(toSinhala(1001)).toBe("එක්දහස් එක");
    expect(toSinhala(1050)).toBe("එක්දහස් පනහ");
    expect(toSinhala(1100)).toBe("එක්දහස් සියය");
    expect(toSinhala(1250)).toBe("එක්දහස් දෙසිය පනහ");
    expect(toSinhala(2024)).toBe("දෙදහස් විසි හතර");
    expect(toSinhala(3456)).toBe("තුන්දහස් හාරසිය පනස් හය");
    expect(toSinhala(10001)).toBe("දසදහස් එක");
    expect(toSinhala(15250)).toBe("පහළොස්දහස් දෙසිය පනහ");
    expect(toSinhala(21005)).toBe("විසිඑක්දහස් පහ");
    expect(toSinhala(99999)).toBe("අනූනවදහස් නවසිය අනූ නවය");
    expect(toSinhala(100001)).toBe("එකසියදහස් එක");
    expect(toSinhala(125250)).toBe("එකසිය විසිපන්දහස් දෙසිය පනහ");
    expect(toSinhala(999999)).toBe("නවසිය අනූනවදහස් නවසිය අනූ නවය");
  });

  it("converts 1000000 to million by default without throwing", () => {
    expect(toSinhala(1000000)).toBe("මිලියනය");
  });
});
