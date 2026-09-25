export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; language: string; code: string }
  | { type: "quote"; text: string };

export type ChapterSection = {
  heading: string;
  content: ContentBlock[];
};

export type ChapterContent = {
  id: number;
  slug: string;
  part: string;
  title: string;
  subtitle: string;
  sections: ChapterSection[];
};

/* Authoring helpers. Inline text supports `code` and **bold**. */
export const p = (text: string): ContentBlock => ({ type: "p", text });
export const h3 = (text: string): ContentBlock => ({ type: "h3", text });
export const ul = (...items: string[]): ContentBlock => ({ type: "ul", items });
export const ol = (...items: string[]): ContentBlock => ({ type: "ol", items });
export const quote = (text: string): ContentBlock => ({ type: "quote", text });
export const code = (language: string, source: string): ContentBlock => ({ type: "code", language, code: source });
export const section = (heading: string, ...content: ContentBlock[]): ChapterSection => ({ heading, content });

export const PART_1 = "Part 1: Foundations";
export const PART_2 = "Part 2: Core Skills & Context Engineering";
export const PART_3 = "Part 3: Extending Grok";
export const PART_4 = "Part 4: Shipping Real Software";
export const PART_5 = "Part 5: Mastery & Enterprise Patterns";
export const PART_BONUS = "Bonus: Loop Engineering Supplement";
