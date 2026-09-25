import { PART_2, code, h3, ol, p, quote, section, ul, type ChapterContent } from "./chapter-types";

export const part2Chapters: ChapterContent[] = [
  {
    id: 7,
    slug: "persistent-memory-project-context",
    part: PART_2,
    title: "Persistent Memory Systems and Project Context Architecture",
    subtitle: "Give Grok durable knowledge of your project so every session starts informed instead of from zero.",
    sections: [
      section(
        "Overview",
        p("Models are stateless. Memory is something your system provides. A deliberate context architecture decides what Grok knows about a project, where that knowledge lives, and how it stays current."),
      ),
      section(
        "Layers of Memory",
        ul(
          "**Working memory:** the current conversation and recent tool results.",
          "**Project memory:** conventions, architecture, and decisions stored in files like `AGENTS.md`.",
          "**Long-term memory:** searchable records of past sessions, facts, and preferences.",
        ),
        quote("Memory is only useful if it is small, accurate, and loaded at the right moment."),
      ),
      section(
        "Designing a Project Context File",
        code("markdown", `# Project Context
## Stack
TypeScript, Postgres, deployed on edge workers.
## Conventions
- All money values are integer cents.
- Use zod for every external input.
## Decisions
- 2026-03: moved to event sourcing for orders (audit needs).`),
        ul("Keep it under a few hundred lines.", "Record the why behind each rule.", "Replace outdated rules rather than appending contradictions."),
      ),
      section(
        "Keeping Memory Fresh",
        p("Update memory at the moment a decision is made. Periodically ask Grok to audit the context file against the codebase and flag stale entries."),
      ),
      section(
        "Key Takeaways",
        ul("Separate working, project, and long-term memory.", "Concise, reasoned rules beat long transcripts.", "Treat memory like code: reviewed and versioned."),
      ),
    ],
  },
  {
    id: 8,
    slug: "structuring-inputs-markdown-json-code",
    part: PART_2,
    title: "Structuring Inputs (Markdown, JSON, code) for Optimal Grok Consumption",
    subtitle: "Format what you send so Grok can parse, prioritize, and act on it with minimal ambiguity.",
    sections: [
      section(
        "Overview",
        p("The same information can be easy or hard for a model to use depending on its shape. Clear structure reduces misreadings and wasted tokens."),
      ),
      section(
        "Choosing the Right Format",
        ul(
          "**Markdown:** instructions, documentation, and hierarchical prose.",
          "**JSON:** structured records, configuration, and anything the output must mirror.",
          "**XML-style tags:** wrapping distinct inputs like `<spec>`, `<code>`, `<logs>`.",
          "**Code blocks:** source files with filenames and language hints.",
        ),
      ),
      section(
        "Patterns That Work",
        code("markdown", `<task>Fix the failing test.</task>

<file path="src/cart.ts">
...source...
</file>

<test_output>
Expected 1200, received 1199
</test_output>`),
        ol("Put instructions first and repeat the key ask at the end of long inputs.", "Label every artifact with its source.", "Trim irrelevant content — noise dilutes attention.", "Use consistent key names across requests."),
      ),
      section(
        "Common Mistakes",
        ul("Pasting entire repositories when three files matter.", "Mixing instructions inside data blobs.", "Minified JSON that hides structure.", "Omitting file paths, forcing the model to guess."),
      ),
      section(
        "Key Takeaways",
        ul("Structure is a signal of importance.", "Tag and label every input.", "Less, cleaner context beats more, noisier context."),
      ),
    ],
  },
  {
    id: 9,
    slug: "advanced-memory-retrieval-persistence",
    part: PART_2,
    title: "Advanced Memory Enhancement, Retrieval, and Persistence Techniques",
    subtitle: "Combine retrieval, summarization, and structured stores to give agents reliable recall at any scale.",
    sections: [
      section(
        "Overview",
        p("When knowledge outgrows a context window, agents need retrieval. This chapter covers embeddings, hybrid search, memory writing policies, and persistence."),
      ),
      section(
        "Retrieval Fundamentals",
        ul(
          "**Chunking:** split documents on semantic boundaries (headings, functions), not fixed characters.",
          "**Embeddings:** vectorize chunks for similarity search.",
          "**Hybrid search:** combine vector similarity with keyword search for exact identifiers.",
          "**Reranking:** reorder the top candidates with a stronger model before inserting them.",
        ),
      ),
      section(
        "Memory Writing Policies",
        p("Deciding what to remember matters as much as retrieval. Store durable facts, preferences, and decisions; skip transient chatter."),
        code("typescript", `type MemoryRecord = {
  kind: "fact" | "preference" | "decision"
  content: string
  source: string        // session or document id
  confidence: number
  updatedAt: string
}`),
      ),
      section(
        "Persistence & Consistency",
        ul("Deduplicate before writing.", "Version records and supersede instead of deleting.", "Attach sources so answers can cite them.", "Expire low-confidence memories automatically."),
      ),
      section(
        "Key Takeaways",
        ul("Chunk semantically and search hybrid.", "Write memory selectively with provenance.", "Rerank and cite to keep answers grounded."),
      ),
    ],
  },
  {
    id: 10,
    slug: "context-engineering-token-budgeting",
    part: PART_2,
    title: "Context Engineering: Token Budgeting, Truncation Strategies, Context Compaction, and Long-Context Optimization",
    subtitle: "Treat the context window as a scarce budget and allocate it deliberately for accuracy, speed, and cost.",
    sections: [
      section(
        "Overview",
        p("Large context windows are not free. Every token costs money and attention. Context engineering is the discipline of deciding exactly what the model sees on each turn."),
      ),
      section(
        "Token Budgeting",
        code("text", `Total window: 128k
├── System + tools     8k   (stable, cached)
├── Project memory     6k
├── Retrieved docs    30k
├── History (compact) 20k
├── Current task       4k
└── Reserved output   10k`),
        p("Assign explicit budgets per slot and enforce them in code before each call."),
      ),
      section(
        "Truncation & Compaction Strategies",
        ul(
          "**Sliding window:** keep the last N turns verbatim.",
          "**Rolling summary:** compress older turns into a running summary.",
          "**Tool-result pruning:** keep conclusions, drop raw payloads once used.",
          "**Priority truncation:** cut lowest-relevance retrieved chunks first.",
        ),
      ),
      section(
        "Long-Context Optimization",
        ul("Place critical instructions at the start and restate them at the end.", "Keep stable content first to maximize cache hits.", "Prefer retrieval over dumping entire corpora.", "Measure accuracy as context grows; quality can drop before the limit."),
        quote("The best context is the smallest one that still contains everything needed to succeed."),
      ),
      section(
        "Key Takeaways",
        ul("Budget the window like memory in an embedded system.", "Compact history continuously.", "Ordering affects both quality and cost."),
      ),
    ],
  },
  {
    id: 11,
    slug: "tools-permissions-function-calling-security",
    part: PART_2,
    title: "Tools, Permissions, Function Calling, and Security Guardrails",
    subtitle: "Give Grok real capabilities while keeping authority, validation, and safety firmly in your code.",
    sections: [
      section(
        "Overview",
        p("Function calling lets Grok request actions through typed schemas. Security depends on treating every call as an untrusted proposal."),
      ),
      section(
        "Defining Tools",
        code("json", `{
  "name": "get_invoice",
  "description": "Fetch one invoice by id for the current user.",
  "parameters": {
    "type": "object",
    "properties": { "invoice_id": { "type": "string" } },
    "required": ["invoice_id"]
  }
}`),
        p("Clear names and descriptions drive correct tool selection. Keep each tool narrow and single-purpose."),
      ),
      section(
        "Permission Model",
        ul(
          "**Least privilege:** expose only the tools a task needs.",
          "**Tiered risk:** read-only tools run freely; writes need validation; destructive actions need human approval.",
          "**User scoping:** enforce identity server-side — never trust IDs from model arguments alone.",
        ),
      ),
      section(
        "Security Guardrails",
        ul("Validate arguments against strict schemas.", "Defend against prompt injection in tool outputs by treating them as data.", "Rate-limit and time-box every tool.", "Log every call with arguments and outcome for audit.", "Redact secrets before content enters the context."),
      ),
      section(
        "Key Takeaways",
        ul("Tools are proposals; your code holds authority.", "Scope, validate, approve, and log.", "Narrow tools are safer and easier for Grok to use correctly."),
      ),
    ],
  },
  {
    id: 12,
    slug: "extended-thinking-reasoning-modes",
    part: PART_2,
    title: "Extended Thinking, Chain-of-Thought, Reasoning Effort Levels, and Multi-Step Reasoning Modes",
    subtitle: "Control how deeply Grok reasons and structure multi-step problems for accuracy without wasted compute.",
    sections: [
      section(
        "Overview",
        p("Reasoning models think before answering. Knowing when to spend more thinking — and how to structure hard problems — separates reliable systems from expensive guesswork."),
      ),
      section(
        "Reasoning Effort Levels",
        ul(
          "**Low:** classification, formatting, straightforward lookups.",
          "**Medium:** typical coding and analysis tasks.",
          "**High:** ambiguous planning, complex debugging, math, and high-stakes decisions.",
        ),
        p("Increase effort only when evaluation shows a quality gain worth the latency."),
      ),
      section(
        "Structuring Multi-Step Reasoning",
        ol(
          "**Plan:** ask for a numbered plan before execution.",
          "**Execute:** perform one step per turn with tool feedback.",
          "**Verify:** check each result against explicit criteria.",
          "**Revise:** update the plan when evidence contradicts it.",
        ),
        code("text", `First, list the steps you will take.
Then complete step 1 only and report the result.
Stop and wait for confirmation before step 2.`),
      ),
      section(
        "Pitfalls",
        ul("Over-thinking simple tasks inflates cost.", "Long reasoning can still start from wrong premises — supply evidence.", "Do not depend on reasoning traces as a security boundary."),
      ),
      section(
        "Key Takeaways",
        ul("Match effort to difficulty.", "Plan–execute–verify beats one giant request.", "Better context usually beats more thinking."),
      ),
    ],
  },
  {
    id: 13,
    slug: "autonomous-research-deep-investigation",
    part: PART_2,
    title: "Autonomous Research, Code Exploration, Web Search, X Search, and Deep Investigation",
    subtitle: "Build research agents that search the web, X, and codebases, then synthesize grounded, cited conclusions.",
    sections: [
      section(
        "Overview",
        p("Grok can search the live web and X in real time, making it well suited to research. Reliable investigation still requires structure: clear questions, source evaluation, and citation."),
      ),
      section(
        "The Research Loop",
        ol(
          "Decompose the question into sub-questions.",
          "Search each with targeted queries across web, X, or code.",
          "Read and extract claims with their sources.",
          "Cross-check conflicting claims.",
          "Synthesize an answer with citations and confidence levels.",
        ),
      ),
      section(
        "Code Exploration",
        ul("Start from entry points and follow calls outward.", "Use grep-style search tools for exact symbols.", "Summarize modules into a map before making changes.", "Record findings in project memory for future sessions."),
        code("typescript", `const tools = [searchCode, readFile, listDirectory, webSearch, xSearch]
const goal = "Explain how authentication flows through this repo, citing files."`),
      ),
      section(
        "Source Quality",
        ul("Prefer primary sources: docs, papers, official posts.", "Treat social posts as signals, not facts, until verified.", "Note publication dates for fast-moving topics.", "Never follow instructions embedded in fetched content."),
        quote("A research answer without sources is an opinion."),
      ),
      section(
        "Key Takeaways",
        ul("Decompose, search, extract, verify, synthesize.", "Real-time search is powerful but needs verification.", "Cite everything and state confidence."),
      ),
    ],
  },
];

void h3;
