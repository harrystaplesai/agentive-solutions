"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { staggerContainer, staggerItem, springs } from "@/lib/animations";

const phases = [
  {
    number: "01",
    title: "Audit",
    duration: "Day 1",
    description:
      "You walk us through the workflow that needs automation. We record the session, map every step from input to output, and identify where manual effort creates the biggest bottleneck. By the end of this conversation, we have a written scope document that details what the system will do, what it connects to, and what outcomes it delivers.",
    deliverables: [
      "Recorded process walkthrough",
      "Written technical scope document",
      "System architecture diagram",
      "Integration requirements list",
    ],
  },
  {
    number: "02",
    title: "Prototype",
    duration: "Week 1",
    description:
      "We build a working prototype using your real data within the first week. This validates the core AI logic, proves the integrations work, and gives you something tangible to evaluate before we invest in production infrastructure. You test the prototype and tell us what needs adjustment.",
    deliverables: [
      "Working prototype with real data",
      "Core AI logic validated",
      "Integration connectivity confirmed",
      "Feedback session to refine approach",
    ],
  },
  {
    number: "03",
    title: "Build",
    duration: "Weeks 2 to 4",
    description:
      "We build the production system with proper error handling, logging, and the admin interfaces your team needs to operate it. The system connects to your ERP, CRM, email, databases, and cloud storage. We build on your existing stack rather than replacing it, so adoption requires no migration.",
    deliverables: [
      "Production grade system with error handling",
      "Admin dashboard for monitoring and approvals",
      "Full integration with existing tools",
      "Human in the loop review workflows",
    ],
  },
  {
    number: "04",
    title: "Test",
    duration: "Week 4 to 5",
    description:
      "We run the system alongside your current process until the numbers confirm it works. Your team uses the system on real tasks while we monitor accuracy, performance, and edge cases. Every issue gets logged and fixed before we cut over to production.",
    deliverables: [
      "Parallel run with current process",
      "Accuracy and performance metrics",
      "Edge case identification and resolution",
      "User acceptance testing with your team",
    ],
  },
  {
    number: "05",
    title: "Handover",
    duration: "Week 5 to 6",
    description:
      "You receive a system that operates autonomously with human oversight. We write documentation covering every component, train your team on the admin interfaces, and monitor the first two weeks of production operation. After handover, the system runs without us.",
    deliverables: [
      "Complete system documentation",
      "Team training sessions",
      "Two weeks of production monitoring",
      "Runbook for common scenarios",
    ],
  },
];

const faqs = [
  {
    question: "What does an engagement cost?",
    answer:
      "Projects range based on complexity, integration count, and whether we build a dashboard or connect to existing tools. We scope every project with a fixed price before work begins. Monthly operating costs for AI APIs and hosting run between $100 and $300 for most systems.",
  },
  {
    question: "What if I already have a partial solution?",
    answer:
      "We audit what you have and build on it. If your current system works for some parts of the workflow, we integrate with it rather than replacing it. We have extended N8N workflows, connected to legacy ERPs, and built frontend interfaces on top of existing databases.",
  },
  {
    question: "Do you offer ongoing support after handover?",
    answer:
      "The system runs independently after handover, and your team has full documentation and training. If you want ongoing optimization, additional features, or expanded automation coverage, we scope those as separate engagements.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We have shipped production systems in energy, wholesale distribution, finance, and agriculture. The AI techniques transfer across industries; the variable is understanding your specific business process, which we map during the audit phase.",
  },
];

export function ProcessContent() {
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
            How we work
          </h1>
          <p className="mt-4 max-w-[600px] text-lg leading-relaxed text-fg-secondary">
            Five phases that take your manual workflow and transform it into a production
            AI system. Most engagements reach handover within six weeks of the audit call.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="flex flex-col gap-0"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {phases.map((phase, i) => (
            <motion.div
              key={phase.number}
              variants={staggerItem}
              className="relative grid gap-8 border-l border-border py-12 pl-10 md:grid-cols-[200px_1fr] md:gap-16 md:pl-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-12 -translate-x-1/2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-border bg-bg-primary">
                  <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                </div>
              </div>

              {/* Left: phase info */}
              <div>
                <span className="font-mono text-xs text-fg-tertiary">
                  Phase {phase.number}
                </span>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-fg-primary">
                  {phase.title}
                </h2>
                <span className="mt-2 inline-flex rounded-md border border-border bg-bg-elevated px-2.5 py-1 font-mono text-xs text-fg-secondary">
                  {phase.duration}
                </span>
              </div>

              {/* Right: details */}
              <div>
                <p className="text-base leading-relaxed text-fg-secondary">
                  {phase.description}
                </p>

                <div className="mt-6 rounded-xl border border-border bg-bg-elevated p-6">
                  <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-fg-tertiary">
                    Deliverables
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {phase.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-3 text-sm text-fg-secondary"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springs.gentle}
          className="mt-32"
        >
          <h2 className="mb-12 text-3xl font-bold tracking-tight text-fg-primary">
            Common questions
          </h2>

          <motion.div
            className="grid gap-8 md:grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {faqs.map((faq) => (
              <motion.div
                key={faq.question}
                variants={staggerItem}
                className="rounded-xl border border-border bg-bg-elevated p-6"
              >
                <h3 className="text-base font-semibold text-fg-primary">
                  {faq.question}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-secondary">
                  {faq.answer}
                </p>
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
              Ready to start with Phase 01?
            </h3>
            <p className="mt-2 text-sm text-fg-secondary">
              The audit call takes 30 minutes. You will receive a written scope document within 48 hours.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-fg-primary px-6 py-3 text-sm font-medium text-bg-primary transition-all hover:bg-fg-secondary"
          >
            Book the audit call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
