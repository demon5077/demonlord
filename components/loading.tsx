export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-[hsl(350_100%_58%/0.2)]" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-t-[hsl(350_100%_58%)]" />
          <div className="absolute inset-2 rounded-full border border-[hsl(185_100%_48%/0.3)]" />
          <div
            className="absolute inset-2 animate-spin rounded-full border border-transparent border-t-[hsl(185_100%_48%)]"
            style={{ animationDirection: 'reverse', animationDuration: '0.6s' }}
          />
        </div>
        <span
          className="text-muted-foreground animate-pulse text-[0.6rem] tracking-[0.3em] uppercase"
          style={{ fontFamily: 'Share Tech Mono, monospace' }}
        >
          LOADING...
        </span>
      </div>
    </div>
  );
}
