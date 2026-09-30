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
import { Fragment, useEffect, useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { totalSections, type Chapter } from "@/components/site/course-data";
import { slugifyHeading, type ChapterContent, type ContentBlock } from "@/content/chapters";
import { cn } from "@/lib/utils";

type Section = { id: string; label: string };

function renderInline(text: string): ReactNode[] {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) return <InlineCode key={index}>{part.slice(1, -1)}</InlineCode>;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index} className="text-foreground">{part.slice(2, -2)}</strong>;
    return <Fragment key={index}>{part}</Fragment>;
  });
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "p":
      return <p>{renderInline(block.text)}</p>;
    case "h3":
      return <h3 className="pt-3 text-xl font-semibold text-foreground">{renderInline(block.text)}</h3>;
    case "ul":
      return <ul className="space-y-3 pl-6 marker:text-cyan list-disc">{block.items.map((item, i) => <li key={i}>{renderInline(item)}</li>)}</ul>;
    case "ol":
      return <ol className="list-decimal space-y-3 pl-6 marker:font-mono marker:text-primary">{block.items.map((item, i) => <li key={i}>{renderInline(item)}</li>)}</ol>;
    case "quote":
      return <blockquote className="border-l-2 border-primary bg-primary/5 px-6 py-5 text-lg font-medium leading-8 text-foreground">{renderInline(block.text)}</blockquote>;
    case "code":
      return <CodeBlock code={block.code} language={block.language} />;
  }
}

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

function Contents({ sections, active, onNavigate }: { sections: Section[]; active: string; onNavigate?: () => void }) {
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
  content,
  previous,
  next,
}: {
  chapter: Chapter;
  content: ChapterContent;
  previous?: Chapter | undefined;
  next?: Chapter | undefined;
}) {
  const reduceMotion = useReducedMotion();
  const sections = useMemo<Section[]>(
    () => content.sections.map((s) => ({ id: slugifyHeading(s.heading), label: s.heading })),
    [content],
  );
  const active = useScrollSpy(sections);
  const [mobileContentsOpen, setMobileContentsOpen] = useState(false);
  const readMinutes = useMemo(() => {
    const words = JSON.stringify(content.sections).split(/\s+/).length;
    return Math.max(3, Math.round(words / 200));
  }, [content]);

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
          <h1 className="text-balance mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{content.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">{content.subtitle}</p>
          <div className="mt-7 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Clock3 className="size-3.5 text-primary" aria-hidden="true" /> {readMinutes} min read
            <span aria-hidden="true">·</span> {content.part}
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
                  <Contents sections={sections} active={active} onNavigate={() => setMobileContentsOpen(false)} />
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
              <Contents sections={sections} active={active} />
            </div>
          </aside>

          <article className="min-w-0 max-w-[45rem]">
            {content.sections.map((sec, index) => (
              <ReadingSection key={index} id={sections[index]!.id} title={sec.heading}>
                {sec.content.map((block, i) => <Block key={i} block={block} />)}
              </ReadingSection>
            ))}

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
              <p className="mt-1 text-xs leading-5 text-muted-foreground">of {totalSections} chapters</p>
              {next && <p className="mt-6 text-xs leading-5 text-muted-foreground">Up next<br /><span className="text-foreground">{next.title}</span></p>}
            </div>
          </aside>
        </div>
      </motion.div>
    </main>
  );
}