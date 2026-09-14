import type { LucideIcon } from "lucide-react";
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
    chapters: [
      { id: 1, number: "01", title: "Meet Grok", description: "Where xAI's models fit in the landscape and what makes them distinct." },
      { id: 2, number: "02", title: "How Language Models Reason", description: "The mechanics behind prediction, tokens, and the illusion of understanding." },
      { id: 3, number: "03", title: "Your First Prompt", description: "Anatomy of an effective prompt and the patterns that scale from day one." },
      { id: 4, number: "04", title: "Context Windows & Limits", description: "Work within token budgets and design around the edges of model memory." },
      { id: 5, number: "05", title: "Prompt Patterns That Work", description: "Repeatable structures for instruction, examples, and constraints." },
      { id: 6, number: "06", title: "Avoiding Common Pitfalls", description: "Recognize and fix the failure modes that quietly degrade output quality." },
    ],
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
    chapters: [
      { id: 7, number: "07", title: "Context Engineering", description: "Compose context deliberately instead of hoping the model finds the signal." },
      { id: 8, number: "08", title: "Few-Shot & Example Design", description: "Choose examples that teach the behavior you actually want to replicate." },
      { id: 9, number: "09", title: "Structured Output", description: "Force reliable JSON, schemas, and typed responses the rest of your code can trust." },
      { id: 10, number: "10", title: "Memory & State", description: "Carry intent across turns with short-term, working, and long-term memory layers." },
      { id: 11, number: "11", title: "Reasoning & Chain-of-Thought", description: "Let the model show its work and intervene when the chain drifts." },
      { id: 12, number: "12", title: "Self-Critique & Reflection", description: "Build loops where the model reviews, corrects, and improves its own output." },
      { id: 13, number: "13", title: "Evaluating Output Quality", description: "Measure correctness with rubrics, checks, and lightweight eval harnesses." },
    ],
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
    chapters: [
      { id: 14, number: "14", title: "Tool Calling Fundamentals", description: "Define tools the model can invoke and wire them into a real runtime." },
      { id: 15, number: "15", title: "Designing Tool Interfaces", description: "Names, descriptions, and schemas that make tools discoverable and safe." },
      { id: 16, number: "16", title: "Retrieval-Augmented Generation", description: "Ground responses in your own documents and knowledge with RAG pipelines." },
      { id: 17, number: "17", title: "Function Orchestration", description: "Sequence tools, parallelize calls, and handle failures gracefully." },
      { id: 18, number: "18", title: "Building Your First Agent", description: "Assemble a goal-driven agent that plans, acts, and reports back." },
      { id: 19, number: "19", title: "Sandboxing & Permissions", description: "Run agent actions safely with scopes, approval, and bounded capabilities." },
    ],
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
    chapters: [
      { id: 20, number: "20", title: "Testing Agentic Systems", description: "Write evals, regression suites, and golden cases for non-deterministic behavior." },
      { id: 21, number: "21", title: "Safety & Guardrails", description: "Add input validation, output filters, and fail-safes that protect users." },
      { id: 22, number: "22", title: "Observability & Tracing", description: "See what your agents actually did with traces, spans, and decision logs." },
      { id: 23, number: "23", title: "Error Handling & Fallbacks", description: "Design retries, degradations, and human escalation for when things break." },
      { id: 24, number: "24", title: "Cost & Latency Engineering", description: "Tune model choice, caching, and batching without sacrificing quality." },
      { id: 25, number: "25", title: "Deployment Patterns", description: "Ship agents behind APIs, queues, and runtimes built for real traffic." },
    ],
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
    chapters: [
      { id: 26, number: "26", title: "Multi-Agent Architecture", description: "Decompose problems across specialized agents that coordinate and delegate." },
      { id: 27, number: "27", title: "Agent Roles & Coordination", description: "Define planner, worker, and critic roles with clear contracts between them." },
      { id: 28, number: "28", title: "Governance & Compliance", description: "Auditability, policy enforcement, and controls for regulated environments." },
      { id: 29, number: "29", title: "Human-in-the-Loop Systems", description: "Place review, approval, and override where they add the most leverage." },
      { id: 30, number: "30", title: "Operating at Scale", description: "Reliability, versioning, and team practices for durable agentic platforms." },
    ],
  },
  {
    id: "bonus",
    number: "✦",
    title: "Loop Engineering Supplement",
    range: "Advanced patterns",
    icon: Repeat2,
    accent: "cyan",
    summary:
      "The capstone. Advanced patterns for durable, self-correcting autonomous workflows that keep improving over time.",
    chapters: [
      { id: 31, number: "S1", title: "Autonomous Loop Design", description: "Structure plan-act-reflect loops that converge instead of drift." },
      { id: 32, number: "S2", title: "Self-Correction & Recovery", description: "Detect failure modes and reroute without human intervention." },
      { id: 33, number: "S3", title: "Long-Running Agent Systems", description: "Persistence, checkpoints, and resumable workflows across hours or days." },
    ],
  },
];

export const totalSections = courseParts.reduce((sum, part) => sum + part.chapters.length, 0);
