export default function Loading() {
  return (
    <div className="space-y-0">
      <div className="h-[35dvh] w-full animate-pulse bg-[hsl(var(--muted))] md:h-[55dvh]" />
      <div className="mx-auto -mt-32 max-w-5xl space-y-4 px-6 pb-10">
        <div className="flex gap-6">
          <div className="aspect-[2/3] w-36 animate-pulse bg-[hsl(var(--muted))] md:w-48" />
          <div className="flex-1 space-y-3 pt-24">
            <div className="h-3 w-32 animate-pulse bg-[hsl(var(--muted))]" />
            <div className="h-8 w-64 animate-pulse bg-[hsl(var(--muted))]" />
            <div className="h-3 w-full max-w-lg animate-pulse bg-[hsl(var(--muted))]" />
            <div className="h-3 w-full max-w-md animate-pulse bg-[hsl(var(--muted))]" />
          </div>
        </div>
      </div>
    </div>
  );
}
