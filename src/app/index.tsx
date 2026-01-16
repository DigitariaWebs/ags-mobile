import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import Button from "@/components/ui/button";

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

  if (isOnboardingCompleted === null) {
    return <View className="flex-1 bg-background" />;
  }

  if (!isOnboardingCompleted) {
    router.replace("/onboarding");
  }

  const resetOnboarding = async () => {
    try {
      await AsyncStorage.removeItem("onboardingCompleted");
      setIsOnboardingCompleted(false);
    } catch {
      setIsOnboardingCompleted(false);
    }
  };

  return (
    <View className="flex flex-1 items-center justify-center bg-background gap-4">
      <Text className="text-2xl font-bold text-foreground mb-4">
        Bienvenue sur AGS Mobile !
      </Text>

      <Link href="/(auth)/login" asChild>
        <Button onPress={() => {}} variant="primary">
          <Text className="text-primary-foreground">Se connecter</Text>
        </Button>
      </Link>

      <Link href="/map" asChild>
        <Button onPress={() => {}} variant="primary">
          <Text className="text-primary-foreground">go to map</Text>
        </Button>
      </Link>

      <Button variant="danger" onPress={resetOnboarding}>
        <Text className="text-secondary-foreground">
          Réinitialiser l&apos;introduction
        </Text>
      </Button>
    </View>
  );
}
