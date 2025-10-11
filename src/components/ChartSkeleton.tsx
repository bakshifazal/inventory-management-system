import React from 'react';
import { Skeleton } from './Skeleton';

export function ChartSkeleton() {
  return (
    <div className="bg-surface p-6 rounded-xl">
      <Skeleton className="h-6 w-40 mb-6" />
      <div className="h-64 flex flex-col justify-between">
        <div className="space-y-2 flex-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className={`h-8 w-${Math.floor(Math.random() * 40 + 20)}%`} />
            </div>
          ))}
        </div>
        <div className="flex justify-between pt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-16" />
          ))}
        </div>
      </div>
    </div>
  );
}