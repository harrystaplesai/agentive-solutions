import { FloatingNav } from "@/components/navigation/floating-nav";
import { Footer } from "@/components/navigation/footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <FloatingNav />
      <main className="flex min-h-[80dvh] flex-col items-center justify-center px-6 text-center">
        <span className="font-mono text-sm text-fg-tertiary">404</span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-fg-primary">
          Page not found
        </h1>
        <p className="mt-3 max-w-[400px] text-base text-fg-secondary">
          The page you are looking for does not exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-lg bg-fg-primary px-5 py-2.5 text-sm font-medium text-bg-primary transition-all hover:bg-fg-secondary"
        >
          Back to home
        </Link>
      </main>
      <Footer />
    </>
  );
}
