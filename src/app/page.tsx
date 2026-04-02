import { FloatingNav } from "@/components/navigation/floating-nav";
import { Footer } from "@/components/navigation/footer";
import { Hero } from "@/components/sections/hero";
import { ProofBar } from "@/components/sections/proof-bar";
import { SelectedWork } from "@/components/sections/selected-work";
import { Capabilities } from "@/components/sections/capabilities";
import { ProcessTeaser } from "@/components/sections/process-teaser";
import { CTASection } from "@/components/sections/cta-section";

export default function Home() {
  return (
    <>
      <FloatingNav />
      <main>
        <Hero />
        <ProofBar />
        <SelectedWork />
        <Capabilities />
        <ProcessTeaser />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
