import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { courseParts, partLabel, totalChapters, totalAppendices } from "./course-data";

export function ChapterDirectory() {
  const [search, setSearch] = useState("");
  const query = search.trim().toLowerCase();
  const parts = courseParts.map((part) => ({
    ...part,
    chapters: part.chapters.filter((chapter) =>
      `${chapter.number} ${chapter.title} ${chapter.description} ${part.title}`.toLowerCase().includes(query),
    ),
  })).filter((part) => part.chapters.length > 0);

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <header className="border-b border-border pb-8">
        <p className="font-mono text-xs uppercase text-cyan">Grok Mastery · Contents</p>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Chapters</h1>
        <p className="mt-4 text-muted-foreground">{totalChapters} chapters · 6 parts · Loop Engineering Supplement · {totalAppendices} appendices</p>
        <div className="relative mt-6 max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" aria-hidden="true" />
          <Input aria-label="Search chapters" placeholder="Search chapters…" value={search} onChange={(event) => setSearch(event.target.value)} className="h-10 pl-10" />
        </div>
      </header>
      <div className="mt-8 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
        <aside className="mb-8 lg:mb-0">
          <nav aria-label="Chapter groups" className="flex flex-wrap gap-2 lg:sticky lg:top-24 lg:flex-col lg:gap-1">
            {parts.map((part) => (
              <Button key={part.id} asChild variant="ghost" className="h-auto justify-start whitespace-normal px-3 py-2 text-left">
                <a href={`#${part.id}`}><span className="text-xs text-cyan">{partLabel(part)}</span><span className="min-w-0 text-sm">{part.title}</span></a>
              </Button>
            ))}
          </nav>
        </aside>
        <div className="min-w-0 space-y-12">
          {parts.map((part) => (
            <section key={part.id} id={part.id} className="scroll-mt-24">
              <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="font-mono text-xs uppercase text-cyan">{partLabel(part)}</p>
                <h2 className="text-xl font-semibold sm:text-2xl">{part.title}</h2>
                <span className="text-xs text-muted-foreground">{part.range}</span>
              </div>
              <ol className="divide-y divide-border border-y border-border">
                {part.chapters.map((chapter) => (
                  <li key={chapter.id}>
                    <Link to="/chapters/$id" params={{ id: String(chapter.id) }} className="group flex items-start gap-4 py-5 transition-colors hover:bg-accent/40 sm:px-3">
                      <span className="w-8 shrink-0 pt-0.5 font-mono text-sm text-cyan">{chapter.number}</span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium leading-6 group-hover:text-primary">{chapter.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">{chapter.description}</p>
                      </div>
                      <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          ))}
          {parts.length === 0 && <p className="py-12 text-muted-foreground">No chapters found.</p>}
        </div>
      </div>
    </main>
  );
}