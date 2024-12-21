import MovieSearch from "@/components/MovieSearch";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <MovieSearch />
      </div>
    </main>
  );
}
