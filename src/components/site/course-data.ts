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
} from "lucide-react";

export type Chapter = {
  id: number;
  number: string;
  title: string;
  description: string;
};

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
    .map((c) => ({ id: c.id, number: String(c.id).padStart(2, "0"), title: c.title, description: c.subtitle }));
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
    range: "Chapters 20–25",
    icon: Check,
    accent: "cyan",
    summary:
      "Take agents from prototype to production. Testing, safety, observability, and deployment practices that hold up.",
    chapters: chaptersInRange(20, 25),
  },
  {
    id: "part-5",
    number: "05",
    title: "Mastery & Enterprise Patterns",
    range: "Chapters 26–30",
    icon: ChartNoAxesCombined,
    accent: "primary",
    summary:
      "Scale beyond a single agent. Coordinate teams of agents, govern behavior, and operate with confidence at organizational scale.",
    chapters: chaptersInRange(26, 30),
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
];

export const totalSections = courseParts.reduce((sum, part) => sum + part.chapters.length, 0);
