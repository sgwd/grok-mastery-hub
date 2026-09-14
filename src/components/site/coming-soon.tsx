import { Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ComingSoon({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-5 py-24">
      <div className="max-w-2xl text-center">
        <div className="mx-auto mb-6 flex size-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
          <BookOpen aria-hidden="true" />
        </div>
        <p className="mb-3 font-mono text-xs uppercase text-cyan">{eyebrow}</p>
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-muted-foreground">{description}</p>
        <Button asChild variant="outline" className="mt-8">
          <Link to="/"><ArrowLeft /> Back to home</Link>
        </Button>
      </div>
    </main>
  );
}