import { Link } from "@tanstack/react-router";
import { Orbit } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Orbit className="size-4 text-primary" aria-hidden="true" />
          <span>© 2026 Grok Mastery. Built for serious engineers.</span>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground" aria-label="Footer navigation">
          <Link to="/course" className="hover:text-foreground">Course</Link>
          <Link to="/chapters" className="hover:text-foreground">Chapters</Link>
          <Link to="/resources" className="hover:text-foreground">Resources</Link>
        </nav>
      </div>
    </footer>
  );
}