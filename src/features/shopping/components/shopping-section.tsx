"use client";

import { LayoutGroup } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  collapsible?: boolean;
}

export function ShoppingSection({
  title,
  items,
  checked,
  onToggle,
  layoutGroupId,
  collapsible = false,
}: ShoppingSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
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
  const uncheckedCount = uncheckedItems.length;

  const itemsList = (
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
  );

  if (collapsible) {
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="py-2 max-w-2xl mx-auto w-full"
      >
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm py-2 -mx-1 px-1">
          <CollapsibleTrigger className="flex items-center gap-2 w-full group">
            <ChevronDown
              className="h-4 w-4 text-muted-foreground transition-transform duration-200 data-[state=closed]:-rotate-90"
              data-state={isOpen ? "open" : "closed"}
            />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
              {title}
            </h3>
            <span className="text-xs text-muted-foreground/60">
              {uncheckedCount > 0 && `(${uncheckedCount})`}
            </span>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>{itemsList}</CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <div className="py-2 max-w-2xl mx-auto w-full">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm py-2 -mx-1 px-1">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
      </div>
      {itemsList}
    </div>
  );
}
