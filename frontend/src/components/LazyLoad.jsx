import React, { Suspense } from 'react';

// Loading skeleton component
const LoadingSkeleton = ({ height = "h-64", className = "" }) => (
  <div className={`animate-pulse ${height} ${className}`}>
    <div className="h-full bg-gray-200 rounded-lg"></div>
  </div>
);

// Lazy loading wrapper component
export const LazySection = ({ children, fallback = null }) => {
  const defaultFallback = (
    <div className="py-16">
      <LoadingSkeleton height="h-96" className="mx-auto max-w-7xl" />
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
};

// Product card skeleton
export const ProductCardSkeleton = () => (
  <div className="flex-shrink-0 w-[280px] sm:w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="aspect-square bg-gray-200 animate-pulse"></div>
    <div className="p-5">
      <div className="h-4 bg-gray-200 rounded animate-pulse mb-3"></div>
      <div className="h-3 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
      <div className="h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
);

// Review card skeleton
export const ReviewCardSkeleton = () => (
  <div className="bg-white rounded-xl p-6 shadow-lg">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3"></div>
      </div>
    </div>
    <div className="flex gap-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
      ))}
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6"></div>
      <div className="h-3 bg-gray-200 rounded animate-pulse w-4/6"></div>
    </div>
  </div>
);

export default LoadingSkeleton;
