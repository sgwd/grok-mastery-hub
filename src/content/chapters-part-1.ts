import { PART_1, code, h3, ol, p, quote, section, ul, type ChapterContent } from "./chapter-types";

const loopDiagram = `┌─────────────────────────────────────────────────────────┐
│  1. OBSERVE   Goal + session state + latest tool results│
└───────────────────────┬─────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  2. REASON    Grok evaluates evidence and progress      │
└───────────────────────┬─────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  3. DECIDE    Answer, clarify, or call a tool           │
└───────────────────────┬─────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  4. EXECUTE   Host validates, authorizes, runs, records │
└───────────────────────┬─────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  5. OBSERVE RESULT   Append output or error to state    │
└───────────────────────┬─────────────────────────────────┘
                        ↓
              Done? ── yes ──→ Final response
                │ no
                └────────────→ Repeat from REASON`;

export const part1Chapters: ChapterContent[] = [
  {
    id: 1,
    slug: "what-grok-is-and-the-agentic-loop",
    part: PART_1,
    title: "What Grok Is and How the Agentic Loop Works",
    subtitle:
      "Understand Grok’s role inside an agentic system, then build the controlled feedback loop that turns model reasoning into useful, verifiable action.",
    sections: [
      section(
        "Chapter Overview & Learning Objectives",
        p("Grok is xAI’s family of general-purpose models, designed for demanding reasoning, coding, and agentic work: tasks that require a model to inspect context, choose an action, use external capabilities, and adapt to the result. The model is powerful, but it is only one component of a reliable agent."),
        p("The surrounding application supplies the goal, instructions, tool definitions, permissions, session state, stopping conditions, and evidence needed to verify success. Grok supplies probabilistic reasoning and generates either a response or a structured request to use a tool."),
        quote("An agent is a controlled feedback system: Grok reasons about the current state, your application executes bounded actions, and the resulting evidence becomes the next observation."),
        h3("By the end of this chapter, you will be able to"),
        ul(
          "Describe where Grok ends and the agent runtime begins.",
          "Trace a task through observe, reason, decide, execute, and repeat.",
          "Choose between server-side and client-side tool execution.",
          "Configure reasoning effort without wasting latency or tokens.",
          "Persist session state and enforce safe, testable stopping rules.",
        ),
      ),
      section(
        "Core Theoretical Principles & Architecture",
        p("A model call is stateless computation over the context provided to it. Grok does not inherently remember an earlier request or know whether an attempted action succeeded. The runtime must reconstruct relevant state on each turn and return tool results as new observations."),
        h3("The agentic loop"),
        code("agent loop", loopDiagram),
        ol(
          "**Observe.** Assemble the goal, relevant session state, policies, and latest results.",
          "**Reason.** Grok interprets the evidence, identifies unknowns, and evaluates next steps.",
          "**Decide.** The model returns a final answer, asks for clarification, or emits a tool call.",
          "**Execute.** The runtime validates schema and permissions before invoking the capability.",
          "**Repeat or stop.** Continue only while the goal is incomplete and budgets permit.",
        ),
        h3("Reasoning effort is an engineering control"),
        p("Use lower effort for routing, extraction, and well-specified transformations. Reserve higher effort for ambiguous planning, code repair, and multi-step diagnosis. More effort costs latency and tokens; it is not a substitute for missing context or weak tools."),
      ),
      section(
        "Deep Dive Implementation",
        p("Implement the loop as orchestration code, not as a prompt that asks the model to simulate execution. Keep state explicit and append-only so every run can be replayed and tested."),
        code("typescript", `async function runAgent(state: AgentState) {
  while (state.iteration < state.maxIterations) {
    const decision = await grok.respond({
      reasoningEffort: "high",
      messages: buildContext(state),
      tools: serverToolSchemas,
    })

    if (decision.type === "final") return decision.content

    const call = validateToolCall(decision.toolCall)
    authorize(state.sessionId, call)
    const result = await executeWithTimeout(call, 10_000)

    state.observations.push({ source: "tool", content: normalize(result) })
    state.iteration += 1
  }
  return escalate("Iteration budget exhausted", state)
}`),
        p("The critical boundary sits between `validateToolCall` and `executeWithTimeout`. Grok may propose an action; only your runtime may authorize and perform it."),
        h3("Server-side versus client-side tools"),
        ul(
          "**Server-side tools** run in trusted infrastructure and may access secrets, databases, and internal APIs. Use them for authoritative reads and writes.",
          "**Client-side tools** run on the user’s device and interact with visible UI or consented local actions. Treat them as untrusted.",
        ),
      ),
      section(
        "Real-World Recipe: Incident Triage",
        p("An incident assistant investigating elevated checkout errors needs a measurable, read-first goal, narrow tools, and an approval boundary before any write."),
        code("typescript", `const tools = {
  getServiceHealth: readOnlyTool({ service: "string" }),
  searchRecentLogs: readOnlyTool({ service: "string", query: "string" }),
  createIncidentNote: approvalRequiredTool({ incidentId: "string", summary: "string" }),
}`),
        ol(
          "Store the incident ID, affected service, error window, and definition of done.",
          "Grok calls the read-only health tool, then a narrowly scoped log search.",
          "It synthesizes a diagnosis with cited evidence and a reversible mitigation.",
          "A human approves the incident note before the server commits it.",
        ),
        quote("The useful unit of autonomy is one bounded decision followed by one observable result."),
      ),
      section(
        "Edge Cases, Troubleshooting & Optimization",
        ul(
          "**Loops without progress:** hash recent calls and stop or re-plan on repetition; enforce iteration and wall-clock budgets.",
          "**Malformed tool calls:** return one compact validation error, then escalate on repeat failures.",
          "**Timed-out writes:** never assume failure; check by idempotency key before retrying.",
          "**Oversized output:** filter, paginate, or summarize at the source.",
          "**Untrusted content:** delimit tool results as data; retrieved text must never expand permissions.",
        ),
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Grok provides reasoning; the application provides authority, memory, execution, and verification.",
          "Tool calls are proposals until trusted code validates and executes them.",
          "Reasoning effort, context, permissions, and iteration limits are explicit controls.",
          "Durable session state and complete traces make recovery and evaluation possible.",
        ),
        p("Next, Chapter 2 examines token economics so every loop you build has a predictable cost."),
      ),
    ],
  },
  {
    id: 2,
    slug: "pricing-token-economics-cost-management",
    part: PART_1,
    title: "Pricing Models, Token Economics, and Cost Management Strategy",
    subtitle: "Learn how tokens translate into spend, and build a cost strategy that scales with usage instead of surprising you at month-end.",
    sections: [
      section(
        "Overview",
        p("Every Grok request is billed by tokens: input tokens you send, output tokens the model generates, and — for reasoning models — the internal reasoning tokens spent before answering. Agentic systems multiply these costs, because each loop iteration re-sends context."),
        ul("Understand input, output, cached, and reasoning token pricing.", "Estimate cost per task, not per request.", "Apply budgets, caching, and model routing to control spend."),
      ),
      section(
        "Core Principles of Token Economics",
        p("A token is roughly four characters of English text. Output tokens usually cost several times more than input tokens, and cached input — a repeated prefix such as a system prompt — is significantly cheaper than fresh input."),
        h3("Cost per task is the real unit"),
        p("A ten-iteration agent that re-sends a 20,000-token context spends 200,000 input tokens before counting output. Measure the full trajectory, not a single call."),
        code("text", `task_cost = Σ over iterations (
    fresh_input_tokens  × input_price
  + cached_input_tokens × cached_price
  + (output + reasoning) × output_price
) + tool_execution_costs`),
      ),
      section(
        "Cost Management Strategies",
        ul(
          "**Route by difficulty.** Send classification and extraction to a fast, cheaper model; reserve the flagship for planning and hard reasoning.",
          "**Maximize cache hits.** Keep system prompts and tool schemas stable and at the front of the context.",
          "**Compact history.** Summarize old turns instead of re-sending full transcripts.",
          "**Cap output.** Set `max_tokens` and request concise formats such as JSON.",
          "**Tune reasoning effort.** Low effort for routine turns cuts hidden reasoning tokens.",
        ),
      ),
      section(
        "Practical Recipe: A Per-Task Budget Guard",
        code("typescript", `const budget = { maxUsd: 0.5, spentUsd: 0 }

function recordUsage(usage: Usage) {
  budget.spentUsd += priceOf(usage)
  if (budget.spentUsd > budget.maxUsd) {
    throw new BudgetExceeded(budget)
  }
}`),
        p("Attach the guard to every model call inside the loop. When the budget is hit, stop gracefully and return partial progress with a clear explanation."),
      ),
      section(
        "Key Takeaways",
        ul("Price tasks, not requests.", "Stable prefixes unlock cheap cached input.", "Route easy work to cheaper models.", "Enforce hard budgets in code, and log token usage per step for later optimization."),
      ),
    ],
  },
  {
    id: 3,
    slug: "access-authentication-environment-setup",
    part: PART_1,
    title: "Access, Authentication, Environment Setup, and Model Selection",
    subtitle: "Set up secure API access, a reproducible development environment, and a principled way to choose the right Grok model for each job.",
    sections: [
      section(
        "Overview",
        p("Before building agents you need reliable, secure access. This chapter covers API keys, environment configuration, SDK installation, and a decision framework for model selection."),
      ),
      section(
        "Authentication & Key Management",
        ul(
          "Create API keys in the xAI console and scope them per environment: development, staging, production.",
          "Store keys in a secret manager or environment variables — never in source control or client bundles.",
          "Rotate keys on a schedule and immediately after any suspected exposure.",
          "Route browser traffic through your own backend so the key never reaches the client.",
        ),
        code("bash", `# .env (never commit this file)
XAI_API_KEY=xai-...

# verify access
curl https://api.x.ai/v1/models \\
  -H "Authorization: Bearer $XAI_API_KEY"`),
      ),
      section(
        "Environment Setup",
        p("The xAI API is compatible with common OpenAI-style clients, so you can use the official xAI SDK or a familiar client pointed at the xAI base URL."),
        code("typescript", `import OpenAI from "openai"

export const grok = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
})`),
        ul("Pin SDK versions in your lockfile.", "Centralize client creation in one module.", "Add request timeouts and retry with exponential backoff."),
      ),
      section(
        "Model Selection Framework",
        ul(
          "**Flagship reasoning model:** complex planning, coding, multi-step agents.",
          "**Fast / mini variants:** routing, extraction, summarization, high-volume tasks.",
          "**Vision-capable models:** screenshots, diagrams, documents.",
          "**Image generation models:** creative and marketing assets.",
        ),
        quote("Start with the strongest model to establish a quality baseline, then downgrade step by step while your evals stay green."),
      ),
      section(
        "Key Takeaways",
        ul("Keys live on the server, scoped and rotated.", "Wrap the client once with timeouts and retries.", "Select models by task difficulty, validated by evaluation rather than intuition."),
      ),
    ],
  },
  {
    id: 4,
    slug: "interactive-environment-conversational-workflows",
    part: PART_1,
    title: "The Interactive Environment and Conversational Workflows",
    subtitle: "Use Grok’s interactive surfaces effectively and design multi-turn conversations that stay focused and productive.",
    sections: [
      section(
        "Overview",
        p("Much real work begins in conversation — exploring a problem, drafting, and iterating. Treating chat as a workflow rather than a series of isolated questions dramatically improves results."),
      ),
      section(
        "Principles of Conversational Work",
        ul(
          "**One thread, one objective.** Start a new conversation when the goal changes; stale context degrades answers.",
          "**Front-load context.** State role, goal, constraints, and output format in the first message.",
          "**Iterate with specifics.** “Make section two shorter and add an example” beats “improve this.”",
          "**Checkpoint decisions.** Ask Grok to summarize agreed decisions before moving on.",
        ),
      ),
      section(
        "A Reusable Conversation Structure",
        code("markdown", `## Context
I'm building a billing service in TypeScript.

## Goal
Design an idempotent webhook handler.

## Constraints
- Postgres, no external queue
- Must handle duplicate deliveries

## Output
A short design, then code.`),
        p("This structure works in the interactive app and translates directly into API system prompts later."),
      ),
      section(
        "Workflow Patterns",
        ol(
          "**Explore:** ask for options and trade-offs before committing.",
          "**Decide:** pick one option explicitly and restate it.",
          "**Produce:** request the artifact in the agreed format.",
          "**Review:** ask Grok to critique its own output against your constraints.",
        ),
      ),
      section(
        "Key Takeaways",
        ul("Conversations are workflows with a clear objective.", "Structured first messages save many corrective turns.", "Summaries and fresh threads keep long sessions accurate."),
      ),
    ],
  },
  {
    id: 5,
    slug: "prompt-patterns-system-instructions-runtime-controls",
    part: PART_1,
    title: "Essential Prompt Patterns, System Instructions, and Runtime Controls",
    subtitle: "Master the prompt structures, system instructions, and sampling parameters that produce consistent, high-quality output.",
    sections: [
      section(
        "Overview",
        p("Prompts are interfaces. Good ones are explicit, structured, and testable. This chapter covers the core patterns, how to write system instructions, and which runtime parameters matter."),
      ),
      section(
        "Essential Prompt Patterns",
        ul(
          "**Role + task + constraints + format:** the default skeleton for most requests.",
          "**Few-shot examples:** two or three input/output pairs teach style and structure faster than description.",
          "**Delimiters:** wrap supplied data in tags like `<document>` so instructions and data never blur.",
          "**Decomposition:** ask for a plan first, then execute step by step.",
          "**Self-check:** ask the model to verify its answer against explicit criteria before finalizing.",
        ),
      ),
      section(
        "Writing System Instructions",
        code("text", `You are a senior backend reviewer.
- Be concise and specific.
- Cite line numbers when referencing code.
- If information is missing, ask one clarifying question.
- Output: a Markdown list of findings ordered by severity.`),
        p("Keep system instructions stable to benefit from caching, and put policies that must never be overridden here rather than in user messages."),
      ),
      section(
        "Runtime Controls",
        ul(
          "`temperature`: low (0–0.3) for deterministic tasks, higher for ideation.",
          "`max_tokens`: always set a ceiling to bound cost and latency.",
          "`response_format`: request JSON or a schema for machine-readable output.",
          "`reasoning_effort`: match inference depth to task difficulty.",
          "`stop` sequences: end generation at a known boundary.",
        ),
      ),
      section(
        "Key Takeaways",
        ul("Structure beats cleverness.", "Separate instructions from data with delimiters.", "Stable system prompts are cheaper and more reliable.", "Tune parameters per task, not globally."),
      ),
    ],
  },
  {
    id: 6,
    slug: "daily-workflows-prompt-libraries",
    part: PART_1,
    title: "High-Productivity Daily Workflows and Prompt Libraries",
    subtitle: "Turn one-off prompts into a versioned personal library and daily routines that compound your productivity.",
    sections: [
      section(
        "Overview",
        p("The biggest productivity gains come from reuse. A curated prompt library turns hard-won phrasing into tools you can apply in seconds."),
      ),
      section(
        "Building a Prompt Library",
        ul(
          "Store prompts as Markdown files in a Git repository.",
          "Use variables such as `{{language}}` or `{{diff}}` for the parts that change.",
          "Record the purpose, recommended model, and an example output for each entry.",
          "Version prompts and note what changed and why.",
        ),
        code("markdown", `---
name: code-review
model: grok-flagship
---
Review the following {{language}} diff for bugs,
security issues, and readability. Return findings
ordered by severity with suggested fixes.

<diff>
{{diff}}
</diff>`),
      ),
      section(
        "Daily Workflow Templates",
        ul(
          "**Morning planning:** turn a raw task list into prioritized, time-boxed blocks.",
          "**Code review first pass:** run the review prompt before requesting human review.",
          "**Meeting distillation:** convert notes into decisions, owners, and deadlines.",
          "**Learning:** ask for an explanation, then a quiz, then a practical exercise.",
        ),
      ),
      section(
        "Measuring What Works",
        p("Track which prompts you reuse and which you edit every time. Frequent edits signal a prompt that should be rewritten or split."),
      ),
      section(
        "Key Takeaways",
        ul("Save every prompt you use twice.", "Parameterize and version your library.", "Build routines around the highest-leverage prompts."),
      ),
    ],
  },
];
