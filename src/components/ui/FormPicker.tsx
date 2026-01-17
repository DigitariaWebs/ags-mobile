import React from "react";
import { View, Text, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface FormPickerProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  items: { label: string; value: string }[];
  error?: string;
  required?: boolean;
  placeholder?: string;
  enabled?: boolean;
  containerClassName?: string;
}

export default function FormPicker({
  label,
  value,
  onValueChange,
  items,
  error,
  required = false,
  placeholder = "Sélectionner...",
  enabled = true,
  containerClassName = "",
}: FormPickerProps) {
  return (
    <View className={`mb-4 ${containerClassName}`}>
      <Text className="text-gray-700 font-medium mb-2">
        {label}
        {required && <Text className="text-red-500"> *</Text>}
      </Text>
      <View
        className={`bg-white border rounded-lg ${
          error ? "border-red-500" : "border-gray-300"
        } ${!enabled ? "opacity-50" : ""}`}
      >
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          enabled={enabled}
          style={{
            height: Platform.OS === "ios" ? 180 : 50,
          }}
        >
          <Picker.Item
            label={placeholder}
            value=""
            color="#9CA3AF"
            enabled={false}
          />
          {items.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
}
