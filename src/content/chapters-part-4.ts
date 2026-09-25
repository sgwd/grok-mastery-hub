import { PART_4, code, ol, p, quote, section, ul, type ChapterContent } from "./chapter-types";

export const part4Chapters: ChapterContent[] = [
  {
    id: 20,
    slug: "git-workflows-automated-commits",
    part: PART_4,
    title: "Git Workflows, Branching Strategies, and Automated Commits with Grok",
    subtitle: "Integrate Grok into version control safely: branches per task, meaningful commits, and reviewable history.",
    sections: [
      section("Overview", p("Agents that write code must fit into Git discipline. Every automated change should be isolated, explained, and reversible.")),
      section(
        "Branching Strategy",
        ul("One branch per agent task, named like `agent/fix-cart-rounding`.", "Never let agents push directly to protected branches.", "Keep branches short-lived and rebased on main."),
      ),
      section(
        "Automated Commits",
        code("bash", `git diff --staged | grok-cli commit-message \\
  --style conventional > .msg
git commit -F .msg`),
        ul("Use conventional commit format.", "Commit in small logical units.", "Include the reason, not just the change."),
      ),
      section(
        "Safety Rails",
        ul("Run tests before every agent commit.", "Block commits containing secrets with pre-commit scanners.", "Require human review for merges."),
        quote("Git is the agent’s undo button — keep history clean enough to use it."),
      ),
      section("Key Takeaways", ul("Branch per task.", "Small, explained commits.", "Humans merge; agents propose.")),
    ],
  },
  {
    id: 21,
    slug: "ci-cd-integration",
    part: PART_4,
    title: "CI/CD Integration (GitHub Actions and beyond)",
    subtitle: "Run Grok inside your pipelines for automated review, test generation, and release tasks.",
    sections: [
      section("Overview", p("CI is a natural home for agents: deterministic triggers, isolated runners, and clear pass/fail signals.")),
      section(
        "A GitHub Actions Example",
        code("yaml", `name: grok-review
on: pull_request
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npx grok-review --diff origin/main...HEAD
        env:
          XAI_API_KEY: \${{ secrets.XAI_API_KEY }}`),
      ),
      section(
        "High-Value CI Tasks",
        ul("PR summaries and risk assessment.", "Generating missing tests for changed code.", "Changelog and release-note drafting.", "Explaining failing builds from logs."),
      ),
      section(
        "Operational Concerns",
        ul("Store keys as CI secrets; restrict them on forked PRs.", "Cap tokens per run.", "Make agent checks advisory until proven reliable.", "Cache results by commit SHA."),
      ),
      section("Key Takeaways", ul("CI gives agents safe, repeatable triggers.", "Start advisory, then enforce.", "Protect secrets from untrusted forks.")),
    ],
  },
  {
    id: 22,
    slug: "code-review-static-analysis-pr-automation",
    part: PART_4,
    title: "Code Review Workflows, Static Analysis, and PR Automation",
    subtitle: "Combine Grok’s judgment with deterministic tools for faster, more thorough code review.",
    sections: [
      section("Overview", p("Linters catch syntax; humans catch intent. Grok fills the gap between — logic errors, edge cases, and unclear code.")),
      section(
        "Layered Review",
        ol("**Static analysis:** linters, type checks, security scanners.", "**Grok review:** logic, naming, edge cases, and tests.", "**Human review:** architecture, product intent, final approval."),
      ),
      section(
        "Effective Review Prompts",
        code("text", `Review this diff. Report only issues with real impact.
For each: severity, file:line, problem, suggested fix.
Ignore formatting — the linter handles it.
Static analysis output: <sa>...</sa>`),
        p("Feeding static-analysis results in lets Grok focus on what tools cannot see."),
      ),
      section(
        "Reducing Noise",
        ul("Suppress low-severity nits by default.", "Deduplicate repeated findings.", "Track acceptance rate of suggestions and tune prompts accordingly."),
      ),
      section("Key Takeaways", ul("Layer deterministic and model review.", "Prioritize impact over volume.", "Measure usefulness, not comment count.")),
    ],
  },
  {
    id: 23,
    slug: "grok-api-sdk-deep-dive",
    part: PART_4,
    title: "Grok API / SDK Deep Dive (Python, TypeScript, and other client implementations)",
    subtitle: "Use the Grok API fluently across languages: streaming, tools, structured output, and robust error handling.",
    sections: [
      section("Overview", p("This chapter tours the API surface you will use daily and shows idiomatic patterns in Python and TypeScript.")),
      section(
        "Python",
        code("python", `from openai import OpenAI
import os

client = OpenAI(api_key=os.environ["XAI_API_KEY"], base_url="https://api.x.ai/v1")

resp = client.chat.completions.create(
    model="grok-4",
    messages=[{"role": "user", "content": "Explain idempotency in one paragraph."}],
)
print(resp.choices[0].message.content)`),
      ),
      section(
        "TypeScript with Streaming",
        code("typescript", `const stream = await grok.chat.completions.create({
  model: "grok-4",
  stream: true,
  messages,
})
for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content ?? "")
}`),
      ),
      section(
        "Robustness Patterns",
        ul("Retry 429 and 5xx with exponential backoff and jitter.", "Set request timeouts.", "Log request IDs and token usage.", "Wrap the client so model names and defaults live in one place."),
      ),
      section("Key Takeaways", ul("OpenAI-compatible clients work across languages.", "Stream for responsiveness.", "Centralize retries, timeouts, and logging.")),
    ],
  },
  {
    id: 24,
    slug: "ide-integrations",
    part: PART_4,
    title: "IDE Integrations (VS Code, JetBrains, Cursor, terminal, and editor setups)",
    subtitle: "Bring Grok into your editor and terminal with setups that keep you in flow.",
    sections: [
      section("Overview", p("The fastest feedback loop is inside the editor. Configure Grok where you write code.")),
      section(
        "Editor Options",
        ul("**VS Code & forks:** extensions supporting custom OpenAI-compatible endpoints.", "**Cursor:** add Grok as a custom model with your API key.", "**JetBrains:** AI plugins with configurable providers.", "**Terminal:** CLI tools for piping files and diffs."),
      ),
      section(
        "Terminal Workflow",
        code("bash", `# explain a file
cat src/auth.ts | grok "Explain the token refresh logic"

# fix from test output
npm test 2>&1 | grok "Suggest a fix for the first failure"`),
      ),
      section(
        "Configuration Tips",
        ul("Share a project context file the editor loads automatically.", "Bind common prompts to shortcuts.", "Exclude secrets and build artifacts from context.", "Use fast models for inline completion, flagship for chat."),
      ),
      section("Key Takeaways", ul("Put Grok where you already work.", "Terminal piping is powerful and simple.", "Match model speed to interaction type.")),
    ],
  },
  {
    id: 25,
    slug: "real-world-engineering-recipes",
    part: PART_4,
    title: "Real-World Engineering Recipes (Refactoring, TDD, Bug Hunting, Upgrades, Large Codebase Navigation)",
    subtitle: "Proven, step-by-step recipes for the engineering tasks you face every week.",
    sections: [
      section("Overview", p("Each recipe below is a repeatable procedure. The pattern is always the same: gather context, plan, change in small steps, verify.")),
      section(
        "Refactoring & TDD",
        ol("Ask Grok to write characterization tests for current behavior.", "Confirm they pass.", "Refactor one function at a time, running tests after each.", "For new features, write the failing test first, then implement."),
      ),
      section(
        "Bug Hunting",
        ol("Provide the error, reproduction steps, and relevant files.", "Ask for hypotheses ranked by likelihood.", "Test the top hypothesis with logging or a minimal repro.", "Fix, then add a regression test."),
        quote("Never accept a fix you cannot explain."),
      ),
      section(
        "Dependency Upgrades",
        ul("Feed the changelog and your usages to Grok.", "Generate a migration checklist.", "Upgrade one major dependency per branch."),
      ),
      section(
        "Large Codebase Navigation",
        code("text", `Map this repository: list top-level modules, their
responsibilities, and how requests flow from the entry
point to the database. Cite file paths.`),
        p("Save the resulting map in project memory so future sessions start oriented."),
      ),
      section("Key Takeaways", ul("Context, plan, small steps, verify.", "Tests are your safety net for agent changes.", "Persist maps and findings.")),
    ],
  },
];
