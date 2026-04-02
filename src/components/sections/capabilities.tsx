"use client";

import { motion } from "framer-motion";
import { FileSearch, Workflow, Search, Code2 } from "lucide-react";
import { staggerContainer, staggerItem, springs } from "@/lib/animations";
import Link from "next/link";
import { cn } from "@/lib/utils";

const capabilities = [
  {
    icon: FileSearch,
    title: "AI document intelligence",
    description:
      "Systems that receive, classify, and organize documents using AI. Semantic search across thousands of files, expiration tracking, and chatbot retrieval interfaces.",
    href: "/services#document-intelligence",
    size: "large" as const,
  },
  {
    icon: Workflow,
    title: "Workflow automation",
    description:
      "Multi system orchestration connecting ERPs, CRMs, email, and databases. Autonomous agents that monitor, analyze, and act with human oversight.",
    href: "/services#workflow-automation",
    size: "small" as const,
  },
  {
    icon: Search,
    title: "AI lead intelligence",
    description:
      "Prospect discovery, enrichment, and scoring pipelines. Automated sourcing from LinkedIn, news, and public records with CRM integration.",
    href: "/services#lead-intelligence",
    size: "small" as const,
  },
  {
    icon: Code2,
    title: "Custom AI software",
    description:
      "Bespoke applications with AI at the core. From prototype to production, built on your existing stack with your data.",
    href: "/services#custom-software",
    size: "large" as const,
  },
];

export function Capabilities() {
  return (
    <section className="border-t border-border px-6 py-24 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springs.gentle}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight text-fg-primary md:text-4xl">
            What we build
          </h2>
          <p className="mt-2 max-w-[540px] text-base text-fg-secondary">
            Four areas where we deliver AI systems that produce measurable business outcomes
          </p>
        </motion.div>

        <motion.div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                variants={staggerItem}
                whileHover={{ y: -2, transition: springs.snappy }}
                className={cn(
                  "group relative flex flex-col rounded-2xl border border-border bg-bg-elevated p-6 transition-colors hover:border-border-hover md:p-8",
                  cap.size === "large" && "lg:col-span-2 lg:row-span-1"
                )}
              >
                <Link href={cap.href} className="absolute inset-0 z-10">
                  <span className="sr-only">{cap.title}</span>
                </Link>

                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-muted">
                  <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                </div>

                <h3 className="text-lg font-semibold tracking-tight text-fg-primary">
                  {cap.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
                  {cap.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
