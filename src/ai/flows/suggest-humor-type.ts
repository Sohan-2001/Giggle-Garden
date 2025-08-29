'use server';
/**
 * @fileOverview Suggests a type of humor based on the user's mood or preferences.
 *
 * - suggestHumorType - A function that suggests a type of humor.
 * - SuggestHumorTypeInput - The input type for the suggestHumorType function.
 * - SuggestHumorTypeOutput - The return type for the suggestHumorType function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestHumorTypeInputSchema = z.object({
  mood: z
    .string()
    .describe('The current mood or preferences of the user.'),
});
export type SuggestHumorTypeInput = z.infer<typeof SuggestHumorTypeInputSchema>;

const SuggestHumorTypeOutputSchema = z.object({
  humorType: z.string().describe('The suggested type of humor.'),
  reason: z.string().describe('The reason for suggesting this type of humor.'),
});
export type SuggestHumorTypeOutput = z.infer<typeof SuggestHumorTypeOutputSchema>;

export async function suggestHumorType(input: SuggestHumorTypeInput): Promise<SuggestHumorTypeOutput> {
  return suggestHumorTypeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestHumorTypePrompt',
  input: {schema: SuggestHumorTypeInputSchema},
  output: {schema: SuggestHumorTypeOutputSchema},
  prompt: `You are a humor expert. Given the user's current mood or preferences, suggest a type of humor that would be most suitable for them.

Mood: {{{mood}}}

Consider various types of humor such as observational humor, dark humor, puns, satire, slapstick, and witty humor. Explain why this type of humor is suitable for the user's mood. Suggest only one type of humor.`,
});

const suggestHumorTypeFlow = ai.defineFlow(
  {
    name: 'suggestHumorTypeFlow',
    inputSchema: SuggestHumorTypeInputSchema,
    outputSchema: SuggestHumorTypeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
