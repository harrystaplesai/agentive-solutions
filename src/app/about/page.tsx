import { FloatingNav } from "@/components/navigation/floating-nav";
import { Footer } from "@/components/navigation/footer";
import { AboutContent } from "@/components/sections/about-content";

export const metadata = {
  title: "About",
  description:
    "Agentive Solutions builds production AI systems for businesses. Top rated on Upwork with 100% job success and 10+ five star reviews across energy, distribution, finance, and agriculture.",
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
