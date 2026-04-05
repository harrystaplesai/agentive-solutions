"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { springs } from "@/lib/animations";

export function CTASection() {
  return (
    <section className="px-6 py-32 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-bg-elevated px-8 py-16 md:px-16 md:py-24">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/4 -z-0 h-[300px] w-[400px] -translate-y-1/2 bg-accent/5 blur-[100px]" />

          <div className="relative z-10 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[560px]">
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={springs.gentle}
                className="text-3xl font-bold tracking-tight text-fg-primary md:text-4xl"
              >
                Tell us what process you
                <br className="hidden md:block" />
                want to automate
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...springs.gentle, delay: 0.1 }}
                className="mt-4 text-base leading-relaxed text-fg-secondary"
              >
                Book a 30 minute call and we will map your workflow, identify where AI
                delivers the most impact, and outline what a production system looks like.
                No pitch decks, no discovery fees.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springs.gentle, delay: 0.2 }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-fg-primary px-6 py-3 text-sm font-medium text-bg-primary transition-all hover:bg-fg-secondary"
              >
                <Calendar className="h-4 w-4" />
                Book a call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="mailto:hello@agentivesolutions.co.uk"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-fg-secondary transition-all hover:border-border-hover hover:text-fg-primary"
              >
                Email us instead
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
