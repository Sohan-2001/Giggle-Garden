'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth-provider';
import type { GenerateJokeOutput } from '@/ai/flows/generate-joke';
import { fetchInitialJoke, fetchNextJokeAndGenerateNewOne } from '../actions';
import { LoaderCircle, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';

const JokeSlide = ({ joke, textColor, backgroundColor }: GenerateJokeOutput) => (
  <div
    className="h-full w-full flex flex-col items-center justify-center text-center p-8 snap-center"
    style={{ backgroundColor, color: textColor }}
  >
    <Smile className="h-16 w-16 mb-8" style={{ color: textColor }} />
    <p className="text-3xl md:text-5xl font-bold leading-tight">{joke}</p>
  </div>
);

const LoadingSlide = () => (
    <div
      className="h-full w-full flex flex-col items-center justify-center text-center p-8 snap-center bg-gray-900 text-white"
    >
      <LoaderCircle className="h-16 w-16 animate-spin mb-4" />
      <p className="text-2xl">Brewing up a fresh joke...</p>
    </div>
)


export default function JokesPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [jokes, setJokes] = useState<GenerateJokeOutput[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      const getFirstJoke = async () => {
        setIsLoading(true);
        const initialJoke = await fetchInitialJoke();
        if (initialJoke) {
          setJokes([initialJoke]);
          // pre-load next joke
          fetchNextJokeAndGenerateNewOne();
        }
        setIsLoading(false);
      };
      getFirstJoke();
    }
  }, [user]);

  const handleScroll = async () => {
    const container = containerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // When user is near the bottom of the last joke, fetch the next one
      if (scrollHeight - scrollTop - clientHeight < clientHeight / 2) {
          // Prevent multiple fetches
          if(!isLoading) {
              setIsLoading(true);
              const nextJoke = await fetchNextJokeAndGenerateNewOne();
              if (nextJoke) {
                  setJokes(prev => [...prev, nextJoke]);
              }
              setIsLoading(false);
          }
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [isLoading]);


  if (authLoading || !user) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen">
       <div className="absolute top-4 right-4 z-10">
          <Button onClick={signOut} variant="secondary">Sign Out</Button>
        </div>
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-auto snap-y snap-mandatory"
      >
        {jokes.map((joke, index) => (
          <div key={index} className="h-screen w-screen">
             <JokeSlide {...joke} />
          </div>
        ))}
        {isLoading && (
            <div className="h-screen w-screen">
                <LoadingSlide />
            </div>
        )}
      </div>
    </div>
  );
}
