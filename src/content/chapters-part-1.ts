import { currentModel, modelContextTokens, textRates, longContextThreshold } from "./verified-reference";
import { PART_1, code, h3, sources, loop, ol, p, quote, section, ul, type ChapterContent } from "./chapter-types";

export const part1Chapters: ChapterContent[] = [
  // ==================== CHAPTER 1 ====================
  {
    id: 1,
    slug: "what-grok-is-and-the-agentic-loop",
    part: PART_1,
    title: "What Grok Is and How the Agentic Loop Works",
    subtitle:
      "Understand Grok’s role inside an agentic system, then build the controlled feedback loop that turns model reasoning into useful, verifiable action.",
    updatedOn: "2026-11-10",
    sections: [
      section(
        "Grok 4.7 and the current agent contract",
        p("The current developer guide lists `grok-4.7`: a 500,000-token context window, text and image input, text output, and a May 2026 knowledge cutoff. Live facts still require retrieval; a newer model is not a live database."),
        p("Use the Responses API for new text-and-tool integrations. Built-in tools execute at the provider; custom function calls return to your application for validation, authorization, execution, and a matching result."),
        sources("2026-11-10",
          { label: "Grok 4 7", url: "https://docs.x.ai/developers/grok-4-7" },
          { label: "Overview", url: "https://docs.x.ai/developers/tools/overview" }
        )
      ),
      section(
        "Chapter Overview & Learning Objectives",
        p("Grok is xAI’s family of frontier models designed for high-quality reasoning, coding, and agentic work. The current developer guide lists Grok 4.7, which excels at complex multi-step tasks, tool use, and long-context understanding. However, a model alone is not an agent."),
        p("An agent is a system that combines the model with memory, tools, permissions, state management, and clear stopping conditions. Grok provides the reasoning engine. Your application provides the control loop, safety boundaries, and execution environment."),
        quote("An agent is a controlled feedback system: Grok reasons about the current state, your application executes bounded actions, and the resulting evidence becomes the next observation."),
        h3("By the end of this chapter you will be able to"),
        ul(
          "Clearly separate what Grok does from what your runtime must do.",
          "Implement the full agentic loop: Observe → Reason → Decide → Execute → Observe Result.",
          "Distinguish server-side tools from client-side tools and choose correctly.",
          "Use reasoning_effort as a deliberate engineering control.",
          "Design session state and stopping rules that make agents reliable and testable."
        )
      ),
      section(
        "Core Theoretical Principles & Architecture",
        p("Model inference uses the context supplied to that turn. The Responses API can retain conversation state for continuation, while manually managed history must carry the needed prior items. Neither mechanism replaces durable application state or authorization."),
        h3("The Agentic Loop"),
        loop(),
        ol(
          "**Observe** — Assemble the goal, system instructions, relevant memory, recent tool results, and constraints.",
          "**Reason** — Grok evaluates the current evidence and decides what to do next.",
          "**Decide** — The model either produces a final answer, asks a clarifying question, or emits one or more tool calls.",
          "**Execute** — Your runtime validates the tool call, checks permissions, runs it, and captures the result (or error).",
          "**Repeat or Stop** — Feed the result back into the context and continue until the goal is met or a budget is exhausted."
        ),
        h3("Server-side vs Client-side Tools"),
        ul(
          "**Provider built-in tools** run on the provider infrastructure. **Application tools** run in your backend and require your own identity, authorization, secret management, and approval checks.",
          "**Client-side function calling in API terminology** means execution by the caller, commonly your backend. Browser-local tools are a separate case and must not receive private API keys or unrestricted authority."
        ),
        p("Most production agents use a combination of both, with the majority of powerful capabilities kept server-side.")
      ),
      section(
        "Deep Dive Implementation",
        p("Implement the loop in your own orchestration code rather than asking the model to simulate the entire process. Keep state explicit and append-only so every trajectory can be replayed, tested, and debugged."),
        code(
          "typescript",
          `async function runAgent(state: AgentState) {
  while (state.iteration < state.maxIterations) {
    const decision = await grok.respond({
      model: "grok-4.7",
      reasoning_effort: "high",
      messages: buildContext(state),
      tools: allowedTools,
    });

    if (decision.type === "final") {
      return decision.content;
    }

    const call = validateToolCall(decision.toolCall);
    authorize(state.sessionId, call);
    const result = await executeWithTimeout(call, 15_000);

    state.observations.push({
      role: "tool",
      tool_call_id: call.id,
      content: normalize(result),
    });
    state.iteration += 1;
  }

  return escalate("Iteration budget exhausted", state);
}`
        ),
        p("The critical safety boundary sits between validation and execution. Grok may propose any action; only your code is allowed to authorize and perform it."),
        h3("Reasoning Effort"),
        p("Treat reasoning_effort as a first-class control. Use lower effort for classification, routing, extraction, and simple tool use. Reserve high or xhigh effort for complex planning, debugging, architecture decisions, and hard reasoning tasks.")
      ),
      section(
        "Real-World Recipe: Incident Triage Agent",
        p("A practical example is an incident triage agent that investigates elevated error rates."),
        ol(
          "The agent receives an incident ID, service name, and time window.",
          "It first calls read-only tools (getServiceHealth, searchLogs, getRecentDeploys).",
          "It forms a diagnosis with cited evidence.",
          "It proposes a mitigation or an incident note.",
          "Any write action (creating a note, restarting a service, opening a PR) requires explicit human approval or a high-confidence policy check."
        ),
        quote("The useful unit of autonomy is one bounded decision followed by one observable result.")
      ),
      section(
        "Advanced Edge Cases & Optimization",
        ul(
          "**Infinite loops** — Detect repeated identical tool calls and force a stop or re-plan.",
          "**Malformed tool calls** — Return a clear validation error and allow the model one retry before escalating.",
          "**Partial failures** — Never assume a timed-out write failed; check with an idempotency key.",
          "**Context explosion** — Summarize or drop old tool results once they have been used.",
          "**Prompt injection via tool results** — Always treat retrieved content as untrusted data."
        )
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Grok supplies reasoning; your application supplies authority, memory, tools, and verification.",
          "The agentic loop is the fundamental pattern of all reliable agents.",
          "Keep tool execution behind a hard validation and authorization boundary.",
          "Make state explicit, budgets enforceable, and trajectories inspectable."
        ),
        p("Next → Chapter 2: Pricing Models, Token Economics, and Cost Management Strategy.")
      ),
    ],
  },

  // ==================== CHAPTER 2 ====================
  {
    id: 2,
    slug: "pricing-token-economics-cost-management",
    part: PART_1,
    title: "Pricing Models, Token Economics, and Cost Management Strategy",
    subtitle: "Understand how tokens turn into real money and build systems that stay cost-predictable even as agent usage grows.",
    updatedOn: "2026-11-10",
    sections: [
      section(
        "Current rates and correct usage accounting",
        p(`${currentModel} has a ${modelContextTokens.toLocaleString("en-US")}-token context. Below ${longContextThreshold.toLocaleString("en-US")} prompt tokens, rates per million are $${textRates.short.input.toFixed(2)} input, $${textRates.short.cached.toFixed(2)} cached input, and $${textRates.short.output.toFixed(2)} output. At or above that boundary, $${textRates.long.input.toFixed(2)}, $${textRates.long.cached.toFixed(2)}, and $${textRates.long.output.toFixed(2)} apply to every token in the request.`),
        p("Cached tokens are a subset of input tokens. Reasoning can already be included in the output total: inspect the chosen API usage fields and do not bill it twice. Add tool charges separately. Web search costs $5 per 1,000 calls; X search costs $5 per 1,000 posts fetched and $10 per 1,000 profiles fetched."),
        p("A 10,000-input-token call with 8,000 cached tokens and 2,000 total output tokens costs $0.020 before tool fees. Consumer chat or editor subscriptions are not interchangeable with API billing."),
        sources("2026-11-10",
          { label: "Pricing", url: "https://docs.x.ai/developers/pricing" },
          { label: "Models", url: "https://docs.x.ai/developers/models" }
        )
      ),
      section(
        "Chapter Overview & Learning Objectives",
        p("Every call to Grok consumes tokens. In agentic systems a single user task can trigger many model calls, each carrying growing context. Without deliberate cost control, expenses scale faster than value."),
        h3("You will learn to"),
        ul(
          "Break down the different types of tokens and their relative cost.",
          "Calculate the true cost of a multi-step agent trajectory.",
          "Apply caching, compaction, model routing, and hard budgets.",
          "Design cost-aware agents that remain useful under financial constraints."
        )
      ),
      section(
        "Core Principles of Token Economics",
        p("Tokens are the unit of billing. Roughly four characters of English text equal one token, but code, JSON, and non-English languages vary. Output tokens and reasoning tokens are typically significantly more expensive than input tokens. Cached input tokens (stable prefixes) are the cheapest."),
        h3("The real unit is cost per successful task"),
        p("A single request cost is almost meaningless. What matters is the total tokens consumed across every iteration of the agentic loop until the task succeeds or is abandoned."),
        code(
          "text",
          `task_cost ≈ Σ (
  fresh_input_tokens  × input_price
+ cached_input_tokens × cached_price
+ total_billable_output_tokens × output_price
) + tool_fees`
        )
      ),
      section(
        "Practical Cost Control Strategies",
        ul(
          "**Stable system prompts and tool schemas** — Put them first so they can be cached across turns and users.",
          "**Context compaction** — Summarize older conversation turns and tool results instead of re-sending everything.",
          "**Model routing** — Send simple classification or extraction tasks to a faster/cheaper model; reserve the flagship for hard reasoning.",
          "**Reasoning effort tuning** — Lower effort dramatically reduces hidden reasoning tokens on routine turns.",
          "**Hard budgets** — Enforce maximum tokens or dollars per task and per day in code.",
          "**Output discipline** — Ask for concise structured output and set reasonable max_tokens limits."
        )
      ),
      section(
        "Implementation: Budget Guard",
        code(
          "typescript",
          `class BudgetGuard {
  constructor(private maxUsd: number) {}
  private spent = 0;

  record(usage: Usage) {
    this.spent += priceOf(usage);
    if (this.spent > this.maxUsd) {
      throw new BudgetExceededError(this.spent, this.maxUsd);
    }
  }
}`
        ),
        p("Attach a BudgetGuard to every model call inside the agent loop. When the limit is hit, stop cleanly and return partial progress with a clear explanation.")
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Measure cost per completed task, not per API call.",
          "Caching and compaction are the highest-leverage cost reductions.",
          "Route easy work to cheaper models and lower reasoning effort.",
          "Enforce budgets in code rather than hoping usage stays reasonable."
        ),
        p("Next → Chapter 3: Access, Authentication, Environment Setup, and Model Selection.")
      ),
    ],
  },

  // ==================== CHAPTER 3 ====================
  {
    id: 3,
    slug: "access-authentication-environment-setup",
    part: PART_1,
    title: "Access, Authentication, Environment Setup, and Model Selection",
    subtitle: "Set up secure, reproducible access to Grok and choose the right model for each job.",
    updatedOn: "2026-11-10",
    sections: [
      section(
        "Select and verify the deployed model",
        p("Use `grok-4.7` for the current frontier coding and agentic baseline, then compare it with available alternatives on your own tasks. Listing a model in documentation does not establish your account rate limit or entitlement."),
        p("Grok 4.7 Fast is served on faster infrastructure in Cursor and Grok Build, not on the public xAI API. Do not invent a public fast-model slug. Keep model selection configurable, record the returned model, and rerun evaluations before upgrades."),
        p("Install `openai` for OpenAI-compatible examples or `xai-sdk` for native Python examples; use `XAI_API_KEY` only in a trusted server environment. The base endpoint remains `https://api.x.ai/v1`."),
        sources("2026-11-10",
          { label: "Grok 4 7", url: "https://docs.x.ai/developers/grok-4-7" },
          { label: "Models", url: "https://docs.x.ai/developers/models" }
        )
      ),
      section(
        "Chapter Overview & Learning Objectives",
        p("Before you can build reliable agents you need secure authentication, a clean development environment, and a clear policy for which model to use when."),
        ul(
          "Manage API keys safely across environments.",
          "Configure the official SDK or an OpenAI-compatible client.",
          "Select models based on capability, speed, and cost.",
          "Create a reproducible local and production setup."
        )
      ),
      section(
        "Authentication & Key Management",
        ul(
          "Create separate API keys for development, staging, and production.",
          "Store keys in environment variables or a secret manager — never in source control.",
          "Never expose keys in frontend code or browser bundles.",
          "Rotate keys regularly and immediately after any suspected leak.",
          "Prefer short-lived tokens where the platform supports them."
        ),
        code(
          "bash",
          `# .env (add to .gitignore)
XAI_API_KEY=xai-...

# Quick verification
curl https://api.x.ai/v1/models \\
  -H "Authorization: Bearer $XAI_API_KEY"`
        )
      ),
      section(
        "Client Setup",
        p("You can use the official xAI Python SDK or any OpenAI-compatible client pointed at the xAI base URL."),
        code(
          "typescript",
          `import OpenAI from "openai";

export const grok = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
});`
        ),
        code(
          "python",
          `from xai_sdk import Client

import os

client = Client(api_key=os.getenv("XAI_API_KEY"))`
        )
      ),
      section(
        "Model Selection Guidelines",
        ul(
          "Use the latest flagship (Grok 4.7 or successor) for complex reasoning, coding, and agentic workloads.",
          "Use faster or smaller variants for classification, routing, simple extraction, and high-volume low-stakes tasks.",
          "Pin model versions in production so behavior stays stable.",
          "Re-evaluate model choice when new versions are released or when cost/latency requirements change."
        )
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Treat API keys as secrets of the highest sensitivity.",
          "Keep the client configuration simple and centralized.",
          "Match model capability to task difficulty.",
          "Make the entire setup reproducible with environment variables and clear documentation."
        ),
        p("Next → Chapter 4: The Interactive Environment and Conversational Workflows.")
      ),
    ],
  },

  // ==================== CHAPTER 4 ====================
  {
    id: 4,
    slug: "interactive-environment-conversational-workflows",
    part: PART_1,
    title: "The Interactive Environment and Conversational Workflows",
    subtitle: "Design smooth, stateful conversational experiences that still remain controllable and cost-aware.",
    updatedOn: "2026-11-10",
    sections: [
      section(
        "Responses, continuation, and interruptible conversation",
        p("Continue a stored conversation with `previous_response_id`, or manage history yourself by passing prior output items back in `input`. With Grok 4.7, preserve encrypted reasoning and server-tool items unchanged instead of flattening all output into text."),
        p("Responses are stored by default and documented for 30-day retention. `store: false` changes response storage, but is not a blanket zero-data-retention contract. Your application still owns durable user history, deletion, cancellation, and recovery."),
        p("The Responses `instructions` field cannot be combined with `previous_response_id`; the previous system prompt is reused. An edited earlier turn should start a deliberate new branch rather than silently mixing incompatible histories."),
        sources("2026-11-10",
          { label: "Responses", url: "https://docs.x.ai/developers/rest-api-reference/inference/responses" },
          { label: "Reasoning", url: "https://docs.x.ai/developers/model-capabilities/text/reasoning" }
        )
      ),
      section(
        "Chapter Overview & Learning Objectives",
        p("Most users first experience Grok through interactive chat. Turning that experience into a reliable product requires careful handling of conversation state, streaming, context growth, and user experience."),
        ul(
          "Maintain conversation state across turns without uncontrolled growth.",
          "Stream responses for better perceived performance.",
          "Handle interruptions, regenerations, and edits gracefully.",
          "Combine free-form conversation with structured agentic behavior."
        )
      ),
      section(
        "Conversation State Management",
        p("Keep a clean message history. Periodically compact older turns into summaries so the active context stays focused and cheap. Store the full history separately for audit and debugging if needed."),
        ul(
          "Separate system instructions from user/assistant turns.",
          "Store tool calls and tool results in the canonical format required by the API.",
          "Implement a compaction strategy once the history exceeds a token threshold."
        )
      ),
      section(
        "Streaming & Responsiveness",
        p("Always stream when the user is waiting. Streaming reduces perceived latency and allows the interface to show partial progress (including tool calls in real time)."),
        code(
          "typescript",
          `const stream = await grok.chat.completions.create({
  model: "grok-4.7",
  messages,
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || "");
}`
        )
      ),
      section(
        "Hybrid Conversational + Agentic Design",
        p("Many successful products mix free conversation with structured agent behavior. The model can chat naturally until it detects a task that requires tools, then switch into the agentic loop, and finally return to conversational tone with the result.")
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Conversation state is your responsibility, not the model’s.",
          "Stream everything user-facing.",
          "Compact history aggressively to control cost and quality.",
          "Design clear transitions between chat mode and agent mode."
        ),
        p("Next → Chapter 5: Essential Prompt Patterns, System Instructions, and Runtime Controls.")
      ),
    ],
  },

  // ==================== CHAPTER 5 ====================
  {
    id: 5,
    slug: "essential-prompt-patterns-system-instructions",
    part: PART_1,
    title: "Essential Prompt Patterns, System Instructions, and Runtime Controls",
    subtitle: "Write system prompts and interaction patterns that reliably steer Grok toward correct, safe, and useful behavior.",
    updatedOn: "2026-11-10",
    sections: [
      section(
        "Use endpoint-specific runtime controls",
        p("For OpenAI-compatible Responses requests, set `reasoning: { effort: \"low\" }`; Chat Completions uses `reasoning_effort`. Grok 4.7 defaults to high effort, not medium, and reasoning cannot be disabled."),
        p("Do not copy parameter names across endpoints without checking the reference. Unsupported reasoning-model penalties and `stop` can cause errors. Runtime policy, not a prompt, must enforce budgets and tool access."),
        sources("2026-11-10",
          { label: "Reasoning", url: "https://docs.x.ai/developers/model-capabilities/text/reasoning" },
          { label: "Responses", url: "https://docs.x.ai/developers/rest-api-reference/inference/responses" }
        )
      ),
      section(
        "Chapter Overview & Learning Objectives",
        p("The system prompt is the most leveraged piece of context you control. Combined with good runtime controls (reasoning effort, tool choice, response format), it determines most of an agent’s personality, reliability, and safety."),
        ul(
          "Design strong, stable system instructions.",
          "Use proven prompt patterns for different task types.",
          "Control behavior with reasoning_effort, tool_choice, and structured output.",
          "Avoid common prompt anti-patterns."
        )
      ),
      section(
        "Anatomy of a Strong System Prompt",
        ul(
          "Role and high-level goal.",
          "Hard constraints and safety rules.",
          "Available tools and when to use them.",
          "Output format expectations.",
          "Tone and style guidelines.",
          "Explicit stop conditions or escalation rules."
        ),
        p("Keep the system prompt stable across turns so it can be cached. Put variable information in the user or tool messages.")
      ),
      section(
        "High-Value Prompt Patterns",
        ul(
          "**Plan-then-execute** — Force the model to outline steps before acting.",
          "**Evidence-first** — Require citations or tool results before claims.",
          "**Self-critique** — Ask the model to list assumptions and uncertainties.",
          "**Structured output** — Demand JSON or a precise schema for machine consumption.",
          "**Role + constraints** — Combine a clear persona with non-negotiable rules."
        )
      ),
      section(
        "Runtime Controls",
        ul(
          "`reasoning_effort` — low / medium / high / xhigh",
          "`tool_choice` — auto | required | none | specific tool",
          "Response format / JSON schema enforcement",
          "Temperature and sampling settings (when available)",
          "Maximum iterations and token budgets"
        )
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Invest heavily in the system prompt — it is the highest-leverage artifact.",
          "Keep it stable for caching and consistency.",
          "Combine prompt patterns with runtime controls for reliable behavior.",
          "Test prompts against real failure cases, not just happy paths."
        ),
        p("Next → Chapter 6: High-Productivity Daily Workflows and Prompt Libraries.")
      ),
    ],
  },

  // ==================== CHAPTER 6 ====================
  {
    id: 6,
    slug: "high-productivity-daily-workflows-prompt-libraries",
    part: PART_1,
    title: "High-Productivity Daily Workflows and Prompt Libraries",
    subtitle: "Turn repeated work into reusable, versioned prompt assets and efficient daily engineering habits.",
    updatedOn: "2026-11-10",
    sections: [
      section(
        "Version the full workflow, not only the prompt",
        p("Record model, endpoint, effort, tools, output schema, evaluation results, and verification date alongside each reusable template. A prompt that works in consumer chat may lack the same tools in an API application."),
        p("In Grok Build, packaged skills use a directory containing `SKILL.md` with YAML metadata. Plain markdown templates remain useful but are not automatically identical to installed skills. Inspect discovered assets with `grok inspect`."),
        sources("2026-11-10",
          { label: "Skills Plugins Marketplaces", url: "https://docs.x.ai/build/features/skills-plugins-marketplaces" },
          { label: "Overview", url: "https://docs.x.ai/build/overview" }
        )
      ),
      section(
        "Chapter Overview & Learning Objectives",
        p("The difference between occasional Grok use and high-leverage engineering is systematization. Experts maintain prompt libraries, standardized workflows, and tight feedback loops."),
        ul(
          "Build and organize a personal or team prompt library.",
          "Create parameterized templates for common tasks.",
          "Design daily workflows that combine chat, agents, and tools.",
          "Version and improve prompts like code."
        )
      ),
      section(
        "Prompt Library Structure",
        code(
          "text",
          `prompts/
  code-review.md
  bug-investigation.md
  pr-description.md
  refactor-plan.md
  test-generation.md
  architecture-decision.md`
        ),
        p("Each file should contain a clear description of when to use it, the template itself, recommended model/effort settings, and example inputs/outputs.")
      ),
      section(
        "Parameterized Templates",
        p("Replace hard-coded values with placeholders so the same template works across repositories and situations."),
        code(
          "markdown",
          `You are a senior code reviewer.
Review the following diff for correctness, security, and maintainability.

Repository: {{repo}}
Branch: {{branch}}
Diff:
{{diff}}

Output a structured review with severity levels.`
        )
      ),
      section(
        "Daily Workflow Example",
        ol(
          "Morning: triage overnight CI failures with a dedicated investigation prompt.",
          "During development: use short, focused prompts for small edits and tests.",
          "Before opening a PR: run the code-review and PR-description templates.",
          "End of day: update project memory with any new decisions."
        )
      ),
      section(
        "Chapter Summary & Next Steps",
        ul(
          "Treat prompts as versioned assets, not one-off chat messages.",
          "Parameterize aggressively so templates stay reusable.",
          "Standardize the most common engineering workflows.",
          "Continuously improve templates based on real outcomes."
        ),
        p("This concludes Part 1: Foundations. Next → Part 2 begins with Chapter 7: Persistent Memory Systems and Project Context Architecture.")
      ),
    ],
  },
];
