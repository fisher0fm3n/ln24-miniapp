export function VideoSkeleton() {
  return (
    <div className="w-full aspect-video bg-field animate-pulse flex flex-col items-center justify-center">
      <span className="text-muted text-sm">Loading Live…</span>
    </div>
  );
}

export function FeaturedSkeleton() {
  return (
    <div className="mt-5 mb-1.5 px-4">
      <div className="flex gap-3 overflow-hidden">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="w-[calc(100%-2rem)] sm:w-[420px] aspect-[16/9.4] shrink-0 rounded-lg bg-field animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

export function PostsSkeleton() {
  return (
    <div className="mt-5">
      <div className="px-4 mb-2.5">
        <div className="h-6 w-52 rounded-md bg-card animate-pulse" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex px-4 py-2 gap-3">
          <div className="w-[120px] h-[120px] rounded-lg bg-field animate-pulse shrink-0" />
          <div className="flex-1 flex flex-col justify-center gap-2">
            <div className="h-4 rounded-md bg-card animate-pulse w-[85%]" />
            <div className="h-4 rounded-md bg-card animate-pulse w-[65%]" />
            <div className="h-3.5 rounded-md bg-field animate-pulse w-[120px] mt-1.5" />
          </div>
        </div>
      ))}
    </div>
  );
}
