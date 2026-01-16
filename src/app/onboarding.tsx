import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "@/components/ui/button";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

interface Slide {
  title: string;
  description: string;
  image: any;
  accentColor: string;
}

const slides: Slide[] = [
  {
    title: "Bienvenue sur AGS Mobile",
    description:
      "Connectez les acteurs du secteur agricole sénégalais à travers une plateforme interactive.",
    image: require("@/assets/images/Logo.png"),
    accentColor: "#22c55e",
  },
  {
    title: "Carte Interactive",
    description:
      "Explorez les fermes à travers le Sénégal, consultez les profils et filtrez par type de production.",
    image: require("@/assets/images/Drone.png"),
    accentColor: "#3b82f6",
  },
  {
    title: "Conseils Personnalisés",
    description:
      "Obtenez des recommandations adaptées pour la fertilisation et les traitements phytosanitaires.",
    image: require("@/assets/images/BlackManExplaining.png"),
    accentColor: "#f97316",
  },
  {
    title: "Emploi Agricole",
    description:
      "Trouvez des emplois ou recrutez des talents dans le secteur agricole.",
    image: require("@/assets/images/TwoBlackPplTalking.png"),
    accentColor: "#8b5cf6",
  },
  {
    title: "Formation Agricole",
    description:
      "Apprenez les meilleures pratiques pour les cultures, les maladies et les techniques durables.",
    image: require("@/assets/images/formation.jpg"),
    accentColor: "#ec4899",
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const router = useRouter();

  React.useEffect(() => {
    // Reset values first
    fadeAnim.setValue(0);
    slideAnim.setValue(30);

    // Then animate
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentIndex, fadeAnim, slideAnim]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  const goToNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setCurrentIndex(nextIndex);
    } else {
      completeOnboarding();
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      scrollViewRef.current?.scrollTo({ x: prevIndex * width, animated: true });
      setCurrentIndex(prevIndex);
    }
  };

  const skip = () => {
    completeOnboarding();
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem("onboardingCompleted", "true");
      return router.navigate("/");
    } catch (error) {
      console.error("Error saving onboarding status:", error);
    }
  };

  return (
    <View className="flex-1 bg-background">
      {/* Decorative background gradient */}
      <View className="absolute inset-0 opacity-5">
        <View
          style={{ backgroundColor: slides[currentIndex].accentColor }}
          className="flex-1"
        />
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="flex-1"
      >
        {slides.map((slide, index) => (
          <View
            key={index}
            style={{ width }}
            className="flex-1 justify-center items-center px-6 py-16"
          >
            <Animated.View
              style={{
                opacity: currentIndex === index ? fadeAnim : 1,
                transform: [
                  { translateY: currentIndex === index ? slideAnim : 0 },
                ],
              }}
              className="items-center w-full"
            >
              {/* Bento-grid style image container */}
              <View className="mb-12 relative" style={{ height: height * 0.4 }}>
                {index === 0 ? (
                  // First slide - centered logo
                  <View className="items-center justify-center h-full">
                    <View
                      style={{
                        borderRadius: 120,
                        backgroundColor: `${slide.accentColor}15`,
                      }}
                      className="overflow-hidden p-12"
                    >
                      <Image
                        source={slide.image}
                        className="w-48 h-48"
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                ) : (
                  // Other slides - bento grid layout
                  <View className="relative w-full h-full items-center justify-center">
                    {/* Main large image */}
                    <View
                      style={{
                        borderRadius: 32,
                        backgroundColor: `${slide.accentColor}10`,
                      }}
                      className="overflow-hidden absolute w-60 h-72 z-10 shadow-lg shadow-black/10"
                    >
                      <Image
                        source={slide.image}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    </View>

                    {/* Decorative smaller images */}
                    <View
                      style={{
                        borderRadius: 24,
                        backgroundColor: `${slide.accentColor}08`,
                      }}
                      className="overflow-hidden absolute top-0 left-4 w-24 h-32 shadow-md shadow-black/10"
                    >
                      <Image
                        source={slide.image}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    </View>

                    <View
                      style={{
                        borderRadius: 24,
                        backgroundColor: `${slide.accentColor}08`,
                      }}
                      className="overflow-hidden absolute bottom-4 right-6 w-28 h-28 shadow-md shadow-black/10"
                    >
                      <Image
                        source={slide.image}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    </View>

                    <View
                      style={{
                        borderRadius: 20,
                        backgroundColor: `${slide.accentColor}08`,
                      }}
                      className="overflow-hidden absolute top-12 right-2 w-20 h-24 shadow-md shadow-black/10"
                    >
                      <Image
                        source={slide.image}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    </View>
                  </View>
                )}
              </View>

              {/* Text content */}
              <View className="items-center px-4">
                <Text className="text-3xl font-bold text-foreground text-center mb-4 leading-10">
                  {slide.title}
                </Text>
                <View
                  style={{ backgroundColor: slide.accentColor }}
                  className="w-16 h-1 rounded-full mb-6"
                />
                <Text className="text-lg text-muted-foreground text-center leading-7 px-4">
                  {slide.description}
                </Text>
              </View>
            </Animated.View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom section */}
      <View className="px-6 pb-10">
        {/* Indicators */}
        <View className="flex-row justify-center mb-8">
          {slides.map((slide, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                scrollViewRef.current?.scrollTo({
                  x: index * width,
                  animated: true,
                });
                setCurrentIndex(index);
              }}
              activeOpacity={0.7}
            >
              <Animated.View
                style={{
                  backgroundColor:
                    index === currentIndex ? slide.accentColor : "#00000020",
                }}
                className={`h-2.5 rounded-full mx-1.5 ${
                  index === currentIndex ? "w-10" : "w-2.5"
                }`}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Navigation */}
        <View className="gap-4">
          <Button variant="primary" onPress={goToNext}>
            {currentIndex === slides.length - 1 ? "Commencer" : "Suivant"}
          </Button>

          <View className="flex-row justify-between items-center px-2">
            {currentIndex > 0 ? (
              <TouchableOpacity onPress={goToPrev} activeOpacity={0.7}>
                <Text
                  style={{ color: slides[currentIndex].accentColor }}
                  className="font-semibold text-base"
                >
                  ← Précédent
                </Text>
              </TouchableOpacity>
            ) : (
              <View />
            )}

            {currentIndex < slides.length - 1 && (
              <TouchableOpacity onPress={skip} activeOpacity={0.7}>
                <Text className="text-muted-foreground font-medium text-base">
                  Passer
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
