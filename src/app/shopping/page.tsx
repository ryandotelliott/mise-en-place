"use client";

import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { ShoppingSection } from "@/features/shopping/components/shopping-section";
import { ShoppingSectionSkeleton } from "@/features/shopping/components/shopping-section-skeleton";
import { ViewModeToggle } from "@/features/shopping/components/view-mode-toggle";

type ShoppingItem = {
  id: string;
  name: string;
  quantity: string;
  recipe: string;
};

type ShoppingData = {
  byCategory: Array<{ category: string; items: ShoppingItem[] }>;
  byRecipe: Array<{ name: string; items: ShoppingItem[] }>;
};

async function fetchShoppingList(): Promise<ShoppingData> {
  const response = await fetch("/api/shopping");
  if (!response.ok) {
    throw new Error("Failed to fetch shopping list");
  }
  return response.json();
}

export default function ShoppingPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"category" | "recipe">("category");

  const { data, isLoading } = useQuery({
    queryKey: ["shopping"],
    queryFn: fetchShoppingList,
  });

  const toggleItem = (id: string) => {
    const newChecked = new Set(checked);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setChecked(newChecked);
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pt-2 border-b pb-4 border-border/40 gap-4">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Shopping List
          </h1>
          <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>
        <div className="flex flex-col">
          {Array.from({ length: 3 }, (_, i) => {
            const uniqueId = `shopping-page-skeleton-section-${i}`;
            return <ShoppingSectionSkeleton key={uniqueId} />;
          })}
        </div>
      </div>
    );
  }

  const byCategory = data?.byCategory ?? [];
  const byRecipe = data?.byRecipe ?? [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pt-2 border-b pb-4 border-border/40 gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Shopping List
        </h1>

        <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={
            viewMode === "category"
              ? "flex flex-col"
              : "grid grid-cols-1 md:grid-cols-2 gap-6"
          }
        >
          {viewMode === "category"
            ? byCategory.map((section) => (
                <ShoppingSection
                  key={section.category}
                  title={section.category}
                  items={section.items}
                  checked={checked}
                  onToggle={toggleItem}
                  layoutGroupId={`category-${section.category}`}
                />
              ))
            : byRecipe.map((recipe) => (
                <ShoppingSection
                  key={recipe.name}
                  title={recipe.name}
                  items={recipe.items}
                  checked={checked}
                  onToggle={toggleItem}
                  layoutGroupId={`recipe-${recipe.name}`}
                />
              ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
