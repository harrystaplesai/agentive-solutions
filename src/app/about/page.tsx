import { FloatingNav } from "@/components/navigation/floating-nav";
import { Footer } from "@/components/navigation/footer";
import { AboutContent } from "@/components/sections/about-content";

export const metadata = {
  title: "About",
  description:
    "Agentive Solutions builds production AI systems for businesses across all industries. Our team delivers autonomous systems backed by human oversight.",
};

export default function AboutPage() {
  return (
    <>
      <FloatingNav />
      <main className="pt-32">
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
