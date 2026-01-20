import { Clock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getMealIcon } from "@/features/meal-plan/lib/meal-utils";

interface Meal {
  id: string;
  type: string;
  title: string;
  time: number;
}

interface MealCardProps {
  meal: Meal;
}

export function MealCard({ meal }: MealCardProps) {
  const Icon = getMealIcon(meal.type);

  return (
    <Link
      href={`/recipes/${meal.id}`}
      className="block h-full"
      draggable={false}
    >
      <Card className="gap-2 p-1 cursor-pointer transition-colors duration-200 group rounded-lg hover:bg-muted/50 border border-border">
        <CardHeader className="p-4 pb-0 space-y-0">
          <div className="flex items-center justify-between">
            <Badge variant="secondary">
              <Icon className="size-3.5" />
              {meal.type}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="size-3" />
              {meal.time}m
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <h3 className="font-medium transition-colors leading-5 line-clamp-1 text-ellipsis">
            {meal.title}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
}
