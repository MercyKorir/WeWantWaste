import React, { useEffect, useState } from "react";
import type { Skip } from "../types";
import {
  getSkipDisplayName,
  formatPriceWithVat,
  getHirePeriodText,
} from "../utils/formatters";
import { ShoppingCart, X, Check, ArrowRight, Trash2 } from "lucide-react";

interface FloatingCartProps {
  selectedSkip: Skip | null;
  onContinue: () => void;
  onClear: () => void;
  isVisible: boolean;
}

const FloatingCart: React.FC<FloatingCartProps> = ({
  selectedSkip,
  onContinue,
  onClear,
  isVisible,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (selectedSkip && !isVisible) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [selectedSkip, isVisible]);

  if (!selectedSkip) return null;

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleContinue = () => {
    onContinue();
    setIsExpanded(false);
  };

  const handleClear = () => {
    onClear();
    setIsExpanded(false);
  };

  const priceBreakdown = formatPriceWithVat(
    selectedSkip.price_before_vat,
    selectedSkip.vat
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* notification badge */}
      {isAnimating && (
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-ping">
          <Check className="w-3 h-3 text-white" />
        </div>
      )}

      {/* Collapsed */}
      {!isExpanded && (
        <button
          onClick={handleToggleExpanded}
          className="relative bg-blue-600 hover:bg-blue-700 text-white p-5 sm:p-6 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 group animate-bounce-subtle sm:cursor-pointer"
          aria-label="View selected skip"
        >
          <ShoppingCart className="w-7 h-7 sm:w-8 sm:h-8" />

          {/* Badge indicator */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">1</span>
          </div>

          {/* Hover display */}
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
            <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
              {getSkipDisplayName(selectedSkip.size)} Selected
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </button>
      )}

      {/* Expanded */}
      {isExpanded && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 transform animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Selected Skip</h3>
            </div>
            <button
              onClick={handleToggleExpanded}
              className="p-1 hover:bg-gray-100 sm:bg-gray-100 rounded-full transition-colors sm:cursor-pointer"
              aria-label="Minimize cart"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Skip details */}
          <div className="p-4">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="relative">
                  <div className="w-8 h-5 bg-yellow-500 rounded-t border-2 border-yellow-700">
                    <div className="absolute bottom-0 right-0 text-yellow-900 text-[8px] font-bold">
                      {selectedSkip.size}Y
                    </div>
                  </div>
                  <div className="w-9 h-1 bg-yellow-700 rounded-b-sm -mt-0.5"></div>
                </div>
              </div>

              {/* Skip info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 mb-1">
                  {getSkipDisplayName(selectedSkip.size)}
                </h4>
                <div className="space-y-1 text-sm">
                  {/* Price breakdown */}
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="text-gray-900">
                        {priceBreakdown.beforeVat}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        VAT ({selectedSkip.vat}%):
                      </span>
                      <span className="text-gray-900">
                        {priceBreakdown.vatAmount}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-gray-200">
                      <span className="font-medium text-gray-900">Total:</span>
                      <span className="font-semibold text-gray-900">
                        {priceBreakdown.total}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-gray-600">Period:</span>
                    <span className="text-gray-900">
                      {getHirePeriodText(selectedSkip.hire_period_days)}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-3 mt-2 text-xs">
                  <div
                    className={`flex items-center ${
                      selectedSkip.allowed_on_road
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedSkip.allowed_on_road ? (
                      <Check className="w-3 h-3 mr-1" />
                    ) : (
                      <X className="w-3 h-3 mr-1" />
                    )}
                    Road
                  </div>
                  <div
                    className={`flex items-center ${
                      selectedSkip.allows_heavy_waste
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedSkip.allows_heavy_waste ? (
                      <Check className="w-3 h-3 mr-1" />
                    ) : (
                      <X className="w-3 h-3 mr-1" />
                    )}
                    Heavy
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 space-y-2">
            <button
              onClick={handleContinue}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 sm:cursor-pointer"
            >
              <span>Continue with This Skip</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleClear}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 sm:cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Selection</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingCart;
