"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { MetricCard } from "@/components/shared/metric-card";
import { staggerContainer, staggerItem, springs } from "@/lib/animations";

const credibility = [
  { value: "100", suffix: "%", label: "Job success score on Upwork" },
  { value: "10", suffix: "+", label: "Five star reviews" },
  { value: "4", label: "Industries served" },
  { value: "12", suffix: "+", label: "Months shipping production AI" },
];

const reviews = [
  {
    text: "Delivered exactly what we needed. The system has been running autonomously for months with zero issues. Communication was clear throughout the entire engagement.",
    role: "Operations Director",
    industry: "Energy",
    stars: 5,
  },
  {
    text: "Understood our legacy ERP constraints from day one and built something that integrates with our existing stack instead of fighting it. The agents run circles around our old manual process.",
    role: "Operations Partner",
    industry: "Wholesale Distribution",
    stars: 5,
  },
  {
    text: "We went from spending hours on manual research each week to having qualified leads show up in Pipedrive with full enrichment. The scoring accuracy surprised us from the first batch.",
    role: "Co-founder",
    industry: "Investment",
    stars: 5,
  },
];

export function AboutContent() {
  return (
    <section className="px-6 pb-24 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springs.gentle}
          className="mb-20"
        >
          <h1 className="text-4xl font-bold tracking-tight text-fg-primary md:text-5xl">
            About Agentive
          </h1>
        </motion.div>

        {/* Story */}
        <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr] lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springs.gentle}
            className="flex flex-col gap-6"
          >
            <p className="text-lg leading-relaxed text-fg-secondary">
              Agentive Solutions started from a straightforward observation: businesses
              have manual processes that consume hours of skilled labor each week, and most
              of those processes follow patterns that AI can handle with high accuracy when
              paired with proper human oversight.
            </p>

            <p className="text-base leading-relaxed text-fg-secondary">
              I spent the last year building production AI systems on Upwork, working
              across energy, wholesale distribution, finance, and agriculture. Each
              engagement followed the same arc. A client described a process that ate up
              staff time. We mapped the workflow, built an AI system that automated the
              repetitive parts, and handed over something that runs without us while their
              team stays in control of the decisions that matter.
            </p>

            <p className="text-base leading-relaxed text-fg-secondary">
              The systems I build share common principles. They integrate with existing
              tools rather than replacing them. They include human review workflows so your
              team stays in the loop. They log every action for accountability. And they
              deliver measurable outcomes within weeks, not quarters.
            </p>

            <p className="text-base leading-relaxed text-fg-secondary">
              Agentive Solutions exists to do this work at a higher capacity. The goal is
              building an agency that ships the same quality of production AI systems for
              more businesses across more industries, with the same focus on autonomous
              operation backed by human oversight.
            </p>

            <div className="mt-4 flex items-center gap-4">
              <a
                href="https://www.upwork.com/freelancers/~0156fdff93d0309ec9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm text-fg-secondary transition-all hover:border-border-hover hover:text-fg-primary"
              >
                View Upwork profile
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/harry-staples-918865347/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm text-fg-secondary transition-all hover:border-border-hover hover:text-fg-primary"
              >
                LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Credibility metrics */}
          <motion.div
            className="grid grid-cols-2 gap-8 self-start rounded-2xl border border-border bg-bg-elevated p-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {credibility.map((stat) => (
              <motion.div key={stat.label} variants={staggerItem}>
                <MetricCard
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springs.gentle}
          className="mt-32"
        >
          <h2 className="mb-12 text-3xl font-bold tracking-tight text-fg-primary">
            What clients say
          </h2>

          <motion.div
            className="grid gap-6 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="flex flex-col rounded-2xl border border-border bg-bg-elevated p-6"
              >
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: review.stars }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <p className="flex-1 text-sm leading-relaxed text-fg-secondary">
                  &ldquo;{review.text}&rdquo;
                </p>

                <div className="mt-6 border-t border-border pt-4">
                  <span className="text-sm font-medium text-fg-primary">
                    {review.role}
                  </span>
                  <span className="block text-xs text-fg-tertiary">
                    {review.industry}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springs.gentle}
          className="mt-20 flex flex-col items-start gap-4 rounded-2xl border border-border bg-bg-elevated p-8 md:flex-row md:items-center md:justify-between md:p-12"
        >
          <div>
            <h3 className="text-xl font-bold tracking-tight text-fg-primary">
              Want to work together?
            </h3>
            <p className="mt-2 text-sm text-fg-secondary">
              Tell us about the process you want to automate. The first call is free and takes 30 minutes.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-fg-primary px-6 py-3 text-sm font-medium text-bg-primary transition-all hover:bg-fg-secondary"
          >
            Book a call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
