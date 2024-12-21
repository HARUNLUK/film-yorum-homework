import { Film } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center space-y-4">
      <div className="flex justify-center">
        <Film className="h-16 w-16 text-primary" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight">Film Bilgi Sistemi</h1>
      <p className="text-muted-foreground">
        Film hakkında bilgi almak için film adını girin
      </p>
    </div>
  );
}