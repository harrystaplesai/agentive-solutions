import { FloatingNav } from "@/components/navigation/floating-nav";
import { Footer } from "@/components/navigation/footer";
import { BlueprintDetail } from "@/components/blueprints/blueprint-detail";
import { blueprints, getBlueprint } from "@/content/blueprints";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blueprints.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blueprint = getBlueprint(slug);
  if (!blueprint) return {};

  return {
    title: blueprint.title,
    description: blueprint.headline,
  };
}

export default async function BlueprintPage({ params }: PageProps) {
  const { slug } = await params;
  const blueprint = getBlueprint(slug);
  if (!blueprint) notFound();

  return (
    <>
      <FloatingNav />
      <main className="pt-32">
        <BlueprintDetail blueprint={blueprint} />
      </main>
      <Footer />
    </>
  );
}
