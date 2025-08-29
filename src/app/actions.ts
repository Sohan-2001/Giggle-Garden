'use server';

import { suggestHumorType, SuggestHumorTypeInput, SuggestHumorTypeOutput } from '@/ai/flows/suggest-humor-type';
import { z } from 'zod';

const contactFormSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email.' }),
    message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export async function getHumorSuggestion(
  data: SuggestHumorTypeInput
): Promise<{ success: boolean; data?: SuggestHumorTypeOutput; error?: string }> {
  try {
    const result = await suggestHumorType(data);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to get suggestion. Please try again later.' };
  }
}


export async function submitContactForm(data: z.infer<typeof contactFormSchema>): Promise<{ success: boolean; message: string }> {
    const parsed = contactFormSchema.safeParse(data);
    if(!parsed.success) {
        return { success: false, message: 'Invalid form data.' };
    }
    
    console.log('New contact form submission:', parsed.data);
    // Here you would typically send an email, save to a database, etc.
    // For this example, we'll just simulate a success response.
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true, message: "Thank you for your message! We'll get back to you soon." };
}
