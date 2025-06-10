import React from "react";
import type { Skip } from "../types";
import {
  formatPrice,
  getSkipDisplayName,
  getHirePeriodText,
} from "../utils/formatters";
import { CircleCheckBig, CircleX } from "lucide-react";

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

const FeatureItem: React.FC<FeatureItemProps> = ({
  isAllowed,
  label,
  allowedText = "allowed",
  notAllowedText = "not allowed",
}) => {
  const Icon = isAllowed ? CircleCheckBig : CircleX;
  const iconColor = isAllowed ? "text-green-500" : "text-red-500";
  const statusText = isAllowed ? allowedText : notAllowedText;

  return (
    <div className="flex items-center text-sm text-gray-600">
      <Icon className={`w-4 h-4 mr-2 ${iconColor}`} />
      {label} {statusText}
    </div>
  );
};

const FeaturesSection: React.FC<{ skip: Skip }> = ({ skip }) => (
  <div className="px-6 pb-6">
    <div className="space-y-2">
      <FeatureItem isAllowed={skip.allowed_on_road} label="Road placement" />
      <FeatureItem isAllowed={skip.allows_heavy_waste} label="Heavy waste" />
    </div>
  </div>
);

const SkipCard: React.FC<SkipCardProps> = ({
  skip,
  isSelected,
  onSelect,
  className = "",
}) => {
  const handleSelect = () => {
    onSelect(skip);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === "") {
      event.preventDefault();
      handleSelect();
    }
  };

  return (
    <div
      className={`
        relative bg-white rounded-xl shadow-sm border-2 transition-all duration-200 cursor-pointer
        hover:shadow-lg hover:scale-[1.02] focus-within:ring-2 focus-within:ring-blue-500
        ${
          isSelected
            ? "border-blue-500 bg-blue-50 shadow-lg"
            : "border-gray-200 hover:border-gray-300"
        }
        ${className}
      `}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={`Select ${getSkipDisplayName(skip.size)} for ${formatPrice(
        skip.price_before_vat,
        skip.vat
      )}`}
    >
      {/* Size display */}
      <span className="absolute -top-4 -right-3 font-bold text-white px-3 py-1 rounded-full bg-blue-500 shadow-lg">
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
        <div className="text-sm text-gray-600">
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
                ? "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500"
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
};

export default SkipCard;
