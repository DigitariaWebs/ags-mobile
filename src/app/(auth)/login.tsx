import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // TODO: Implement login logic
    console.log("Login", { email, password, rememberMe });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        {/* Content */}
        <View className="flex-1 justify-center items-center px-6 py-12">
          <View className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
            {/* Title */}
            <Text className="text-3xl font-bold text-orange-600 text-center mb-2">
              Connexion
            </Text>
            <Text className="text-base text-muted-foreground text-center mb-8">
              Connectez-vous pour accéder à votre espace personnel
            </Text>

            {/* Email Input */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-foreground mb-2">
                Email <Text className="text-red-500">*</Text>
              </Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
                <Ionicons name="mail-outline" size={20} color="#10b981" />
                <TextInput
                  className="flex-1 ml-3 text-base text-foreground"
                  placeholder="votre@email.com"
                  placeholderTextColor="#9ca3af"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-foreground mb-2">
                Mot de passe <Text className="text-red-500">*</Text>
              </Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#10b981"
                />
                <TextInput
                  className="flex-1 ml-3 text-base text-foreground"
                  placeholder="Votre mot de passe"
                  placeholderTextColor="#9ca3af"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#9ca3af"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Remember Me & Forgot Password */}
            <View className="flex-row justify-between items-center mb-8">
              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                activeOpacity={0.7}
                className="flex-row items-center"
              >
                <View
                  className={`w-5 h-5 rounded border-2 mr-2 items-center justify-center ${
                    rememberMe
                      ? "bg-primary border-primary"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {rememberMe && (
                    <Ionicons name="checkmark" size={14} color="white" />
                  )}
                </View>
                <Text className="text-sm text-foreground">
                  Se souvenir de moi
                </Text>
              </TouchableOpacity>

              <Link href="/(auth)/forgot-password" asChild>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text className="text-sm text-primary font-medium">
                    Mot de passe oublié ?
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              activeOpacity={0.8}
              className="bg-primary rounded-xl py-4 items-center justify-center mb-6"
            >
              <View className="flex-row items-center">
                <Ionicons name="log-in-outline" size={20} color="white" />
                <Text className="text-white text-base font-semibold ml-2">
                  Se connecter
                </Text>
              </View>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View className="flex-row justify-center items-center">
              <Text className="text-sm text-muted-foreground">
                Vous n&apos;avez pas de compte ?{" "}
              </Text>
              <Link replace href="/(auth)/signup" asChild>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text className="text-sm text-primary font-semibold">
                    Créer un compte
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
