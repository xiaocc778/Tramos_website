export function ProductSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-soft animate-pulse ${className}`}>
      <div className="aspect-[4/3] bg-surface-200" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-surface-200 rounded w-3/4" />
        <div className="h-4 bg-surface-200 rounded w-full" />
        <div className="h-4 bg-surface-200 rounded w-2/3" />
        <div className="flex gap-2 pt-2">
          <div className="h-6 bg-surface-200 rounded w-1/4" />
          <div className="h-6 bg-surface-200 rounded w-1/5" />
        </div>
      </div>
    </div>
  );
}

export function ArticleSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow-soft animate-pulse ${className}`}>
      <div className="aspect-video bg-surface-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-surface-200 rounded w-1/4" />
        <div className="h-6 bg-surface-200 rounded w-3/4" />
        <div className="h-4 bg-surface-200 rounded w-full" />
        <div className="h-4 bg-surface-200 rounded w-2/3" />
      </div>
    </div>
  );
}

export function CategorySkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-soft animate-pulse ${className}`}>
      <div className="w-16 h-16 bg-surface-200 rounded-full mb-4" />
      <div className="h-5 bg-surface-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-surface-200 rounded w-1/2" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-surface-50">
      <div className="bg-gradient-to-r from-[#1B2A4A] to-orange-700 py-16 animate-pulse">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="h-10 bg-surface-300/50 rounded w-64 mx-auto mb-4" />
          <div className="h-6 bg-surface-300/50 rounded w-96 mx-auto" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-soft animate-pulse">
              <div className="space-y-4">
                <div className="h-6 bg-surface-200 rounded w-1/4" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-4 bg-surface-200 rounded w-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-soft animate-pulse">
                <div className="h-5 bg-surface-200 rounded w-1/2 mb-3" />
                <div className="h-4 bg-surface-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
