import React from "react";
import { View, Text } from "react-native";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

export default function StepIndicator({
  currentStep,
  totalSteps,
  stepLabels,
}: StepIndicatorProps) {
  return (
    <View className="px-4 py-6">
      {/* Progress Bar */}
      <View className="flex-row items-center mb-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            {/* Step Circle */}
            <View className="items-center">
              <View
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  index < currentStep
                    ? "bg-green-500"
                    : index === currentStep
                      ? "bg-green-600"
                      : "bg-gray-300"
                }`}
              >
                {index < currentStep ? (
                  <Text className="text-white font-bold text-lg">✓</Text>
                ) : (
                  <Text
                    className={`font-bold ${
                      index === currentStep ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              {stepLabels && stepLabels[index] && (
                <Text
                  className={`text-xs mt-1 text-center ${
                    index === currentStep
                      ? "text-green-600 font-semibold"
                      : "text-gray-500"
                  }`}
                  numberOfLines={2}
                  style={{ maxWidth: 70 }}
                >
                  {stepLabels[index]}
                </Text>
              )}
            </View>

            {/* Connecting Line */}
            {index < totalSteps - 1 && (
              <View
                className={`flex-1 h-1 mx-1 ${
                  index < currentStep ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </View>

      {/* Step Counter */}
      <Text className="text-center text-gray-600 text-sm">
        Étape {currentStep + 1} sur {totalSteps}
      </Text>
    </View>
  );
}
