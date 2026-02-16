import React from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  required?: boolean;
  containerClassName?: string;
  edit?: boolean;
  onEditPress?: () => void;
}

export default function FormInput({
  label,
  error,
  required = false,
  containerClassName = "",
  edit = false,
  onEditPress,
  ...props
}: FormInputProps) {
  return (
    <View className={`mb-4 ${containerClassName}`}>
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-gray-700 font-medium">
          {label}
          {required && <Text className="text-red-500"> *</Text>}
        </Text>
      </View>

      <View className="relative" pointerEvents="box-none">
        <TextInput
          className={`bg-white border rounded-lg px-4 py-3 text-base pr-16 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          placeholderTextColor="#9CA3AF"
          {...props}
        />

        {edit && (
          <TouchableOpacity
            className="absolute right-3 top-1/2 -translate-y-1/2 z-50 bg-primary rounded-lg px-3 py-2 justify-center items-center opacity-90"
            activeOpacity={0.7}
            onPress={onEditPress}
          >
            <Text className="text-white font-semibold text-sm">Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
}
