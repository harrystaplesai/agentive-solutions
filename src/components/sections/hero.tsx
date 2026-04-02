"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { springs, staggerContainer, staggerItem } from "@/lib/animations";

function WorkflowNode({
  label,
  x,
  y,
  delay,
}: {
  label: string;
  x: number;
  y: number;
  delay: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...springs.gentle, delay }}
    >
      <rect
        x={x}
        y={y}
        width="120"
        height="40"
        rx="8"
        className="fill-bg-elevated stroke-border"
        strokeWidth="1"
      />
      <text
        x={x + 60}
        y={y + 24}
        textAnchor="middle"
        className="fill-fg-secondary text-[11px]"
        fontFamily="var(--font-geist-mono)"
      >
        {label}
      </text>
    </motion.g>
  );
}

function AnimatedBeam({
  x1,
  y1,
  x2,
  y2,
  delay,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      className="stroke-accent/40"
      strokeWidth="1.5"
      strokeDasharray="6 4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
    />
  );
}

function PulsingDot({ cx, cy, delay }: { cx: number; cy: number; delay: number }) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r="3"
      className="fill-accent"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

function WorkflowDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative"
    >
      <svg
        viewBox="0 0 400 280"
        className="h-auto w-full"
        aria-hidden="true"
      >
        {/* Beams connecting nodes */}
        <AnimatedBeam x1={80} y1={40} x2={140} y2={100} delay={0.6} />
        <AnimatedBeam x1={320} y1={40} x2={260} y2={100} delay={0.7} />
        <AnimatedBeam x1={200} y1={140} x2={200} y2={170} delay={0.9} />
        <AnimatedBeam x1={200} y1={210} x2={120} y2={240} delay={1.1} />
        <AnimatedBeam x1={200} y1={210} x2={280} y2={240} delay={1.2} />

        {/* Nodes */}
        <WorkflowNode label="Email Ingest" x={10} y={20} delay={0.2} />
        <WorkflowNode label="API Source" x={260} y={20} delay={0.3} />
        <WorkflowNode label="AI Processing" x={140} y={100} delay={0.5} />
        <WorkflowNode label="Vector Store" x={140} y={170} delay={0.8} />
        <WorkflowNode label="Dashboard" x={50} y={230} delay={1.0} />
        <WorkflowNode label="Chatbot" x={230} y={230} delay={1.1} />

        {/* Pulsing dots showing data flow */}
        <PulsingDot cx={110} cy={70} delay={1.0} />
        <PulsingDot cx={290} cy={70} delay={1.3} />
        <PulsingDot cx={200} cy={155} delay={1.6} />
        <PulsingDot cx={160} cy={225} delay={1.9} />
        <PulsingDot cx={240} cy={225} delay={2.1} />
      </svg>

      {/* Glow effect behind diagram */}
      <div className="absolute inset-0 -z-10 bg-accent/5 blur-3xl" />
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative px-6 pt-28 pb-16 md:min-h-[100dvh] md:px-8 md:pt-40 md:pb-20 lg:px-12">
      <div className="mx-auto grid max-w-[1280px] items-center gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        {/* Left: copy */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <motion.div
            variants={staggerItem}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-bg-elevated px-4 py-1.5 text-xs text-fg-secondary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Top Rated on Upwork with 100% job success
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="text-4xl font-bold leading-[1.08] tracking-tight text-fg-primary md:text-5xl lg:text-6xl"
          >
            We build the AI systems
            <br />
            <span className="text-fg-secondary">that run your operations</span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="max-w-[540px] text-base leading-relaxed text-fg-secondary md:text-lg"
          >
            Document intelligence, workflow automation, lead generation pipelines,
            and custom software. We ship production AI systems that deliver measurable
            results within weeks, then run autonomously with human oversight.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="/work"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-fg-primary px-6 py-3 text-sm font-medium text-bg-primary transition-all hover:bg-fg-secondary"
            >
              See our work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-fg-secondary transition-all hover:border-border-hover hover:text-fg-primary"
            >
              Book a call
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: workflow diagram */}
        <div className="hidden lg:block">
          <WorkflowDiagram />
        </div>
      </div>

      {/* Gradient fade at bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  );
}
