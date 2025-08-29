import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BrainCircuit, HeartPulse, Smile } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: Smile,
    title: "Boost Your Mood",
    description: "Laughter releases endorphins, the body's natural feel-good chemicals, promoting an overall sense of well-being.",
  },
  {
    icon: HeartPulse,
    title: "Reduce Stress",
    description: "A good laugh has great short-term effects. It can soothe tension and stimulate circulation to help you relax.",
  },
  {
    icon: BrainCircuit,
    title: "Improve Resilience",
    description: "The ability to laugh at yourself and life's ups and downs makes it easier to cope with difficult situations.",
  },
];

export function Benefits() {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            The Science of a Good Giggle
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            It's not just fun—it's functional. Discover the tangible benefits of incorporating more laughter into your life.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="text-center group hover:border-accent transition-colors duration-300">
              <CardHeader className="items-center">
                <div className="p-4 bg-accent/10 rounded-full mb-4">
                  <benefit.icon className="h-10 w-10 text-accent group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="font-headline text-2xl text-primary">{benefit.title}</CardTitle>
                <CardDescription className="text-foreground/70 pt-2">{benefit.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
