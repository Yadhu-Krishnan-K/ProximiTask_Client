import { useState } from "react";
import { useFormikContext } from "formik"
import { Step2, Step3, Step4, Step5, Step6 } from './Auth';

const ModalSlider = ({ onClose }) => {
  const steps = [Step2, Step3, Step4, Step5, Step6];
  const [step, setStep] = useState(0);
  const {submitForm} = useFormikContext()

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-xl w-full max-w-lg overflow-hidden relative">
        {/* Close button */}
        <div className="w-full flex justify-end mb-2">
          <button
            onClick={() => onClose(false)}
            className="text-xl font-bold text-gray-500 hover:text-red-500"
          >
            ×
          </button>
        </div>

        {/* Sliding steps container */}
        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${step * 100}%)` }}
          >
            {steps.map((StepComponent, index) => (
              <div className="w-full flex-shrink-0" key={index}>
                <StepComponent />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Back
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              onClick={() => {
                submitForm();     // Submit Formik form
                onClose(false);   // Close modal after submission
              }}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalSlider;
