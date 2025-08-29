'use client';
import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { Benefits } from '@/components/landing/benefits';
import { Testimonials } from '@/components/landing/testimonials';
import { Footer } from '@/components/landing/footer';
import { AuthProvider } from '@/components/auth-provider';

export default function Home() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-dvh bg-background">
        <Header />
        <main className="flex-1">
          <Hero />
          <Benefits />
          <Testimonials />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
