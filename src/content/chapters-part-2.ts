import { PART_2, code, h3, ol, p, quote, section, ul, type ChapterContent } from "./chapter-types";

export const part2Chapters: ChapterContent[] = [
  // ==================== CHAPTER 7 ====================
  {
    id: 7,
    slug: "persistent-memory-project-context",
    part: PART_2,
    title: "Persistent Memory Systems and Project Context Architecture",
    subtitle: "Give Grok durable knowledge of your project so every session starts informed instead of from zero.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("Grok is stateless between requests. Any knowledge that must survive across conversations, sessions, or days has to be provided by your system. This chapter shows how to design a practical three-layer memory architecture that keeps agents informed without overwhelming the context window."),
        h3("By the end of this chapter you will be able to"),
        ul(
          "Separate working memory, project memory, and long-term knowledge.",
          "Design a clean project context structure (usually living in .grok/ or AGENTS.md).",
          "Load the right memory at the right time.",
          "Keep project memory accurate and up-to-date as the codebase evolves.",
          "Avoid common memory-related failures (staleness, contradiction, bloat)."
        )
      ),
      section(
        "Core Theoretical Principles – The Three-Layer Model",
        ul(
          "**Working Memory** — The current conversation, recent tool results, and immediate task state. Lives only for the session (or until compacted).",
          "**Project / Medium-term Memory** — Architecture decisions, coding standards, important constraints, current goals, and open questions. Usually stored in version-controlled files such as AGENTS.md, .grok/context/, or a decisions log.",
          "**Long-term Knowledge** — Documentation, past research, resolved incidents, and searchable historical information. Often stored in Collections, a vector store, or a documentation system."
        ),
        quote("Memory is only useful when it is small, accurate, relevant, and loaded at the right moment.")
      ),
      section(
        "Designing Project Context",
        p("Create a concise, version-controlled source of truth that every agent and every developer can read."),
        code(
          "markdown",
          `# Project Context

## Stack
- TypeScript, React, Node.js
- PostgreSQL + Redis
- Deployed on Fly.io

## Hard Rules
- All money values are integer cents
- Every external input is validated with Zod
- No direct database access from the frontend

## Key Decisions
- 2026-03-12: Moved order processing to event sourcing (audit + replay requirements)
- 2026-05-03: Adopted Grok 4.6 as the primary coding model

## Open Questions
- Should we introduce a read replica for reporting?`
        ),
        ul(
          "Keep it short (ideally under a few hundred lines).",
          "Record the *why*, not just the *what*.",
          "Update it as part of the Definition of Done for architectural changes.",
          "Prefer replacing outdated rules over appending contradictory ones."
        )
      ),
      section(
        "Loading Memory into the Agent",
        p("At the start of every significant task, explicitly inject the relevant project context into the system or first user message. For long-running agents, re-inject or refresh it periodically."),
        code(
          "typescript",
          `function buildMessages(task: string, history: Message[]) {
  const projectContext = loadProjectContext(); // reads AGENTS.md + decisions
  return [
    { role: "system", content: SYSTEM_PROMPT + "\\n\\n" + projectContext },
    ...compact(history),
    { role: "user", content: task },
  ];
}`
        )
      ),
      section(
        "Keeping Memory Fresh",
        ul(
          "Update project memory in the same PR that changes the architecture.",
          "Periodically ask Grok to audit the context file against the current codebase and flag stale or missing entries.",
          "Treat memory files like code: review them, version them, and reject low-quality additions."
        )
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Separate working, project, and long-term memory.",
          "Keep project context concise, reasoned, and version-controlled.",
          "Load only what is relevant for the current task.",
          "Make updating memory part of normal engineering practice."
        ),
        p("Next → Chapter 8: Structuring Inputs (Markdown, JSON, code) for Optimal Grok Consumption.")
      ),
    ],
  },

  // ==================== CHAPTER 8 ====================
  {
    id: 8,
    slug: "structuring-inputs-markdown-json-code",
    part: PART_2,
    title: "Structuring Inputs (Markdown, JSON, code) for Optimal Grok Consumption",
    subtitle: "Format what you send so Grok can parse, prioritize, and act on it with minimal ambiguity.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("The same information can be easy or hard for a model to use depending on how it is shaped. Clear structure reduces errors, lowers token usage, and improves tool selection and reasoning quality."),
        ul(
          "Choose the right format for different kinds of information.",
          "Use consistent labeling and delimiters.",
          "Avoid common formatting mistakes that confuse models.",
          "Design inputs that work well with both human readers and Grok."
        )
      ),
      section(
        "Choosing the Right Format",
        ul(
          "**Markdown** — Best for instructions, documentation, hierarchical prose, and most system prompts.",
          "**JSON** — Ideal for structured data, configuration, and any content that must later be parsed programmatically.",
          "**XML-style tags** — Excellent for clearly separating different sections (`<task>`, `<code>`, `<logs>`, `<constraints>`).",
          "**Fenced code blocks** — Always include the language and, when possible, the filename.",
          "**Diffs** — Prefer unified diffs when asking for code reviews or changes."
        )
      ),
      section(
        "High-Signal Input Patterns",
        code(
          "markdown",
          `<task>
Fix the failing test and explain the root cause.
</task>

<file path="src/cart.ts">
// current source code
</file>

<test_output>
Expected: 1200
Received: 1199
</test_output>

<constraints>
- Do not change the public API
- Keep the fix minimal
</constraints>`
        ),
        ol(
          "Put the most important instructions first and restate the key ask at the end of long inputs.",
          "Label every artifact clearly (file path, source, timestamp, etc.).",
          "Remove irrelevant content — noise dilutes attention.",
          "Be consistent with key names and structure across requests."
        )
      ),
      section(
        "Common Mistakes to Avoid",
        ul(
          "Pasting an entire repository when only three files matter.",
          "Mixing instructions inside large data blobs.",
          "Sending minified JSON or single-line code.",
          "Omitting file paths or context about where the code lives.",
          "Using inconsistent formatting between turns."
        )
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Structure is a strong signal of importance.",
          "Clear labels and delimiters dramatically improve reliability.",
          "Less, cleaner context almost always beats more, noisier context.",
          "Design inputs for both the model and the humans who will debug them."
        ),
        p("Next → Chapter 9: Advanced Memory Enhancement, Retrieval, and Persistence Techniques.")
      ),
    ],
  },

  // ==================== CHAPTER 9 ====================
  {
    id: 9,
    slug: "advanced-memory-retrieval-persistence",
    part: PART_2,
    title: "Advanced Memory Enhancement, Retrieval, and Persistence Techniques",
    subtitle: "Combine retrieval, summarization, and structured stores so agents can recall the right information at any scale.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("When knowledge exceeds the practical context window, agents need retrieval. This chapter covers how to move from simple project files to robust retrieval-augmented systems while keeping memory accurate and manageable."),
        ul(
          "Design good chunking and embedding strategies.",
          "Combine vector search with keyword search (hybrid retrieval).",
          "Decide what should be written into long-term memory.",
          "Maintain provenance and confidence for retrieved knowledge.",
          "Avoid memory pollution and staleness."
        )
      ),
      section(
        "Retrieval Fundamentals",
        ul(
          "**Chunking** — Split on semantic boundaries (headings, functions, sections) rather than fixed character counts.",
          "**Embeddings** — Turn chunks into vectors for similarity search.",
          "**Hybrid Search** — Combine dense vector search with sparse keyword search for exact identifiers and names.",
          "**Reranking** — Use a stronger model or cross-encoder to reorder the top candidates before inserting them into context.",
          "**Metadata filtering** — Restrict results by date, project area, document type, or confidence."
        )
      ),
      section(
        "Memory Writing Policies",
        p("Not everything should be remembered. Write durable facts, architectural decisions, user preferences, and verified outcomes. Skip transient conversation and low-confidence speculation."),
        code(
          "typescript",
          `type MemoryRecord = {
  id: string;
  kind: "fact" | "decision" | "preference" | "incident";
  content: string;
  source: string;
  confidence: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
};`
        )
      ),
      section(
        "Persistence & Consistency Practices",
        ul(
          "Deduplicate before writing.",
          "Prefer superseding old records over silent contradiction.",
          "Always store the source so answers can be cited.",
          "Expire or re-verify low-confidence and old memories.",
          "Make memory updates reviewable (especially for project-level decisions)."
        )
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Retrieval quality depends more on chunking and filtering than on embedding model choice alone.",
          "Write memory selectively and with provenance.",
          "Hybrid search + reranking is usually worth the extra step.",
          "Treat long-term memory as a living system that requires maintenance."
        ),
        p("Next → Chapter 10: Context Engineering – Token Budgeting, Truncation, Compaction, and Long-Context Optimization.")
      ),
    ],
  },

  // ==================== CHAPTER 10 ====================
  {
    id: 10,
    slug: "context-engineering-token-budgeting",
    part: PART_2,
    title: "Context Engineering: Token Budgeting, Truncation Strategies, Context Compaction, and Long-Context Optimization",
    subtitle: "Treat the context window as a scarce, expensive resource and allocate it deliberately.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("Even very large context windows are finite and costly. Context engineering is the discipline of deciding exactly what the model sees on every turn so that quality stays high while cost and latency stay under control."),
        ul(
          "Assign explicit token budgets to different parts of the context.",
          "Apply truncation and compaction strategies that preserve the most important information.",
          "Optimize for prompt caching.",
          "Avoid classic long-context failure modes (lost-in-the-middle, dilution, stale information)."
        )
      ),
      section(
        "Token Budgeting Framework",
        code(
          "text",
          `Example 128k window budget
├── System + tools          6–8k   (stable, cached)
├── Project memory          4–8k
├── Retrieved knowledge    20–40k
├── Compacted history      15–25k
├── Current task + artifacts 4–8k
└── Reserved for output     8–15k`
        ),
        p("Set hard limits per section and enforce them in code before every model call. Leave a safety margin.")
      ),
      section(
        "Compaction & Truncation Strategies",
        ul(
          "**Sliding window** — Keep the most recent N turns verbatim.",
          "**Rolling summary** — Compress older turns into a running summary.",
          "**Tool-result pruning** — Once a result has been used, replace the full payload with a short conclusion.",
          "**Priority-based truncation** — Drop lowest-relevance retrieved chunks first.",
          "**Structured compaction** — Ask Grok to produce a concise state summary that becomes the new history."
        )
      ),
      section(
        "Long-Context Best Practices",
        ul(
          "Put critical instructions at the beginning and restate the key goal at the end.",
          "Keep stable content (system prompt, tools, core project rules) first to maximize cache hits.",
          "Prefer retrieval over dumping large documents.",
          "Measure quality as context grows — more tokens do not always improve results.",
          "Watch for “lost-in-the-middle” effects; important facts can be overlooked if buried deeply."
        ),
        quote("The best context is the smallest one that still contains everything the model needs to succeed.")
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Budget the context window like a scarce resource.",
          "Compact continuously rather than waiting for the limit.",
          "Design for caching by keeping stable prefixes identical.",
          "Measure real task success, not just how much context you managed to stuff in."
        ),
        p("Next → Chapter 11: Tools, Permissions, Function Calling, and Security Guardrails.")
      ),
    ],
  },

  // ==================== CHAPTER 11 ====================
  {
    id: 11,
    slug: "tools-permissions-function-calling-security",
    part: PART_2,
    title: "Tools, Permissions, Function Calling, and Security Guardrails",
    subtitle: "Give Grok real capabilities while keeping authority, validation, and safety firmly under your control.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("Tools turn Grok from a text generator into an actor. The difference between a useful agent and a dangerous one lies in how carefully you define, validate, and authorize those tools."),
        ul(
          "Design clear, narrow tool schemas.",
          "Implement a robust permission and validation layer.",
          "Distinguish between read-only, write, and high-risk actions.",
          "Defend against prompt injection and tool misuse.",
          "Log and audit every tool invocation."
        )
      ),
      section(
        "Tool Design Principles",
        ul(
          "Prefer many narrow tools over a few overly powerful ones.",
          "Write precise descriptions — the model relies on them for selection.",
          "Use strict JSON Schema (types, enums, minimum/maximum, required fields).",
          "Make side-effects explicit in the tool description.",
          "Return structured errors the model can understand and recover from."
        ),
        code(
          "json",
          `{
  "name": "get_invoice",
  "description": "Fetch a single invoice by ID for the currently authenticated user. Read-only.",
  "parameters": {
    "type": "object",
    "properties": {
      "invoice_id": { "type": "string", "description": "The invoice ID" }
    },
    "required": ["invoice_id"]
  }
}`
        )
      ),
      section(
        "Permission & Safety Model",
        ul(
          "**Least privilege** — Only expose the tools the current task actually needs.",
          "**Tiered risk** — Read-only tools can be free; writes require stronger validation; destructive or irreversible actions require human approval or very high confidence.",
          "**Server-side enforcement** — Never trust the model to respect permissions. Check identity, ownership, and policy in your own code before executing anything.",
          "**Idempotency** — Design write tools so that retries are safe."
        )
      ),
      section(
        "Security Guardrails",
        ul(
          "Validate every argument against the schema before execution.",
          "Treat all tool results as untrusted data (prompt-injection risk).",
          "Apply rate limits, timeouts, and size limits.",
          "Log tool name, arguments (redacted if sensitive), latency, and outcome.",
          "Redact secrets before any content enters the model context."
        ),
        quote("Grok proposes. Your code disposes.")
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Narrow, well-described tools are safer and more reliable.",
          "Authority must live in your runtime, not in the prompt.",
          "Validate, authorize, execute, log — in that order.",
          "Design for failure and for audit from day one."
        ),
        p("Next → Chapter 12: Extended Thinking, Chain-of-Thought, Reasoning Effort Levels, and Multi-Step Reasoning Modes.")
      ),
    ],
  },

  // ==================== CHAPTER 12 ====================
  {
    id: 12,
    slug: "extended-thinking-reasoning-modes",
    part: PART_2,
    title: "Extended Thinking, Chain-of-Thought, Reasoning Effort Levels, and Multi-Step Reasoning Modes",
    subtitle: "Control how deeply Grok thinks and structure hard problems so that extra reasoning actually improves outcomes.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("Modern Grok models perform internal extended thinking before answering. Knowing when to spend more reasoning tokens — and how to guide that reasoning — is a key engineering skill."),
        ul(
          "Select appropriate reasoning_effort levels for different tasks.",
          "Combine reasoning controls with good prompt patterns.",
          "Structure multi-step work into plan → execute → verify cycles.",
          "Avoid wasting tokens on over-thinking simple problems.",
          "Measure when higher effort actually improves results."
        )
      ),
      section(
        "Understanding Reasoning Effort",
        ul(
          "**Low** — Classification, routing, formatting, simple extraction, lightweight tool use.",
          "**Medium** — Typical coding, analysis, and most production agent turns.",
          "**High** — Complex debugging, architecture decisions, ambiguous planning, hard reasoning.",
          "**xhigh** — Reserved for the most difficult problems where maximum depth is justified."
        ),
        p("Higher effort increases latency and cost. It is not a substitute for missing context, poor tools, or unclear goals.")
      ),
      section(
        "Prompt Patterns That Work With Reasoning",
        ul(
          "Ask for a numbered plan before any action.",
          "Require the model to list assumptions and uncertainties.",
          "Force step-by-step execution with verification after each step.",
          "Request explicit self-critique before the final answer.",
          "Tell the model when to stop and ask for clarification instead of guessing."
        ),
        code(
          "text",
          `First, think step by step and produce a short plan.
Then execute only the first step and report the result.
Do not continue until I confirm.`
        )
      ),
      section(
        "Multi-Step Reasoning Pattern",
        ol(
          "**Plan** — Model produces a clear sequence of steps.",
          "**Execute** — Perform one step (often with tools).",
          "**Observe** — Feed the result back.",
          "**Verify** — Check whether the step succeeded and whether the overall plan still holds.",
          "**Revise** — Update the plan if new evidence requires it.",
          "**Repeat** until the goal is met or a budget is exhausted."
        )
      ),
      section(
        "Common Pitfalls",
        ul(
          "Using high or xhigh effort for simple tasks (expensive and slow).",
          "Expecting reasoning alone to compensate for missing information.",
          "Letting the model generate very long internal chains that still start from wrong premises.",
          "Relying on hidden reasoning as a safety mechanism (it is not)."
        )
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Match reasoning effort to task difficulty.",
          "Structure hard work into explicit plan–execute–verify loops.",
          "Measure the quality gain of higher effort — don’t assume it is always better.",
          "Good context and tools usually deliver more improvement than simply turning effort up."
        ),
        p("Next → Chapter 13: Autonomous Research, Code Exploration, Web Search, X Search, and Deep Investigation.")
      ),
    ],
  },
];
