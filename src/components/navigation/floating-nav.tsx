"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/blueprints", label: "Blueprints" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
];

export function FloatingNav() {
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setAtTop(current < 20);

    if (current < 100) {
      setVisible(true);
      return;
    }

    setVisible(current < previous);
  });

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          atTop
            ? "bg-transparent"
            : "border-b border-border bg-[#050505] backdrop-blur-xl"
        )}
      >
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 py-4 md:px-8 lg:px-12">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5"
          >
            <svg width="28" height="28" viewBox="0 0 44 40" fill="none" aria-hidden="true">
              <path d="M8 34 L22 6 L36 34" stroke="#ededed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <line x1="14" y1="24" x2="30" y2="24" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="14" cy="24" r="2.5" fill="#3b82f6"/>
              <circle cx="22" cy="24" r="2.5" fill="#3b82f6"/>
              <circle cx="30" cy="24" r="2.5" fill="#3b82f6"/>
            </svg>
            <span className="font-display text-lg font-bold tracking-tight text-fg-primary">
              Agentive
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-fg-secondary transition-colors hover:text-fg-primary"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-lg bg-fg-primary px-4 py-2 text-sm font-medium text-bg-primary transition-all hover:bg-fg-secondary"
            >
              Book a call
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="h-5 w-5 text-fg-primary" />
            ) : (
              <Menu className="h-5 w-5 text-fg-primary" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: mobileOpen ? 1 : 0,
          y: mobileOpen ? 0 : -20,
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-x-0 top-[72px] z-40 mx-6 rounded-2xl border border-border bg-bg-primary/95 p-6 backdrop-blur-xl md:hidden"
      >
        <div className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-base text-fg-secondary transition-colors hover:text-fg-primary"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 rounded-lg bg-fg-primary px-4 py-3 text-center text-sm font-medium text-bg-primary transition-all hover:bg-fg-secondary"
          >
            Book a call
          </Link>
        </div>
      </motion.div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}
    </>
  );
}
