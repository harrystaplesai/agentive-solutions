"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Mail, Calendar, Clock, CheckCircle } from "lucide-react";
import { springs, staggerContainer, staggerItem } from "@/lib/animations";

const expectations = [
  {
    icon: Calendar,
    title: "30 minute discovery call",
    description: "We will walk through your current workflow and identify automation opportunities.",
  },
  {
    icon: Clock,
    title: "Scope document within 48 hours",
    description: "After the call, you receive a written technical scope with architecture, timeline, and fixed pricing.",
  },
  {
    icon: CheckCircle,
    title: "No obligation",
    description: "The audit call and scope document are free. You decide whether to proceed after reviewing the proposal.",
  },
];

export function ContactContent() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "discovery-call" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <section className="px-6 pb-24 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springs.gentle}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tight text-fg-primary md:text-5xl">
            Book a discovery call
          </h1>
          <p className="mt-4 max-w-[560px] text-lg leading-relaxed text-fg-secondary">
            Pick a time that works. We will map your workflow, identify where AI
            creates the most value, and outline what a production system looks like.
          </p>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          {/* Left: Cal.com embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springs.gentle, delay: 0.1 }}
            className="min-h-[600px] overflow-hidden rounded-2xl border border-border bg-bg-elevated"
          >
            <Cal
              namespace="discovery-call"
              calLink="harry-staples-eznzi0/discovery-call"
              style={{ width: "100%", height: "100%", overflow: "scroll", minHeight: "600px" }}
              config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
            />
          </motion.div>

          {/* Right: What happens next + email fallback */}
          <motion.div
            className="flex flex-col gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-col gap-6">
              <h2 className="text-xs font-medium uppercase tracking-wider text-fg-tertiary">
                What happens next
              </h2>
              {expectations.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={staggerItem}
                    className="flex gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-elevated">
                      <Icon className="h-5 w-5 text-fg-tertiary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-fg-primary">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-fg-secondary">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Direct email */}
            <motion.div
              variants={staggerItem}
              className="rounded-xl border border-border bg-bg-elevated p-6"
            >
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-fg-tertiary" strokeWidth={1.5} />
                <div>
                  <span className="text-xs text-fg-tertiary">
                    Prefer email?
                  </span>
                  <a
                    href="mailto:hello@agentivesolutions.co.uk"
                    className="block text-sm text-fg-primary transition-colors hover:text-accent"
                  >
                    hello@agentivesolutions.co.uk
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
