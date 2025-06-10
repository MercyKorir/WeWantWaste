import React from "react";

const SkipCardSkeleton: React.FC = React.memo(() => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="h-6 bg-gray-200 rounded w-24"></div>
        <div className="h-5 bg-gray-200 rounded w-16"></div>
      </div>

      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>

      <div className="space-y-2 mb-4">
        <div className="h-8 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>

      <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
    </div>
  );
});

export default SkipCardSkeleton;
