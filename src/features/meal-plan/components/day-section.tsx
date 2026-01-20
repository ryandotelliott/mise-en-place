import { MealCard } from "@/features/meal-plan/components/meal-card";
import { getMealOrder } from "@/features/meal-plan/lib/meal-utils";

interface Meal {
  id: string;
  type: string;
  title: string;
  time: number;
}

interface Day {
  date: string;
  formattedDate: string;
  meals: Meal[];
}

interface DaySectionProps {
  day: Day;
}

export function DaySection({ day }: DaySectionProps) {
  const sortedMeals = [...day.meals].sort(
    (a, b) => getMealOrder(a.type) - getMealOrder(b.type),
  );

  return (
    <div className="grid md:grid-cols-[180px_1fr] gap-4 md:gap-8 group">
      {/* Date Header */}
      <div>
        <h2 className="text-lg font-semibold text-foreground">{day.date}</h2>
        <p className="text-sm text-muted-foreground">{day.formattedDate}</p>
      </div>

      {/* Meals Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedMeals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
        {sortedMeals.length === 0 && (
          <div className="col-span-full h-24 rounded-2xl border border-dashed border-border/50 flex items-center justify-center text-muted-foreground/50 text-sm">
            No meals planned
          </div>
        )}
      </div>
    </div>
  );
}
