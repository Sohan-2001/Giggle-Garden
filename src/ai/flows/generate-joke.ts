'use server';
/**
 * @fileOverview Generates a short, family-friendly joke and suggests contrasting colors for display.
 *
 * - generateJoke - A function that returns a joke and color suggestions.
 * - GenerateJokeInput - The input type for the generateJoke function (currently empty).
 * - GenerateJokeOutput - The return type for the generateJoke function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GenerateJokeInputSchema = z.object({});
export type GenerateJokeInput = z.infer<typeof GenerateJokeInputSchema>;

export const GenerateJokeOutputSchema = z.object({
  joke: z.string().describe('A short, witty, and family-friendly joke.'),
  backgroundColor: z
    .string()
    .describe(
      'A vibrant hex color code for the background that is dark.'
    ),
  textColor: z
    .string()
    .describe(
      'A vibrant hex color code for the text that contrasts well with the dark background.'
    ),
});
export type GenerateJokeOutput = z.infer<typeof GenerateJokeOutputSchema>;

export async function generateJoke(input: GenerateJokeInput): Promise<GenerateJokeOutput> {
  return generateJokeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateJokePrompt',
  input: {schema: GenerateJokeInputSchema},
  output: {schema: GenerateJokeOutputSchema},
  prompt: `You are a creative and funny comedian. Generate a short, one-liner, family-friendly joke.
  
Also, provide a pair of visually appealing, contrasting hex color codes. The background color must be dark, and the text color must be light and readable against the background.
`,
});

const generateJokeFlow = ai.defineFlow(
  {
    name: 'generateJokeFlow',
    inputSchema: GenerateJokeInputSchema,
    outputSchema: GenerateJokeOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
