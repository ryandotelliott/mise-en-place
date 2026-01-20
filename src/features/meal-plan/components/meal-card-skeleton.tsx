import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MealCardSkeleton() {
  return (
    <Card className="gap-2 p-1 rounded-lg border border-border">
      <CardHeader className="p-4 pb-0 space-y-0">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-4 w-12 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Skeleton className="h-5.5 w-3/4" />
      </CardContent>
    </Card>
  );
}
