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
import { Picker } from "@react-native-picker/picker";

export default function Signup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSignup = () => {
    // TODO: Implement signup logic
    console.log("Signup", {
      firstName,
      lastName,
      gender,
      email,
      phone,
      password,
      confirmPassword,
      acceptTerms,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Content */}
        <View className="flex-1 justify-center items-center px-6 py-12">
          <View className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
            {/* Title */}
            <Text className="text-3xl font-bold text-orange-600 text-center mb-2">
              Inscription
            </Text>
            <Text className="text-base text-muted-foreground text-center mb-8">
              Créez votre compte pour accéder à nos services
            </Text>

            {/* Progress Indicator */}
            <View className="flex-row justify-center mb-6">
              <View className="flex-row items-center">
                <View
                  className={`w-8 h-8 rounded-full items-center justify-center ${
                    currentStep >= 1 ? "bg-primary" : "bg-gray-300"
                  }`}
                >
                  <Text className="text-white font-bold text-sm">1</Text>
                </View>
                <View
                  className={`w-12 h-1 ${
                    currentStep >= 2 ? "bg-primary" : "bg-gray-300"
                  }`}
                />
                <View
                  className={`w-8 h-8 rounded-full items-center justify-center ${
                    currentStep >= 2 ? "bg-primary" : "bg-gray-300"
                  }`}
                >
                  <Text className="text-white font-bold text-sm">2</Text>
                </View>
                <View
                  className={`w-12 h-1 ${
                    currentStep >= 3 ? "bg-primary" : "bg-gray-300"
                  }`}
                />
                <View
                  className={`w-8 h-8 rounded-full items-center justify-center ${
                    currentStep >= 3 ? "bg-primary" : "bg-gray-300"
                  }`}
                >
                  <Text className="text-white font-bold text-sm">3</Text>
                </View>
              </View>
            </View>

            {/* Section 1: Personal Information */}
            {currentStep === 1 && (
              <View className="mb-6">
                <View className="flex-row items-center mb-4">
                  <View className="w-8 h-8 bg-primary rounded-full items-center justify-center mr-2">
                    <Text className="text-white font-bold text-sm">1</Text>
                  </View>
                  <Text className="text-lg font-semibold text-foreground">
                    Informations personnelles
                  </Text>
                </View>

                {/* First Name Input */}
                <View className="mb-4">
                  <Text className="text-sm font-medium text-foreground mb-2">
                    Prénom <Text className="text-red-500">*</Text>
                  </Text>
                  <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
                    <Ionicons name="person-outline" size={20} color="#10b981" />
                    <TextInput
                      className="flex-1 ml-3 text-base text-foreground"
                      placeholder="Votre prénom"
                      placeholderTextColor="#9ca3af"
                      value={firstName}
                      onChangeText={setFirstName}
                      autoCapitalize="words"
                    />
                  </View>
                </View>

                {/* Last Name Input */}
                <View className="mb-4">
                  <Text className="text-sm font-medium text-foreground mb-2">
                    Nom de famille <Text className="text-red-500">*</Text>
                  </Text>
                  <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
                    <Ionicons name="person-outline" size={20} color="#10b981" />
                    <TextInput
                      className="flex-1 ml-3 text-base text-foreground"
                      placeholder="Votre nom de famille"
                      placeholderTextColor="#9ca3af"
                      value={lastName}
                      onChangeText={setLastName}
                      autoCapitalize="words"
                    />
                  </View>
                </View>

                {/* Gender Select */}
                <View className="mb-0">
                  <Text className="text-sm font-medium text-foreground mb-2">
                    Genre
                  </Text>
                  <View className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                    <Picker
                      selectedValue={gender}
                      onValueChange={(itemValue) => setGender(itemValue)}
                      style={{ height: 50 }}
                    >
                      <Picker.Item label="Sélectionnez votre genre" value="" />
                      <Picker.Item label="Homme" value="male" />
                      <Picker.Item label="Femme" value="female" />
                      <Picker.Item label="Autre" value="other" />
                    </Picker>
                  </View>
                </View>
              </View>
            )}

            {/* Section 2: Contact Information */}
            {currentStep === 2 && (
              <View className="mb-6">
                <View className="flex-row items-center mb-4">
                  <View className="w-8 h-8 bg-primary rounded-full items-center justify-center mr-2">
                    <Text className="text-white font-bold text-sm">2</Text>
                  </View>
                  <Text className="text-lg font-semibold text-foreground">
                    Coordonnées
                  </Text>
                </View>

                {/* Email Input */}
                <View className="mb-4">
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

                {/* Phone Input */}
                <View className="mb-0">
                  <Text className="text-sm font-medium text-foreground mb-2">
                    Téléphone
                  </Text>
                  <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
                    <Ionicons name="call-outline" size={20} color="#10b981" />
                    <TextInput
                      className="flex-1 ml-3 text-base text-foreground"
                      placeholder="Votre numéro de téléphone"
                      placeholderTextColor="#9ca3af"
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="phone-pad"
                      autoComplete="tel"
                    />
                  </View>
                </View>
              </View>
            )}

            {/* Section 3: Password & Terms */}
            {currentStep === 3 && (
              <View className="mb-6">
                <View className="flex-row items-center mb-4">
                  <View className="w-8 h-8 bg-primary rounded-full items-center justify-center mr-2">
                    <Text className="text-white font-bold text-sm">3</Text>
                  </View>
                  <Text className="text-lg font-semibold text-foreground">
                    Mot de passe et conditions
                  </Text>
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

                {/* Confirm Password Input */}
                <View className="mb-4">
                  <Text className="text-sm font-medium text-foreground mb-2">
                    Confirmer le mot de passe{" "}
                    <Text className="text-red-500">*</Text>
                  </Text>
                  <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="#10b981"
                    />
                    <TextInput
                      className="flex-1 ml-3 text-base text-foreground"
                      placeholder="Confirmez votre mot de passe"
                      placeholderTextColor="#9ca3af"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                      autoComplete="password"
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name={
                          showConfirmPassword
                            ? "eye-off-outline"
                            : "eye-outline"
                        }
                        size={20}
                        color="#9ca3af"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Terms & Conditions */}
                <View className="mb-0">
                  <TouchableOpacity
                    onPress={() => setAcceptTerms(!acceptTerms)}
                    activeOpacity={0.7}
                    className="flex-row items-start"
                  >
                    <View
                      className={`w-5 h-5 rounded border-2 mr-3 mt-0.5 items-center justify-center ${
                        acceptTerms
                          ? "bg-primary border-primary"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      {acceptTerms && (
                        <Ionicons name="checkmark" size={14} color="white" />
                      )}
                    </View>
                    <Text className="flex-1 text-sm text-foreground">
                      J&apos;accepte les{" "}
                      <Text className="text-primary font-medium">
                        conditions d&apos;utilisation
                      </Text>{" "}
                      et la{" "}
                      <Text className="text-primary font-medium">
                        politique de confidentialité
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Navigation Buttons */}
            <View className="flex-row justify-between items-center mb-6">
              {currentStep > 1 ? (
                <TouchableOpacity
                  onPress={handlePrevious}
                  activeOpacity={0.8}
                  className="flex-1 mr-2 bg-gray-200 rounded-xl py-3.5 items-center justify-center"
                >
                  <View className="flex-row items-center">
                    <Ionicons name="arrow-back" size={20} color="#374151" />
                    <Text className="text-gray-700 text-base font-semibold ml-2">
                      Précédent
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <View className="flex-1 mr-2" />
              )}

              {currentStep < 3 ? (
                <TouchableOpacity
                  onPress={handleNext}
                  activeOpacity={0.8}
                  className="flex-1 ml-2 bg-primary rounded-xl py-3.5 items-center justify-center"
                >
                  <View className="flex-row items-center">
                    <Text className="text-white text-base font-semibold mr-2">
                      Suivant
                    </Text>
                    <Ionicons name="arrow-forward" size={20} color="white" />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleSignup}
                  activeOpacity={0.8}
                  className="flex-1 ml-2 bg-primary rounded-xl py-3.5 items-center justify-center"
                >
                  <View className="flex-row items-center">
                    <Ionicons
                      name="person-add-outline"
                      size={20}
                      color="white"
                    />
                    <Text className="text-white text-base font-semibold ml-2">
                      S&apos;inscrire
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>

            {/* Login Link */}
            <View className="flex-row justify-center items-center">
              <Text className="text-sm text-muted-foreground">
                Vous avez déjà un compte ?{" "}
              </Text>
              <Link replace href="/login" asChild>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text className="text-sm text-primary font-semibold">
                    Se connecter
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
