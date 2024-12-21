interface MovieInfoProps {
  info: string;
}

export function MovieInfo({ info }: MovieInfoProps) {
  return (
    <div className="mt-6 p-4 bg-muted rounded-lg">
      <h2 className="font-semibold mb-2">Film Bilgisi:</h2>
      <p className="text-muted-foreground whitespace-pre-wrap">{info}</p>
    </div>
  );
}