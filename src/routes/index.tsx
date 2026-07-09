import { createFileRoute } from "@tanstack/react-router";
import { I18nProvider } from "@/lib/i18n";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { EnglishSection } from "@/components/site/EnglishSection";
import { FrenchSection } from "@/components/site/FrenchSection";
import { SpanishSection } from "@/components/site/SpanishSection";
import { Pricing } from "@/components/site/Pricing";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <I18nProvider>
      <main className="bg-paper text-ink font-sans overflow-x-hidden">
        <Nav />
        <Hero />
        <About />
        <EnglishSection />
        <FrenchSection />
        <SpanishSection />
        <Pricing />
        <Footer />
      </main>
    </I18nProvider>
  );
}
