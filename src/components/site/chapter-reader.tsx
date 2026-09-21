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
  { id: "overview", label: "Chapter overview" },
  { id: "principles", label: "Core theoretical principles" },
  { id: "agentic-loop", label: "The agentic loop" },
  { id: "implementation", label: "Deep dive implementation" },
  { id: "production", label: "Production considerations" },
  { id: "takeaways", label: "Key takeaways" },
];

const agentCode = `type AgentState = {
  goal: string
  observations: string[]
  attempts: number
}

async function runAgent(state: AgentState) {
  while (state.attempts < 6) {
    const action = await grok.plan(state)
    const result = await tools.execute(action)
    state.observations.push(result)

    if (await grok.isComplete(state)) return result
    state.attempts += 1
  }

  throw new Error("Agent reached its iteration limit")
}`;

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
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">{chapter.description}</p>
          <div className="mt-7 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Clock3 className="size-3.5 text-primary" aria-hidden="true" /> 14 min read
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
            <ReadingSection id="overview" title="Chapter overview">
              <p>
                Grok is most useful when you stop treating it as a box that returns answers and start treating it as a reasoning engine inside a controlled system. A production agent combines a model, a clear goal, relevant context, and a bounded set of actions.
              </p>
              <p>
                This chapter develops the mental model used throughout the guide. You will see where the language model ends, where your application begins, and why the loop connecting them matters more than any single prompt.
              </p>
              <blockquote className="border-l-2 border-primary bg-primary/5 px-6 py-5 text-lg font-medium leading-8 text-foreground">
                An agent is not just a model with tools. It is a feedback system that can observe the consequences of its own decisions.
              </blockquote>
            </ReadingSection>

            <ReadingSection id="principles" title="Core theoretical principles">
              <p>
                A language model predicts useful continuations from context. It does not maintain durable state, execute actions, or verify outcomes on its own. Those capabilities come from the system around it.
              </p>
              <h3 className="pt-3 text-xl font-semibold text-foreground">The four layers of an agent</h3>
              <ol className="space-y-4 pl-6 marker:font-mono marker:text-primary">
                <li><strong className="text-foreground">Intent.</strong> A specific goal and an explicit definition of done.</li>
                <li><strong className="text-foreground">Context.</strong> Instructions, evidence, constraints, and prior observations.</li>
                <li><strong className="text-foreground">Action.</strong> Tools that can read data or change the external environment.</li>
                <li><strong className="text-foreground">Evaluation.</strong> A check that determines whether to stop, retry, or escalate.</li>
              </ol>
              <p>
                Keeping these layers separate makes the system easier to inspect. It also lets you change a tool or evaluation policy without rewriting the model instruction.
              </p>
            </ReadingSection>

            <ReadingSection id="agentic-loop" title="The agentic loop">
              <p>
                The simplest reliable loop is <strong className="text-foreground">observe → reason → act → evaluate</strong>. Each turn adds an observation to state, asks Grok for the next bounded action, executes that action, and checks the result against the goal.
              </p>
              <ul className="space-y-3 pl-6 marker:text-cyan">
                <li><strong className="text-foreground">Observe:</strong> collect only the evidence needed for the next decision.</li>
                <li><strong className="text-foreground">Reason:</strong> select an action using the goal, constraints, and current evidence.</li>
                <li><strong className="text-foreground">Act:</strong> invoke one explicit capability with validated input.</li>
                <li><strong className="text-foreground">Evaluate:</strong> verify progress with code or a rubric—not confidence alone.</li>
              </ul>
              <p>
                The loop must always have a stopping rule. Use a completion test, an iteration cap, a time budget, or a human approval boundary. Open-ended autonomy is usually an unbounded failure mode.
              </p>
            </ReadingSection>

            <ReadingSection id="implementation" title="Deep dive implementation">
              <p>
                Start with a small explicit state object. Keep observations append-only when possible, and make the attempt limit visible in code. The model should propose an action; your application should decide whether that action is allowed.
              </p>
              <CodeBlock code={agentCode} />
              <p>
                Notice that <InlineCode>tools.execute</InlineCode> is outside the model. This is the control boundary. Validate the action schema, enforce permissions, set timeouts, and record the result before returning it to the next model turn.
              </p>
              <h3 className="pt-3 text-xl font-semibold text-foreground">Prefer small, legible steps</h3>
              <p>
                A short loop is easier to trace than a single oversized prompt that asks for planning, execution, and verification at once. Each transition becomes observable, testable, and replaceable.
              </p>
            </ReadingSection>

            <ReadingSection id="production" title="Production considerations">
              <p>
                A demonstration succeeds when the happy path works once. A production agent succeeds when its behavior remains bounded across missing data, partial tool failures, ambiguous requests, and adversarial input.
              </p>
              <ul className="space-y-3 pl-6 marker:text-primary">
                <li>Give every tool the minimum permissions required for its task.</li>
                <li>Log decisions, tool inputs, tool outputs, latency, and token usage.</li>
                <li>Make retries selective and idempotent; never repeat a write blindly.</li>
                <li>Escalate irreversible or high-impact actions to a person.</li>
              </ul>
              <blockquote className="border-l-2 border-cyan bg-cyan/5 px-6 py-5 text-foreground">
                Reliability comes from constraints and feedback—not from asking the model to be more careful.
              </blockquote>
            </ReadingSection>

            <ReadingSection id="takeaways" title="Key takeaways">
              <p>Carry these principles into every system you build:</p>
              <ul className="space-y-3 pl-6 marker:text-cyan">
                <li>Grok supplies reasoning; your application supplies state, tools, and control.</li>
                <li>The agentic loop turns a model response into a sequence of verifiable decisions.</li>
                <li>Every loop needs bounded actions, observable state, and a clear stopping condition.</li>
              </ul>
            </ReadingSection>

            <nav aria-label="Chapter navigation" className="mt-20 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
              {previous ? (
                <Button asChild variant="outline" className="h-auto justify-start whitespace-normal px-5 py-4 text-left">
                  <Link to="/chapters/$id" params={{ id: String(previous.id) }}>
                    <ArrowLeft />
                    <span><span className="block text-xs text-muted-foreground">Previous chapter</span>{previous.title}</span>
                  </Link>
                </Button>
              ) : <div />}
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