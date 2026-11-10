/** Verified against https://docs.x.ai/developers/pricing on this date. */
export const verifiedOn = "2026-11-10";
export const currentModel = "grok-4.7";
export const modelContextTokens = 500_000;
export const longContextThreshold = 200_000;
export const textRates = {
  short: { input: 2, cached: 0.5, output: 6 },
  long: { input: 4, cached: 1, output: 12 },
};

/** Output tokens must include reasoning once, not once again as a separate charge. */
export function estimateTextCost(usage: { input: number; cached: number; output: number }) {
  if (usage.input < 0 || usage.cached < 0 || usage.output < 0 || usage.cached > usage.input) {
    throw new RangeError("Invalid token counts");
  }
  const rates = usage.input >= longContextThreshold ? textRates.long : textRates.short;
  return ((usage.input - usage.cached) * rates.input + usage.cached * rates.cached + usage.output * rates.output) / 1_000_000;
}