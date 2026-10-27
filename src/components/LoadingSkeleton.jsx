import React from 'react';

export function RestaurantSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse flex flex-col">
      <div className="h-48 bg-gray-200 w-full"></div>
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="flex gap-2 pt-2">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded-xl mt-4"></div>
      </div>
    </div>
  );
}

export function FoodSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm animate-pulse flex gap-4">
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-16"></div>
        <div className="h-5 bg-gray-200 rounded w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
      </div>
      <div className="w-28 h-24 bg-gray-200 rounded-xl shrink-0"></div>
    </div>
  );
}
