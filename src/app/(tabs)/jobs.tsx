import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function JobsScreen() {
  return (
    <View className="flex-1 bg-gray-50 justify-center items-center px-6">
      <View className="items-center">
        <View className="bg-blue-100 p-6 rounded-full mb-6">
          <Ionicons name="briefcase" size={64} color="#3b82f6" />
        </View>

        <Text className="text-3xl font-bold text-gray-800 mb-3 text-center">
          En Construction
        </Text>

        <Text className="text-lg text-gray-600 text-center mb-8">
          La section Emplois Agricoles sera bientôt disponible
        </Text>

        <View className="bg-white rounded-xl p-6 w-full shadow-sm">
          <Text className="text-base text-gray-700 mb-4 text-center">
            Fonctionnalités à venir :
          </Text>

          <View className="space-y-3">
            <View className="flex-row items-start">
              <Text className="text-green-500 mr-3 text-lg">✓</Text>
              <Text className="text-gray-600 flex-1">
                Recherche d&apos;offres d&apos;emploi agricoles
              </Text>
            </View>

            <View className="flex-row items-start">
              <Text className="text-green-500 mr-3 text-lg">✓</Text>
              <Text className="text-gray-600 flex-1">
                Formulaire de candidature en ligne
              </Text>
            </View>

            <View className="flex-row items-start">
              <Text className="text-green-500 mr-3 text-lg">✓</Text>
              <Text className="text-gray-600 flex-1">
                Publication d&apos;offres par les exploitations
              </Text>
            </View>

            <View className="flex-row items-start">
              <Text className="text-green-500 mr-3 text-lg">✓</Text>
              <Text className="text-gray-600 flex-1">
                Base de données de talents agricoles
              </Text>
            </View>

            <View className="flex-row items-start">
              <Text className="text-green-500 mr-3 text-lg">✓</Text>
              <Text className="text-gray-600 flex-1">
                Mise en relation employeurs/demandeurs
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
