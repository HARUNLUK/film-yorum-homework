'use client';

import { useState } from 'react';
import { Search, Film } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function MovieSearch() {
  const [movieName, setMovieName] = useState('');
  const [movieInfo, setMovieInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!movieName.trim()) {
      toast({
        title: "Movie name required",
        description: "Please enter a movie name to search",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/movie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movieName }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setMovieInfo(data.candidates?.[0]?.content?.parts?.[0]?.text || 'No information available');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch movie information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Film className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Movie Information</h1>
        <p className="text-muted-foreground">
          Enter a movie name to get AI-generated information about it
        </p>
      </div>

      <Card className="p-6 max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="flex gap-4">
          <Input
            placeholder="Enter movie name..."
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              "Searching..."
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search
              </>
            )}
          </Button>
        </form>

        {movieInfo && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h2 className="font-semibold mb-2">Movie Information:</h2>
            <p className="text-muted-foreground whitespace-pre-wrap">{movieInfo}</p>
          </div>
        )}
      </Card>
    </div>
  );
}