import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Clipboard,
  Clock3,
  ListTree,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import type { Chapter } from "@/components/site/course-data";
import { cn } from "@/lib/utils";

type Section = { id: string; label: string };

const sections: Section[] = [
  { id: "overview", label: "Chapter Overview & Learning Objectives" },
  { id: "principles", label: "Core Theoretical Principles & Architecture" },
  { id: "implementation", label: "Deep Dive Implementation" },
  { id: "recipes", label: "Real-World Recipes & Practical Scenario" },
  { id: "optimization", label: "Edge Cases, Troubleshooting & Optimization" },
  { id: "summary", label: "Chapter Summary & Next Steps" },
];

const loopDiagram = `┌─────────────────────────────────────────────────────────┐
│  1. OBSERVE                                             │
│     Goal + session state + latest tool results          │
└───────────────────────┬─────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  2. REASON                                              │
│     Grok evaluates evidence, uncertainty, and progress  │
└───────────────────────┬─────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  3. DECIDE                                              │
│     Answer, request clarification, or call a tool       │
└───────────────────────┬─────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  4. EXECUTE TOOL                                        │
│     Host validates, authorizes, executes, and records   │
└───────────────────────┬─────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  5. OBSERVE RESULT                                      │
│     Append structured output or error to session state  │
└───────────────────────┬─────────────────────────────────┘
                        ↓
              Done? ── yes ──→ Final response
                │
                no
                └────────────→ Repeat from REASON`;

const agentCode = `type Observation = {
  source: "user" | "tool"
  content: unknown
  recordedAt: string
}

type AgentState = {
  sessionId: string
  goal: string
  observations: Observation[]
  iteration: number
  maxIterations: number
}

async function runAgent(state: AgentState) {
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

    state.observations.push({
      source: "tool",
      content: normalizeResult(result),
      recordedAt: new Date().toISOString(),
    })
    state.iteration += 1
  }

  return escalate("Iteration budget exhausted", state)
}`;

const incidentRecipe = `const tools = {
  getServiceHealth: readOnlyTool({ service: "string" }),
  searchRecentLogs: readOnlyTool({
    service: "string",
    query: "string",
    minutes: "number",
  }),
  createIncidentNote: approvalRequiredTool({
    incidentId: "string",
    summary: "string",
  }),
}

// Keep the goal measurable and the permissions narrow.
const goal =
  "Identify the likely cause of elevated checkout errors, " +
  "cite supporting observations, and propose a safe next action."`;

function useScrollSpy(items: Section[], offset = 170) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const update = () => {
      let current = items[0]?.id ?? "";
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top <= offset) current = item.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [items, offset]);

  return active;
}

