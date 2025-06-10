import React, { useState, Suspense } from "react";
import type { Skip, Step } from "../types";
import { formatPrice, getSkipDisplayName } from "../utils/formatters";

const CheckCircle = React.lazy(() =>
  import("lucide-react").then((m) => ({ default: m.CheckCircle }))
);
const ChevronLeft = React.lazy(() =>
  import("lucide-react").then((m) => ({ default: m.ChevronLeft }))
);
const ChevronUp = React.lazy(() =>
  import("lucide-react").then((m) => ({ default: m.ChevronUp }))
);
const Clock = React.lazy(() =>
  import("lucide-react").then((m) => ({ default: m.Clock }))
);
const Info = React.lazy(() =>
  import("lucide-react").then((m) => ({ default: m.Info }))
);

interface ProgressIndicatorProps {
  selectedSkip: Skip | null;
  currentStepID: number;
  handleBack?: () => void;
}

const steps = [
  {
    id: 1,
    name: "Postcode",
    completed: true,
    description: "Enter your postcode to find available services",
  },
  {
    id: 2,
    name: "Waste Type",
    completed: true,
    description: "Select the type of waste you need to dispose of",
  },
  {
    id: 3,
    name: "Select Skip",
    completed: false,
    description: "Choose the right skip size for your needs",
  },
  {
    id: 4,
    name: "Permit Check",
    completed: false,
    description: "Verify if a permit is required for your location",
  },
  {
    id: 5,
    name: "Choose Date",
    completed: false,
    description: "Select your preferred delivery and collection dates",
  },
  {
    id: 6,
    name: "Payment",
    completed: false,
    description: "Complete your order with secure payment",
  },
];

