import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Download,
  GraduationCap,
  Layers,
  ListOrdered,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { courseParts, totalSections, type CoursePart } from "@/components/site/course-data";

export const Route = createFileRoute("/course")({
  head: () => ({
    meta: [
      { title: "Course Overview — Grok Mastery" },
      {
        name: "description",
        content:
          "The complete 30-chapter Grok Mastery course plus the Loop Engineering Supplement — from foundations to enterprise multi-agent systems.",
      },
      { property: "og:title", content: "Course Overview — Grok Mastery" },
      {
        property: "og:description",
        content:
          "The complete 30-chapter Grok Mastery course plus the Loop Engineering Supplement — from foundations to enterprise multi-agent systems.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CoursePage,
});

function useScrollSpy(ids: string[], offset = 140) {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const handler = () => {
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) {
          current = id;
        }
      }
      setActive(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [ids, offset]);
  return active;
}

function CoursePage() {
  const reduceMotion = useReducedMotion();
  const partIds = courseParts.map((p) => p.id);
  const activePart = useScrollSpy(partIds);

  const reveal = {
    initial: reduceMotion ? {} : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.55, ease: "easeOut" as const },
  };

  const completed = 0;

  return (
    <main className="overflow-hidden">
      {/* Header */}
      <section className="relative border-b border-border/60 px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-24">
        <div className="page-grid pointer-events-none absolute inset-0 opacity-70" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[min(50rem,95vw)] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="relative mx-auto max-w-5xl">
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 font-mono text-[0.6875rem] uppercase text-muted-foreground backdrop-blur-xl">
              <ListOrdered className="size-3.5 text-cyan" aria-hidden="true" />
              Course · Table of Contents
            </div>
            <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Course <span className="bg-gradient-to-r from-primary to-cyan bg-clip-text text-transparent">Overview</span>
            </h1>
            <p className="text-balance mt-6 text-xl font-medium leading-8 text-foreground/90 sm:text-2xl sm:leading-9">
              Grok Mastery Guide — 30 Chapters + Loop Engineering Supplement
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              A deliberate learning path that moves you from first principles to production-grade autonomous systems:
              Foundations → Core Skills → Extending Grok → Shipping Real Software → Mastery & Enterprise Patterns.
            </p>

            {/* Progress */}
            <div className="mt-9 max-w-md">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-mono uppercase tracking-wider">Your progress</span>
                <span className="font-mono">
                  <span className="text-foreground">{completed}</span> / {totalSections} sections
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                <motion.div
                  initial={reduceMotion ? {} : { width: 0 }}
                  animate={{ width: `${(completed / totalSections) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-cyan"
                />
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/chapters/$id" params={{ id: "1" }}>
                  <PlayCircle /> Start with Chapter 1
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/resources">
                  <Download /> Download All Materials
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick-jump strip (mobile) */}
      <div className="border-b border-border/60 bg-card/30 backdrop-blur-xl lg:hidden">
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-3 sm:px-8">
          {courseParts.map((part) => (
            <a
              key={part.id}
              href={`#${part.id}`}
              className="shrink-0 rounded-full border border-border bg-background/60 px-3 py-1.5 font-mono text-[0.6875rem] text-muted-foreground transition-colors hover:text-foreground"
            >
              {part.title}
            </a>
          ))}
        </div>
      </div>

      {/* Body with sticky sidebar */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[16rem_1fr] lg:gap-12">
          {/* Sticky sidebar (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-4 font-mono text-xs uppercase text-cyan">Contents</p>
              <nav className="space-y-1" aria-label="Course parts">
                {courseParts.map((part) => {
                  const isActive = activePart === part.id;
                  return (
                    <a
                      key={part.id}
                      href={`#${part.id}`}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "font-mono text-xs",
                          isActive ? "text-primary" : "text-muted-foreground/70",
                        )}
                      >
                        {part.number}
                      </span>
                      <span className="flex-1 truncate">{part.title}</span>
                      <span className="font-mono text-[0.6875rem] text-muted-foreground/70">
                        {part.chapters.length}
                      </span>
                    </a>
                  );
                })}
              </nav>
              <div className="mt-6 rounded-xl border border-border bg-card/50 p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <GraduationCap className="size-4 text-primary" aria-hidden="true" />
                  {totalSections} sections
                </div>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  {courseParts.length} parts covering foundations through enterprise multi-agent systems.
                </p>
              </div>
            </div>
          </aside>

          {/* Parts */}
          <div className="space-y-20 sm:space-y-28">
            {courseParts.map((part, partIndex) => (
              <PartSection
                key={part.id}
                part={part}
                partIndex={partIndex}
                reveal={reveal}
                reduceMotion={!!reduceMotion}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative border-t border-border/60 px-5 py-24 sm:px-8 sm:py-32">
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <motion.div {...reveal} className="relative mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-7 flex size-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
            <BookOpen aria-hidden="true" />
          </div>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            Begin with the fundamentals.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Chapter 1 sets the foundation every later chapter builds on. Start there, or jump to any section that fits your goal.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/chapters/$id" params={{ id: "1" }}>
                Start with Chapter 1 <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/resources">
                <Download /> Download All Materials
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function PartSection({
  part,
  partIndex,
  reveal,
  reduceMotion,
}: {
  part: CoursePart;
  partIndex: number;
  reveal: any;
  reduceMotion: boolean;
}) {
  const Icon = part.icon;
  const isBonus = part.id === "bonus";

  return (
    <motion.section
      id={part.id}
      {...reveal}
      transition={{ ...reveal.transition, delay: reduceMotion ? 0 : partIndex * 0.05 }}
      className="scroll-mt-24"
    >
      {/* Part header */}
      <div className="flex items-start gap-4 border-b border-border pb-6">
        <div
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl border bg-surface-elevated",
            part.accent === "cyan"
              ? "border-cyan/40 text-cyan"
              : "border-primary/40 text-primary",
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Part {part.number}
            </span>
            <span className="font-mono text-xs text-muted-foreground/70">{part.range}</span>
          </div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{part.title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{part.summary}</p>
        </div>
      </div>

      {/* Chapter list */}
      <div className="mt-6 grid gap-3">
        {part.chapters.map((chapter, idx) => (
          <motion.div
            key={chapter.id}
            initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: "easeOut", delay: reduceMotion ? 0 : idx * 0.04 }}
          >
            <Card className="group transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card/90 hover:shadow-[0_18px_50px_-32px_color-mix(in_oklab,var(--primary)_35%,transparent)]">
              <CardContent className="p-0">
                <Link
                  to="/chapters/$id"
                  params={{ id: String(chapter.id) }}
                  className="flex items-center gap-4 p-5 sm:p-6"
                >
                  <span
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center rounded-xl border font-mono text-base font-semibold transition-colors",
                      part.accent === "cyan"
                        ? "border-cyan/30 bg-cyan/5 text-cyan group-hover:border-cyan/50"
                        : "border-primary/30 bg-primary/5 text-primary group-hover:border-primary/50",
                    )}
                  >
                    {chapter.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold tracking-tight text-foreground group-hover:text-primary sm:text-lg">
                      {chapter.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{chapter.description}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    {isBonus ? (
                      <Layers className="size-4 text-muted-foreground/60" aria-hidden="true" />
                    ) : (
                      <CheckCircle2 className="size-4 text-muted-foreground/30" aria-hidden="true" />
                    )}
                    <ArrowRight className="size-4 -translate-x-1 text-muted-foreground/50 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-primary group-hover:opacity-100" aria-hidden="true" />
                  </div>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
