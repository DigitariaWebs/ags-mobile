import React, { useState, useEffect } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Index() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<
    boolean | null
  >(null);

  const router = useRouter();

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem("onboardingCompleted");
        setIsOnboardingCompleted(value === "true");
      } catch {
        setIsOnboardingCompleted(false);
      }
    };
    checkOnboarding();
  }, []);

  useEffect(() => {
    if (isOnboardingCompleted === null || router === null) return;

    if (!isOnboardingCompleted) {
      router.replace("/onboarding");
    } else if (__DEV__) {
      router.replace("/(auth)/dev-login");
    } else {
      router.replace("/(auth)/login");
    }
  }, [isOnboardingCompleted, router]);

  return <View className="flex-1 bg-background" />;
}
