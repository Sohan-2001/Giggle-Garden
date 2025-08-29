import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Laugh } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Laugh className="h-6 w-6 text-primary" />
          <span className="text-xl font-headline font-bold text-primary">
            Giggle Garden
          </span>
        </Link>
        <nav>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">Get Started</Button>
        </nav>
      </div>
    </header>
  );
}
