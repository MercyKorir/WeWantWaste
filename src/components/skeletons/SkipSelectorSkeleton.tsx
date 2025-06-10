import React from "react";
import SkipCardSkeleton from "./SkipCardSkeleton";

const SkipSelectorSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((index) => (
          <SkipCardSkeleton key={index} />
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="h-12 bg-gray-200 rounded w-24 animate-pulse"></div>
        <div className="h-12 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkipSelectorSkeleton;
