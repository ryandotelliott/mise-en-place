import { ChevronLeft, Clock, Users, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RecipeHeaderProps {
  title: string;
  difficulty: string;
  time: number;
  servings: number;
}

const difficultyColors: Record<string, string> = {
  Easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Medium:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Hard: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
};

export function RecipeHeader({
  title,
  difficulty,
  time,
  servings,
}: RecipeHeaderProps) {
  const badgeColor = difficultyColors[difficulty] ?? "";

  return (
    <>
      {/* Mobile Sticky header */}
      <header className="md:hidden sticky top-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border/40 px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" asChild className="-ml-2">
          <Link href="/">
            <ChevronLeft className="size-5 text-muted-foreground" />
          </Link>
        </Button>
        <h1 className="font-semibold truncate text-base text-foreground">
          {title}
        </h1>
      </header>

      {/* Desktop Header */}
      <div className="hidden md:block max-w-4xl mx-auto px-8 pt-8 pb-6">
        <nav className="flex items-center gap-3 text-sm mb-6">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="gap-1.5 text-muted-foreground hover:text-foreground -ml-2"
          >
            <Link href="/">
              <ChevronLeft className="size-4" />
              Back
            </Link>
          </Button>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-6">
          {title}
        </h1>

        <div className="flex items-center gap-5 text-sm">
          <Badge
            variant="outline"
            className={`rounded-full px-3 py-1 text-xs font-medium ${badgeColor}`}
          >
            {difficulty}
          </Badge>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="size-4" />
            <span>{time} min</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <UtensilsCrossed className="size-4" />
            <span>
              {servings} {servings > 1 ? "servings" : "serving"}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Meta Info */}
      <div className="md:hidden px-5 pt-5 flex flex-wrap items-center gap-3 text-sm mb-6">
        <Badge
          variant="outline"
          className={`rounded-full px-3 py-0.5 text-xs font-medium ${badgeColor}`}
        >
          {difficulty}
        </Badge>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="size-3.5" />
          <span>{time} min</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Users className="size-3.5" />
          <span>{servings} ppl</span>
        </div>
      </div>
    </>
  );
}
