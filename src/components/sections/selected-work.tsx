"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/content/case-studies";
import { staggerContainer, staggerItem, springs } from "@/lib/animations";
import { cn } from "@/lib/utils";

function CaseStudyCard({
  study,
  index,
}: {
  study: (typeof caseStudies)[0];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4, transition: springs.snappy }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-bg-elevated p-8 transition-colors hover:border-border-hover md:p-10",
        isEven ? "md:translate-y-0" : "md:translate-y-8"
      )}
    >
      <Link href={`/work/${study.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">Read case study: {study.title}</span>
      </Link>

      {/* Industry tag */}
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-primary px-3 py-1 text-xs text-fg-tertiary">
        {study.industry}
      </span>

      {/* Title */}
      <h3 className="mt-6 text-xl font-semibold leading-snug tracking-tight text-fg-primary md:text-2xl">
        {study.title}
      </h3>

      {/* Subtitle */}
      <p className="mt-3 max-w-[460px] text-sm leading-relaxed text-fg-secondary">
        {study.subtitle}
      </p>

      {/* Hero metric */}
      <div className="mt-8 flex items-end gap-2 border-t border-border pt-6">
        <span className="font-display text-3xl font-bold tracking-tight text-fg-primary md:text-4xl">
          {study.heroMetric.prefix}
          {study.heroMetric.value}
          {study.heroMetric.suffix}
        </span>
        <span className="mb-1 text-sm text-fg-secondary">
          {study.heroMetric.label}
        </span>
      </div>

      {/* Arrow */}
      <div className="mt-6 flex items-center gap-2 text-sm text-fg-tertiary transition-colors group-hover:text-accent">
        Read case study
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </motion.div>
  );
}

export function SelectedWork() {
  const featured = caseStudies.slice(0, 2);

  return (
    <section className="px-6 py-24 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springs.gentle}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-fg-primary md:text-4xl">
              Selected work
            </h2>
            <p className="mt-2 text-base text-fg-secondary">
              AI systems we built and shipped for production use
            </p>
          </div>
          <Link
            href="/work"
            className="hidden items-center gap-2 text-sm text-fg-secondary transition-colors hover:text-fg-primary md:flex"
          >
            View all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 md:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {featured.map((study, i) => (
            <CaseStudyCard key={study.slug} study={study} index={i} />
          ))}
        </motion.div>

        <Link
          href="/work"
          className="mt-8 flex items-center justify-center gap-2 text-sm text-fg-secondary transition-colors hover:text-fg-primary md:hidden"
        >
          View all projects
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
