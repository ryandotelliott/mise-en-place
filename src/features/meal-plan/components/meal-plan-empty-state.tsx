import { ChefHat, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MealPlanEmptyStateProps {
  isGenerating: boolean;
  onGenerate: () => void;
}

export function MealPlanEmptyState({
  isGenerating,
  onGenerate,
}: MealPlanEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 px-4">
      <div className="p-6 rounded-full">
        <ChefHat className="size-10" />
      </div>
      <div className="space-y-3 max-w-xs">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Your Kitchen, Organized
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Let's plan your week. Generate a personalized meal plan tailored to
          your taste.
        </p>
      </div>
      <Button
        size="lg"
        className="rounded-full px-8 shadow-sm hover:shadow transition-all"
        onClick={onGenerate}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <RefreshCw className="size-4 animate-spin mr-2" />
        ) : (
          <Sparkles className="size-4 mr-2" />
        )}
        {isGenerating ? "Planning..." : "Create Meal Plan"}
      </Button>
    </div>
  );
}
