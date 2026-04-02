import { FloatingNav } from "@/components/navigation/floating-nav";
import { Footer } from "@/components/navigation/footer";
import { WorkIndex } from "@/components/sections/work-index";

export const metadata = {
  title: "Our work",
  description:
    "AI automation systems we built for energy, distribution, finance, and agriculture. Real projects, measurable outcomes.",
};

export default function WorkPage() {
  return (
    <>
      <FloatingNav />
      <main className="pt-32">
        <WorkIndex />
      </main>
      <Footer />
    </>
  );
}
