"use client";

import { Home, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Meal Plan", icon: Home },
  { href: "/shopping", label: "Shopping List", icon: ShoppingCart },
];

export function Nav() {
  const pathname = usePathname();
  const isRecipeDetail = pathname.startsWith("/recipes/");

  // Hide nav on recipe detail pages for cleaner mobile experience
  if (isRecipeDetail) return null;

  return (
    <>
      {/* Mobile header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3 md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-semibold tracking-tight">Mise en Place</span>
        </Link>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 px-8 py-4 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="font-semibold text-lg tracking-tight">
            Mise en Place
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  !isActive && "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Bottom navigation for mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur border-t border-border/50 safe-area-pb md:hidden">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors",
                  !isActive && "text-muted-foreground hover:text-foreground",
                )}
              >
                <item.icon className="size-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
