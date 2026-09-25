import { PART_3, code, ol, p, quote, section, ul, type ChapterContent } from "./chapter-types";

export const part3Chapters: ChapterContent[] = [
  {
    id: 14,
    slug: "custom-prompt-templates-skills-workflows",
    part: PART_3,
    title: "Building Custom Prompt Templates, Skills, and Tailored Workflows",
    subtitle: "Package expertise into reusable templates and skills that make Grok behave like a specialist on demand.",
    sections: [
      section(
        "Overview",
        p("A skill is a reusable bundle: instructions, examples, tools, and output format for a specific job. Skills turn scattered prompts into dependable capabilities."),
      ),
      section(
        "Anatomy of a Skill",
        ul("**Trigger:** when the skill applies.", "**Instructions:** the procedure and quality bar.", "**Examples:** representative inputs and ideal outputs.", "**Tools:** the capabilities it may use.", "**Output contract:** the exact format returned."),
        code("markdown", `# Skill: Release Notes
Use when: a list of merged PRs is provided.
Steps:
1. Group changes by feature, fix, and internal.
2. Write user-facing language, no ticket IDs.
Output: Markdown with three headed sections.`),
      ),
      section(
        "Templating Techniques",
        ul("Use named variables and validate them before rendering.", "Compose small templates rather than one mega-prompt.", "Keep examples in separate files for easy updates."),
      ),
      section(
        "Tailored Workflows",
        p("Chain skills into workflows: research → outline → draft → review. Each step has its own skill and a checkpoint between them."),
      ),
      section(
        "Key Takeaways",
        ul("Skills package procedure plus examples plus contract.", "Compose small templates.", "Workflows chain skills with checkpoints."),
      ),
    ],
  },
  {
    id: 15,
    slug: "multi-agent-architecture",
    part: PART_3,
    title: "Multi-Agent Architecture: Spawning, Managing, and Coordinating Agents",
    subtitle: "Split complex work across specialized agents with clear contracts, shared state, and reliable coordination.",
    sections: [
      section(
        "Overview",
        p("One agent with many tools becomes confused. Several focused agents, each with a narrow role and toolset, are easier to test and reason about."),
      ),
      section(
        "Core Topologies",
        ul(
          "**Orchestrator–worker:** a planner delegates subtasks and merges results.",
          "**Pipeline:** agents hand off work in fixed stages.",
          "**Critic loop:** a generator produces and a reviewer evaluates.",
          "**Parallel fan-out:** independent subtasks run concurrently.",
        ),
      ),
      section(
        "Spawning and Managing Agents",
        code("typescript", `const results = await Promise.all(
  subtasks.map((task) =>
    spawnAgent({
      role: "researcher",
      goal: task.goal,
      tools: [webSearch, readFile],
      budget: { maxIterations: 8, maxUsd: 0.2 },
    }),
  ),
)
return orchestrator.merge(results)`),
        ul("Give every agent its own budget and timeout.", "Pass structured inputs and require structured outputs.", "Track parent–child relationships for tracing."),
      ),
      section(
        "Coordination Challenges",
        ul("Conflicting outputs: define a merge policy or tiebreaker.", "Duplicate work: assign disjoint scopes.", "Context bloat: send summaries, not full transcripts, between agents."),
        quote("Add an agent only when you can describe its contract in one sentence."),
      ),
      section(
        "Key Takeaways",
        ul("Specialize agents by role and tools.", "Contracts and budgets keep coordination sane.", "Trace the whole tree, not just the final answer."),
      ),
    ],
  },
  {
    id: 16,
    slug: "event-hooks-triggers-pipelines",
    part: PART_3,
    title: "Event Hooks, Triggers, and Automated Pipelines",
    subtitle: "Run Grok automatically in response to events — commits, messages, schedules, and webhooks.",
    sections: [
      section(
        "Overview",
        p("The most valuable agents run without being asked. Event-driven design connects Grok to the moments where work begins."),
      ),
      section(
        "Trigger Types",
        ul("**Webhooks:** new issue, PR, payment, or form submission.", "**Schedules:** nightly reports, weekly audits.", "**Lifecycle hooks:** before or after a tool call or session.", "**Data changes:** new rows or files in storage."),
      ),
      section(
        "Building a Pipeline",
        code("typescript", `on("issue.opened", async (event) => {
  if (!verifySignature(event)) return
  const triage = await grok.classify(event.issue, labelsSchema)
  await github.addLabels(event.issue.id, triage.labels)
  if (triage.severity === "high") await pageOnCall(event.issue)
})`),
        ol("Verify the event source.", "Enqueue work instead of processing inline.", "Make handlers idempotent.", "Record outcomes for review."),
      ),
      section(
        "Reliability",
        ul("Use queues with retries and dead-letter handling.", "Deduplicate by event ID.", "Rate-limit to protect downstream systems and budgets."),
      ),
      section(
        "Key Takeaways",
        ul("Events turn assistants into automation.", "Verify, enqueue, and stay idempotent.", "Observe every run."),
      ),
    ],
  },
  {
    id: 17,
    slug: "tool-function-calling-deep-dive",
    part: PART_3,
    title: "Tool & Function Calling Deep Dive",
    subtitle: "Advanced tool design: schemas, parallel calls, error handling, and making tools that models use correctly.",
    sections: [
      section(
        "Overview",
        p("Tool quality largely determines agent quality. This deep dive covers schema design, parallel calls, error contracts, and testing."),
      ),
      section(
        "Schema Design Principles",
        ul("Use enums instead of free text wherever possible.", "Describe each parameter with examples.", "Make required fields truly required.", "Return compact, structured results with only what the model needs."),
      ),
      section(
        "Parallel and Sequential Calls",
        p("Grok can request several independent calls in one turn. Execute them concurrently, then return every result together, matched by call ID."),
        code("typescript", `const outputs = await Promise.all(
  response.tool_calls.map(async (call) => ({
    tool_call_id: call.id,
    role: "tool",
    content: JSON.stringify(await run(call)),
  })),
)`),
      ),
      section(
        "Error Contracts",
        code("json", `{ "ok": false, "error": "NOT_FOUND", "hint": "Check invoice_id format: inv_XXXX" }`),
        ul("Return actionable errors the model can recover from.", "Distinguish retryable from fatal errors.", "Never leak stack traces or secrets."),
      ),
      section(
        "Key Takeaways",
        ul("Precise schemas prevent bad calls.", "Parallelize independent calls.", "Errors are feedback — make them useful."),
      ),
    ],
  },
  {
    id: 18,
    slug: "custom-skills-structured-outputs",
    part: PART_3,
    title: "Developing Custom Skills, Output Styles, Structured Outputs, and Response Formats",
    subtitle: "Make Grok’s responses machine-readable and on-brand with schemas, output styles, and validation.",
    sections: [
      section(
        "Overview",
        p("Production systems consume model output programmatically. Structured outputs and consistent styles make that safe."),
      ),
      section(
        "Structured Outputs",
        code("typescript", `const Review = z.object({
  verdict: z.enum(["approve", "request_changes"]),
  findings: z.array(z.object({
    severity: z.enum(["low", "medium", "high"]),
    file: z.string(),
    message: z.string(),
  })),
})

const result = await grok.parse({ schema: Review, messages })`),
        p("Always validate parsed output, even when using schema-constrained generation."),
      ),
      section(
        "Output Styles",
        ul("Define a style guide: tone, length, formatting.", "Provide one ideal example per style.", "Name styles (e.g. `concise-technical`, `executive-summary`) and select them per request."),
      ),
      section(
        "Validation and Repair",
        ol("Parse and validate.", "On failure, send the error back once for repair.", "If repair fails, fall back or escalate."),
      ),
      section(
        "Key Takeaways",
        ul("Schemas turn text into contracts.", "Validate everything.", "Named styles keep tone consistent."),
      ),
    ],
  },
  {
    id: 19,
    slug: "ecosystem-integrations-workspace",
    part: PART_3,
    title: "Ecosystem Integrations and Workspace Customization",
    subtitle: "Connect Grok to the tools your team already uses and tailor the workspace to your workflows.",
    sections: [
      section(
        "Overview",
        p("Grok delivers the most value where work already happens: chat, docs, issue trackers, and code hosts."),
      ),
      section(
        "Common Integrations",
        ul("**Chat:** Slack or Discord bots for Q&A and triage.", "**Docs:** knowledge bases for retrieval.", "**Issue trackers:** summarize, label, and route tickets.", "**Code hosts:** PR review and repository Q&A.", "**Protocol servers (MCP):** standardized tool access across apps."),
      ),
      section(
        "Integration Architecture",
        code("text", `External app ──webhook──▶ Your backend ──▶ Grok
      ▲                       │
      └────── API write ◀─────┘ (validated, scoped)`),
        ul("Use OAuth with minimal scopes.", "Keep tokens server-side.", "Map external identities to internal permissions."),
      ),
      section(
        "Workspace Customization",
        ul("Shared prompt libraries and skills.", "Team-level project memory.", "Default models and budgets per workspace."),
        quote("Integrate where the work is, not where the demo is."),
      ),
      section(
        "Key Takeaways",
        ul("Meet users in existing tools.", "Scope OAuth tightly.", "Share skills and memory across the team."),
      ),
    ],
  },
];
