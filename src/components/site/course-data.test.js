import { describe, expect, test } from "bun:test";
import { chapterLabel, chapterNumber, courseParts, orderedChapters, partLabel } from "./course-data";

describe("chapter organization", () => {
  test("keeps numbered chapters sequential and appendices after chapter 37", () => {
    expect(orderedChapters.map((chapter) => chapter.id)).toEqual([
      ...Array.from({ length: 37 }, (_, index) => index + 1),
      ...Array.from({ length: 7 }, (_, index) => index + 101),
    ]);
  });
  test("shows appendices A–G instead of chapter numbers 101–107", () => {
    expect(Array.from({ length: 7 }, (_, index) => chapterNumber(index + 101))).toEqual(["A", "B", "C", "D", "E", "F", "G"]);
    expect(chapterLabel(101)).toBe("Appendix A");
    expect(chapterLabel(37)).toBe("Chapter 37");
  });
  test("distinguishes the supplement and references from numbered course parts", () => {
    expect(courseParts.map(partLabel)).toEqual(["Part 01", "Part 02", "Part 03", "Part 04", "Part 05", "Supplement", "Part 06", "Reference"]);
  });
  test("groups chapter 25 with its authored Part 5, not Part 4", () => {
    expect(courseParts.find((part) => part.id === "part-4")?.chapters.map((chapter) => chapter.id)).toEqual([20, 21, 22, 23, 24]);
    expect(courseParts.find((part) => part.id === "part-5")?.chapters.map((chapter) => chapter.id)).toEqual([25, 26, 27, 28, 29, 30]);
  });
});