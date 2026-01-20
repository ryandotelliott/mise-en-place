"use client";

import { useQuery } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DaySection } from "@/features/meal-plan/components/day-section";
import { MealPlanEmptyState } from "@/features/meal-plan/components/meal-plan-empty-state";
import { MealPlanLoadingState } from "@/features/meal-plan/components/meal-plan-loading-state";
import { cn } from "@/lib/utils";

type Meal = {
  id: string;
  type: string;
  title: string;
  time: number;
};

type Day = {
  date: string;
  formattedDate: string;
  meals: Meal[];
};

type MealPlan = {
  days: Day[];
};

async function fetchMealPlan(): Promise<MealPlan> {
  const response = await fetch("/api/meal-plan");
  if (!response.ok) {
    throw new Error("Failed to fetch meal plan");
  }
  return response.json();
}

export default function Home() {
  const {
    data: mealPlan,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["meal-plan"],
    queryFn: fetchMealPlan,
  });

  const isGenerating = isLoading || isRefetching;
  const hasPlan = !!mealPlan?.days?.length;

  if (!hasPlan && !isLoading) {
    return (
      <MealPlanEmptyState
        isGenerating={isGenerating}
        onGenerate={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-baseline justify-between pt-2 border-b pb-4 border-border/40">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          This Week
        </h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => refetch()}
          disabled={isGenerating}
        >
          <RefreshCw
            className={cn("size-4 mr-1", isGenerating && "animate-spin")}
          />
          {isGenerating ? "Refreshing" : "Refresh"}
        </Button>
      </div>

      <div className="flex flex-col gap-10">
        {isLoading ? (
          <MealPlanLoadingState days={["Today", "Tomorrow", "Wednesday"]} />
        ) : (
          mealPlan?.days.map((day) => <DaySection key={day.date} day={day} />)
        )}
      </div>
    </div>
  );
}
