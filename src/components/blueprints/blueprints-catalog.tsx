"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blueprints, type BlueprintCategory } from "@/content/blueprints";
import { BlueprintCard } from "./blueprint-card";
import { CategoryFilter } from "./category-filter";
import { staggerContainer, springs } from "@/lib/animations";

export function BlueprintsCatalog() {
  const [activeCategory, setActiveCategory] = useState<BlueprintCategory | "all">("all");

  const filtered =
    activeCategory === "all"
      ? blueprints
      : blueprints.filter((b) => b.category === activeCategory);

  return (
    <section className="px-6 pb-24 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springs.gentle}
          className="mb-6 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-fg-primary md:text-5xl">
            Automation blueprints
          </h1>
          <p className="mx-auto mt-4 max-w-[560px] text-lg text-fg-secondary">
            Production workflows you deploy in hours. Purchase the blueprint and set it up
            yourself, or let us configure everything on your accounts.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springs.gentle, delay: 0.1 }}
          className="mb-12 flex justify-center"
        >
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          key={activeCategory}
        >
          {filtered.map((blueprint) => (
            <BlueprintCard key={blueprint.slug} blueprint={blueprint} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springs.gentle}
          className="mt-20 rounded-2xl border border-border bg-bg-elevated p-8 text-center md:p-12"
        >
          <h3 className="text-2xl font-bold tracking-tight text-fg-primary">
            Need something custom?
          </h3>
          <p className="mx-auto mt-3 max-w-[480px] text-base text-fg-secondary">
            If your workflow requires specific integrations, custom logic, or a system
            built from scratch, book a call and we will scope it together.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-fg-primary px-6 py-3 text-sm font-medium text-bg-primary transition-all hover:bg-fg-secondary"
          >
            Book a discovery call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
