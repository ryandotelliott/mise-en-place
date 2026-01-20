import { Skeleton } from "@/components/ui/skeleton";
import { MealCardSkeleton } from "./meal-card-skeleton";

interface MealPlanLoadingStateProps {
  days?: string[];
}

export function MealPlanLoadingState({
  days = ["Today", "Tomorrow", "Wednesday"],
}: MealPlanLoadingStateProps) {
  return (
    <div className="flex flex-col gap-10">
      {days.map((day) => (
        <div key={day} className="grid md:grid-cols-[180px_1fr] gap-4 md:gap-8">
          <div>
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-4 w-20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <MealCardSkeleton />
            <MealCardSkeleton />
          </div>
        </div>
      ))}
    </div>
  );
}
