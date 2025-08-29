import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Laugh } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Laugh className="h-6 w-6 text-primary" />
          <span className="text-xl font-headline font-bold text-primary">
            Giggle Garden
          </span>
        </Link>
        <nav>
          <Button className="rounded-full border border-accent/20 bg-accent/90 text-accent-foreground shadow-[2px_2px_4px_rgba(0,0,0,0.4),-2px_-2px_4px_rgba(255,255,255,0.2)] backdrop-blur-sm hover:bg-accent transition-all duration-200">Get Started</Button>
        </nav>
      </div>
    </header>
  );
}
