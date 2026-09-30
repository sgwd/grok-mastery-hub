import { code, h3, ol, p, quote, section, ul, type ChapterContent } from "./chapter-types";

export const PART_APPENDICES = "Appendices";

export type Appendix = ChapterContent;

export const appendices: Appendix[] = [
  // ==================== APPENDIX A ====================
  {
    id: 101,
    slug: "prompt-skill-library",
    part: PART_APPENDICES,
    title: "Appendix A: Essential Prompt & Skill Library",
    subtitle: "Ready-to-use templates for the most common high-leverage engineering tasks.",
    sections: [
      section(
        "How to Use This Library",
        p("Each skill below is written so you can copy it into `.grok/skills/` or adapt it into your own prompt library. Parameterise the parts in {{double_curly_braces}}."),
        ul(
          "Keep the system/role section stable for better caching.",
          "Prefer structured output when the result will be consumed by code.",
          "Record the recommended model and reasoning effort."
        )
      ),
      section(
        "Skill: Code Review",
        code(
          "markdown",
          `# code-review

You are a senior staff engineer performing a thorough code review.

Focus on (in priority order):
1. Correctness and safety
2. Security
3. Test coverage and observable behaviour
4. Maintainability and design
5. Performance only when clearly relevant

Ignore pure style nits unless they violate documented project standards.

Diff:
{{diff}}

Respond with a structured review containing severity (blocker / major / minor / nit), location, explanation, and recommendation.`
        )
      ),
      section(
        "Skill: Bug Investigation",
        code(
          "markdown",
          `# bug-investigation

You are investigating a production or test failure.

First list ranked hypotheses and the cheapest experiment that would falsify each one.
Do not propose a fix until you have evidence for the root cause.

Failure context:
{{context}}

Logs / stack trace:
{{logs}}`
        )
      ),
      section(
        "Skill: PR Description",
        code(
          "markdown",
          `# pr-description

Write a clear pull-request description from the following commits and diff.

Include:
- Summary (what & why)
- Test plan
- Risk / rollback notes
- Checklist

Commits:
{{commits}}

Diff summary:
{{diff}}`
        )
      ),
      section(
        "Skill: Refactor Plan",
        code(
          "markdown",
          `# refactor-plan

Propose a step-by-step refactoring plan that preserves existing behaviour.

Requirements:
- List explicit invariants that must not change
- Break the work into small, reviewable steps
- Identify characterisation tests that should exist before starting

Target:
{{target}}`
        )
      ),
      section(
        "Additional Recommended Skills",
        ul(
          "test-generation",
          "architecture-decision-record",
          "incident-summary",
          "dependency-upgrade-plan",
          "codebase-map",
          "research-synthesizer"
        )
      ),
    ],
  },

  // ==================== APPENDIX B ====================
  {
    id: 102,
    slug: "glossary",
    part: PART_APPENDICES,
    title: "Appendix B: Glossary of Agentic Engineering Terms",
    subtitle: "Precise definitions of the key concepts used throughout the guide.",
    sections: [
      section(
        "Core Concepts",
        ul(
          "**Agent** — A system that combines a model with memory, tools, permissions, and a control loop to pursue a goal.",
          "**Agentic Loop** — The cycle of Observe → Reason → Decide → Execute → Observe Result.",
          "**Tool** — An external capability the model can request (search, code execution, internal APIs, etc.).",
          "**Skill** — A reusable, named package of instructions, examples, and settings for a specific type of task.",
          "**Trajectory** — The full sequence of model calls, tool calls, and intermediate states for one task."
        )
      ),
      section(
        "Memory & Context",
        ul(
          "**Working Memory** — The current conversation and immediate task state.",
          "**Project Memory** — Version-controlled knowledge about a specific codebase or product.",
          "**Long-term / Episodic Memory** — Persistent records of past experiences and facts.",
          "**Context Compaction** — Summarising or pruning older information to stay within budget.",
          "**Prompt Cache** — Reusing the computation for a stable prefix across requests."
        )
      ),
      section(
        "Control & Safety",
        ul(
          "**Reasoning Effort** — Control over how much internal thinking the model performs.",
          "**Guardrail** — Any mechanism that constrains agent behaviour (permissions, budgets, approvals, filters).",
          "**Human-in-the-loop** — Requiring human approval for certain actions or at certain confidence thresholds.",
          "**Idempotency** — Designing actions so that retries do not create duplicate effects.",
          "**Red-teaming** — Actively trying to make the agent fail or behave unsafely in order to improve it."
        )
      ),
      section(
        "Evaluation",
        ul(
          "**Golden Set** — A curated collection of tasks with expected outcomes used for regression testing.",
          "**Trajectory Evaluation** — Scoring the process the agent followed, not just the final answer.",
          "**Model Grader** — Using a model with a rubric to score open-ended outputs.",
          "**Hallucination** — A confident claim that is not supported by the provided context or reliable sources."
        )
      ),
    ],
  },

  // ==================== APPENDIX C ====================
  {
    id: 103,
    slug: "model-pricing-reference",
    part: PART_APPENDICES,
    title: "Appendix C: Grok Model & Pricing Quick Reference",
    subtitle: "Practical notes on model selection and cost awareness (always verify against current official pricing).",
    sections: [
      section(
        "Model Selection Guidance",
        ul(
          "**Flagship (e.g. Grok 4.6 and successors)** — Best for complex reasoning, coding, architecture, and hard agentic tasks.",
          "**Faster / smaller variants** — Prefer for classification, routing, simple extraction, and high-volume low-stakes work.",
          "**Reasoning effort** — Use low for routine turns, high or xhigh only when evaluation shows a clear benefit."
        )
      ),
      section(
        "Cost Awareness Principles",
        ul(
          "Output and reasoning tokens are usually significantly more expensive than input tokens.",
          "Cached input tokens are the cheapest — keep system prompts and tool schemas stable.",
          "Measure cost per successful task, not per individual API call.",
          "Agentic loops multiply cost; compaction and early stopping are essential."
        )
      ),
      section(
        "Practical Tips",
        ul(
          "Pin model versions in production for stability.",
          "Re-evaluate model choice when new versions ship or when cost/latency requirements change.",
          "Always check the official xAI documentation for the latest pricing and model list — numbers change."
        ),
        quote("This appendix is intentionally high-level. Treat official xAI pricing pages as the source of truth.")
      ),
    ],
  },

  // ==================== APPENDIX D ====================
  {
    id: 104,
    slug: "cheatsheet",
    part: PART_APPENDICES,
    title: "Appendix D: Context, Tools & Reasoning Cheatsheet",
    subtitle: "Quick reference for the controls you will use most often.",
    sections: [
      section(
        "Reasoning Effort",
        ul(
          "`low` — Classification, routing, simple extraction, lightweight tool use.",
          "`medium` — Default for most production agent turns.",
          "`high` — Complex debugging, architecture, ambiguous planning.",
          "`xhigh` — Maximum depth for the hardest problems only."
        )
      ),
      section(
        "Tool Choice",
        ul(
          "`auto` — Model decides whether and which tools to call.",
          "`required` — Force at least one tool call.",
          "`none` — Disable tools for this turn.",
          "Specific function — Force a particular tool."
        )
      ),
      section(
        "Context Budget Heuristics",
        code(
          "text",
          `System + tools        5–10%   (stable, cached)
Project memory       5–10%
Retrieved knowledge  20–40%
History (compacted)  15–30%
Current task         5–10%
Output reserve       10–15%`
        )
      ),
      section(
        "High-Leverage Habits",
        ul(
          "Stable system prefix + dynamic suffix.",
          "Hypothesis-driven debugging.",
          "Plan → Critique → Execute.",
          "Characterisation tests before refactors.",
          "Structured output by default.",
          "Aggressive compaction + living memory.",
          "Parallel exploration, serial integration.",
          "Measure everything that matters."
        )
      ),
    ],
  },

  // ==================== APPENDIX E ====================
  {
    id: 105,
    slug: "recommended-project-structure",
    part: PART_APPENDICES,
    title: "Appendix E: Recommended Project & Repository Structure",
    subtitle: "A practical layout that keeps skills, memory, and configuration consistent.",
    sections: [
      section(
        "Recommended Layout",
        code(
          "text",
          `project-root/
├── .grok/
│   ├── skills/              # reusable skills
│   │   ├── code-review/
│   │   ├── bug-investigation/
│   │   └── ...
│   ├── context/             # medium-term memory
│   │   ├── decisions.md
│   │   ├── architecture.md
│   │   └── open-questions.md
│   ├── hooks/               # optional lifecycle hooks
│   └── config.toml          # optional project overrides
├── AGENTS.md                # high-level agent instructions
├── docs/
├── src/
└── ...`
        )
      ),
      section(
        "Key Files",
        ul(
          "**AGENTS.md** — Top-level instructions, coding standards, and safety rules visible to every agent.",
          "**`.grok/skills/`** — Version-controlled, discoverable skills.",
          "**`.grok/context/`** — Living project memory that agents should load when relevant.",
          "**`.env` / secret manager** — API keys and credentials (never committed)."
        )
      ),
      section(
        "Principles",
        ul(
          "Configuration that affects agent behaviour should be version-controlled.",
          "Secrets must never live in the repository.",
          "Prefer convention over extensive configuration.",
          "Make the golden path obvious for new team members."
        )
      ),
    ],
  },

  // ==================== APPENDIX F ====================
  {
    id: 106,
    slug: "failure-modes-catalog",
    part: PART_APPENDICES,
    title: "Appendix F: Common Failure Modes & Mitigations Catalog",
    subtitle: "A practical catalogue of the ways agentic systems fail and how to defend against them.",
    sections: [
      section(
        "Planning & Reasoning Failures",
        ul(
          "**Vague or incomplete plans** → Force explicit numbered plans and critique steps.",
          "**Over-confidence** → Require evidence and self-critique before high-impact actions.",
          "**Lost-in-the-middle** → Keep critical instructions at the beginning and end of context."
        )
      ),
      section(
        "Tool & Execution Failures",
        ul(
          "**Invalid tool calls** → Strict schema validation + clear error messages back to the model.",
          "**Infinite tool loops** → Detect repeated calls, enforce iteration budgets, force re-planning.",
          "**Side-effect duplication** → Idempotency keys and check-before-write patterns.",
          "**Prompt injection via tool results** → Treat all retrieved content as untrusted data."
        )
      ),
      section(
        "Memory & Context Failures",
        ul(
          "**Stale project memory** → Make memory updates part of the Definition of Done.",
          "**Context bloat** → Aggressive compaction and explicit token budgets.",
          "**Contradictory memory** → Prefer superseding records over silent accumulation."
        )
      ),
      section(
        "Safety & Autonomy Failures",
        ul(
          "**Excessive autonomy** → Tiered permissions and human approval for high-risk actions.",
          "**Budget overruns** → Hard limits enforced in code, not just in prompts.",
          "**Silent failures in background loops** → Heartbeats, dead-letter queues, and mandatory alerting."
        )
      ),
      section(
        "Evaluation & Improvement Failures",
        ul(
          "**Optimising the wrong metric** → Track multiple complementary metrics including safety and cost.",
          "**Overfitting to evals** → Hold-out sets and regular production sampling.",
          "**Ignoring trajectory quality** → Score process as well as final answers."
        )
      ),
    ],
  },

  // ==================== APPENDIX G ====================
  {
    id: 107,
    slug: "resources-further-learning",
    part: PART_APPENDICES,
    title: "Appendix G: Resources & Further Learning",
    subtitle: "Curated pointers for going deeper.",
    sections: [
      section(
        "Official Sources",
        ul(
          "xAI official documentation and API reference",
          "Grok model release notes and system cards (when published)",
          "xAI cookbook / examples repositories"
        )
      ),
      section(
        "Core Topics to Study",
        ul(
          "Agentic system design and tool-use papers",
          "Retrieval-augmented generation and long-context research",
          "Evaluation methodology for LLM applications",
          "Security of LLM-powered systems (prompt injection, tool abuse, etc.)",
          "Human-AI interaction and approval workflows"
        )
      ),
      section(
        "Engineering Practices",
        ul(
          "Observability and tracing for complex systems",
          "Chaos engineering and red-teaming practices",
          "Platform engineering and internal developer portals",
          "Cost-aware architecture and FinOps for AI"
        )
      ),
      section(
        "Final Note",
        p("The field moves quickly. Treat this guide as a solid foundation of principles and patterns, and continue to validate every concrete recommendation against the latest official documentation and your own measurements.")
      ),
    ],
  },
];
