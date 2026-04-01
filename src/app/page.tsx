import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import About from "@/components/About";
import Footer from "@/components/Footer";
import ScrollFadeIn from "@/components/ScrollFadeIn";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ScrollFadeIn>
          <Features />
        </ScrollFadeIn>
        <ScrollFadeIn>
          <Pricing />
        </ScrollFadeIn>
        <ScrollFadeIn>
          <HowItWorks />
        </ScrollFadeIn>
        <ScrollFadeIn>
          <About />
        </ScrollFadeIn>
      </main>
      <Footer />
    </>
  );
}
