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
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    // TODO: Implement forgot password logic
    console.log("Forgot password for:", email);
    setIsSubmitted(true);
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
            {/* Back Button */}
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.7}
              className="flex-row items-center mb-6"
            >
              <Ionicons name="arrow-back" size={24} color="#10b981" />
              <Text className="text-primary font-medium ml-2">Retour</Text>
            </TouchableOpacity>

            {!isSubmitted ? (
              <>
                {/* Title */}
                <View className="items-center mb-8">
                  <View className="w-16 h-16 bg-orange-100 rounded-full items-center justify-center mb-4">
                    <Ionicons name="lock-closed" size={32} color="#f97316" />
                  </View>
                  <Text className="text-3xl font-bold text-orange-600 text-center mb-2">
                    Mot de passe oublié ?
                  </Text>
                  <Text className="text-base text-muted-foreground text-center">
                    Entrez votre adresse email et nous vous enverrons un lien
                    pour réinitialiser votre mot de passe
                  </Text>
                </View>

                {/* Email Input */}
                <View className="mb-8">
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

                {/* Submit Button */}
                <TouchableOpacity
                  onPress={handleSubmit}
                  activeOpacity={0.8}
                  className="bg-primary rounded-xl py-4 items-center justify-center mb-6"
                >
                  <View className="flex-row items-center">
                    <Ionicons name="send-outline" size={20} color="white" />
                    <Text className="text-white text-base font-semibold ml-2">
                      Envoyer le lien
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            ) : (
              <>
                {/* Success Message */}
                <View className="items-center">
                  <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-6">
                    <Ionicons
                      name="checkmark-circle"
                      size={48}
                      color="#10b981"
                    />
                  </View>
                  <Text className="text-2xl font-bold text-foreground text-center mb-4">
                    Email envoyé !
                  </Text>
                  <Text className="text-base text-muted-foreground text-center mb-8">
                    Nous avons envoyé un lien de réinitialisation à{" "}
                    <Text className="font-semibold text-foreground">
                      {email}
                    </Text>
                    . Veuillez vérifier votre boîte de réception.
                  </Text>

                  <TouchableOpacity
                    onPress={() => router.push("/login")}
                    activeOpacity={0.8}
                    className="bg-primary rounded-xl py-4 px-8 items-center justify-center mb-4"
                  >
                    <Text className="text-white text-base font-semibold">
                      Retour à la connexion
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setIsSubmitted(false)}
                    activeOpacity={0.7}
                  >
                    <Text className="text-sm text-primary font-medium">
                      Renvoyer l&apos;email
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* Login Link */}
            {!isSubmitted && (
              <View className="flex-row justify-center items-center">
                <Text className="text-sm text-muted-foreground">
                  Vous vous souvenez de votre mot de passe ?{" "}
                </Text>
                <Link replace href="/login" asChild>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Text className="text-sm text-primary font-semibold">
                      Se connecter
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
