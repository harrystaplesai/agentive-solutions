"use client";

import { MetricCard } from "@/components/shared/metric-card";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

const stats = [
  { value: "100", suffix: "+", label: "Production systems deployed" },
  { value: "5", suffix: "", label: "Star average across all clients" },
  { value: "All", suffix: "", label: "Industries served" },
  { value: "6", label: "Week average delivery time" },
];

export function ProofBar() {
  return (
    <section className="border-y border-border px-6 py-16 md:px-8 lg:px-12">
      <motion.div
        className="mx-auto grid max-w-[1280px] grid-cols-2 gap-8 md:grid-cols-4 md:gap-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={staggerItem}>
            <MetricCard
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
