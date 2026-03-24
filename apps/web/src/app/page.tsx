import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/marketing/HeroSection";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { SolutionSection } from "@/components/marketing/SolutionSection";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { UseCasesSection } from "@/components/marketing/UseCasesSection";
import { IntegrationSection } from "@/components/marketing/IntegrationSection";
import { PilotCTA } from "@/components/marketing/PilotCTA";

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <UseCasesSection />
      <IntegrationSection />
      <PilotCTA />
      <Footer />
    </main>
  );
}
