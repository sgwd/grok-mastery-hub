import { PART_5, PART_BONUS, code, h3, ol, p, quote, section, ul, type ChapterContent } from "./chapter-types";

export const part5Chapters: ChapterContent[] = [
  // ==================== CHAPTER 25 ====================
  {
    id: 25,
    slug: "real-world-engineering-recipes",
    part: PART_5,
    title: "Real-World Engineering Recipes (Refactoring, TDD, Bug Hunting, Upgrades, Large Codebase Navigation)",
    subtitle: "Battle-tested workflows for the most common high-value engineering tasks.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("This chapter turns the techniques from earlier parts into concrete, repeatable recipes for everyday engineering work: refactoring, test-driven development, bug hunting, dependency upgrades, and navigating large codebases."),
        ul(
          "Execute structured refactoring without breaking behavior.",
          "Drive implementation with a tight TDD loop assisted by Grok.",
          "Run hypothesis-driven bug investigations.",
          "Plan and execute dependency or framework upgrades safely.",
          "Build and maintain a living map of a large codebase."
        )
      ),
      section(
        "Recipe 1: Structured Refactoring",
        ol(
          "Write or confirm characterisation tests that lock current behaviour.",
          "Ask Grok for a step-by-step refactoring plan with explicit invariants.",
          "Apply the plan in small, independently shippable commits.",
          "Run tests and the automated reviewer after each step.",
          "Update project memory with any new design decisions."
        ),
        quote("Never refactor without a safety net of tests that describe the current behaviour.")
      ),
      section(
        "Recipe 2: Test-Driven Development",
        ol(
          "Write a failing test that specifies the desired behaviour.",
          "Ask Grok to implement the minimal code that makes the test pass.",
          "Run the suite.",
          "Optionally ask for a small refactor while keeping tests green.",
          "Repeat."
        )
      ),
      section(
        "Recipe 3: Hypothesis-Driven Bug Hunting",
        ol(
          "Reproduce the bug with a minimal failing test or script.",
          "Collect logs, stack traces, and relevant context.",
          "Force Grok to list ranked hypotheses and the cheapest experiment for each.",
          "Run the experiments.",
          "Once the root cause is confirmed, generate a minimal fix plus a regression test."
        )
      ),
      section(
        "Recipe 4: Dependency / Framework Upgrades",
        ol(
          "Generate an upgrade plan that lists breaking changes affecting this codebase.",
          "Update the dependency and fix compilation / type errors in small batches.",
          "Run the test suite after each batch.",
          "Perform a focused review of the highest-risk areas.",
          "Update project memory and changelog."
        )
      ),
      section(
        "Recipe 5: Large Codebase Navigation",
        ul(
          "Start with high-level structure (README, package layout, entry points).",
          "Produce a living “code map” of major components and relationships.",
          "Store the map in project memory.",
          "For any concrete question, retrieve only the relevant slice instead of dumping the entire tree.",
          "Update the map when significant architectural changes land."
        )
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Turn repeated work into named, tested recipes.",
          "Always keep a safety net of tests and small steps.",
          "Make project memory part of every significant change.",
          "Measure time saved and defect rates to improve the recipes."
        ),
        p("Next → Chapter 26: 8 Pro Power Moves for High-Speed AI Engineering with Grok.")
      ),
    ],
  },

  // ==================== CHAPTER 26 ====================
  {
    id: 26,
    slug: "pro-power-moves",
    part: PART_5,
    title: "8 Pro Power Moves for High-Speed AI Engineering with Grok",
    subtitle: "High-leverage techniques that experienced practitioners use to multiply speed and quality.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("These eight moves are small, repeatable habits that compound. Teams that adopt them ship faster while keeping quality and cost under control."),
        ul(
          "Apply the eight power moves in daily work.",
          "Recognise which move fits which situation.",
          "Combine them without creating unnecessary ceremony.",
          "Turn them into team defaults."
        )
      ),
      section(
        "The Eight Power Moves",
        ol(
          "**Stable System Prefix + Dynamic Suffix** — Keep system instructions and core project rules identical for caching; put variable information after them.",
          "**Hypothesis-Driven Debugging** — Force ranked hypotheses and cheap experiments before proposing fixes.",
          "**Plan → Critique → Execute** — Require a plan and a critique before any significant implementation.",
          "**Characterisation Tests Before Refactors** — Lock behaviour before changing structure.",
          "**Structured Output as Default Contract** — Prefer schema-validated JSON whenever the result will be consumed by code or another agent.",
          "**Aggressive Compaction + Living Memory** — Continuously summarise history and write durable decisions into project memory.",
          "**Parallel Exploration, Serial Integration** — Explore multiple approaches in parallel, then integrate the best result.",
          "**Close the Loop with Measurement** — Log cost, latency, and outcome quality; review and improve weekly."
        )
      ),
      section(
        "How to Adopt Them",
        ul(
          "Start with the three moves that address your current biggest bottlenecks.",
          "Encode them into skills and system prompts so they become automatic.",
          "Review adoption and impact in a short weekly “Grok ops” session."
        )
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Speed comes from structure, not from skipping steps.",
          "The highest-leverage moves improve both quality and cost.",
          "Make the moves habitual through skills and team norms."
        ),
        p("Next → Chapter 27: Multi-Grok Workflows and Agent Swarms.")
      ),
    ],
  },

  // ==================== CHAPTER 27 ====================
  {
    id: 27,
    slug: "multi-grok-workflows-agent-swarms",
    part: PART_5,
    title: "Multi-Grok Workflows and Agent Swarms",
    subtitle: "Coordinate multiple Grok instances for parallel exploration, critique, and high-stakes decisions.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("Sometimes one trajectory is not enough. Multi-Grok workflows and swarms let you run specialised or independent agents and then combine their results."),
        ul(
          "Choose appropriate swarm and hierarchical patterns.",
          "Define clear aggregation and judging strategies.",
          "Control cost when many agents run.",
          "Keep the overall system debuggable and auditable."
        )
      ),
      section(
        "Useful Patterns",
        ul(
          "**Self-consistency / Best-of-N** — Sample multiple answers and select the best according to a rubric.",
          "**Debate** — Proposer vs critic, with a judge.",
          "**Parallel exploration** — Independent agents try different approaches; an integrator merges or chooses.",
          "**Map-reduce style** — Split a large corpus or problem, process in parallel, then synthesise."
        )
      ),
      section(
        "Design Rules",
        ul(
          "Give each agent a clear role and limited scope.",
          "Use structured hand-offs and a shared but scoped blackboard when needed.",
          "Budget both per-agent and globally.",
          "Prefer cheaper models for workers and a stronger model for judging or integration.",
          "Record the full trajectory so you can understand why a particular answer was chosen."
        ),
        quote("Diversity of attempts is only valuable when you can reliably select or merge the best results.")
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Use swarms deliberately for hard or high-value problems.",
          "Aggregation quality matters as much as individual agent quality.",
          "Cost multiplies quickly — measure and cap it.",
          "Always keep a single-agent baseline for comparison."
        ),
        p("Next → Chapter 28: Checkpoints, State Recovery, Session Continuity, and Long-Running Background Tasks.")
      ),
    ],
  },

  // ==================== CHAPTER 28 ====================
  {
    id: 28,
    slug: "checkpoints-state-recovery-long-running-tasks",
    part: PART_5,
    title: "Checkpoints, State Recovery, Session Continuity, and Long-Running Background Tasks",
    subtitle: "Make long-running and background agents durable, recoverable, and safe across restarts and days.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("Long-running agents must survive process crashes, deployments, and multi-day pauses. This requires explicit checkpointing, idempotency, and clear recovery procedures."),
        ul(
          "Design durable checkpoint formats.",
          "Resume safely without duplicating side-effects.",
          "Maintain session continuity across interactive and background execution.",
          "Run scheduled and background loops with heartbeats and budgets.",
          "Escalate cleanly when recovery is not possible."
        )
      ),
      section(
        "Checkpoint Contents",
        ul(
          "Session / execution ID and version.",
          "Current goal and plan.",
          "Compacted conversation or state summary.",
          "Artefacts produced so far.",
          "Budgets consumed and remaining.",
          "Idempotency keys for any side-effects already performed.",
          "Timestamp and status."
        )
      ),
      section(
        "Recovery Procedure",
        ol(
          "Load the latest checkpoint.",
          "Re-validate remaining budgets.",
          "Rebuild the agent context from the summary and artefacts.",
          "Verify external state before re-executing any action.",
          "Resume from the next incomplete step.",
          "Emit a recovery heartbeat and continue."
        )
      ),
      section(
        "Background & Scheduled Execution",
        ul(
          "Use durable queues or workflow engines.",
          "Emit regular heartbeats and progress markers.",
          "Enforce hard wall-clock and cost ceilings.",
          "Design for graceful pause and later resumption when human approval is required."
        )
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Checkpoint early and often.",
          "Make steps idempotent.",
          "Verify the world before continuing after a resume.",
          "Treat long-running autonomy as a privilege that must be earned with good observability and guardrails."
        ),
        p("Next → Chapter 29: Enterprise Security, Governance, Telemetry, and Performance Tuning.")
      ),
    ],
  },

  // ==================== CHAPTER 29 ====================
  {
    id: 29,
    slug: "enterprise-security-governance-telemetry",
    part: PART_5,
    title: "Enterprise Security, Governance, Telemetry, and Performance Tuning",
    subtitle: "Operate Grok-powered systems at organisational scale with proper controls, visibility, and efficiency.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("At enterprise scale, agentic systems need the same discipline as any other critical production service — plus a few AI-specific controls."),
        ul(
          "Implement defence-in-depth security for agents.",
          "Establish governance for prompts, skills, models, and tools.",
          "Build comprehensive telemetry and dashboards.",
          "Enforce budgets and rate limits across teams.",
          "Tune for cost and latency without sacrificing quality."
        )
      ),
      section(
        "Security & Governance",
        ul(
          "Centralise model access through an internal gateway where possible.",
          "Enforce identity, role-based access, and least-privilege tools.",
          "Maintain approved registries of models, skills, and MCP servers.",
          "Require review for new high-risk skills or tools.",
          "Keep immutable audit logs of prompts, tool calls, and outcomes.",
          "Classify data and prevent sensitive content from entering prompts when policy requires it."
        )
      ),
      section(
        "Telemetry & Dashboards",
        ul(
          "Track tokens, cost, latency, cache-hit rate, and success rate per agent and per team.",
          "Break down cost by model, effort level, and skill.",
          "Alert on anomalies (sudden cost spikes, drops in success rate, unusual tool usage).",
          "Make trajectories inspectable for debugging and compliance."
        )
      ),
      section(
        "Performance Tuning Levers",
        ul(
          "Prompt caching via stable prefixes.",
          "Aggressive context compaction.",
          "Model and effort routing by task difficulty.",
          "Parallelism with strict budgets.",
          "Batching of non-interactive work."
        )
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Security, governance, and telemetry must be designed in, not bolted on.",
          "Give every team visibility into its own usage and quality.",
          "Tune systematically using data.",
          "Treat agentic systems as production services with normal operational standards."
        ),
        p("Next → Chapter 30: Evaluation, Observability, Benchmarking, and Continuous Improvement of Agentic Systems.")
      ),
    ],
  },

  // ==================== CHAPTER 30 ====================
  {
    id: 30,
    slug: "evaluation-observability-continuous-improvement",
    part: PART_5,
    title: "Evaluation, Observability, Benchmarking, and Continuous Improvement of Agentic Systems",
    subtitle: "Measure agent quality rigorously and build a loop that makes the system better every week.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("You cannot improve what you do not measure. Evaluation turns subjective impressions into engineering signals that drive systematic improvement."),
        ul(
          "Define clear success and failure criteria for agents.",
          "Build offline and online evaluation suites.",
          "Analyse full trajectories, not just final answers.",
          "Detect hallucinations and quality regressions.",
          "Run disciplined experiments and close the improvement loop."
        )
      ),
      section(
        "The Evaluation Stack",
        ul(
          "**Business outcomes** — merge rate, time-to-resolution, incident rate, user satisfaction.",
          "**Task success metrics** — correct patch, accurate research report, valid structured output.",
          "**Trajectory metrics** — number of steps, tool accuracy, recovery from errors, cost per success.",
          "**Model-level signals** — hallucination rate, citation fidelity, reasoning quality.",
          "**Operational metrics** — latency, cost, error rate, budget exhaustion."
        )
      ),
      section(
        "Practical Evaluation Practices",
        ul(
          "Maintain a versioned golden set of representative tasks.",
          "Combine deterministic checks with rubric-based model graders.",
          "Sample production trajectories for human review.",
          "Track citation coverage and unsupported claims.",
          "A/B test prompts, effort levels, and architectures with pre-registered success criteria."
        )
      ),
      section(
        "The Continuous Improvement Loop",
        ol(
          "Instrument and observe.",
          "Detect failures or opportunities.",
          "Form a hypothesis.",
          "Experiment (offline eval + controlled online rollout).",
          "Measure against the pre-defined criteria.",
          "Keep, revert, or iterate.",
          "Update skills, memory, guardrails, and the eval suite itself."
        ),
        quote("Every serious production failure should become a permanent test case.")
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Evaluation is the agent’s unit test suite and performance review combined.",
          "Measure process as well as final answers.",
          "Close the loop from production back into evals and skills.",
          "Make improvement a regular engineering practice, not a one-off project."
        ),
        p("Next → Loop Engineering Supplement: Building Fully Autonomous, Self-Improving Background Loops with Grok.")
      ),
    ],
  },

  // ==================== LOOP ENGINEERING SUPPLEMENT ====================
  {
    id: 31,
    slug: "loop-engineering-supplement",
    part: PART_BONUS,
    title: "Loop Engineering Supplement – Building Fully Autonomous, Self-Improving Background Loops with Grok",
    subtitle: "Design autonomous loops that observe, act, verify, and improve over time — safely and under control.",
    sections: [
      section(
        "Supplement Overview & Learning Objectives",
        p("This supplement brings together everything in the guide into the design of fully autonomous, long-running background systems. These loops monitor repositories or systems, take bounded actions, verify outcomes, and learn — while remaining subject to strict budgets and human oversight."),
        ul(
          "Design the core observe → diagnose → plan → act → verify → learn cycle.",
          "Implement scheduled and event-driven autonomous loops.",
          "Build self-healing PR and reviewer loops.",
          "Maintain durable memory and checkpoints across runs.",
          "Enforce human-in-the-loop guardrails and safety invariants.",
          "Make loops self-improving without becoming uncontrolled."
        )
      ),
      section(
        "Anatomy of an Autonomous Loop",
        code(
          "text",
          `┌──▶ Sense     (events, schedules, metrics, repo state)
│    Diagnose  (root cause or opportunity)
│    Plan      (bounded, reviewable plan + success criteria)
│    Act       (tools, PRs, notifications — under policy)
│    Verify    (tests, metrics, soak checks)
│    Learn     (update memory, evals, skills)
└─── Sleep / wait for next trigger`
        )
      ),
      section(
        "Safety Invariants",
        ul(
          "Bounded authority — explicit allow-lists of actions and repositories.",
          "Hard budgets on tokens, tool calls, wall time, and money.",
          "Idempotency for every side-effect.",
          "Checkpoints and durable memory so runs can resume safely.",
          "Clear escalation thresholds to humans.",
          "Full observability and audit trails.",
          "Verification before any claim of success."
        ),
        quote("Autonomy is earned incrementally. Widen permissions only as evidence of reliability accumulates.")
      ),
      section(
        "Self-Healing and Self-Improvement",
        ul(
          "Coder + reviewer agent pairs that iterate on a PR until quality gates are met or escalation is triggered.",
          "Automatic addition of new failure cases into the evaluation suite.",
          "Proposed skill or prompt improvements that are themselves gated by evals before being promoted.",
          "Automatic rollback when metrics regress."
        )
      ),
      section(
        "Getting Started",
        p("Begin with one narrow, low-risk loop (for example, nightly dependency health checks or failing-test triage on a non-critical repository). Instrument it thoroughly, run it under close observation, and expand scope only after it has proven reliable."),
        p("The techniques in this supplement are the culmination of the entire Grok Mastery Guide. Used with discipline, they turn Grok into a genuine engineering teammate that can operate continuously while remaining under human control.")
      ),
      section(
        "Final Notes",
        p("You now have the complete set of patterns required to design, build, evaluate, and operate production-grade agentic systems with Grok — from the first prompt to fully autonomous, self-improving background loops."),
        p("The most important practice is to keep measuring, keep the blast radius small, and keep humans in the loop at the points that matter.")
      ),
    ],
  },
];
