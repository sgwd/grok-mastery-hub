import { PART_4, code, h3, ol, p, quote, section, ul, type ChapterContent } from "./chapter-types";

export const part4Chapters: ChapterContent[] = [
  // ==================== CHAPTER 20 ====================
  {
    id: 20,
    slug: "git-workflows-branching-automated-commits",
    part: PART_4,
    title: "Git Workflows, Branching Strategies, and Automated Commits with Grok",
    subtitle: "Use Grok to improve commit quality, branch hygiene, and pull-request descriptions while keeping humans in control of shared history.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("Grok can dramatically improve the quality of commits and pull requests, but Git history is shared and long-lived. This chapter focuses on safe, high-leverage assistance rather than unrestricted automation."),
        ul(
          "Generate high-quality conventional commit messages from diffs.",
          "Create consistent branch names and PR descriptions.",
          "Integrate Grok into local Git workflows and hooks safely.",
          "Respect branching strategy and protection rules.",
          "Keep humans as the final authority on any mutation of shared history."
        )
      ),
      section(
        "Safety First Principles",
        ul(
          "Agents may propose and prepare Git actions.",
          "Humans (or strictly controlled CI policies) approve and execute anything that affects shared branches.",
          "Never give an agent unrestricted force-push or protected-branch access.",
          "Prefer small, reviewable commits over large opaque ones."
        ),
        quote("Grok should be an excellent advisor and drafter, not an autonomous history rewriter.")
      ),
      section(
        "High-Value Assisted Workflows",
        ul(
          "**Commit message generation** — From staged diffs, produce conventional commit messages with good subject and body.",
          "**Branch naming** — Suggest consistent names based on the task and team conventions.",
          "**PR description** — Generate summary, test plan, risk notes, and checklist from the branch commits and diff.",
          "**Conflict assistance** — Explain conflicts and propose resolutions (human still performs the rebase/merge).",
          "**Changelog / release notes** — Summarize commits since the last tag."
        )
      ),
      section(
        "Practical Implementation Tips",
        ul(
          "Feed Grok the staged diff, not the entire working tree.",
          "Include project conventions (commit style, branch prefixes) in the skill or system prompt.",
          "Keep the generated message editable before the actual `git commit`.",
          "Store the skill in \`.grok/skills/commit-message\` and \`.grok/skills/pr-description\` so the whole team uses the same standard."
        )
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Focus assistance on message quality and documentation, not on silent history mutation.",
          "Respect branch protection and team workflow.",
          "Make the helpful skills easy to invoke from both terminal and IDE.",
          "Measure whether commit and PR quality actually improve."
        ),
        p("Next → Chapter 21: CI/CD Integration (GitHub Actions and beyond).")
      ),
    ],
  },

  // ==================== CHAPTER 21 ====================
  {
    id: 21,
    slug: "cicd-integration-github-actions",
    part: PART_4,
    title: "CI/CD Integration (GitHub Actions and beyond)",
    subtitle: "Embed Grok agents safely into continuous integration and delivery pipelines.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("CI is one of the highest-leverage places to run Grok. Automated code review, test-failure diagnosis, PR description generation, and release-note drafting can all happen inside the pipeline — if safety, budgets, and permissions are handled correctly."),
        ul(
          "Design least-privilege GitHub Actions (or equivalent) jobs that call Grok.",
          "Pass the right context (diff, logs, project memory) into the agent.",
          "Enforce hard budgets and timeouts.",
          "Post results back as comments, checks, or artifacts.",
          "Keep secrets and model access secure."
        )
      ),
      section(
        "Permission Model for CI",
        ul(
          "Prefer \`contents: read\` + \`pull-requests: write\` over broad permissions.",
          "Never give a Grok job the ability to push to protected branches unless it is a very tightly controlled bot.",
          "Store the xAI API key as a repository or organization secret.",
          "Use short-lived tokens where possible."
        )
      ),
      section(
        "Typical High-Value CI Jobs",
        ul(
          "Automated code review on pull requests.",
          "Diagnosis of failing tests or linters.",
          "Generation of missing PR descriptions.",
          "Security-focused review of dependency or auth changes.",
          "Post-merge summary or changelog updates.",
          "Scheduled repository health sweeps."
        )
      ),
      section(
        "Implementation Pattern",
        ol(
          "Checkout the code and compute the relevant diff or logs.",
          "Load project context and the appropriate skill.",
          "Call Grok with a strict budget and structured output schema.",
          "Validate the response.",
          "Post a comment, update a check run, or write an artifact.",
          "Emit telemetry (tokens, cost, latency, outcome)."
        )
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "CI agents need stricter budgets and permissions than interactive ones.",
          "Always make results visible and attributable.",
          "Start with advisory comments before making any job required for merge.",
          "Monitor cost and false-positive rate closely."
        ),
        p("Next → Chapter 22: Code Review Workflows, Static Analysis, and PR Automation.")
      ),
    ],
  },

  // ==================== CHAPTER 22 ====================
  {
    id: 22,
    slug: "code-review-static-analysis-pr-automation",
    part: PART_4,
    title: "Code Review Workflows, Static Analysis, and PR Automation",
    subtitle: "Combine Grok with traditional static analysis to create high-signal, low-noise pull-request review systems.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("Static analysis is fast, deterministic, and cheap. Grok is better at understanding intent, cross-file implications, and risk. The strongest review systems use both."),
        ul(
          "Design a clear review rubric for Grok.",
          "Feed static-analysis and test results into the agent context.",
          "Produce structured findings that can be turned into inline comments.",
          "Calibrate severity so the bot stays high-signal.",
          "Keep humans as the final merge authority."
        )
      ),
      section(
        "The Review Pyramid",
        code(
          "text",
          `Human merge decision
        ↑
Grok high-level review (intent, risk, architecture, tests)
        ↑
Static analysis + tests (linters, type checkers, SAST, unit tests)
        ↑
Raw diff + project context`
        )
      ),
      section(
        "What to Give the Reviewer Agent",
        ul(
          "The diff (filtered to exclude generated files and lockfiles when appropriate).",
          "Relevant project standards and architecture decisions.",
          "Output of linters, type checkers, and failing tests.",
          "PR title, description, and linked issues.",
          "A precise rubric (what to prioritize, what to ignore)."
        )
      ),
      section(
        "Severity and Action Mapping",
        ul(
          "**Blocker** — Request changes + fail the check.",
          "**Major** — Comment + optional label.",
          "**Minor / Nit** — Comment only or collapse into a summary.",
          "Always allow the human reviewer to override."
        )
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Use static analysis for the mechanical checks; use Grok for judgment.",
          "Structure the output so CI can act on it.",
          "Calibrate severity ruthlessly to avoid alert fatigue.",
          "Measure true-positive and false-positive rates and keep improving the rubric."
        ),
        p("Next → Chapter 23: Grok API / SDK Deep Dive.")
      ),
    ],
  },

  // ==================== CHAPTER 23 ====================
  {
    id: 23,
    slug: "grok-api-sdk-deep-dive",
    part: PART_4,
    title: "Grok API / SDK Deep Dive (Python, TypeScript, and other clients)",
    subtitle: "Build production-grade clients against the xAI API with proper error handling, streaming, and observability.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("Reliable agents depend on reliable clients. This chapter covers the practical engineering of talking to Grok from Python, TypeScript, and other environments."),
        ul(
          "Use the official xAI Python SDK and OpenAI-compatible clients correctly.",
          "Implement robust streaming, retries, and timeouts.",
          "Handle authentication, rate limits, and errors cleanly.",
          "Add observability (latency, tokens, cache hits, cost).",
          "Create thin internal wrappers that isolate the rest of the codebase from API changes."
        )
      ),
      section(
        "Client Options",
        ul(
          "**Official Python SDK (\`xai-sdk\`)** — Best support for xAI-specific features.",
          "**OpenAI-compatible client** — Point any OpenAI SDK at \`https://api.x.ai/v1\`.",
          "**Vercel AI SDK / other TypeScript libraries** — Excellent for full-stack and Next.js applications.",
          "**Raw HTTP** — Useful for constrained environments or other languages."
        )
      ),
      section(
        "Production Client Practices",
        ul(
          "Reuse client instances rather than creating a new connection on every request.",
          "Always set explicit timeouts.",
          "Implement exponential back-off with jitter for 429 and 5xx errors.",
          "Stream whenever the user (or an upstream agent) is waiting.",
          "Capture and log the full usage object (including reasoning tokens when present).",
          "Propagate a correlation / execution ID through every call."
        )
      ),
      section(
        "Wrapper Pattern",
        p("Create a small internal wrapper that centralizes authentication, model defaults, reasoning effort, logging, and error handling. Business logic should never talk to the raw SDK directly.")
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Prefer the official SDK when you need full feature support.",
          "Make streaming, timeouts, and retries the default.",
          "Observe every call.",
          "Keep a thin, well-tested wrapper between your application and the provider."
        ),
        p("Next → Chapter 24: IDE Integrations (VS Code, JetBrains, Cursor, terminal, and editor setups).")
      ),
    ],
  },

  // ==================== CHAPTER 24 ====================
  {
    id: 24,
    slug: "ide-integrations-editors",
    part: PART_4,
    title: "IDE Integrations (VS Code, JetBrains, Cursor, terminal, and editor setups)",
    subtitle: "Make Grok feel like a natural part of the editor while keeping skills, memory, and policy consistent.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("Engineers spend most of their day in the editor. The quality of the Grok integration there has an outsized impact on adoption and productivity."),
        ul(
          "Configure high-quality experiences in Cursor, VS Code, JetBrains, and the terminal.",
          "Keep the same skills and project memory across all surfaces.",
          "Avoid context bloat and secret leakage from the editor.",
          "Design smooth flows for explain, edit, review, and generate."
        )
      ),
      section(
        "Surface-Specific Notes",
        ul(
          "**Cursor** — Strong native support for Grok models and rules files. Align its rules with your project’s AGENTS.md and skills.",
          "**VS Code** — Use extensions that support custom OpenAI-compatible endpoints or call the Grok Build CLI from tasks.",
          "**JetBrains** — External tools and plugins that can send selections or files to Grok; leverage the IDE’s structural knowledge when possible.",
          "**Terminal / Grok Build** — Often the most powerful and consistent surface because it natively understands \`.grok/\` skills and context."
        )
      ),
      section(
        "Consistency Checklist",
        ul(
          "Same API key injection method.",
          "Same default model and reasoning effort.",
          "Same project skills and memory files.",
          "Same ignore patterns (so secrets and giant generated files are never sent).",
          "Same output style expectations."
        )
      ),
      section(
        "Common Pitfalls",
        ul(
          "Editors that automatically include every open tab or the entire repository.",
          "Multiple AI extensions fighting for the same keybindings and injecting conflicting instructions.",
          "Accidentally sending \`.env\` files or credentials.",
          "Inconsistent model or effort settings across developers."
        )
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Make the editor experience consistent with the terminal and CI.",
          "Prefer explicit context (current selection, current file, named skills) over automatic dumping of everything.",
          "Keep secrets and large generated artifacts out of the context.",
          "Document the recommended setup so new team members get the same high-quality experience."
        ),
        p("Next → Chapter 25: Real-World Engineering Recipes (Refactoring, TDD, Bug Hunting, Upgrades, Large Codebase Navigation).")
      ),
    ],
  },
];
