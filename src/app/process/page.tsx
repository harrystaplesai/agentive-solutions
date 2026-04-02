import { FloatingNav } from "@/components/navigation/floating-nav";
import { Footer } from "@/components/navigation/footer";
import { ProcessContent } from "@/components/sections/process-content";

export const metadata = {
  title: "How we work",
  description:
    "From audit to autonomous operation in weeks. Five phases that take your business process and turn it into a production AI system.",
};

export default function ProcessPage() {
  return (
    <>
      <FloatingNav />
      <main className="pt-32">
        <ProcessContent />
      </main>
      <Footer />
    </>
  );
}