function Contents({ active, onNavigate }: { active: string; onNavigate?: () => void }) {
  return (
    <nav aria-label="On this page" className="space-y-1">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          onClick={onNavigate}
          aria-current={active === section.id ? "location" : undefined}
          className={cn(
            "block border-l px-4 py-2 text-sm leading-5 transition-colors",
            active === section.id
              ? "border-primary text-foreground"
              : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground",
          )}
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}

function CodeBlock({ code, language = "typescript" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = code;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-border bg-card shadow-[0_20px_60px_-42px_color-mix(in_oklab,var(--primary)_28%,transparent)]">
      <div className="flex h-11 items-center justify-between border-b border-border bg-surface-elevated/60 px-4">
        <span className="font-mono text-[0.6875rem] uppercase text-muted-foreground">{language}</span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={copyCode}
          aria-label={copied ? "Code copied" : "Copy code"}
          className="h-7 px-2 text-muted-foreground hover:text-foreground"
        >
          {copied ? <Check className="text-cyan" /> : <Clipboard />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="overflow-x-auto p-5 text-[0.8125rem] leading-6 text-foreground sm:p-6 sm:text-sm">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}

function ReadingSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32 pt-14 first:pt-0">
      <h2 className="text-balance text-2xl font-bold leading-tight sm:text-3xl">{title}</h2>
      <div className="mt-6 space-y-6 text-[1.0625rem] leading-8 text-muted-foreground">{children}</div>
    </section>
  );
}

function InlineCode({ children }: { children: ReactNode }) {
  return <code className="rounded-md border border-border bg-card px-1.5 py-0.5 font-mono text-[0.85em] text-cyan">{children}</code>;
}

export function ChapterReader({
  chapter,
  previous,
  next,
}: {
  chapter: Chapter;
  previous?: Chapter;
  next?: Chapter;
}) {
  const reduceMotion = useReducedMotion();
  const active = useScrollSpy(sections);
  const [mobileContentsOpen, setMobileContentsOpen] = useState(false);
  const isChapterOne = chapter.id === 1;
  const title = isChapterOne ? "What Grok Is and How the Agentic Loop Works" : chapter.title;
  const description = isChapterOne
    ? "Understand Grok’s role inside an agentic system, then build the controlled feedback loop that turns model reasoning into useful, verifiable action."
    : chapter.description;

  return (
    <main className="relative overflow-clip">
      <div className="page-grid pointer-events-none absolute inset-x-0 top-0 h-[30rem] opacity-50" />
      <motion.div
        initial={reduceMotion ? {} : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-8 sm:pb-32 sm:pt-14"
      >
        <Link
          to="/course"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> Back to Course
        </Link>

        <header className="max-w-4xl border-b border-border pb-10 pt-12 sm:pb-14 sm:pt-16">
          <div className="font-mono text-xs uppercase text-cyan">Chapter {chapter.number}</div>
          <h1 className="text-balance mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p>
          <div className="mt-7 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Clock3 className="size-3.5 text-primary" aria-hidden="true" /> {isChapterOne ? "24" : "14"} min read
            <span aria-hidden="true">·</span> Foundations
          </div>
        </header>

        <div className="mt-8 lg:hidden">
          <Button
            type="button"
            variant="outline"
            className="w-full justify-between"
            aria-expanded={mobileContentsOpen}
            aria-controls="mobile-chapter-contents"
            onClick={() => setMobileContentsOpen((open) => !open)}
          >
            <span className="flex items-center gap-2"><ListTree /> On this page</span>
            <ChevronDown className={cn("transition-transform", mobileContentsOpen && "rotate-180")} />
          </Button>
          <AnimatePresence initial={false}>
            {mobileContentsOpen && (
              <motion.div
                id="mobile-chapter-contents"
                initial={reduceMotion ? {} : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 rounded-xl border border-border bg-card/75 p-4 backdrop-blur-xl">
                  <Contents active={active} onNavigate={() => setMobileContentsOpen(false)} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-12 lg:grid lg:grid-cols-[13rem_minmax(0,45rem)] lg:gap-16 xl:grid-cols-[14rem_minmax(0,45rem)_11rem] xl:gap-14">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="mb-5 flex items-center gap-2 font-mono text-[0.6875rem] uppercase text-cyan">
                <ListTree className="size-3.5" aria-hidden="true" /> On this page
              </div>
              <Contents active={active} />
            </div>
          </aside>

          <article className="min-w-0 max-w-[45rem]">
            <ReadingSection id="overview" title="Chapter Overview & Learning Objectives">
              <p>
                Grok is xAI’s family of general-purpose models. Its current flagship, <strong className="text-foreground">Grok 4.6</strong>, is designed for demanding reasoning, coding, and agentic work: tasks that require a model to inspect context, choose an action, use external capabilities, and adapt to the result. The model is powerful, but it is only one component of a reliable agent.
              </p>
              <p>
                The surrounding application supplies the goal, instructions, tool definitions, permissions, session state, stopping conditions, and evidence needed to verify success. Grok supplies probabilistic reasoning and generates either a response or a structured request to use one of those tools. Treating this boundary explicitly is the foundation of production-grade agent engineering.
              </p>
              <blockquote className="border-l-2 border-primary bg-primary/5 px-6 py-5 text-lg font-medium leading-8 text-foreground">
                An agent is a controlled feedback system: Grok reasons about the current state, your application executes bounded actions, and the resulting evidence becomes the next observation.
              </blockquote>
              <h3 className="pt-3 text-xl font-semibold text-foreground">By the end of this chapter, you will be able to</h3>
              <ul className="space-y-3 pl-6 marker:text-cyan">
                <li>Describe where Grok ends and the agent runtime begins.</li>
                <li>Trace a task through observe, reason, decide, execute, and repeat.</li>
                <li>Choose between server-side and client-side tool execution.</li>
                <li>Configure reasoning effort without wasting latency or tokens.</li>
                <li>Persist session state and enforce safe, testable stopping rules.</li>
              </ul>
            </ReadingSection>

            <ReadingSection id="principles" title="Core Theoretical Principles & Architecture">
              <p>
                A model call is stateless computation over the context provided to it. Grok does not inherently remember an earlier request, hold a database connection, or know whether an attempted action succeeded. The agent runtime must reconstruct the relevant state on each turn and return tool results as new observations.
              </p>
              <h3 className="pt-3 text-xl font-semibold text-foreground">The six-stage agentic loop</h3>
              <p>
                A useful mental model is <strong className="text-foreground">Observe → Reason → Decide to use tools → Execute tools → Observe results → Repeat until done</strong>. “Reason” and “decide” belong to the model call; authorization, execution, and durable recording belong to the host application.
              </p>
              <CodeBlock code={loopDiagram} language="agent loop" />
              <ol className="space-y-4 pl-6 marker:font-mono marker:text-primary">
                <li><strong className="text-foreground">Observe.</strong> Assemble the user’s goal, relevant session state, policies, and latest results.</li>
                <li><strong className="text-foreground">Reason.</strong> Grok interprets the evidence, identifies unknowns, and evaluates possible next steps.</li>
                <li><strong className="text-foreground">Decide.</strong> The model returns a final answer, asks for clarification, or emits a structured tool call.</li>
                <li><strong className="text-foreground">Execute.</strong> The runtime validates the schema and permissions before invoking the chosen capability.</li>
                <li><strong className="text-foreground">Observe the result.</strong> Normalize the output or error and append it to session state.</li>
                <li><strong className="text-foreground">Repeat or stop.</strong> Continue only while the goal remains incomplete and budgets permit another turn.</li>
              </ol>
              <h3 className="pt-3 text-xl font-semibold text-foreground">Reasoning effort is an engineering control</h3>
              <p>
                Reasoning effort controls how much inference work the model applies before responding. Use lower effort for routing, extraction, and well-specified transformations. Reserve higher effort for ambiguous planning, code repair, multi-step diagnosis, or decisions with costly consequences. More effort can improve difficult decisions, but it also increases latency and token use; it is not a substitute for missing context or weak tools.
              </p>
            </ReadingSection>

            <ReadingSection id="implementation" title="Deep Dive Implementation">
              <p>
                Implement the loop as orchestration code, not as a prompt that tells the model to simulate execution. Keep state explicit and preferably append-only: every tool result should retain its source, timestamp, and relationship to the call that produced it. This creates a trace you can replay, inspect, and test.
              </p>
              <CodeBlock code={agentCode} />
              <p>
                The critical boundary sits between <InlineCode>validateToolCall</InlineCode> and <InlineCode>executeWithTimeout</InlineCode>. Grok may propose an action; only your runtime may authorize and perform it. Validate arguments against a strict schema, reject unknown tools, enforce per-user permissions, attach an idempotency key to writes, and set time and size limits.
              </p>
              <h3 className="pt-3 text-xl font-semibold text-foreground">Server-side tools versus client-side tools</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-card/70 p-5">
                  <h4 className="font-semibold text-foreground">Server-side tools</h4>
                  <p className="mt-2 text-sm leading-6">Run in trusted infrastructure and can safely access secrets, private data, internal APIs, queues, and databases. Use them for authoritative reads, writes, billing, or any capability requiring audit and policy enforcement.</p>
                </div>
                <div className="rounded-xl border border-border bg-card/70 p-5">
                  <h4 className="font-semibold text-foreground">Client-side tools</h4>
                  <p className="mt-2 text-sm leading-6">Run in the user’s browser or device and can interact with visible UI, selected files, local sensors, or consented user actions. Treat them as untrusted and never expose private credentials through their arguments.</p>
                </div>
              </div>
              <p>
                A hybrid flow can be appropriate: the server decides that explicit user approval is required, the client presents that approval, and the server performs the authorized write. The model should receive a concise result, not implementation secrets or raw credentials.
              </p>
              <h3 className="pt-3 text-xl font-semibold text-foreground">Session state is product state</h3>
              <p>
                Persist the task goal, compact conversation history, tool calls and results, approval decisions, iteration count, and completion status under a stable session identifier. Do not rely on the model to remember facts that are absent from the current context. Summarize old observations when the context grows, but retain the original event log for audits and recovery.
              </p>
            </ReadingSection>

            <ReadingSection id="recipes" title="Real-World Recipes & Step-by-Step Practical Scenario">
              <p>
                Consider an incident-triage assistant asked to investigate elevated checkout errors. The goal is not “look at production.” It is a measurable, read-first task with narrow tools and an approval boundary before any persistent write.
              </p>
              <CodeBlock code={incidentRecipe} />
              <h3 className="pt-3 text-xl font-semibold text-foreground">Walkthrough</h3>
              <ol className="space-y-4 pl-6 marker:font-mono marker:text-cyan">
                <li><strong className="text-foreground">Observe the request.</strong> Store the incident ID, affected service, error window, permissions, and explicit definition of done.</li>
                <li><strong className="text-foreground">Reason about missing evidence.</strong> With high reasoning effort, Grok recognizes that service health and recent logs are needed before forming a diagnosis.</li>
                <li><strong className="text-foreground">Call a read-only tool.</strong> The runtime validates <InlineCode>getServiceHealth</InlineCode>, executes it server-side, and records latency and output.</li>
                <li><strong className="text-foreground">Observe and refine.</strong> A payment dependency is degraded, so Grok requests a narrowly scoped log search rather than fetching every log.</li>
                <li><strong className="text-foreground">Synthesize with evidence.</strong> Grok cites the health result and matching error pattern, states its confidence, and proposes a reversible mitigation.</li>
                <li><strong className="text-foreground">Request approval for the write.</strong> A person reviews the proposed incident note before the server commits it.</li>
                <li><strong className="text-foreground">Stop deliberately.</strong> The loop marks the session complete once the diagnosis, evidence, and safe next action are present.</li>
              </ol>
              <blockquote className="border-l-2 border-cyan bg-cyan/5 px-6 py-5 text-foreground">
                The useful unit of autonomy is not “access to production.” It is one bounded decision followed by one observable result.
              </blockquote>
            </ReadingSection>

            <ReadingSection id="optimization" title="Advanced Edge Cases, Troubleshooting & Optimization">
              <p>
                Most production failures happen around the model rather than inside a single answer. Design the runtime to recognize failure classes and respond with a specific policy instead of a universal retry.
              </p>
              <ul className="space-y-4 pl-6 marker:text-primary">
                <li><strong className="text-foreground">The loop repeats without progress.</strong> Track a digest of recent calls and observations. Stop or re-plan when the same call repeats without new evidence; always enforce iteration and wall-clock budgets.</li>
                <li><strong className="text-foreground">A tool call is malformed.</strong> Return a compact validation error once so Grok can repair the arguments. Repeated schema failures should terminate or escalate, not recurse indefinitely.</li>
                <li><strong className="text-foreground">A write times out.</strong> Never assume it failed. Query by idempotency key before retrying, because the remote system may have completed the operation after your timeout.</li>
                <li><strong className="text-foreground">Session state becomes stale.</strong> Version records and reject writes based on an old version. Reload authoritative state before the next reasoning turn.</li>
                <li><strong className="text-foreground">Tool output is too large.</strong> Filter at the source, paginate, or summarize deterministically. Do not spend context tokens transporting data the model cannot act upon.</li>
                <li><strong className="text-foreground">Latency or cost climbs.</strong> Use low effort for routine turns, cache stable reads, run independent read-only calls in parallel, and reserve the flagship model for decisions that need it.</li>
              </ul>
              <h3 className="pt-3 text-xl font-semibold text-foreground">Treat tool output as untrusted input</h3>
              <p>
                Web pages, documents, logs, and third-party APIs may contain instructions that conflict with the user’s goal. Delimit tool results as data, preserve higher-priority policy separately, and never let retrieved text expand permissions or select an undeclared tool. Sanitize content before displaying it and redact secrets before adding it to model context.
              </p>
              <h3 className="pt-3 text-xl font-semibold text-foreground">Observe the loop, not only the final answer</h3>
              <p>
                Record each model turn, tool name, validated arguments, outcome category, duration, token use, and stop reason. Evaluate task completion, tool-selection accuracy, unnecessary call rate, and recovery behavior. A polished final response can hide an unsafe or wasteful trajectory.
              </p>
            </ReadingSection>

            <ReadingSection id="summary" title="Chapter Summary & Next Steps">
              <p>Carry these principles into every agent you build:</p>
              <ul className="space-y-3 pl-6 marker:text-cyan">
                <li>Grok 4.6 provides strong reasoning and coding capability; the application provides authority, memory, execution, and verification.</li>
                <li>The agentic loop converts an open-ended task into a sequence of bounded decisions and observable outcomes.</li>
                <li>Tool calls are proposals until trusted code validates, authorizes, and executes them.</li>
                <li>Server-side tools protect secrets and authoritative operations; client-side tools support local, visible, consent-driven interactions.</li>
                <li>Reasoning effort, context size, permissions, and iteration limits are explicit engineering controls.</li>
                <li>Durable session state and complete traces make recovery, evaluation, and improvement possible.</li>
              </ul>
              <p>
                In Chapter 2, you will go beneath the orchestration layer and examine how language models transform tokens and context into useful predictions—giving you a stronger basis for deciding what belongs in a prompt, a tool, or deterministic code.
              </p>
            </ReadingSection>

            <nav aria-label="Chapter navigation" className="mt-20 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
              {previous ? (
                <Button asChild variant="outline" className="h-auto justify-start whitespace-normal px-5 py-4 text-left">
                  <Link to="/chapters/$id" params={{ id: String(previous.id) }}>
                    <ArrowLeft />
                    <span><span className="block text-xs text-muted-foreground">Previous chapter</span>{previous.title}</span>
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="outline" className="h-auto justify-start whitespace-normal px-5 py-4 text-left">
                  <Link to="/course">
                    <ArrowLeft />
                    <span><span className="block text-xs text-muted-foreground">Previous</span>Course overview</span>
                  </Link>
                </Button>
              )}
              {next && (
                <Button asChild variant="outline" className="h-auto justify-end whitespace-normal px-5 py-4 text-right">
                  <Link to="/chapters/$id" params={{ id: String(next.id) }}>
                    <span><span className="block text-xs text-muted-foreground">Next chapter</span>{next.title}</span>
                    <ArrowRight />
                  </Link>
                </Button>
              )}
            </nav>
          </article>

          <aside className="hidden xl:block">
            <div className="sticky top-28 border-l border-border pl-5">
              <p className="font-mono text-[0.6875rem] uppercase text-muted-foreground">Reading progress</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">{chapter.number}</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">of 33 sections</p>
              {next && <p className="mt-6 text-xs leading-5 text-muted-foreground">Up next<br /><span className="text-foreground">{next.title}</span></p>}
            </div>
          </aside>
        </div>
      </motion.div>
    </main>
  );
}