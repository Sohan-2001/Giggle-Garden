'use server';

import { suggestHumorType, SuggestHumorTypeInput, SuggestHumorTypeOutput } from '@/ai/flows/suggest-humor-type';
import { generateJoke, GenerateJokeOutput } from '@/ai/flows/generate-joke';
import { getFirestore } from 'firebase-admin/firestore';
import { initFirebaseAdmin } from '@/lib/firebase-admin';

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

export async function fetchInitialJoke(): Promise<GenerateJokeOutput | null> {
  await initFirebaseAdmin();
  const db = getFirestore();
  const jokesCollection = db.collection('jokes');
  const snapshot = await jokesCollection.limit(1).get();

  if (!snapshot.empty) {
    const jokeDoc = snapshot.docs[0];
    // Don't delete, just serve it. The next one will be generated.
    return jokeDoc.data() as GenerateJokeOutput;
  } else {
    // If no jokes, generate one and store it.
    const newJoke = await generateJoke({});
    await jokesCollection.add(newJoke);
    return newJoke;
  }
}

export async function fetchNextJokeAndGenerateNewOne(userEmail: string | null): Promise<GenerateJokeOutput | null> {
    await initFirebaseAdmin();
    const db = getFirestore();
    
    // Generate a new joke
    const newJoke = await generateJoke({});

    // If we have a user email, store it in their personal collection
    if (userEmail) {
        const userJokesCollection = db.collection(userEmail);
        await userJokesCollection.add(newJoke);
    } else {
        // Fallback to the general pool if for some reason email is not available
        const jokesCollection = db.collection('jokes');
        await jokesCollection.add(newJoke);
    }

    return newJoke;
}
