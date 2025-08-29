import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/1920/1080"
          alt="A garden of laughter"
          data-ai-hint="joyful nature"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
      </div>
      <div className="relative z-10 container px-4 md:px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-primary">
            Find Your Daily Dose of Joy
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
            Life's too short for stress. Giggle Garden is your personal oasis of humor, designed to lift your spirits and brighten your day, one laugh at a time.
          </p>
          <div>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 transition-transform hover:scale-105 duration-300">
              Start Laughing Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
