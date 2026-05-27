import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/landing/Hero";
import { Categories } from "@/components/landing/Categories";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TrustStrip } from "@/components/landing/TrustStrip";
import { OracleBanner } from "@/components/landing/OracleBanner";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTA } from "@/components/landing/FinalCTA";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Categories />
        <HowItWorks />
        <TrustStrip />
        <OracleBanner />
        <Testimonials />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
