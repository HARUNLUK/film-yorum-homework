'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Header } from './Header';
import { SearchForm } from './SearchForm';
import { MovieInfo } from './MovieInfo';

export default function MovieSearch() {
  const [movieName, setMovieName] = useState('');
  const [movieInfo, setMovieInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    console.log("Search initiated for:", movieName);
    
    if (!movieName.trim()) {
      toast({
        title: "Film adı gerekli",
        description: "Lütfen aramak için bir film adı girin",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log("Sending API request...");
      const response = await fetch('/api/movie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movieName }),
      });

      const data = await response.json();
      console.log("API response:", data);
      
      if (data.error) {
        throw new Error(data.error);
      }

      setMovieInfo(data.candidates?.[0]?.content?.parts?.[0]?.text || 'Bilgi bulunamadı');
    } catch (error) {
      console.error("API error:", error);
      toast({
        title: "Hata",
        description: "Film bilgisi alınamadı. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Header />
      <Card className="p-6 max-w-2xl mx-auto">
        <SearchForm
          movieName={movieName}
          onMovieNameChange={setMovieName}
          onSubmit={handleSearch}
          isLoading={isLoading}
        />
        {movieInfo && <MovieInfo info={movieInfo} />}
      </Card>
    </div>
  );
}