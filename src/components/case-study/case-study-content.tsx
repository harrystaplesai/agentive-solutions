"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/content/case-studies";
import { MetricCard } from "@/components/shared/metric-card";
import { staggerContainer, staggerItem, springs } from "@/lib/animations";

function TechStackPill({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-bg-primary px-3 py-1.5 font-mono text-xs text-fg-secondary">
      {name}
    </span>
  );
}

export function CaseStudyContent({
  study,
  nextStudy,
}: {
  study: CaseStudy;
  nextStudy?: CaseStudy;
}) {
  return (
    <article className="px-6 pb-24 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[800px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springs.gentle}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated px-3 py-1 text-xs text-fg-tertiary">
            {study.industry}
          </span>

          <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-fg-primary md:text-4xl lg:text-5xl">
            {study.title}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-fg-secondary">
            {study.subtitle}
          </p>

          {/* Hero metric */}
          <div className="mt-10 rounded-2xl border border-border bg-bg-elevated p-8">
            <MetricCard
              value={study.heroMetric.value}
              suffix={study.heroMetric.suffix}
              prefix={study.heroMetric.prefix}
              label={study.heroMetric.label}
            />
          </div>
        </motion.div>

        {/* The problem */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springs.gentle}
          className="mt-20"
        >
          <h2 className="text-xs font-medium uppercase tracking-wider text-fg-tertiary">
            The problem
          </h2>
          <div className="mt-6 flex flex-col gap-4">
            {study.problem.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-fg-secondary">
                {p}
              </p>
            ))}
          </div>
        </motion.section>

        {/* The approach */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springs.gentle}
          className="mt-20"
        >
          <h2 className="text-xs font-medium uppercase tracking-wider text-fg-tertiary">
            The approach
          </h2>
          <div className="mt-6 flex flex-col gap-4">
            {study.approach.map((a, i) => (
              <p key={i} className="text-base leading-relaxed text-fg-secondary">
                {a}
              </p>
            ))}
          </div>
        </motion.section>

        {/* Tech stack */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springs.gentle}
          className="mt-16"
        >
          <h2 className="text-xs font-medium uppercase tracking-wider text-fg-tertiary">
            Tech stack
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {study.techStack.map((tech) => (
              <TechStackPill key={tech} name={tech} />
            ))}
          </div>
        </motion.section>

        {/* Outcomes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springs.gentle}
          className="mt-20"
        >
          <h2 className="text-xs font-medium uppercase tracking-wider text-fg-tertiary">
            The outcomes
          </h2>
          <motion.div
            className="mt-6 grid gap-6 md:grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {study.outcomes.map((outcome) => (
              <motion.div
                key={outcome.metric}
                variants={staggerItem}
                className="rounded-xl border border-border bg-bg-elevated p-6"
              >
                <span className="font-display text-lg font-bold text-fg-primary">
                  {outcome.metric}
                </span>
                <p className="mt-1 text-sm text-fg-secondary">
                  {outcome.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Before / After */}
        {study.beforeAfter && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springs.gentle}
            className="mt-16"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-bg-elevated p-6">
                <span className="text-xs font-medium uppercase tracking-wider text-fg-tertiary">
                  Before
                </span>
                <p className="mt-3 text-sm leading-relaxed text-fg-secondary">
                  {study.beforeAfter.before}
                </p>
              </div>
              <div className="rounded-xl border border-accent/30 bg-accent-muted p-6">
                <span className="text-xs font-medium uppercase tracking-wider text-accent">
                  After
                </span>
                <p className="mt-3 text-sm leading-relaxed text-fg-primary">
                  {study.beforeAfter.after}
                </p>
              </div>
            </div>
          </motion.section>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springs.gentle}
          className="mt-20 rounded-2xl border border-border bg-bg-elevated p-8 md:p-10"
        >
          <h3 className="text-xl font-semibold tracking-tight text-fg-primary">
            Want a system like this?
          </h3>
          <p className="mt-2 text-sm text-fg-secondary">
            Book a call and we will map your workflow and identify where AI creates the most impact.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-fg-primary px-5 py-2.5 text-sm font-medium text-bg-primary transition-all hover:bg-fg-secondary"
          >
            Book a call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Next case study */}
        {nextStudy && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springs.gentle}
            className="mt-16 border-t border-border pt-12"
          >
            <span className="text-xs font-medium uppercase tracking-wider text-fg-tertiary">
              Next project
            </span>
            <Link
              href={`/work/${nextStudy.slug}`}
              className="group mt-4 flex items-center justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-fg-primary transition-colors group-hover:text-accent">
                  {nextStudy.title}
                </h3>
                <p className="mt-1 text-sm text-fg-secondary">{nextStudy.industry}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-fg-tertiary transition-all group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          </motion.div>
        )}
      </div>
    </article>
  );
}
