"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface MetricCardProps {
  value: string;
  label: string;
  suffix?: string;
  prefix?: string;
  className?: string;
}

function AnimatedNumber({ target, duration = 1.5 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

export function MetricCard({
  value,
  label,
  suffix,
  prefix,
  className,
}: MetricCardProps) {
  const numericValue = parseInt(value.replace(/\D/g, ""), 10);
  const isNumeric = !isNaN(numericValue);

  return (
    <motion.div
      className={cn("flex flex-col gap-1", className)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <span className="font-display text-4xl font-bold tracking-tight text-fg-primary md:text-5xl">
        {prefix}
        {isNumeric ? <AnimatedNumber target={numericValue} /> : value}
        {suffix}
      </span>
      <span className="text-sm text-fg-secondary">{label}</span>
    </motion.div>
  );
}
