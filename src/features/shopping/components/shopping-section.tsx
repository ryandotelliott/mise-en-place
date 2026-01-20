"use client";

import { useRef } from "react";
import { LayoutGroup } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingItem } from "@/features/shopping/components/shopping-item";

interface ShoppingItemData {
  id: string;
  name: string;
  quantity: string;
  recipe?: string;
}

interface ShoppingSectionProps {
  title: string;
  items: ShoppingItemData[];
  checked: Set<string>;
  onToggle: (id: string) => void;
  layoutGroupId: string;
}

export function ShoppingSection({
  title,
  items,
  checked,
  onToggle,
  layoutGroupId,
}: ShoppingSectionProps) {
  // Track order of unchecked items - items move to end when unchecked
  const uncheckedOrderRef = useRef<string[]>([]);

  // Build the sorted list
  const uncheckedOrder = uncheckedOrderRef.current;
  const uncheckedItems: ShoppingItemData[] = [];
  const checkedItems: ShoppingItemData[] = [];

  for (const item of items) {
    if (checked.has(item.id)) {
      checkedItems.push(item);
      // Remove from unchecked order when checked
      const idx = uncheckedOrder.indexOf(item.id);
      if (idx !== -1) {
        uncheckedOrder.splice(idx, 1);
      }
    } else {
      uncheckedItems.push(item);
      // Add to unchecked order if not already there
      if (!uncheckedOrder.includes(item.id)) {
        uncheckedOrder.push(item.id);
      }
    }
  }

  // Sort unchecked items by their order in uncheckedOrder
  uncheckedItems.sort((a, b) => {
    return uncheckedOrder.indexOf(a.id) - uncheckedOrder.indexOf(b.id);
  });

  const sortedItems = [...uncheckedItems, ...checkedItems];

  return (
    <Card className="p-2 gap-2">
      <CardHeader className="p-2 -mb-2 gap-0">
        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <LayoutGroup id={layoutGroupId}>
          <div className="flex flex-col gap-0.5">
            {sortedItems.map((item) => (
              <ShoppingItem
                key={item.id}
                item={item}
                isChecked={checked.has(item.id)}
                onToggle={onToggle}
              />
            ))}
          </div>
        </LayoutGroup>
      </CardContent>
    </Card>
  );
}
