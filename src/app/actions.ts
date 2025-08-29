'use server';

import { suggestHumorType, SuggestHumorTypeInput, SuggestHumorTypeOutput } from '@/ai/flows/suggest-humor-type';

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
