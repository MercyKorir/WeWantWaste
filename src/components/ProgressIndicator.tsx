import React from "react";
import type { Skip } from "../types";

interface ProgressIndicatorProps {
  selectedSkip: Skip | null;
  currentStepID: number
}

const steps = [
  { id: 1, name: "Postcode", completed: true },
  { id: 2, name: "Waste Type", completed: true },
  { id: 3, name: "Select Skip", completed: false },
  { id: 4, name: "Permit Check", completed: false },
  { id: 5, name: "Choose Date", completed: false },
  { id: 6, name: "Payment", completed: false },
];

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  selectedSkip,
  currentStepID,
}) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-1 sm:space-x-2">
        {steps.map((step, index) => {
          const isCurrent = step.id === currentStepID;
          const isCompleted = step.completed || (index === 2 && selectedSkip);

          let circleColor = "bg-gray-300";
          if (isCompleted && !isCurrent) {
            circleColor = "bg-green-500";
          } else if (isCurrent && index === 2 && selectedSkip) {
            circleColor = "bg-blue-500";
          } else if (isCurrent) {
            circleColor = "bg-white border-2 border-green-500";
          } else if (index === 2 && selectedSkip) {
            circleColor = "bg-blue-500";
          }

          let lineColor = "bg-gray-300";
          if (index < steps.length - 1) {
            const nextStep = steps[index + 1];
            const isNextCurrent = nextStep.id === currentStepID;
            const isNextCompleted = nextStep.completed || (index + 1 === 2 && selectedSkip);
            if (isNextCompleted || isNextCurrent) {
              lineColor = "bg-green-500";
            }
          }
          return (
            <React.Fragment key={step.id}>
              <div
                className={`w-3 h-3 rounded-full ${circleColor}`}
              ></div>
              {index < steps.length - 1 && (
                <div
                  className={`w-6 sm:w-8 h-1 ${lineColor}`}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