const ProgressIndicator: React.FC<ProgressIndicatorProps> = React.memo(
  ({ selectedSkip, currentStepID, handleBack }) => {
    const [showDetails, setShowDetails] = useState(false);

    const getStepStatus = (step: Step, index: number) => {
      const isCurrent = step.id === currentStepID;
      const isCompleted = step.completed || (index === 2 && selectedSkip);

      if (isCompleted && !isCurrent) return "completed";
      if (isCurrent) return "current";
      return "pending";
    };

    const getStepColors = (status: string) => {
      switch (status) {
        case "completed":
          return "bg-green-500 text-white";
        case "current":
          return "bg-white border-2 border-green-500 text-green-600";
        default:
          return "bg-gray-200 text-gray-400";
      }
    };

    const CompactProgress = () => (
      <div className="flex items-center sm:space-x-2">
        {steps.map((step, index) => {
          const status = getStepStatus(step, index);
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center">
              <div
                className={`
                w-3 sm:w-6 h-3 sm:h-6 p-2.5 sm:p-0 rounded-full flex items-center justify-center transition-all duration-300
                ${getStepColors(status)}
                ${status === "current" ? "shadow-md sm:scale-110" : ""}
              `}
              >
                <span className="text-xs font-bold">{step.id}</span>
              </div>

              {!isLast && (
                <div
                  className={`
                w-4 h-0.5 mx-0.5 sm:mx-1 transition-all duration-300
                ${
                  status === "completed" || index < currentStepID - 1
                    ? "bg-green-500"
                    : "bg-gray-300"
                }
              `}
                />
              )}
            </div>
          );
        })}
      </div>
    );

    const completedSteps = steps.filter(
      (step, index) => step.completed || (index === 2 && selectedSkip)
    ).length;

    return (
      <>
        <nav
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 transition-transform duration-300 ease-in-out"
          aria-label="Progress navigation"
          role="navigation"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between px-2 sm:px-4 py-3">
              {/* Navigation */}
              <button
                onClick={handleBack}
                className="flex items-center px-0 sm:px-6 py-3 text-gray-700 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 transition-colors cursor-pointer"
                aria-label="Go back to previous step"
                type="button"
              >
                <Suspense fallback={null}>
                  <ChevronLeft className="w-5 h-5 sm:mr-2" aria-hidden="true" />
                </Suspense>
                <span className="sr-only">Back</span>
                <span aria-hidden="true" className="ml-2">Back</span>
              </button>
              <div className="flex flex-col items-center" aria-live="polite">
                <span className="text-xs text-gray-700 mb-1 font-medium">
                  Step {currentStepID} of {steps.length}
                </span>
                <CompactProgress />
              </div>

              <button
                onClick={() => {
                  setShowDetails(!showDetails);
                  if (!showDetails) {
                    setTimeout(() => {
                      const details = document.getElementById('progress-details-popup');
                      details?.focus();
                    }, 100);
                  }
                }}
                className="flex items-center space-x-0 sm:space-x-2 sm:px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors sm:cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                aria-expanded={showDetails}
                aria-controls="progress-details-popup"
                type="button"
                aria-label="Toggle Progress Details"
              >
                <Suspense fallback={null}>
                  <Info className="w-4 h-4" aria-hidden="true" />
                </Suspense>
                <span className="hidden sm:block">Details</span>
                <Suspense fallback={null}>
                  <ChevronUp
                    className={`w-6 h-6 transition-transform duration-200 ${showDetails ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </Suspense>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 h-1" aria-hidden="true">
              <div
                className="bg-gradient-to-r from-green-600 to-blue-600 h-1 transition-all duration-500 ease-out"
                style={{ width: `${(completedSteps / steps.length) * 100}%` }}
              />
            </div>
            <span className="sr-only" aria-live="polite">
              {completedSteps} of {steps.length} steps completed
            </span>
          </div>

          {/* Details Popup */}
          {showDetails && (
            <section
              id="progress-details-popup"
              className="border-t border-gray-200 bg-gray-50 max-h-96 overflow-y-auto outline-none"
              tabIndex={-1}
              aria-modal="true"
              role="dialog"
            >
              <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="mb-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Order Progress Details
                  </h3>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2" aria-hidden="true">
                    <div
                      className="bg-gradient-to-r from-green-600 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${(completedSteps / steps.length) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-800">
                    {completedSteps} of {steps.length} steps completed
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {steps.map((step, index) => {
                    const status = getStepStatus(step, index);

                    return (
                      <div
                        key={step.id}
                        className={`
                          p-4 rounded-lg border transition-all duration-200 hover:shadow-md
                          ${
                            status === "completed"
                              ? "bg-green-50 border-green-300"
                              : status === "current"
                              ? "bg-blue-50 border-blue-300 ring-2 ring-blue-200"
                              : "bg-white border-gray-200"
                          }
                        `}
                        aria-current={status === "current" ? "step" : undefined}
                      >
                        <div className="flex items-start space-x-3">
                          <div
                            className={`
                            w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                            ${getStepColors(status)}
                          `}
                            aria-hidden="true"
                          >
                            {status === "completed" ? (
                              <Suspense fallback={null}>
                                <CheckCircle className="w-4 h-4 text-white" aria-hidden="true" />
                              </Suspense>
                            ) : status === "current" ? (
                              <Suspense fallback={null}>
                                <Clock className="w-4 h-4 text-green-700" aria-hidden="true" />
                              </Suspense>
                            ) : (
                              <span className="text-sm font-bold">
                                {step.id}
                              </span>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4
                                className={`
                                font-medium text-sm
                                ${
                                  status === "current"
                                    ? "text-blue-900"
                                    : status === "completed"
                                    ? "text-green-900"
                                    : "text-gray-800"
                                }
                              `}
                                id={`step-title-${step.id}`}
                              >
                                {step.name}
                              </h4>
                              {status === "current" && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-900">
                                  Current
                                </span>
                              )}
                              {status === "completed" && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-900">
                                  Complete
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-800 leading-relaxed mb-2">
                              {step.description}
                            </p>

                            {step.id === 3 && selectedSkip && (
                              <div className="mt-2 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                                <div className="flex items-center space-x-2 mb-1">
                                  <Suspense fallback={null}>
                                    <CheckCircle className="w-4 h-4 text-green-600" aria-hidden="true" />
                                  </Suspense>
                                  <span className="text-xs font-medium text-gray-900">
                                    Skip Selected
                                  </span>
                                </div>
                                <p className="text-sm font-medium text-gray-900 mb-1">
                                  {getSkipDisplayName(selectedSkip.size)}
                                </p>
                                <div className="flex justify-between text-xs text-gray-800">
                                  <span>Size: {selectedSkip.size}</span>
                                  <span className="font-medium text-green-700">
                                    {formatPrice(
                                      selectedSkip.price_before_vat,
                                      selectedSkip.vat
                                    )}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </nav>
      </>
    );
  }
);

export default ProgressIndicator;
