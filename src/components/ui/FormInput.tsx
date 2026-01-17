import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  required?: boolean;
  containerClassName?: string;
}

export default function FormInput({
  label,
  error,
  required = false,
  containerClassName = "",
  ...props
}: FormInputProps) {
  return (
    <View className={`mb-4 ${containerClassName}`}>
      <Text className="text-gray-700 font-medium mb-2">
        {label}
        {required && <Text className="text-red-500"> *</Text>}
      </Text>
      <TextInput
        className={`bg-white border rounded-lg px-4 py-3 text-base ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
}
