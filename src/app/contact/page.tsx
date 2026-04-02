import { FloatingNav } from "@/components/navigation/floating-nav";
import { Footer } from "@/components/navigation/footer";
import { ContactContent } from "@/components/sections/contact-content";

export const metadata = {
  title: "Contact",
  description:
    "Book a 30 minute call to discuss your automation needs. We will map your workflow and identify where AI creates the most impact.",
};

export default function ContactPage() {
  return (
    <>
      <FloatingNav />
      <main className="pt-32">
        <ContactContent />
      </main>
      <Footer />
    </>
  );
}
