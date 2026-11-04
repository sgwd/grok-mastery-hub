import type { LucideIcon } from "lucide-react";
import { allChapters } from "@/content/chapters";
import {
  Bot,
  Braces,
  ChartNoAxesCombined,
  Check,
  GitBranch,
  Globe,
  Layers,
  LockKeyhole,
  Repeat2,
  ServerCog,
  TerminalSquare,
  Workflow,
  BookOpen,
  Library,
} from "lucide-react";

export type Chapter = {
  id: number;
  number: string;
  title: string;
  description: string;
};

export function chapterNumber(id: number): string {
  return id >= 101 && id <= 107 ? String.fromCharCode(65 + id - 101) : String(id).padStart(2, "0");
}

export function chapterLabel(id: number): string {
  return `${id >= 101 ? "Appendix" : "Chapter"} ${chapterNumber(id)}`;
}

export function partLabel(part: CoursePart): string {
  return part.id === "bonus" ? "Supplement" : part.id === "appendices" ? "Reference" : `Part ${part.number}`;
}

export type CoursePart = {
  id: string;
  number: string;
  title: string;
  range: string;
  icon: LucideIcon;
  accent: string;
  summary: string;
  chapters: Chapter[];
};

function chaptersInRange(from: number, to: number): Chapter[] {
  return allChapters
    .filter((c) => c.id >= from && c.id <= to)
    .map((c) => ({
      id: c.id,
      number: chapterNumber(c.id),
      title: c.title,
      description: c.subtitle,
    }));
}

export const courseParts: CoursePart[] = [
  {
    id: "part-1",
    number: "01",
    title: "Foundations",
    range: "Chapters 1–6",
    icon: TerminalSquare,
    accent: "primary",
    summary:
      "Establish the mental model. Understand what Grok is, how it reasons, and how to write prompts that hold up under real work.",
    chapters: chaptersInRange(1, 6),
  },
  {
    id: "part-2",
    number: "02",
    title: "Core Skills & Context Engineering",
    range: "Chapters 7–13",
    icon: Layers,
    accent: "cyan",
    summary:
      "Move from prompts to systems. Build context, memory, and reasoning structures that produce consistent, reliable behavior.",
    chapters: chaptersInRange(7, 13),
  },
  {
    id: "part-3",
    number: "03",
    title: "Extending Grok",
    range: "Chapters 14–19",
    icon: Bot,
    accent: "primary",
    summary:
      "Connect Grok to the outside world. Tools, retrieval, and workflows that turn a chat model into a capable agent.",
    chapters: chaptersInRange(14, 19),
  },
  {
    id: "part-4",
    number: "04",
    title: "Shipping Real Software",
    range: "Chapters 20–24",
    icon: Check,
    accent: "cyan",
    summary:
      "Take agents from prototype to production. Testing, safety, observability, and deployment practices that hold up.",
    chapters: chaptersInRange(20, 24),
  },
  {
    id: "part-5",
    number: "05",
    title: "Mastery & Enterprise Patterns",
    range: "Chapters 25–30",
    icon: ChartNoAxesCombined,
    accent: "primary",
    summary:
      "Scale beyond a single agent. Coordinate teams of agents, govern behavior, and operate with confidence at organizational scale.",
    chapters: chaptersInRange(25, 30),
  },
  {
    id: "bonus",
    number: "✦",
    title: "Loop Engineering Supplement",
    range: "Chapter 31",
    icon: Repeat2,
    accent: "cyan",
    summary:
      "The capstone. Advanced patterns for durable, self-correcting autonomous workflows that keep improving over time.",
    chapters: chaptersInRange(31, 31),
  },
  {
    id: "part-6",
    number: "06",
    title: "Advanced Topics",
    range: "Chapters 32–37",
    icon: ServerCog,
    accent: "primary",
    summary:
      "Go deeper into platform engineering, advanced evaluation, long-term memory, prompt evolution, high-assurance safety, and large-scale optimization.",
    chapters: chaptersInRange(32, 37),
  },
  {
    id: "appendices",
    number: "A–G",
    title: "Appendices",
    range: "Reference Material",
    icon: Library,
    accent: "cyan",
    summary:
      "Essential prompt library, glossary, cheatsheets, recommended project structure, failure modes catalog, and further resources.",
    chapters: chaptersInRange(101, 107),
  },
];

export const totalSections = courseParts.reduce((sum, part) => sum + part.chapters.length, 0);
export const orderedChapters = courseParts.flatMap((part) => part.chapters);
export const totalChapters = orderedChapters.filter((chapter) => chapter.id < 101).length;
export const totalAppendices = totalSections - totalChapters;
