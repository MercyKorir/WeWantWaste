import React from "react";
import { useSkipData } from "../hooks/useSkipData";
import {
  formatPrice,
  getSkipDisplayName,
  getHirePeriodText,
} from "../utils/formatters";

const SkipDataTest: React.FC = () => {
  const { skips, loading, error, refetch } = useSkipData("NR32", "Lowestoft");

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading skips...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-600 mb-4">Error: {error.message}</div>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Available Skips</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skips.map((skip) => (
          <div key={skip.id} className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">
              {getSkipDisplayName(skip.size)}
            </h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Price: {formatPrice(skip.price_before_vat, skip.vat)}</p>
              <p>{getHirePeriodText(skip.hire_period_days)}</p>
              <p>Road Placement: {skip.allowed_on_road ? "Yes" : "No"}</p>
              <p>Heavy Waste: {skip.allows_heavy_waste ? "Yes" : "No"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkipDataTest;
