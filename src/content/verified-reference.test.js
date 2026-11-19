import { describe, expect, test } from "bun:test";
import { deliveryMultipliers, estimateTextCost, longContextThreshold, modelContextTokens, textRates } from "./verified-reference";

describe("verified Grok 4.7 text economics", () => {
  test("applies the published 20 percent batch discount", () => {
    expect(deliveryMultipliers.batch).toBe(0.8);
    expect(estimateTextCost({ input: 10_000, cached: 8_000, output: 2_000 }) * deliveryMultipliers.batch).toBeCloseTo(0.016);
  });
  test("uses a two-times priority token rate", () => {
    expect(deliveryMultipliers.priority).toBe(2);
    expect(estimateTextCost({ input: 10_000, cached: 8_000, output: 2_000 }) * deliveryMultipliers.priority).toBeCloseTo(0.04);
  });
  test("uses the ten percent US regional premium", () => {
    expect(deliveryMultipliers.usRegional).toBe(1.1);
    expect(estimateTextCost({ input: 10_000, cached: 8_000, output: 2_000 }) * deliveryMultipliers.usRegional).toBeCloseTo(0.022);
  });
  test("supports a 500,000 token window", () => {
    expect(modelContextTokens).toBe(500_000);
  });
  test("uses the published short-context rates per million tokens", () => {
    expect(textRates.short).toEqual({ input: 2, cached: 0.5, output: 6 });
    expect(estimateTextCost({ input: 10_000, cached: 8_000, output: 2_000 })).toBeCloseTo(0.02);
  });
  test("charges the higher rates for every token at 200,000 input tokens", () => {
    expect(longContextThreshold).toBe(200_000);
    expect(textRates.long).toEqual({ input: 4, cached: 1, output: 12 });
    expect(estimateTextCost({ input: 199_999, cached: 0, output: 1 })).toBeCloseTo(0.400004);
    expect(estimateTextCost({ input: 200_000, cached: 0, output: 1 })).toBeCloseTo(0.800012);
  });
  test("subtracts cached tokens from input before pricing fresh input", () => {
    expect(estimateTextCost({ input: 200_000, cached: 100_000, output: 10_000 })).toBeCloseTo(0.62);
    expect(() => estimateTextCost({ input: 100, cached: 101, output: 0 })).toThrow(RangeError);
  });
});