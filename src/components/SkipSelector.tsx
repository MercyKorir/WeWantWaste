import React, { useState, useCallback, useEffect } from "react";
import type { Skip } from "../types";
import { useSkipData } from "../hooks/useSkipData";
import SkipCard from "./SkipCard";
import ProgressIndicator from "./ProgressIndicator";
import SkipSelectorSkeleton from "./skeletons/SkipSelectorSkeleton";
import FloatingCart from "./FloatingCart";

interface SkipSelectorProps {
  postcode: string;
  area?: string;
  onSkipSelected?: (skip: Skip) => void;
  onContinue?: (selectedSkip: Skip) => void;
  onBack?: () => void;
  className?: string;
}

const SkipSelector: React.FC<SkipSelectorProps> = ({
  postcode,
  area,
  onSkipSelected,
  onContinue,
  onBack,
  className = "",
}) => {
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const { skips, loading, error, refetch } = useSkipData(postcode, area);

  const handleSkipSelect = useCallback(
    (skip: Skip) => {
      setSelectedSkip(skip);
      onSkipSelected?.(skip);
    },
    [onSkipSelected]
  );

  const handleContinue = useCallback(() => {
    if (selectedSkip && onContinue) {
      onContinue(selectedSkip);
    }
  }, [selectedSkip, onContinue]);

  const handleClearSelection = useCallback(() => {
    setSelectedSkip(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedSkip(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (loading) {
    return <SkipSelectorSkeleton />;
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8">
          <svg
            className="w-12 h-12 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-red-900 mb-2">
            Unable to Load Skip Options
          </h3>
          <p className="text-red-700 mb-6">
            {error.message ||
              "There was a problem loading available skips for your area."}
          </p>
          <button
            onClick={refetch}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!skips || skips.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
          <svg
            className="w-12 h-12 text-yellow-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">
            No Skips Available
          </h3>
          <p className="text-yellow-700 mb-6">
            Unfortunately, we don't have any skips available for {postcode}{" "}
            {area} at the moment.
          </p>
          <button
            onClick={onBack}
            className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors"
          >
            Try Different Location
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto px-4 py-8 ${className}`}>
      {/* Header */}
      <div className="text-center mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
          Choose Your Skip Size
        </h1>
        <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Select the skip size that best suits your needs for {postcode} {area}.
        </p>
      </div>

      {/* Skip Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        role="radiogroup"
        aria-label="Skip size options"
      >
        {skips.map((skip) => (
          <SkipCard
            key={skip.id}
            skip={skip}
            isSelected={selectedSkip?.id === skip.id}
            onSelect={handleSkipSelect}
          />
        ))}
      </div>

      {/* Progress Indicator */}
      <ProgressIndicator
        selectedSkip={selectedSkip}
        currentStepID={3}
        handleBack={onBack}
      />

      {/* Floating Selection Cart */}
      <FloatingCart
        selectedSkip={selectedSkip}
        onContinue={handleContinue}
        onClear={handleClearSelection}
        isVisible={!!selectedSkip}
      />
    </div>
  );
};

export default SkipSelector;
