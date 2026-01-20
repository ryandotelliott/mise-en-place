"use client";

import { motion } from "framer-motion";
import { CheckboxItem } from "@/components/ui/checkbox-item";

interface ShoppingItemData {
  id: string;
  name: string;
  quantity: string;
  recipe?: string;
}

interface ShoppingItemProps {
  item: ShoppingItemData;
  isChecked: boolean;
  onToggle: (id: string) => void;
}

export function ShoppingItem({ item, isChecked, onToggle }: ShoppingItemProps) {
  return (
    <motion.div
      layout
      layoutId={item.id}
      initial={false}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 40,
      }}
    >
      <CheckboxItem
        checked={isChecked}
        onCheckedChange={() => onToggle(item.id)}
        end={item.quantity}
        checkboxClassName="size-5 rounded-md"
      >
        {item.name}
      </CheckboxItem>
    </motion.div>
  );
}
