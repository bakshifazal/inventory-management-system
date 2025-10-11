import React from 'react';
import { Skeleton } from './Skeleton';

interface LoadingStateProps {
  isLoading: boolean;
  count?: number;
  children: React.ReactNode;
  SkeletonComponent?: React.ComponentType;
  layout?: 'grid' | 'flex' | 'block';
  className?: string;
}

export function LoadingState({ 
  isLoading, 
  count = 3, 
  children, 
  SkeletonComponent = CardSkeleton,
  layout = 'block',
  className = ''
}: LoadingStateProps) {
  if (isLoading) {
    const layoutClasses = {
      grid: 'grid',
      flex: 'space-y-4',
      block: ''
    };

    return (
      <div className={`${layoutClasses[layout]} ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonComponent key={i} />
        ))}
      </div>
    );
  }

  return <>{children}</>;
}

export function StatCardSkeleton() {
  return (
    <div className="bg-surface p-6 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="h-8 w-20 mb-2" />
      <Skeleton className="h-4 w-32" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-surface p-6 rounded-xl space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex justify-end space-x-2">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  );
}