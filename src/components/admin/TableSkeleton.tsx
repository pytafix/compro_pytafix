export function TableSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 bg-surface-container-high rounded w-48"></div>
        <div className="h-10 bg-surface-container-high rounded w-32"></div>
      </div>
      
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex gap-4 p-4 border-b border-outline-variant bg-surface-container-low">
          <div className="h-4 bg-surface-container-high rounded w-1/4"></div>
          <div className="h-4 bg-surface-container-high rounded w-1/4"></div>
          <div className="h-4 bg-surface-container-high rounded w-1/4"></div>
          <div className="h-4 bg-surface-container-high rounded w-1/4"></div>
        </div>
        
        {/* Rows */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-4 p-4 border-b border-outline-variant/50 items-center">
            <div className="h-4 bg-surface-container-high rounded w-1/4"></div>
            <div className="h-4 bg-surface-container-high rounded w-1/4"></div>
            <div className="h-4 bg-surface-container-high rounded w-1/4"></div>
            <div className="flex gap-2 w-1/4">
              <div className="h-8 w-8 bg-surface-container-high rounded-full"></div>
              <div className="h-8 w-8 bg-surface-container-high rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
