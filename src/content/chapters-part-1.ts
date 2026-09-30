import { PART_1, code, h3, loop, ol, p, quote, section, ul, type ChapterContent } from "./chapter-types";

export const part1Chapters: ChapterContent[] = [
  // ==================== CHAPTER 1 ====================
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
        p("Grok is xAI’s family of frontier models designed for high-quality reasoning, coding, and agentic work. The current flagship (Grok 4.6 and related variants) excels at complex multi-step tasks, tool use, and long-context understanding. However, a model alone is not an agent."),
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
        p("Grok is stateless between API calls. It only knows what you put in the current context. Therefore every useful agent must reconstruct relevant state on each turn and feed tool results back as new observations."),
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
          "**Server-side tools** run in your trusted backend. They can safely access secrets, databases, internal APIs, and perform privileged actions.",
          "**Client-side tools** run on the user’s device or browser. They should be treated as untrusted and limited to UI interactions or explicitly consented local actions."
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
      model: "grok-4.6",
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
    sections: [
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
+ (output_tokens + reasoning_tokens) × output_price
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
    sections: [
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

client = Client(api_key=os.getenv("XAI_API_KEY"))`
        )
      ),
      section(
        "Model Selection Guidelines",
        ul(
          "Use the latest flagship (Grok 4.6 or successor) for complex reasoning, coding, and agentic workloads.",
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
    sections: [
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
  model: "grok-4.6",
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
    sections: [
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
    sections: [
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
