import { useEffect, useRef, useState } from "react";

interface Step {
  name: string;
  Component: React.FC;
}

interface CheckoutStepperProps {
  stepsConfig: Step[];
}

const CheckoutStepper: React.FC<CheckoutStepperProps> = ({ stepsConfig = [] }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [margins, setMargins] = useState<{ marginLeft: number; marginRight: number }>({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef<(HTMLDivElement | null)[]>([]); // Reference to step elements

  useEffect(() => {
    if (stepRef.current[0] && stepRef.current[stepsConfig.length - 1]) {
      const firstStepWidth = stepRef.current[0]?.offsetWidth || 0; // Safe null access
      const lastStepWidth = stepRef.current[stepsConfig.length - 1]?.offsetWidth || 0; // Safe null access
      setMargins({
        marginLeft: firstStepWidth / 2,
        marginRight: lastStepWidth / 2,
      });
    }
  }, [stepsConfig.length]); // Removed stepRef from dependencies as it's constant

  if (!stepsConfig.length) {
    return <></>;
  }

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === stepsConfig.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

  return (
    <>
      <div className="relative flex justify-between items-center mb-[20px]">
        {stepsConfig.map((step, index) => {
          return (
            <div
              key={step.name}
              ref={(el) => { stepRef.current[index] = el; }} // Ensured correct assignment
              className={`flex flex-col items-center ${
                currentStep > index + 1 || isComplete ? "complete" : ""
              } ${currentStep === index + 1 ? "active" : ""}`}
            >
              <div className="step-number w-8 h-8 rounded-full bg-[#f2f4f7] flex justify-center items-center mb-[5px] z-[2]">
                {currentStep > index + 1 || isComplete ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )}
              </div>
              <div className="text-[14px]">{step.name}</div>
            </div>
          );
        })}

        <div
          className="absolute left-0 h-[4px] top-[25%] bg-[#f2f4f7]"//progress-bar/
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`, // Corrected width calculation
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="bg-[#36b516] h-full transition ease duration-200"//progress
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div>
      </div>

      {ActiveComponent && <ActiveComponent />}

      {!isComplete && (
        <button className="w-[200px] bg-[#ff502a] rounded-lg text-white p-2 text-center text-sm" onClick={handleNext}>
          {currentStep === stepsConfig.length ? "Finish" : "Continue"}
        </button>
      )}
    </>
  );
};

export default CheckoutStepper;