import React, { Suspense } from "react";
import type { Skip } from "../types";
import {
  formatPrice,
  getSkipDisplayName,
  getHirePeriodText,
} from "../utils/formatters";

const CircleCheckBig = React.lazy(() =>
  import("lucide-react").then((m) => ({ default: m.CircleCheckBig }))
);
const CircleX = React.lazy(() =>
  import("lucide-react").then((m) => ({ default: m.CircleX }))
);

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (skip: Skip) => void;
  className?: string;
}

interface FeatureItemProps {
  isAllowed: boolean;
  label: string;
  allowedText?: string;
  notAllowedText?: string;
}

const FeatureItem: React.FC<FeatureItemProps> = React.memo(
  ({
    isAllowed,
    label,
    allowedText = "allowed",
    notAllowedText = "not allowed",
  }) => {
    const Icon = isAllowed ? CircleCheckBig : CircleX;
    const iconColor = isAllowed ? "text-green-700" : "text-red-700";
    const statusText = isAllowed ? allowedText : notAllowedText;

    return (
      <div className="flex items-center text-sm text-gray-800">
        <Suspense fallback={null}>
          <Icon className={`w-4 h-4 mr-2 ${iconColor}`} aria-hidden="true" />
        </Suspense>
        <span className="sr-only">
          {label} {statusText}
        </span>
        <span aria-hidden="true">{label} {statusText}</span>
      </div>
    );
  }
);

const FeaturesSection: React.FC<{ skip: Skip }> = React.memo(({ skip }) => (
  <div className="px-6 pb-6">
    <div className="space-y-2">
      <FeatureItem isAllowed={skip.allowed_on_road} label="Road placement" />
      <FeatureItem isAllowed={skip.allows_heavy_waste} label="Heavy waste" />
    </div>
  </div>
));

const SkipCard: React.FC<SkipCardProps> = React.memo(
  ({ skip, isSelected, onSelect, className = "" }) => {
    const handleSelect = () => {
      onSelect(skip);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleSelect();
      }
    };

    return (
      <div
        className={`
        relative bg-white rounded-xl shadow-sm border-2 transition-all duration-200 cursor-pointer
        hover:shadow-lg hover:scale-[1.02] focus-within:ring-2 focus-within:ring-blue-700
        ${
          isSelected
            ? "border-blue-700 bg-blue-50 shadow-lg"
            : "border-gray-200 hover:border-gray-300"
        }
        ${className}
      `}
        onClick={handleSelect}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="radio"
        aria-checked={isSelected}
        aria-label={`Select ${getSkipDisplayName(skip.size)} for ${formatPrice(
          skip.price_before_vat,
          skip.vat
        )}`}
      >
        {/* Size display */}
        <span className="absolute -top-4 -right-3 font-bold text-white px-3 py-1 rounded-full bg-blue-700 shadow-lg">
          {getSkipDisplayName(skip.size)}
        </span>

        {/* Skip Image */}
        <div className="px-6 pt-6 pb-4">
          <div className="w-full h-48 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center overflow-hidden">
            <div className="relative">
              <div className="w-32 h-20 bg-yellow-500 rounded-t-lg border-4 border-yellow-700 transform perspective-1000 rotate-x-12">
                <div className="absolute inset-2 bg-yellow-600 rounded"></div>
                <div className="absolute top-1 left-1 w-4 h-4 bg-yellow-800 rounded opacity-50"></div>
                <div className="absolute bottom-1 right-1 text-yellow-900 text-xs font-bold">
                  {skip.size}Y
                </div>
              </div>
              <div className="w-36 h-3 bg-yellow-700 rounded-b-sm -mt-1"></div>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="px-6 pb-4">
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {formatPrice(skip.price_before_vat, skip.vat)}
          </div>
          <div className="text-sm text-gray-700 underline">
            {getHirePeriodText(skip.hire_period_days)}
          </div>
        </div>

        {/* Features */}
        <FeaturesSection skip={skip} />

        {/* Selection Button */}
        <div className="px-6 pb-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSelect();
            }}
            className={`
            w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-2
            ${
              isSelected
                ? "bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-700"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-700"
            }
          `}
            aria-label={
              isSelected
                ? "Skip selected"
                : `Select ${getSkipDisplayName(skip.size)}`
            }
          >
            {isSelected ? "Selected" : "Select This Skip"}
          </button>
        </div>
      </div>
    );
  }
);

export default SkipCard;
