import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, Orbit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { label: "Home", to: "/" as const },
  { label: "Course", to: "/course" as const },
  { label: "Chapters", to: "/chapters" as const },
  { label: "Resources", to: "/resources" as const },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="group flex items-center gap-2.5" aria-label="Grok Mastery home">
          <span className="flex size-8 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
            <Orbit className="size-[1.125rem]" aria-hidden="true" />
          </span>
          <span className="font-semibold text-foreground">Grok Mastery</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/70 hover:text-foreground data-[status=active]:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <Link to="/course">Start learning <ArrowRight /></Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="border-border bg-background/95 backdrop-blur-2xl">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2.5">
                <Orbit className="text-primary" /> Grok Mastery
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-10 flex flex-col gap-2" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <SheetClose asChild key={item.to}>
                  <Link
                    to={item.to}
                    activeOptions={{ exact: item.to === "/" }}
                    className="rounded-xl px-4 py-3 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground data-[status=active]:bg-accent data-[status=active]:text-foreground"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}