"use client";

import { useState } from "react";
import { CheckboxItem } from "@/components/ui/checkbox-item";

interface IngredientsListProps {
  ingredients: string[];
}

export function IngredientsList({ ingredients }: IngredientsListProps) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggleIngredient = (index: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg text-foreground">Ingredients</h2>
        <span className="text-xs text-muted-foreground tabular-nums">
          {checked.size}/{ingredients.length}
        </span>
      </div>
      <div className="border border-border rounded-xl p-4 md:p-5">
        <ul className="flex flex-col gap-1">
          {ingredients.map((ingredient, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: ingredients should be static and unique
            <li key={`ingredient-${i}`} className="-mx-2">
              <CheckboxItem
                checked={checked.has(i)}
                onCheckedChange={() => toggleIngredient(i)}
              >
                {ingredient}
              </CheckboxItem>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
