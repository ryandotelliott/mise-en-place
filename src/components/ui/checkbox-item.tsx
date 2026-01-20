"use client";

import { useId } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface CheckboxItemProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  children: React.ReactNode;
  end?: React.ReactNode;
  className?: string;
  checkboxClassName?: string;
}

export function CheckboxItem({
  checked,
  onCheckedChange,
  children,
  end,
  className,
  checkboxClassName,
}: CheckboxItemProps) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={cn(
        "select-none flex items-center gap-3 py-2 px-2 rounded-lg cursor-pointer transition-colors hover:bg-muted/50",
        className,
      )}
    >
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={checkboxClassName}
      />
      <span
        className={cn(
          "flex-1 min-w-0 text-sm leading-relaxed transition-all duration-200",
          checked ? "text-muted-foreground" : "text-foreground",
        )}
      >
        {children}
      </span>
      {end && (
        <span
          className={cn(
            "text-sm transition-colors whitespace-nowrap",
            checked ? "text-muted-foreground/50" : "text-muted-foreground",
          )}
        >
          {end}
        </span>
      )}
    </label>
  );
}
