import { Skeleton } from "@/components/ui/skeleton";

export function ShoppingSectionSkeleton() {
  return (
    <div className="py-2 max-w-2xl mx-auto w-full">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm py-2 -mx-1 px-1">
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="flex flex-col gap-0.5">
        {Array.from({ length: 4 }, (_, i) => {
          const uniqueId = `shopping-section-skeleton-item-${i}`;
          return (
            <div
              key={uniqueId}
              className="flex items-center gap-3 py-2 px-2 rounded-lg"
            >
              <Skeleton className="size-5 rounded-md" />
              <Skeleton className="flex-1 h-5" />
              <Skeleton className="h-5 w-16" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
