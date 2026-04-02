"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/content/case-studies";
import { staggerContainer, staggerItem, springs } from "@/lib/animations";

export function WorkIndex() {
  return (
    <section className="px-6 pb-24 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springs.gentle}
          className="mb-16"
        >
          <h1 className="text-4xl font-bold tracking-tight text-fg-primary md:text-5xl">
            Our work
          </h1>
          <p className="mt-4 max-w-[560px] text-lg text-fg-secondary">
            Production AI systems delivering measurable results across four industries.
            Each project started with a business problem and ended with an autonomous
            system that runs with human oversight.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.slug}
              variants={staggerItem}
              whileHover={{ x: 4, transition: springs.snappy }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-bg-elevated transition-colors hover:border-border-hover"
            >
              <Link
                href={`/work/${study.slug}`}
                className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10"
              >
                <div className="flex flex-col gap-3">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-bg-primary px-3 py-1 text-xs text-fg-tertiary">
                    {study.industry}
                  </span>
                  <h2 className="text-xl font-semibold tracking-tight text-fg-primary md:text-2xl">
                    {study.title}
                  </h2>
                  <p className="max-w-[560px] text-sm text-fg-secondary">
                    {study.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <span className="font-display text-3xl font-bold tracking-tight text-fg-primary">
                      {study.heroMetric.prefix}
                      {study.heroMetric.value}
                      {study.heroMetric.suffix}
                    </span>
                    <p className="mt-1 text-xs text-fg-secondary">
                      {study.heroMetric.label}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-fg-tertiary transition-all group-hover:translate-x-1 group-hover:text-accent" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
