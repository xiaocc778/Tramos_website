export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-soft animate-pulse">
      <div className="aspect-[4/3] bg-surface-200" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-surface-200 rounded w-3/4" />
        <div className="h-4 bg-surface-200 rounded w-full" />
        <div className="h-4 bg-surface-200 rounded w-2/3" />
        <div className="h-6 bg-surface-200 rounded w-1/3 mt-4" />
      </div>
    </div>
  );
}

export function ArticleSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-soft animate-pulse">
      <div className="aspect-video bg-surface-200" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-surface-200 rounded w-1/4" />
        <div className="h-5 bg-surface-200 rounded w-3/4" />
        <div className="h-4 bg-surface-200 rounded w-full" />
        <div className="h-4 bg-surface-200 rounded w-2/3" />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-surface-500">Loading...</p>
      </div>
    </div>
  );
}
