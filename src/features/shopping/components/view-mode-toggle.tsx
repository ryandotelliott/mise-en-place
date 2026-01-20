"use client";

import { LayoutGrid, List } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ViewModeToggleProps {
  viewMode: "category" | "recipe";
  onViewModeChange: (mode: "category" | "recipe") => void;
}

export function ViewModeToggle({
  viewMode,
  onViewModeChange,
}: ViewModeToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={viewMode}
      onValueChange={(value) => {
        if (value) {
          onViewModeChange(value as "category" | "recipe");
        }
      }}
      variant="outline"
      size="sm"
      aria-label="View mode"
      className="self-start sm:self-auto rounded-lg p-1"
    >
      <ToggleGroupItem value="category">
        <LayoutGrid className="size-4 mr-1" />
        Category
      </ToggleGroupItem>
      <ToggleGroupItem value="recipe">
        <List className="size-4 mr-1" />
        By Recipe
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
