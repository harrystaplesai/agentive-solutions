"use client";

import { cn } from "@/lib/utils";
import { categories, type BlueprintCategory } from "@/content/blueprints";

interface CategoryFilterProps {
  active: BlueprintCategory | "all";
  onChange: (category: BlueprintCategory | "all") => void;
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-all",
            active === cat.value
              ? "bg-accent text-white"
              : "border border-border bg-bg-elevated text-fg-secondary hover:border-border-hover hover:text-fg-primary"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
