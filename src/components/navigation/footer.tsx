import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  work: [
    { href: "/work", label: "All projects" },
    { href: "/work/ai-document-intelligence", label: "Document intelligence" },
    { href: "/work/erp-inventory-automation", label: "Inventory automation" },
    { href: "/work/ai-lead-intelligence", label: "Lead intelligence" },
    { href: "/work/ai-crop-planning", label: "Crop planning" },
  ],
  company: [
    { href: "/blueprints", label: "Blueprints" },
    { href: "/services", label: "Services" },
    { href: "/process", label: "Process" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  external: [
    { href: "https://www.upwork.com/freelancers/~0156fdff93d0309ec9", label: "Upwork", external: true },
    { href: "https://www.linkedin.com/in/harry-staples-918865347/", label: "LinkedIn", external: true },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <svg width="24" height="24" viewBox="0 0 44 40" fill="none" aria-hidden="true">
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
            <p className="mt-3 max-w-[240px] text-sm leading-relaxed text-fg-secondary">
              AI systems that run your operations. Built for companies that want
              measurable results, not demos.
            </p>
          </div>

          {/* Work */}
          <div>
            <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-fg-tertiary">
              Work
            </h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.work.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-fg-secondary transition-colors hover:text-fg-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-fg-tertiary">
              Company
            </h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-fg-secondary transition-colors hover:text-fg-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External */}
          <div>
            <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-fg-tertiary">
              Connect
            </h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.external.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-fg-secondary transition-colors hover:text-fg-primary"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 md:flex-row md:items-center">
          <p className="text-xs text-fg-tertiary">
            &copy; {new Date().getFullYear()} Agentive Solutions. All rights reserved.
          </p>
          <Link
            href="/contact"
            className="text-sm text-fg-secondary transition-colors hover:text-accent"
          >
            harry.staples@agentivesolutions.co.uk
          </Link>
        </div>
      </div>
    </footer>
  );
}
