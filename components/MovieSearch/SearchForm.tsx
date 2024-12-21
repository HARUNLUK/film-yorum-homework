'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchFormProps {
  movieName: string;
  onMovieNameChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export function SearchForm({ movieName, onMovieNameChange, onSubmit, isLoading }: SearchFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex gap-4">
      <Input
        placeholder="Film adı girin..."
        value={movieName}
        onChange={(e) => onMovieNameChange(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          "Aranıyor..."
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" />
            Ara
          </>
        )}
      </Button>
    </form>
  );
}