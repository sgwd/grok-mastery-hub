import { code, h3, ol, p, quote, section, ul, type ChapterContent } from "./chapter-types";

export const PART_6 = "Part 6: Advanced Topics";

export const part6Chapters: ChapterContent[] = [
  // ==================== CHAPTER 32 ====================
  {
    id: 32,
    slug: "internal-agent-platforms",
    part: PART_6,
    title: "Building Internal Agent Platforms & Developer Portals",
    subtitle: "Turn Grok from a collection of scripts into a real internal platform that teams can safely build on.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("As usage grows, individual agents and scripts become hard to govern. Mature organisations build an internal Agent Platform that provides shared authentication, tool access, memory, evaluation, budgets, and observability."),
        ul(
          "Design the core components of an internal agent platform.",
          "Provide self-service access for product and engineering teams.",
          "Enforce organisation-wide safety, budget, and compliance controls.",
          "Create a developer portal experience that makes the right thing the easy thing."
        )
      ),
      section(
        "Core Platform Capabilities",
        ul(
          "Centralised authentication and identity propagation.",
          "Shared tool / MCP registry with approval workflows.",
          "Standardised memory and context services.",
          "Budgeting, rate limiting, and quota management per team.",
          "Unified tracing, logging, and cost attribution.",
          "Evaluation harness and golden-set management.",
          "Skill and prompt registry with versioning and review."
        )
      ),
      section(
        "Platform Architecture Patterns",
        ul(
          "**Gateway pattern** — All model calls go through an internal proxy that injects identity, policy, and telemetry.",
          "**Skill registry** — Versioned, searchable catalogue of approved skills.",
          "**Tool broker** — Central place that brokers access to MCP servers and internal APIs with auditing.",
          "**Agent runtime** — Standard library for the agentic loop, checkpoints, and budgets.",
          "**Developer portal** — UI for discovering skills, testing agents, viewing traces, and managing budgets."
        )
      ),
      section(
        "Governance & Self-Service Balance",
        p("The platform should make it easy to build safe agents and hard to build dangerous ones. Provide golden paths, templates, and guardrails while still allowing advanced teams to go deeper when needed.")
      ),
      section(
        "Chapter Summary",
        ul(
          "Platforms beat collections of scripts at scale.",
          "Centralise policy, identity, tools, and observability.",
          "Offer a good developer experience so teams adopt the platform voluntarily.",
          "Start thin and expand capability as real usage patterns emerge."
        )
      ),
    ],
  },

  // ==================== CHAPTER 33 ====================
  {
    id: 33,
    slug: "advanced-evaluation-engineering",
    part: PART_6,
    title: "Advanced Evaluation Engineering & Agent Benchmarking",
    subtitle: "Go beyond simple golden sets to rigorous, continuous evaluation of agentic systems.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("Basic evals are not enough for complex agents. This chapter covers trajectory evaluation, multi-dimensional scoring, regression detection, and building an evaluation culture."),
        ul(
          "Design multi-dimensional evaluation rubrics.",
          "Evaluate full trajectories rather than only final answers.",
          "Build automated regression suites for agents.",
          "Combine human judgment, model graders, and deterministic checks.",
          "Use evaluation results to drive prioritisation."
        )
      ),
      section(
        "Dimensions of Agent Quality",
        ul(
          "Task success rate",
          "Factual accuracy / hallucination rate",
          "Tool use correctness and efficiency",
          "Citation quality and grounding",
          "Safety and policy adherence",
          "Cost and latency per successful outcome",
          "User satisfaction / downstream business metrics"
        )
      ),
      section(
        "Trajectory-Level Evaluation",
        p("For agents, the path matters as much as the destination. Record and score the sequence of thoughts, tool calls, recoveries, and decisions. Look for unnecessary steps, repeated failures, and recovery quality.")
      ),
      section(
        "Evaluation Systems Design",
        ul(
          "Keep a growing golden set that includes real production failures.",
          "Version both the agent and the eval suite.",
          "Run evals on every significant change to prompts, skills, tools, or models.",
          "Track results over time and alert on regressions.",
          "Make failing cases easy to inspect and turn into new tests."
        )
      ),
      section(
        "Chapter Summary",
        ul(
          "Evaluate process and outcome.",
          "Make evaluation continuous and automated.",
          "Let eval results drive engineering priorities.",
          "Treat the eval suite as a first-class product asset."
        )
      ),
    ],
  },

  // ==================== CHAPTER 34 ====================
  {
    id: 34,
    slug: "long-term-memory-architectures",
    part: PART_6,
    title: "Long-Term Memory Architectures (Episodic, Graph, Hierarchical)",
    subtitle: "Design memory systems that scale beyond simple vector stores and remain understandable.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("Simple retrieval-augmented generation is powerful but limited. Richer memory architectures become necessary as agents operate over months and across many projects."),
        ul(
          "Distinguish working, episodic, semantic, and procedural memory.",
          "Design hierarchical and graph-based memory systems.",
          "Manage memory lifecycle (write, consolidate, forget, re-verify).",
          "Keep memory interpretable and debuggable."
        )
      ),
      section(
        "Memory Types",
        ul(
          "**Working memory** — Current context and immediate task state.",
          "**Episodic memory** — Specific past experiences and trajectories.",
          "**Semantic memory** — General facts, concepts, and knowledge.",
          "**Procedural memory** — How to do things (skills, workflows, tools)."
        )
      ),
      section(
        "Architectural Patterns",
        ul(
          "**Hierarchical memory** — Summaries at multiple time scales.",
          "**Knowledge graphs** — Entities and relationships for precise retrieval and reasoning.",
          "**Hybrid stores** — Vectors + keyword + graph + structured records.",
          "**Memory controllers** — Separate policies that decide what to write, retrieve, and forget."
        )
      ),
      section(
        "Lifecycle & Hygiene",
        ul(
          "Write selectively with provenance and confidence.",
          "Consolidate related memories into higher-level summaries.",
          "Re-verify important facts periodically.",
          "Expire or archive low-value memories.",
          "Make memory contents inspectable by humans."
        )
      ),
      section(
        "Chapter Summary",
        ul(
          "Richer memory models enable longer-lived, more capable agents.",
          "Interpretability and lifecycle management are as important as retrieval accuracy.",
          "Start simple and grow architectural complexity only when needed."
        )
      ),
    ],
  },

  // ==================== CHAPTER 35 ====================
  {
    id: 35,
    slug: "automated-prompt-skill-evolution",
    part: PART_6,
    title: "Automated Prompt & Skill Evolution",
    subtitle: "Use evaluation signals to systematically improve prompts and skills over time.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("Manual prompt engineering does not scale. Mature systems treat prompts and skills as artefacts that can be improved through measurement and controlled experimentation."),
        ul(
          "Set up feedback loops from production and evals into prompt improvement.",
          "Use automated methods to propose and test better prompts.",
          "Version and gate changes safely.",
          "Avoid overfitting to the current eval set."
        )
      ),
      section(
        "The Evolution Loop",
        ol(
          "Collect failures and low-quality trajectories.",
          "Diagnose systematic weaknesses.",
          "Propose prompt or skill variants (manually or with Grok).",
          "Evaluate variants against the golden set and side-by-side human judgment.",
          "Promote winners through the same review process used for code.",
          "Monitor for regressions after deployment."
        )
      ),
      section(
        "Techniques",
        ul(
          "Error analysis and clustering of failure modes.",
          "Prompt rewriting and critique by a stronger model.",
          "Multi-objective optimisation (quality vs cost vs latency).",
          "A/B testing in production with careful traffic splitting.",
          "Keeping a hold-out set to detect overfitting."
        )
      ),
      section(
        "Governance",
        p("Even automatically proposed improvements should go through version control, review, and staged rollout. High-impact skills deserve the same discipline as high-impact code.")
      ),
      section(
        "Chapter Summary",
        ul(
          "Close the loop between evaluation and prompt/skill improvement.",
          "Automate proposal generation, but keep human review for promotion.",
          "Optimise for multiple objectives, not just raw accuracy.",
          "Protect against overfitting and silent regressions."
        )
      ),
    ],
  },

  // ==================== CHAPTER 36 ====================
  {
    id: 36,
    slug: "high-assurance-agents-safety-red-teaming",
    part: PART_6,
    title: "High-Assurance Agents: Safety, Red-Teaming & Guardrail Engineering",
    subtitle: "Engineer agents that remain safe and reliable even under adversarial or unexpected conditions.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("As agents gain more capability and autonomy, safety engineering becomes critical. This chapter covers practical techniques for building high-assurance agentic systems."),
        ul(
          "Design defence-in-depth guardrails.",
          "Conduct systematic red-teaming of agents.",
          "Implement layered safety controls (prompt, tool, runtime, monitoring).",
          "Handle prompt injection, tool misuse, and goal misgeneralisation.",
          "Balance safety with usefulness."
        )
      ),
      section(
        "Layered Safety Architecture",
        ul(
          "**Prompt & policy layer** — Clear system instructions and constitutions.",
          "**Tool layer** — Least privilege, validation, approval gates.",
          "**Runtime layer** — Budgets, sandboxes, circuit breakers.",
          "**Monitoring layer** — Anomaly detection, human review queues, kill switches.",
          "**Evaluation layer** — Continuous red-teaming and safety evals."
        )
      ),
      section(
        "Red-Teaming Practice",
        ul(
          "Maintain a library of attack patterns (prompt injection, social engineering of the agent, tool abuse, etc.).",
          "Regularly test agents against these patterns.",
          "Include safety cases in the golden evaluation set.",
          "Treat successful attacks as high-priority bugs."
        )
      ),
      section(
        "Practical Guardrails",
        ul(
          "Strict tool allow-lists per agent role.",
          "Human approval for irreversible or high-impact actions.",
          "Output filtering and policy classifiers where appropriate.",
          "Rate limits and anomaly detection on tool usage.",
          "Clear escalation paths when the agent is uncertain or conflicted."
        )
      ),
      section(
        "Chapter Summary",
        ul(
          "Safety is a system property, not a single prompt.",
          "Red-team continuously and turn attacks into tests.",
          "Prefer hard controls (permissions, budgets, approvals) over soft ones.",
          "Usefulness and safety must be optimised together."
        )
      ),
    ],
  },

  // ==================== CHAPTER 37 ====================
  {
    id: 37,
    slug: "cost-latency-throughput-optimization",
    part: PART_6,
    title: "Cost, Latency & Throughput Optimization at Scale",
    subtitle: "Systematically optimise the performance and economics of large-scale Grok deployments.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("At scale, small inefficiencies become large bills and poor user experiences. This chapter covers systematic optimisation of cost, latency, and throughput."),
        ul(
          "Build accurate cost and latency models.",
          "Apply the highest-leverage optimisations first.",
          "Design for caching, batching, and routing.",
          "Balance quality against performance with data.",
          "Set organisational budgets and accountability."
        )
      ),
      section(
        "Measurement First",
        ul(
          "Break down cost by model, effort, skill, team, and feature.",
          "Track end-to-end latency percentiles (p50, p95, p99).",
          "Measure tokens per successful task, not just per request.",
          "Attribute costs so teams can see the impact of their decisions."
        )
      ),
      section(
        "High-Leverage Optimisations",
        ul(
          "Prompt caching via stable prefixes.",
          "Context compaction and retrieval instead of full history.",
          "Model and effort routing by difficulty.",
          "Parallel tool calls where safe.",
          "Batching of offline and non-interactive workloads.",
          "Avoiding unnecessary high-effort reasoning."
        )
      ),
      section(
        "Architectural Patterns",
        ul(
          "Tiered model strategy (fast/cheap vs strong/expensive).",
          "Async processing for anything that does not need to be synchronous.",
          "Result caching for repeated or similar queries.",
          "Early-exit and speculative execution patterns where appropriate."
        )
      ),
      section(
        "Chapter Summary",
        ul(
          "You cannot optimise what you do not measure.",
          "Caching, routing, and compaction usually deliver the biggest wins.",
          "Make cost and latency visible to the teams that create them.",
          "Optimise quality and efficiency together, not in isolation."
        )
      ),
    ],
  },
];
