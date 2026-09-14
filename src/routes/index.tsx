import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Binoculars,
  Blocks,
  BookOpen,
  Bot,
  Braces,
  ChartNoAxesCombined,
  Check,
  GitBranch,
  LockKeyhole,
  Repeat2,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grok Mastery — Agentic Engineering Guide" },
      { name: "description", content: "Master Grok from your first prompt to production-grade autonomous multi-agent engineering." },
      { property: "og:title", content: "Grok Mastery — Agentic Engineering Guide" },
      { property: "og:description", content: "Master Grok from your first prompt to production-grade autonomous multi-agent engineering." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  { icon: BookOpen, title: "30 Deep Technical Chapters", description: "A complete curriculum built for engineers who want depth, not shortcuts." },
  { icon: GitBranch, title: "Multi-Agent Systems", description: "Design specialized agents that coordinate, delegate, and solve together." },
  { icon: Braces, title: "Production Patterns", description: "Apply reliable architectures, fallbacks, and deployment-ready practices." },
  { icon: LockKeyhole, title: "Tool Calling & Security", description: "Connect tools safely with permissions, validation, and human oversight." },
  { icon: Binoculars, title: "Evaluation & Observability", description: "Measure quality, trace decisions, and diagnose behavior with confidence." },
  { icon: Repeat2, title: "Autonomous Loops", description: "Build durable systems that plan, act, reflect, and improve over time." },
];

const phases = [
  { number: "01", title: "Foundations", detail: "Models, prompting, context", icon: TerminalSquare },
  { number: "02", title: "Core Skills", detail: "Tools, memory, reasoning", icon: Blocks },
  { number: "03", title: "Extending Grok", detail: "APIs, retrieval, workflows", icon: Bot },
  { number: "04", title: "Shipping Software", detail: "Testing, safety, deployment", icon: Check },
  { number: "05", title: "Mastery & Enterprise", detail: "Scale, governance, teams", icon: ChartNoAxesCombined },
];

function Index() {
  const reduceMotion = useReducedMotion();
  const reveal = {
    initial: reduceMotion ? {} : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.55, ease: "easeOut" as const },
  };

  return (
    <main className="overflow-hidden">
      <section className="relative border-b border-border/60 px-5 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-28 lg:pt-36">
        <div className="page-grid pointer-events-none absolute inset-0 opacity-70" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[min(54rem,95vw)] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative mx-auto max-w-5xl text-center"
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 font-mono text-[0.6875rem] uppercase text-muted-foreground backdrop-blur-xl">
            <Sparkles className="size-3.5 text-cyan" aria-hidden="true" />
            The professional guide to agentic engineering
          </div>
          <h1 className="text-balance text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
            Grok <span className="bg-gradient-to-r from-primary to-cyan bg-clip-text text-transparent">Mastery</span>
          </h1>
          <p className="text-balance mx-auto mt-7 max-w-3xl text-xl font-medium leading-8 text-foreground/90 sm:text-2xl sm:leading-9">
            From Your First Prompt to Autonomous Multi-Agent Engineering
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            The complete professional guide to designing, building, and shipping production-grade agentic systems with Grok by xAI.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/course">Start Learning <ArrowRight /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link to="/course"><BookOpen /> View Table of Contents</Link>
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-xs text-muted-foreground">
            <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-cyan" />30 chapters</span>
            <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-primary" />6 learning tracks</span>
            <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-cyan" />Production focused</span>
          </div>
        </motion.div>
      </section>

      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal} className="max-w-2xl">
            <p className="mb-4 font-mono text-xs uppercase text-cyan">Inside the guide</p>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">Everything you need to build systems that act.</h2>
            <p className="mt-5 max-w-xl leading-7 text-muted-foreground">Go beyond chat interfaces. Learn the architecture, operational discipline, and engineering judgment behind dependable AI agents.</p>
          </motion.div>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={feature.title} {...reveal} transition={{ ...reveal.transition, delay: index * 0.06 }}>
                  <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_60px_-30px_color-mix(in_oklab,var(--primary)_35%,transparent)]">
                    <CardContent className="p-7">
                      <div className="mb-8 flex size-10 items-center justify-center rounded-xl border border-border bg-surface-elevated text-cyan transition-colors group-hover:border-primary/40 group-hover:text-primary">
                        <Icon className="size-5" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/35 px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal} className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-4 font-mono text-xs uppercase text-cyan">The learning path</p>
              <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">From first principles to enterprise scale.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">Each phase builds deliberately on the last, turning isolated techniques into a complete engineering practice.</p>
          </motion.div>
          <div className="mt-14 grid border-y border-border sm:grid-cols-2 lg:grid-cols-5">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <motion.div key={phase.title} {...reveal} transition={{ ...reveal.transition, delay: index * 0.06 }} className="relative border-b border-border p-6 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0">
                  <span className="font-mono text-xs text-muted-foreground">{phase.number}</span>
                  <Icon className="mt-10 size-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 font-semibold">{phase.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{phase.detail}</p>
                </motion.div>
              );
            })}
          </div>
          <motion.div {...reveal} className="mt-5 flex items-center gap-3 rounded-xl border border-cyan/20 bg-cyan/5 px-5 py-4 text-sm text-muted-foreground">
            <Repeat2 className="size-4 shrink-0 text-cyan" aria-hidden="true" />
            <span><strong className="font-semibold text-foreground">Plus: Loop Engineering Supplement</strong> — advanced patterns for durable, self-correcting autonomous workflows.</span>
          </motion.div>
        </div>
      </section>

      <section className="relative px-5 py-24 sm:px-8 sm:py-32">
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <motion.div {...reveal} className="relative mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-7 flex size-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
            <Sparkles aria-hidden="true" />
          </div>
          <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">Build what comes next.</h2>
          <p className="text-balance mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">Start with clarity. Finish with systems that reason, coordinate, and deliver reliably in the real world.</p>
          <Button asChild size="lg" className="mt-9">
            <Link to="/course">Begin the journey <ArrowRight /></Link>
          </Button>
        </motion.div>
      </section>
    </main>
  );
}