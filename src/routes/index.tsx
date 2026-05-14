import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { PainSection } from "@/components/landing/PainSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FaqSection } from "@/components/landing/FaqSection";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";
import { LeadForm } from "@/components/form/LeadForm";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Toaster theme="dark" position="top-center" />
      <Header />
      <Hero />
      <PainSection />
      <SolutionSection />
      <BenefitsSection />
      <main id="modulos" className="max-w-5xl mx-auto px-6 pb-24">
        <LeadForm />
      </main>
      <HowItWorks />
      <FaqSection />
      <FinalCta />
      <Footer />
    </div>
  );
}
