"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileSearch, Workflow, Search, Code2 } from "lucide-react";
import { staggerContainer, staggerItem, springs } from "@/lib/animations";

const services = [
  {
    id: "document-intelligence",
    icon: FileSearch,
    title: "AI document intelligence",
    tagline: "From inbox chaos to instant retrieval",
    description:
      "We build systems that receive documents from email, uploads, or API feeds, then classify, extract metadata, and store them in searchable vector databases. Your team retrieves any document through natural language queries or structured filters in seconds instead of minutes.",
    capabilities: [
      "Automated email ingestion with attachment extraction",
      "AI classification by document type, entity, and metadata",
      "Vector search using pgvector for semantic and structured queries",
      "Chatbot and dashboard interfaces for instant retrieval",
      "Expiration tracking with automated compliance alerts",
      "Multi format support: PDFs, images, spreadsheets, and scanned documents",
    ],
    caseStudySlug: "ai-document-intelligence",
    caseStudyLabel: "See how we built this for a national energy operator",
  },
  {
    id: "workflow-automation",
    icon: Workflow,
    title: "Workflow automation",
    tagline: "Autonomous agents on your existing stack",
    description:
      "We connect your ERP, CRM, email, and databases into orchestrated workflows powered by AI agents. These agents monitor data, detect patterns, generate recommendations, and take action with human oversight. The systems run on scheduled cycles and adapt through feedback loops that improve accuracy over time.",
    capabilities: [
      "ERP integration (Sage 300, SAP, NetSuite) via REST API",
      "CRM automation (HubSpot, Pipedrive, Salesforce) with bidirectional sync",
      "AI agents that monitor, analyze, and recommend actions autonomously",
      "Human in the loop approval workflows with admin dashboards",
      "Feedback capture and continuous improvement from manager overrides",
      "Multi system orchestration using n8n or custom Node.js pipelines",
    ],
    caseStudySlug: "erp-inventory-automation",
    caseStudyLabel: "See how we automated inventory for a wholesale distributor",
  },
  {
    id: "lead-intelligence",
    icon: Search,
    title: "AI lead intelligence",
    tagline: "Qualified leads delivered to your CRM every week",
    description:
      "We build automated pipelines that discover prospects from multiple sources, enrich contact data through waterfall verification, score against your ideal client profile, and populate your CRM with qualified leads. Human reviewers approve every lead before it enters your pipeline, maintaining quality while eliminating manual research.",
    capabilities: [
      "Multi source discovery from LinkedIn, news monitoring, and public records",
      "Waterfall enrichment across 100+ data providers for email and phone verification",
      "AI scoring against configurable ideal client profiles",
      "Slack or email based human in the loop review queues",
      "CRM integration with smart deduplication and custom field population",
      "Weekly performance reporting and source ROI tracking",
    ],
    caseStudySlug: "ai-lead-intelligence",
    caseStudyLabel: "See how we built a UHNW pipeline for an investment firm",
  },
  {
    id: "custom-software",
    icon: Code2,
    title: "Custom AI software",
    tagline: "Production applications with AI at the core",
    description:
      "When the problem requires more than automation, we build full applications. React dashboards, Node.js APIs, Supabase backends, and AI engines that generate domain specific outputs from structured inputs. Every application includes human review workflows, audit logging, and PDF generation for client deliverables.",
    capabilities: [
      "React and Next.js web applications with TypeScript",
      "Node.js API servers with Supabase PostgreSQL backends",
      "AI generation engines using GPT and Claude for domain specific outputs",
      "Structured data capture with validation and missing field detection",
      "PDF generation and automated email delivery of reports",
      "Role based access control with audit logging for all actions",
    ],
    caseStudySlug: "ai-crop-planning",
    caseStudyLabel: "See how we built AI crop plan generation for a biocontrol company",
  },
];

export function ServicesContent() {
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
            Services
          </h1>
          <p className="mt-4 max-w-[600px] text-lg leading-relaxed text-fg-secondary">
            Four areas where we build AI systems that deliver measurable business outcomes.
            Every engagement starts with your current workflow and ends with an autonomous
            system integrated into your existing tools.
          </p>
        </motion.div>

        {/* Service sections */}
        <div className="flex flex-col gap-32">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={springs.gentle}
                className="scroll-mt-32"
              >
                <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
                  {/* Left: description */}
                  <div>
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-muted">
                      <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight text-fg-primary md:text-3xl">
                      {service.title}
                    </h2>
                    <p className="mt-1 text-base text-accent">{service.tagline}</p>

                    <p className="mt-6 text-base leading-relaxed text-fg-secondary">
                      {service.description}
                    </p>

                    <Link
                      href={`/work/${service.caseStudySlug}`}
                      className="group mt-8 inline-flex items-center gap-2 text-sm text-fg-secondary transition-colors hover:text-accent"
                    >
                      {service.caseStudyLabel}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>

                  {/* Right: capabilities list */}
                  <motion.div
                    className="rounded-2xl border border-border bg-bg-elevated p-8"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <h3 className="mb-6 text-xs font-medium uppercase tracking-wider text-fg-tertiary">
                      Capabilities
                    </h3>
                    <ul className="flex flex-col gap-4">
                      {service.capabilities.map((cap) => (
                        <motion.li
                          key={cap}
                          variants={staggerItem}
                          className="flex items-start gap-3 text-sm text-fg-secondary"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {cap}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Divider (except last) */}
                {i < services.length - 1 && (
                  <div className="mt-32 border-t border-border" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springs.gentle}
          className="mt-32 rounded-2xl border border-border bg-bg-elevated p-8 md:p-12"
        >
          <h3 className="text-2xl font-bold tracking-tight text-fg-primary">
            Not sure which service fits?
          </h3>
          <p className="mt-3 max-w-[480px] text-base text-fg-secondary">
            Most projects combine elements from multiple service areas. Book a call
            and we will map your workflow to determine what delivers the most impact.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-fg-primary px-6 py-3 text-sm font-medium text-bg-primary transition-all hover:bg-fg-secondary"
          >
            Book a call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
