"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Package,
  Wrench,
  MessageSquare,
  Loader2,
} from "lucide-react";
import type { Blueprint } from "@/content/blueprints";
import { WorkflowDiagram } from "./workflow-diagram";
import { staggerContainer, staggerItem, springs } from "@/lib/animations";

async function handleCheckout(blueprintSlug: string, tier: "blueprint" | "setup") {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ blueprintSlug, tier }),
  });

  const data = await res.json();

  if (data.url) {
    window.location.href = data.url;
  } else {
    console.error("Checkout failed:", data.error);
    alert("Checkout error: " + (data.error || "Unknown error. Please try again."));
  }
}

export function BlueprintDetail({ blueprint }: { blueprint: Blueprint }) {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  return (
    <section className="px-6 pb-24 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1000px]">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/blueprints"
            className="mb-8 inline-flex items-center gap-2 text-sm text-fg-secondary transition-colors hover:text-fg-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            All blueprints
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springs.gentle}
        >
          <span className="inline-flex items-center rounded-full border border-border bg-bg-elevated px-3 py-1 text-xs text-fg-tertiary">
            {blueprint.categoryLabel}
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-fg-primary md:text-4xl">
            {blueprint.title}
          </h1>

          <p className="mt-3 max-w-[640px] text-lg text-fg-secondary">
            {blueprint.headline}
          </p>
        </motion.div>

        {/* Workflow diagram (large) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springs.gentle, delay: 0.1 }}
          className="mt-10 rounded-2xl border border-border bg-bg-elevated px-4 py-8 md:px-12 md:py-10"
        >
          <WorkflowDiagram nodes={blueprint.workflowNodes} size="large" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springs.gentle, delay: 0.15 }}
          className="mt-8 text-base leading-relaxed text-fg-secondary"
        >
          {blueprint.description}
        </motion.p>

        {/* What's included + Required services */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springs.gentle}
          className="mt-16 grid gap-8 md:grid-cols-2"
        >
          {/* What's included */}
          <div className="rounded-2xl border border-border bg-bg-elevated p-8">
            <h2 className="mb-6 text-xs font-medium uppercase tracking-wider text-fg-tertiary">
              What's included
            </h2>
            <motion.ul
              className="flex flex-col gap-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {blueprint.whatsIncluded.map((item) => (
                <motion.li
                  key={item}
                  variants={staggerItem}
                  className="flex items-start gap-3 text-sm text-fg-secondary"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" strokeWidth={2} />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Required services */}
          <div className="rounded-2xl border border-border bg-bg-elevated p-8">
            <h2 className="mb-6 text-xs font-medium uppercase tracking-wider text-fg-tertiary">
              Required services
            </h2>
            <div className="flex flex-col gap-4">
              {blueprint.requiredServices.map((service) => (
                <div key={service.name} className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-sm font-medium text-fg-primary">
                      {service.name}
                    </span>
                    <span className="ml-2 text-xs text-fg-tertiary">
                      {service.cost}
                    </span>
                  </div>
                  {service.url && (
                    <a
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-fg-tertiary transition-colors hover:text-accent"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pricing tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springs.gentle}
          className="mt-16"
        >
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-fg-primary">
            Choose your option
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Blueprint only */}
            <div className="flex flex-col rounded-2xl border border-border bg-bg-elevated p-8">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-muted">
                <Package className="h-5 w-5 text-accent" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-fg-primary">Blueprint</h3>
              <p className="mt-2 text-sm text-fg-secondary">
                Workflow files and documentation. You configure and deploy it on your own accounts.
              </p>
              <div className="mt-auto pt-6">
                <span className="font-display text-3xl font-bold text-fg-primary">
                  ${blueprint.pricing.blueprint}
                </span>
                <button
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-fg-primary px-4 py-3 text-sm font-medium text-bg-primary transition-all hover:bg-fg-secondary disabled:opacity-50"
                  disabled={loadingTier === "blueprint"}
                  onClick={async () => {
                    setLoadingTier("blueprint");
                    await handleCheckout(blueprint.slug, "blueprint");
                    setLoadingTier(null);
                  }}
                >
                  {loadingTier === "blueprint" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Purchase blueprint
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Blueprint + Setup */}
            <div className="flex flex-col rounded-2xl border border-accent/40 bg-bg-elevated p-8 ring-1 ring-accent/20">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-muted">
                <Wrench className="h-5 w-5 text-accent" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-fg-primary">Blueprint + Setup</h3>
              <p className="mt-2 text-sm text-fg-secondary">
                We connect everything to your accounts, test it with your data, and hand it over working.
              </p>
              <div className="mt-auto pt-6">
                <span className="font-display text-3xl font-bold text-fg-primary">
                  ${blueprint.pricing.setup}
                </span>
                <button
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-medium text-white transition-all hover:bg-accent-hover disabled:opacity-50"
                  disabled={loadingTier === "setup"}
                  onClick={async () => {
                    setLoadingTier("setup");
                    await handleCheckout(blueprint.slug, "setup");
                    setLoadingTier(null);
                  }}
                >
                  {loadingTier === "setup" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Purchase with setup
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Custom build */}
            <div className="flex flex-col rounded-2xl border border-border bg-bg-elevated p-8">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-muted">
                <MessageSquare className="h-5 w-5 text-accent" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-fg-primary">Custom build</h3>
              <p className="mt-2 text-sm text-fg-secondary">
                Need modifications, additional integrations, or a version tailored to your specific systems.
              </p>
              <div className="mt-auto pt-6">
                <span className="font-display text-lg font-bold text-fg-secondary">
                  Custom quote
                </span>
                <Link
                  href="/contact"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-medium text-fg-secondary transition-all hover:border-border-hover hover:text-fg-primary"
                >
                  Book a call
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springs.gentle}
          className="mt-16"
        >
          <h2 className="mb-8 text-xl font-bold tracking-tight text-fg-primary">
            Common questions
          </h2>

          <motion.div
            className="flex flex-col gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {blueprint.faqs.map((faq) => (
              <motion.div
                key={faq.question}
                variants={staggerItem}
                className="rounded-xl border border-border bg-bg-elevated p-6"
              >
                <h3 className="text-sm font-semibold text-fg-primary">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Back to all */}
        <div className="mt-12 text-center">
          <Link
            href="/blueprints"
            className="inline-flex items-center gap-2 text-sm text-fg-secondary transition-colors hover:text-fg-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all blueprints
          </Link>
        </div>
      </div>
    </section>
  );
}
