import { FloatingNav } from "@/components/navigation/floating-nav";
import { Footer } from "@/components/navigation/footer";
import { BlueprintsCatalog } from "@/components/blueprints/blueprints-catalog";

export const metadata = {
  title: "Automation blueprints",
  description:
    "Production AI workflows you deploy in hours. Document classification, lead enrichment, inventory monitoring, and more. Purchase the blueprint or let us set it up for you.",
};

export default function BlueprintsPage() {
  return (
    <>
      <FloatingNav />
      <main className="pt-32">
        <BlueprintsCatalog />
      </main>
      <Footer />
    </>
  );
}
