"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { staggerContainer, staggerItem, springs } from "@/lib/animations";

const steps = [
  {
    number: "01",
    title: "We audit your current workflow",
    description:
      "You walk us through the process that needs automation. We map every step, identify where AI creates the most value, and scope a system that fits your existing tools.",
  },
  {
    number: "02",
    title: "We prototype the system in week one",
    description:
      "Within the first week, you see a working prototype using your real data. This validates the approach before we build the full production system.",
  },
  {
    number: "03",
    title: "We integrate with your existing tools",
    description:
      "The system connects to your ERP, CRM, email, databases, and cloud storage. No rip and replace. We work with what you already have.",
  },
  {
    number: "04",
    title: "We hand over a system that runs without us",
    description:
      "You get a production system that operates autonomously with human oversight. We document everything and train your team so the system keeps running.",
  },
];

export function ProcessTeaser() {
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
              How engagements work
            </h2>
            <p className="mt-2 text-base text-fg-secondary">
              From discovery to autonomous operation in weeks
            </p>
          </div>
          <Link
            href="/process"
            className="hidden items-center gap-2 text-sm text-fg-secondary transition-colors hover:text-fg-primary md:flex"
          >
            Full process details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          className="grid gap-0 md:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={staggerItem}
              className="relative border-l border-border py-6 pl-8 md:border-l-0 md:border-t md:py-0 md:pl-0 md:pt-8 md:pr-6"
            >
              {/* Step connector dot */}
              <div className="absolute left-0 top-6 -translate-x-1/2 md:left-0 md:top-0 md:-translate-y-1/2 md:translate-x-0">
                <div className="flex h-3 w-3 items-center justify-center rounded-full border border-border bg-bg-primary">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                </div>
              </div>

              <span className="font-mono text-xs text-fg-tertiary">
                {step.number}
              </span>
              <h3 className="mt-2 text-base font-semibold tracking-tight text-fg-primary">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <Link
          href="/process"
          className="mt-8 flex items-center gap-2 text-sm text-fg-secondary transition-colors hover:text-fg-primary md:hidden"
        >
          Full process details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
