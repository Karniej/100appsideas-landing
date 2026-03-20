import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero";
import WhatsIncludedSection from "@/components/sections/whats-included";
import PreviewSection from "@/components/sections/preview";
import CategoriesSection from "@/components/sections/categories";
import SocialProofSection from "@/components/sections/social-proof";
import PricingSection from "@/components/sections/pricing";
import FAQSection from "@/components/sections/faq";
import CtaSection from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <WhatsIncludedSection />
        <CategoriesSection />
        <PreviewSection />
        <SocialProofSection />
        <PricingSection />
        <FAQSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
