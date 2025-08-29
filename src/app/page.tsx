import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { Benefits } from '@/components/landing/benefits';
import { HumorSuggester } from '@/components/landing/humor-suggester';
import { Testimonials } from '@/components/landing/testimonials';
import { Contact } from '@/components/landing/contact';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Benefits />
        <HumorSuggester />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
