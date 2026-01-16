import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TrainingScreen() {
  return (
    <View className="flex-1 bg-gray-50 justify-center items-center px-6">
      <View className="items-center">
        <View className="bg-purple-100 p-6 rounded-full mb-6">
          <Ionicons name="school" size={64} color="#8b5cf6" />
        </View>

        <Text className="text-3xl font-bold text-gray-800 mb-3 text-center">
          En Construction
        </Text>

        <Text className="text-lg text-gray-600 text-center mb-8">
          La section Formation Agricole sera bientôt disponible
        </Text>

        <View className="bg-white rounded-xl p-6 w-full shadow-sm">
          <Text className="text-base text-gray-700 mb-4 text-center">
            Modules de formation à venir :
          </Text>

          <View className="space-y-3">
            <View className="flex-row items-start">
              <Text className="text-green-500 mr-3 text-lg">✓</Text>
              <Text className="text-gray-600 flex-1">
                Culture sous serre et techniques modernes
              </Text>
            </View>

            <View className="flex-row items-start">
              <Text className="text-green-500 mr-3 text-lg">✓</Text>
              <Text className="text-gray-600 flex-1">
                Typologie des sols et caractérisation
              </Text>
            </View>

            <View className="flex-row items-start">
              <Text className="text-green-500 mr-3 text-lg">✓</Text>
              <Text className="text-gray-600 flex-1">
                Gestion des maladies et ravageurs
              </Text>
            </View>

            <View className="flex-row items-start">
              <Text className="text-green-500 mr-3 text-lg">✓</Text>
              <Text className="text-gray-600 flex-1">
                Irrigation, fertigation et compostage
              </Text>
            </View>

            <View className="flex-row items-start">
              <Text className="text-green-500 mr-3 text-lg">✓</Text>
              <Text className="text-gray-600 flex-1">
                Formation certifiante à Keur Ndiaye Lo
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
