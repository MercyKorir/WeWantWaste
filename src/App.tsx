import { useState } from "react";
import SkipDataTest from "./components/tests/SkipDataTest";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorTestComponent from "./components/tests/ErrorTestComponent";
import ErrorTestWithAPI from "./components/tests/ErrorTestWithAPI";
import "./styles/App.css";

function App() {
  const [showTests, setShowTests] = useState(false);

  return (
    <div className="App min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold text-center py-8">
          WeWantWaste Skip Selector
        </h1>

        <div className="text-center mb-8">
          <button
            onClick={() => setShowTests(!showTests)}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            {showTests ? "Hide Tests" : "Show Error Tests"}
          </button>
        </div>

        {showTests && (
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <ErrorBoundary>
              <ErrorTestComponent />
            </ErrorBoundary>

            <ErrorBoundary>
              <ErrorTestWithAPI />
            </ErrorBoundary>
          </div>
        )}

        <ErrorBoundary>
          <SkipDataTest />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
