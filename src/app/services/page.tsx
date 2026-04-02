import { FloatingNav } from "@/components/navigation/floating-nav";
import { Footer } from "@/components/navigation/footer";
import { ServicesContent } from "@/components/sections/services-content";

export const metadata = {
  title: "Services",
  description:
    "AI document intelligence, workflow automation, lead generation pipelines, and custom software. We build production systems that deliver measurable business outcomes.",
};

export default function ServicesPage() {
  return (
    <>
      <FloatingNav />
      <main className="pt-32">
        <ServicesContent />
      </main>
      <Footer />
    </>
  );
}
