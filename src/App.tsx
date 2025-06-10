import { useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import SkipSelector from "./components/SkipSelector";
import Header from "./components/Common/Header";
import type { Skip } from "./types";
import { formatPrice } from "./utils/formatters";
import "./styles/App.css";

function App() {
  const [, setSelectedSkip] = useState<Skip | null>(null);

  const handleSkipSelected = (skip: Skip) => {
    setSelectedSkip(skip);
  };

  const handleContinue = (skip: Skip) => {
    alert(
      `Continuing with ${skip.size} Yard Skip for ${formatPrice(
        skip.price_before_vat,
        skip.vat
      )}`
    );
  };

  const handleBack = () => {
    alert("Going back to previous step");
  };

  return (
    <ErrorBoundary>
      <div className="App min-h-screen bg-gray-50">
        <Header />
        <SkipSelector
          postcode="NR32"
          area="Lowestoft"
          onSkipSelected={handleSkipSelected}
          onContinue={handleContinue}
          onBack={handleBack}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
