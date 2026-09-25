import { PART_5, PART_BONUS, code, ol, p, quote, section, ul, type ChapterContent } from "./chapter-types";

export const part5Chapters: ChapterContent[] = [
  {
    id: 26,
    slug: "pro-power-moves",
    part: PART_5,
    title: "8 Pro Power Moves for High-Speed AI Engineering with Grok",
    subtitle: "Eight techniques experienced engineers use to get dramatically more from Grok, faster.",
    sections: [
      section("Overview", p("These moves compound. Each one is small; together they change how quickly you ship.")),
      section(
        "The Eight Moves",
        ol(
          "**Spec first:** write a short spec before asking for code.",
          "**Plan, then execute:** approve the plan before any edits.",
          "**Parallel exploration:** ask for three approaches, then choose.",
          "**Tight feedback:** paste real errors and test output, not descriptions.",
          "**Context files:** keep project memory current.",
          "**Self-review:** make Grok critique its own output before you read it.",
          "**Model routing:** fast model for drafts, flagship for decisions.",
          "**Save everything reusable:** turn good prompts into skills.",
        ),
      ),
      section(
        "Putting It Together",
        code("text", `1. Spec (5 min)  → 2. Plan review → 3. Implement in steps
4. Tests after each step → 5. Self-review → 6. Human review`),
      ),
      section("Anti-Patterns", ul("Vague requests followed by many corrections.", "Accepting large diffs unread.", "Rebuilding context from scratch every session.")),
      section("Key Takeaways", ul("Speed comes from structure, not shortcuts.", "Feedback loops beat long prompts.", "Reuse is the ultimate multiplier.")),
    ],
  },
  {
    id: 27,
    slug: "multi-grok-workflows-agent-swarms",
    part: PART_5,
    title: "Multi-Grok Workflows and Agent Swarms",
    subtitle: "Run many Grok instances in concert — voting, debate, and swarms — for hard problems at scale.",
    sections: [
      section("Overview", p("Beyond simple delegation, multiple Grok instances can independently attempt, critique, and converge on solutions.")),
      section(
        "Swarm Patterns",
        ul("**Self-consistency:** sample N answers and take the majority.", "**Debate:** agents argue positions; a judge decides.", "**Map-reduce:** split a corpus, process in parallel, merge.", "**Tournament:** generate candidates and rank pairwise."),
      ),
      section(
        "Implementation Sketch",
        code("typescript", `const candidates = await Promise.all(
  Array.from({ length: 5 }, () => grok.solve(task, { temperature: 0.8 })),
)
const best = await grok.judge(task, candidates, rubric)`),
      ),
      section(
        "Cost and Control",
        ul("Swarms multiply cost — reserve them for high-value decisions.", "Use cheaper models for workers and a strong model for judging.", "Stop early when candidates agree."),
        quote("Diversity of attempts is only valuable when you can reliably pick the best one."),
      ),
      section("Key Takeaways", ul("Independent attempts improve hard answers.", "Judges need clear rubrics.", "Budget swarms deliberately.")),
    ],
  },
  {
    id: 28,
    slug: "checkpoints-state-recovery-long-running-tasks",
    part: PART_5,
    title: "Checkpoints, State Recovery, Session Continuity, and Long-Running Background Tasks",
    subtitle: "Keep agents running for hours or days with durable checkpoints, safe resumption, and continuity across sessions.",
    sections: [
      section("Overview", p("Long tasks fail: networks drop, deployments restart, budgets run out. Durable state makes failure a pause, not a loss.")),
      section(
        "Checkpoint Design",
        code("typescript", `type Checkpoint = {
  taskId: string
  step: number
  plan: string[]
  completed: string[]
  artifacts: Record<string, string>
  summary: string
  savedAt: string
}`),
        ul("Checkpoint after every completed step.", "Store summaries, not full transcripts.", "Make steps idempotent so replays are safe."),
      ),
      section(
        "Recovery and Continuity",
        ol("Load the latest checkpoint.", "Rebuild context from summary plus artifacts.", "Verify external state before continuing.", "Resume from the next incomplete step."),
      ),
      section(
        "Background Execution",
        ul("Run on durable job queues or workflow engines.", "Report progress to users asynchronously.", "Set wall-clock and cost ceilings per task."),
      ),
      section("Key Takeaways", ul("Checkpoint often, summarize always.", "Idempotent steps make resumption safe.", "Verify the world before resuming.")),
    ],
  },
  {
    id: 29,
    slug: "enterprise-security-governance-telemetry",
    part: PART_5,
    title: "Enterprise Security, Governance, Telemetry, and Performance Tuning",
    subtitle: "Operate Grok-powered systems to enterprise standards: access control, audit, observability, and performance.",
    sections: [
      section("Overview", p("At organizational scale, agents need the same controls as any critical system — plus a few unique to AI.")),
      section(
        "Security & Governance",
        ul("Centralize model access through an internal gateway.", "Enforce role-based permissions on tools and data.", "Classify data and block sensitive categories from prompts.", "Maintain approved model and prompt registries.", "Keep immutable audit logs of every agent action."),
      ),
      section(
        "Telemetry",
        code("text", `trace: task_123
├── span: model_call   tokens=4,210  latency=1.8s
├── span: tool:search  latency=0.4s  ok
└── span: model_call   tokens=1,030  latency=0.9s  final`),
        p("Trace every model and tool call with tokens, latency, cost, and outcome."),
      ),
      section(
        "Performance Tuning",
        ul("Cache stable prefixes.", "Parallelize independent calls.", "Route to smaller models where evals allow.", "Stream to reduce perceived latency."),
      ),
      section("Key Takeaways", ul("Gateway, RBAC, and audit form the base.", "Trace everything.", "Tune with data, not guesses.")),
    ],
  },
  {
    id: 30,
    slug: "evaluation-observability-continuous-improvement",
    part: PART_5,
    title: "Evaluation, Observability, Benchmarking, and Continuous Improvement of Agentic Systems",
    subtitle: "Measure agent quality rigorously and build a loop that makes your system better every week.",
    sections: [
      section("Overview", p("You cannot improve what you do not measure. Evaluation turns subjective impressions into engineering signals.")),
      section(
        "Building an Eval Suite",
        ul("**Golden sets:** representative tasks with expected outcomes.", "**Assertions:** deterministic checks for format and facts.", "**Model graders:** rubric-based scoring for open-ended output.", "**Trajectory metrics:** tool accuracy, steps, cost per success."),
        code("typescript", `for (const test of goldenSet) {
  const run = await agent.run(test.input)
  record({
    id: test.id,
    passed: test.check(run.output),
    steps: run.steps,
    costUsd: run.cost,
  })
}`),
      ),
      section(
        "Observability in Production",
        ul("Sample live traces for review.", "Capture user feedback signals.", "Alert on drops in success rate or spikes in cost."),
      ),
      section(
        "The Improvement Loop",
        ol("Collect failures from production.", "Add them to the eval set.", "Change prompts, tools, or models.", "Run evals; ship only if metrics improve without regressions."),
        quote("Every production failure should become a test case."),
      ),
      section("Key Takeaways", ul("Evals are the agent’s unit tests.", "Measure trajectory, not only answers.", "Close the loop from production to evals.")),
    ],
  },
  {
    id: 31,
    slug: "loop-engineering-supplement",
    part: PART_BONUS,
    title: "Loop Engineering Supplement – Building Fully Autonomous, Self-Improving Background Loops with Grok",
    subtitle: "Design autonomous loops that run continuously, correct themselves, and improve over time — safely.",
    sections: [
      section("Overview", p("A loop is an agent that never really finishes: it watches, acts, evaluates, and learns. This capstone combines everything in the course into durable autonomy.")),
      section(
        "Anatomy of an Autonomous Loop",
        code("text", `┌──▶ Sense   (events, schedules, metrics)
│    Plan    (goal + memory + policy)
│    Act     (bounded tools)
│    Evaluate(checks + graders)
│    Learn   (update memory, prompts, evals)
└─── Sleep / wait for next trigger`),
      ),
      section(
        "Self-Improvement Mechanisms",
        ul("Record outcomes and failures to memory.", "Propose prompt or skill changes automatically — but gate them behind evals.", "Promote changes only when metrics improve.", "Roll back automatically on regression."),
      ),
      section(
        "Safety for Unattended Operation",
        ul("Hard budgets per cycle and per day.", "Kill switches and circuit breakers.", "Human approval for irreversible actions.", "Drift detection comparing behavior to baselines.", "Full audit trails for every cycle."),
        quote("Autonomy is earned incrementally: widen permissions only as evidence of reliability accumulates."),
      ),
      section(
        "Next Steps",
        p("Start with one narrow loop — for example, nightly dependency health checks — and grow its scope as your evals and trust grow."),
      ),
    ],
  },
];
