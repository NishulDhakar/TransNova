import Hero from "@/components/sections/Hero";
import Mission from "@/components/sections/Mission";
import Services from "@/components/sections/Services";
import Solutions from "@/components/sections/Solutions";
import CaseStudies from "@/components/sections/CaseStudies";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <Hero />
      <Mission />
      <Services />
      <Solutions />
      <CaseStudies />
      <Footer />
    </main>
  );
}
