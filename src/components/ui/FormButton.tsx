import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

interface FormButtonProps {
  onPress: () => void;
  title: string;
  variant?: "primary" | "secondary" | "outline" | "danger";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export default function FormButton({
  onPress,
  title,
  variant = "primary",
  disabled = false,
  loading = false,
  className = "",
}: FormButtonProps) {
  const getButtonStyles = () => {
    if (disabled) {
      return "bg-gray-300";
    }
    switch (variant) {
      case "primary":
        return "bg-green-600";
      case "secondary":
        return "bg-gray-600";
      case "danger":
        return "bg-red-600";
      case "outline":
        return "bg-white border-2 border-green-600";
      default:
        return "bg-green-600";
    }
  };

  const getTextStyles = () => {
    if (disabled) {
      return "text-gray-500";
    }
    switch (variant) {
      case "outline":
        return "text-green-600";
      case "danger":
        return "text-white";
      default:
        return "text-white";
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`py-4 px-6 rounded-lg items-center justify-center ${getButtonStyles()} ${className}`}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" ? "#16a34a" : "#fff"} />
      ) : (
        <Text className={`font-semibold text-base ${getTextStyles()}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
