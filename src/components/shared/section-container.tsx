"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp } from "@/lib/animations";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  animate?: boolean;
}

export function SectionContainer({
  children,
  className,
  id,
  animate = true,
}: SectionContainerProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  if (!animate) {
    return (
      <section id={id} className={cn("px-6 md:px-8 lg:px-12", className)}>
        <div className="mx-auto max-w-[1280px]">{children}</div>
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      className={cn("px-6 md:px-8 lg:px-12", className)}
    >
      <div className="mx-auto max-w-[1280px]">{children}</div>
    </motion.section>
  );
}
