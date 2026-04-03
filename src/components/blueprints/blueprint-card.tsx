"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Blueprint } from "@/content/blueprints";
import { WorkflowDiagram } from "./workflow-diagram";
import { springs, staggerItem } from "@/lib/animations";

export function BlueprintCard({ blueprint }: { blueprint: Blueprint }) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -3, transition: springs.snappy }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-elevated transition-colors hover:border-border-hover"
    >
      <Link href={`/blueprints/${blueprint.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">View details: {blueprint.title}</span>
      </Link>

      {/* Workflow diagram area */}
      <div className="relative flex items-center justify-center px-8 pt-8 pb-4">
        {blueprint.isNew && (
          <span className="absolute top-4 right-4 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold text-white">
            New
          </span>
        )}
        <div className="w-full max-w-[280px]">
          <WorkflowDiagram nodes={blueprint.workflowNodes} size="small" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold tracking-tight text-fg-primary">
            {blueprint.title}
          </h3>
          <span className="shrink-0 font-display text-lg font-bold text-fg-primary">
            ${blueprint.pricing.blueprint}
          </span>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
          {blueprint.headline}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="rounded-md border border-border bg-bg-primary px-2 py-0.5 text-xs text-fg-tertiary">
            {blueprint.categoryLabel}
          </span>
          <span className="flex items-center gap-1 text-xs text-fg-tertiary transition-colors group-hover:text-accent">
            View details
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
