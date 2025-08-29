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

export async function fetchNextJokeAndGenerateNewOne(): Promise<GenerateJokeOutput | null> {
    await initFirebaseAdmin();
    const db = getFirestore();
    const jokesCollection = db.collection('jokes');
    
    // Start generating a new joke in the background (don't await)
    generateJoke({}).then(newJoke => {
        jokesCollection.add(newJoke);
    }).catch(error => {
        console.error("Failed to generate new joke:", error);
    });

    const snapshot = await jokesCollection.limit(1).get();

    if (snapshot.empty) {
        return null; // Should be handled by client, maybe show a loading/error state
    }
    
    const jokeDoc = snapshot.docs[0];
    const jokeData = jokeDoc.data() as GenerateJokeOutput;

    // Delete the joke that was just served
    await jokeDoc.ref.delete();

    return jokeData;
}
