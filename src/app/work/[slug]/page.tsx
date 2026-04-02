import { FloatingNav } from "@/components/navigation/floating-nav";
import { Footer } from "@/components/navigation/footer";
import { CaseStudyContent } from "@/components/case-study/case-study-content";
import { caseStudies, getCaseStudy, getNextCaseStudy } from "@/content/case-studies";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.subtitle,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const nextStudy = getNextCaseStudy(slug);

  return (
    <>
      <FloatingNav />
      <main className="pt-32">
        <CaseStudyContent study={study} nextStudy={nextStudy} />
      </main>
      <Footer />
    </>
  );
}
