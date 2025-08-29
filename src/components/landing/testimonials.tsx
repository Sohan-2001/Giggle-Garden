import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "Giggle Garden is my go-to for a quick mood lift. The AI humor suggester is scarily accurate and always knows what I need to hear!",
    name: "Alex Johnson",
    title: "Daily User",
    avatar: "AJ",
    image: "https://picsum.photos/id/1011/40/40"
  },
  {
    quote: "I was skeptical about a 'humor app', but this genuinely helps me de-stress after a long day at work. It's like therapy, but funnier.",
    name: "Samantha Lee",
    title: "Software Engineer",
    avatar: "SL",
    image: "https://picsum.photos/id/1027/40/40"
  },
  {
    quote: "As someone who struggles with anxiety, having a tool that helps me find laughter has been a game-changer for my mental health.",
    name: "Mike Chen",
    title: "Student",
    avatar: "MC",
    image: "https://picsum.photos/id/1005/40/40"
  },
];

export function Testimonials() {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            Loved by Laughter Lovers
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our community is saying about their daily dose of joy.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="flex flex-col justify-between">
              <CardContent className="pt-6">
                <blockquote className="border-l-2 border-accent pl-6 italic text-foreground/80">
                  {testimonial.quote}
                </blockquote>
              </CardContent>
              <CardFooter className="flex items-center gap-4 pt-4">
                <Avatar>
                  <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint="person face" />
                  <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
