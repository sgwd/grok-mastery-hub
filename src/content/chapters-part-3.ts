import { PART_3, code, h3, ol, p, quote, section, ul, type ChapterContent } from "./chapter-types";

export const part3Chapters: ChapterContent[] = [
  // ==================== CHAPTER 14 ====================
  {
    id: 14,
    slug: "custom-prompt-templates-skills-workflows",
    part: PART_3,
    title: "Building Custom Prompt Templates, Skills, and Tailored Workflows",
    subtitle: "Turn successful prompts into reusable, versioned skills that your whole team (and your agents) can invoke.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("One-off prompts do not scale. High-performing teams convert proven prompts into named skills with clear descriptions, parameters, recommended settings, and output contracts."),
        ul(
          "Design reusable prompt templates with clean parameters.",
          "Package templates into discoverable skills.",
          "Organize skills so both humans and agents can find the right one.",
          "Version and improve skills over time.",
          "Compose skills into larger workflows."
        )
      ),
      section(
        "From Prompt to Skill",
        p("A good skill usually contains:"),
        ul(
          "A clear name and short description (when it should be used).",
          "The full instruction template with placeholders.",
          "Recommended model and reasoning_effort.",
          "Expected input and output format (ideally a schema).",
          "A few examples of good inputs and outputs.",
          "Any required tools."
        ),
        code(
          "markdown",
          `# Skill: code-review

Description: Perform a thorough, structured code review of a diff or set of files.

When to use: When a pull request is opened or a developer asks for a review.

Recommended settings: model=grok-4.6, reasoning_effort=high

Output: JSON following the review schema.`
        )
      ),
      section(
        "Skill Discovery & Organization",
        ul(
          "Keep skills in a version-controlled directory (e.g. \`.grok/skills/\`).",
          "Use consistent naming and a clear description so agents can select them automatically.",
          "Group related skills (review, research, release, incident, etc.).",
          "Document required permissions and side-effects."
        )
      ),
      section(
        "Composition & Workflows",
        p("Skills become most powerful when composed. A typical feature workflow might chain:"),
        ol(
          "plan-feature",
          "research-adjacent-code",
          "implement-from-spec",
          "write-tests",
          "code-review",
          "pr-description"
        ),
        p("An orchestrator (or a human) can invoke these skills in sequence, feeding the output of one into the next.")
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Treat prompts as product assets, not disposable chat messages.",
          "Give every skill a clear purpose, interface, and ownership.",
          "Make skills discoverable by both humans and agents.",
          "Compose simple skills into reliable workflows."
        ),
        p("Next → Chapter 15: Multi-Agent Architecture – Spawning, Managing, and Coordinating Agents.")
      ),
    ],
  },

  // ==================== CHAPTER 15 ====================
  {
    id: 15,
    slug: "multi-agent-architecture",
    part: PART_3,
    title: "Multi-Agent Architecture: Spawning, Managing, and Coordinating Agents",
    subtitle: "Design systems in which multiple specialized Grok agents collaborate on complex work.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("Some tasks are too broad, too adversarial, or too parallel for a single agent. Multi-agent architectures let you specialize roles, run work in parallel, and introduce deliberate critique."),
        ul(
          "Choose appropriate multi-agent topologies.",
          "Define clear contracts between agents.",
          "Manage shared state and prevent interference.",
          "Control cost and complexity when multiple agents run.",
          "Know when a single well-designed agent is actually better."
        )
      ),
      section(
        "Common Topologies",
        ul(
          "**Supervisor–Worker** — One coordinator decomposes work and delegates to specialists (most common and recommended starting point).",
          "**Pipeline** — Agents run in a fixed sequence (research → plan → implement → review).",
          "**Parallel Swarm** — Multiple agents explore different approaches simultaneously; results are later aggregated.",
          "**Critique / Debate** — One agent proposes, another deliberately criticizes, a third synthesizes.",
          "**Hierarchical** — Supervisors of supervisors for very large programs of work."
        )
      ),
      section(
        "Design Rules for Multi-Agent Systems",
        ul(
          "Give every agent a single clear responsibility.",
          "Use structured (preferably JSON) hand-offs between agents.",
          "Keep memory scoped — do not let every agent see every other agent’s private scratchpad.",
          "Enforce per-agent and global budgets.",
          "Make the supervisor responsible for final integration and quality."
        ),
        quote("More agents do not automatically produce better results. Coordination overhead is real.")
      ),
      section(
        "When to Stay Single-Agent",
        p("A single well-instrumented agent with good memory, tools, and prompting is often faster, cheaper, and easier to debug. Only move to multi-agent designs when you have evidence that specialization or parallelism is required.")
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Start with supervisor–worker before more exotic topologies.",
          "Contracts, budgets, and scoped memory are essential.",
          "Measure against a strong single-agent baseline.",
          "Complexity must pay for itself in quality or speed."
        ),
        p("Next → Chapter 16: Event Hooks, Triggers, and Automated Pipelines.")
      ),
    ],
  },

  // ==================== CHAPTER 16 ====================
  {
    id: 16,
    slug: "event-hooks-triggers-pipelines",
    part: PART_3,
    title: "Event Hooks, Triggers, and Automated Pipelines",
    subtitle: "Move from interactive agents to systems that react to real-world events and run without constant human initiation.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("Interactive agents wait for a human. Event-driven agents react to signals — pull requests, failed deploys, support tickets, scheduled times, metric alerts — and act within defined policy."),
        ul(
          "Design secure webhook and event ingestion.",
          "Build reliable automated pipelines that include Grok agents.",
          "Enforce idempotency, budgets, and human escalation.",
          "Integrate with existing CI, issue trackers, and monitoring systems.",
          "Keep automated agents observable and safe."
        )
      ),
      section(
        "Core Trigger Types",
        ul(
          "**Webhooks** — GitHub, GitLab, Stripe, monitoring systems, etc.",
          "**Schedules** — Cron-style nightly or hourly jobs.",
          "**Queues / Streams** — Internal event buses and work queues.",
          "**Lifecycle hooks** — Grok Build or application lifecycle events."
        )
      ),
      section(
        "Pipeline Design Principles",
        ol(
          "Validate and authenticate every incoming event.",
          "Make processing idempotent (use delivery IDs or content hashes).",
          "Give every run a unique execution ID and a hard budget.",
          "Separate observation, diagnosis, action, and verification stages.",
          "Escalate to humans when confidence is low or risk is high.",
          "Emit structured telemetry for every stage."
        )
      ),
      section(
        "Safety Invariants for Autonomous Runs",
        ul(
          "No unrestricted write access by default.",
          "High-risk actions require explicit allow-listing or human approval.",
          "Budgets on tokens, tool calls, wall time, and money.",
          "Dead-letter queues and alerting for failures.",
          "Full audit trail of what the agent saw and did."
        )
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Event-driven agents need stronger safety and observability than interactive ones.",
          "Idempotency and budgets are non-negotiable.",
          "Start with narrow, low-risk automations and expand only after evidence of reliability.",
          "Always keep a clear path for human intervention."
        ),
        p("Next → Chapter 17: Tool & Function Calling Deep Dive.")
      ),
    ],
  },

  // ==================== CHAPTER 17 ====================
  {
    id: 17,
    slug: "tool-function-calling-deep-dive",
    part: PART_3,
    title: "Tool & Function Calling Deep Dive",
    subtitle: "Master the full tool-calling surface — built-in tools, custom functions, parallel calls, MCP, and production patterns.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("This chapter goes deeper into the practical engineering of tool use: how to mix server-side and client-side tools, control parallelism, handle errors, integrate MCP, and keep large tool ecosystems maintainable."),
        ul(
          "Correctly combine built-in server-side tools with custom functions.",
          "Control parallel versus sequential tool execution.",
          "Design robust error handling and recovery.",
          "Integrate Model Context Protocol (MCP) servers.",
          "Keep tool results from exploding the context window."
        )
      ),
      section(
        "Server-side vs Client-side vs MCP",
        ul(
          "**Server-side built-in tools** (web_search, x_search, code_execution, collections_search, etc.) — Executed by xAI, convenient and isolated.",
          "**Custom client-side functions** — Executed in your infrastructure, full control, necessary for private systems.",
          "**MCP** — Standardized way to expose external tool servers so many agents can share the same capabilities."
        )
      ),
      section(
        "Parallelism & Ordering",
        p("By default models may emit multiple tool calls in parallel. This is excellent for independent lookups and harmful when ordering or dependencies matter."),
        ul(
          "Use parallel calls for independent research or data fetching.",
          "Force sequential execution when one result is required before the next call.",
          "Encode ordering requirements in the prompt and tool descriptions when needed."
        )
      ),
      section(
        "Result Management",
        ul(
          "Truncate or summarize large tool outputs before feeding them back.",
          "Keep references (URLs, file IDs, query IDs) so the full data can be retrieved again if necessary.",
          "Normalize errors into a consistent structure the model can understand."
        )
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Choose the execution location (server, client, MCP) deliberately.",
          "Control parallelism explicitly when order matters.",
          "Treat tool results as potentially large and untrusted.",
          "Standardize error shapes and logging across all tools."
        ),
        p("Next → Chapter 18: Developing Custom Skills, Output Styles, Structured Outputs, and Response Formats.")
      ),
    ],
  },

  // ==================== CHAPTER 18 ====================
  {
    id: 18,
    slug: "structured-outputs-skills-styles",
    part: PART_3,
    title: "Developing Custom Skills, Output Styles, Structured Outputs, and Response Formats",
    subtitle: "Make agent outputs reliable, machine-readable, and consistent in style.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("Free-form text is ideal for humans but brittle for automation. Structured outputs and deliberate style control turn Grok into a dependable component of larger systems."),
        ul(
          "Enforce JSON Schema or equivalent structured output.",
          "Design consistent output styles for different audiences.",
          "Combine structured final answers with tool calling.",
          "Handle validation failures and repair loops gracefully.",
          "Version output contracts as they evolve."
        )
      ),
      section(
        "Structured Output Strategies",
        ul(
          "**Strict JSON Schema** — Highest reliability when the platform supports it.",
          "**Tool-argument schemas** — Force structure on any tool call.",
          "**Prompt-level instructions + validation** — Useful fallback when schema enforcement is limited.",
          "**Post-processing repair** — Ask the model to fix invalid output, or apply deterministic repair where possible."
        )
      ),
      section(
        "Output Style as a First-Class Concern",
        p("Style includes tone, verbosity, use of Markdown, presence of explanations, and formatting conventions. Keep style instructions stable and in the system prompt or skill definition so they remain consistent across sessions.")
      ),
      section(
        "Practical Pattern",
        code(
          "text",
          `System: You are a code review assistant.
Always respond with valid JSON matching the schema.
Do not wrap the JSON in markdown fences.
Be precise and professional; keep findings concise.`
        ),
        p("Then validate the response against the schema. On failure, either repair or escalate.")
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Prefer schema-enforced structured output whenever downstream code depends on the result.",
          "Keep style instructions stable and explicit.",
          "Validate early and design repair or fallback paths.",
          "Version your output contracts."
        ),
        p("Next → Chapter 19: Ecosystem Integrations and Workspace Customization.")
      ),
    ],
  },
    // ==================== CHAPTER 19 ====================
  {
    id: 19,
    slug: "ecosystem-integrations-workspace-customization",
    part: PART_3,
    title: "Ecosystem Integrations and Workspace Customization",
    subtitle: "Embed Grok deeply into the tools developers already use and create a consistent AI-native workspace.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("The real power of Grok appears when it lives inside the same environments where engineers already work — IDEs, terminals, CI, documentation systems, and internal tools — while sharing the same skills, memory, and policies."),
        ul(
          "Integrate Grok with IDEs, terminals, and browsers.",
          "Customize Grok Build workspaces with skills, hooks, and project context.",
          "Use MCP as a universal tool bridge.",
          "Keep configuration consistent across surfaces.",
          "Avoid configuration drift and secret leakage."
        )
      ),
      section(
        "Integration Layers",
        ul(
          "**Human-facing surfaces** — IDE extensions, Grok Build TUI, browser UIs, chat apps.",
          "**Orchestration & policy** — Skills, memory, permissions, prompt library.",
          "**Model + tools** — Grok API, built-in tools, MCP servers, custom functions."
        ),
        p("The goal is that every surface talks to the same well-configured agentic core instead of inventing its own ad-hoc prompting.")
      ),
      section(
        "Grok Build Workspace Layout",
        code(
          "text",
          `project-root/
├── .grok/
│   ├── skills/           # project skills
│   ├── context/          # medium-term memory
│   ├── hooks/            # lifecycle scripts
│   └── config.toml       # optional overrides
├── AGENTS.md             # high-level instructions
└── ...`
        ),
        p("Grok Build automatically discovers these locations. Keeping configuration in the repository makes it versioned and shared by the whole team.")
      ),
      section(
        "MCP as the Universal Bridge",
        p("Expose internal systems (issue trackers, observability platforms, design systems, company APIs) as MCP servers. Once registered, the same tools become available to Grok Build, API agents, and multi-agent supervisors without rewriting wrappers.")
      ),
      section(
        "Consistency Rules",
        ul(
          "Project-level configuration lives in the repository.",
          "User-level preferences and credentials live in the home directory.",
          "Secrets never live in the repository.",
          "The same skills and memory should be visible from the IDE, terminal, and CI."
        )
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Deep integration beats isolated chat windows.",
          "Keep skills, memory, and policy in the repository.",
          "Use MCP to avoid tool duplication.",
          "Design for consistency across every surface the team uses."
        ),
        p("This concludes Part 3. Next → Part 4 begins with Chapter 20: Git Workflows, Branching Strategies, and Automated Commits with Grok.")
      ),
    ],
  },
];
