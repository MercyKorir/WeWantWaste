import React, { useState } from "react";

const ErrorTestComponent: React.FC = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("This is a test error");
  }

  return (
    <div className="p-6 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Error Boundary Test</h3>
      <p className="text-gray-600 mb-4">
        Click the button below to trigger an error and test the ErrorBoundary:
      </p>
      <button
        onClick={() => setShouldThrow(true)}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Throw Error
      </button>
    </div>
  );
};

export default ErrorTestComponent;
