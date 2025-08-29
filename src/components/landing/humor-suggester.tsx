'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Wand2 } from 'lucide-react';
import type { SuggestHumorTypeOutput } from '@/ai/flows/suggest-humor-type';

import { getHumorSuggestion } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  mood: z.string().min(10, 'Please describe your mood in at least 10 characters.'),
});

export function HumorSuggester() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<SuggestHumorTypeOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mood: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setResult(null);
    startTransition(async () => {
      const response = await getHumorSuggestion(values);
      if (response.success && response.data) {
        setResult(response.data);
      } else {
        toast({
          variant: 'destructive',
          title: 'Oops! Something went wrong.',
          description: response.error || 'Failed to get a humor suggestion. Please try again.',
        });
      }
    });
  }

  return (
    <section className="py-16 sm:py-20 bg-background/70">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary flex items-center justify-center gap-3">
            <Wand2 className="h-8 w-8" />
            Your Personal Humor Sommelier
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Not sure what tickles your funny bone today? Let our AI suggest the perfect type of humor to match your mood.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="mood"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">How are you feeling today?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'Feeling a bit cynical and need a smart laugh' or 'Just want something silly and lighthearted'"
                          className="resize-none"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Thinking of something funny...
                    </>
                  ) : (
                    'Suggest My Humor'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {result && (
          <Card className="max-w-2xl mx-auto mt-8 animate-in fade-in-50 duration-500">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-accent">Your Humor Prescription: {result.humorType}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">{result.reason}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
