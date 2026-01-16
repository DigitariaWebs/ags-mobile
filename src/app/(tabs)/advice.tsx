import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AdviceScreen() {
  return (
    <View className="flex-1 bg-gray-50 justify-center items-center px-6">
      <View className="items-center">
        <View className="bg-yellow-100 p-6 rounded-full mb-6">
          <Ionicons name="construct" size={64} color="#f59e0b" />
        </View>

        <Text className="text-3xl font-bold text-gray-800 mb-3 text-center">
          En Construction
        </Text>

        <Text className="text-lg text-gray-600 text-center mb-8">
          La section Conseils Agricoles sera bientôt disponible
        </Text>

        <View className="bg-white rounded-xl p-6 w-full shadow-sm">
          <Text className="text-base text-gray-700 mb-4 text-center">
            Fonctionnalités à venir :
          </Text>

          <View className="space-y-3">
            <View className="flex-row items-start">
              <Text className="text-green-500 mr-3 text-lg">✓</Text>
              <Text className="text-gray-600 flex-1">
                Recommandations de fertilisation personnalisées
              </Text>
            </View>

            <View className="flex-row items-start">
              <Text className="text-green-500 mr-3 text-lg">✓</Text>
              <Text className="text-gray-600 flex-1">
                Programme de traitement phytosanitaire
              </Text>
            </View>

            <View className="flex-row items-start">
              <Text className="text-green-500 mr-3 text-lg">✓</Text>
              <Text className="text-gray-600 flex-1">
                Conseils basés sur le type de sol et la culture
              </Text>
            </View>

            <View className="flex-row items-start">
              <Text className="text-green-500 mr-3 text-lg">✓</Text>
              <Text className="text-gray-600 flex-1">
                Itinéraires techniques adaptés
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
