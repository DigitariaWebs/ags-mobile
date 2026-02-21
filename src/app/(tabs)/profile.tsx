import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@/contexts/UserContext";

export default function ProfileScreen() {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useUser();

  const handleLogout = () => {
    setCurrentUser(null);
    router.replace(__DEV__ ? "/(auth)/dev-login" : "/(auth)/login");
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {/* Header */}
      <View className="bg-primary px-6 pt-16 pb-10 items-center">
        <View className="w-24 h-24 rounded-full bg-white/20 items-center justify-center mb-4">
          <Ionicons name="person" size={48} color="white" />
        </View>
        <Text className="text-white text-2xl font-bold">
          {currentUser
            ? `${currentUser.firstName} ${currentUser.lastName}`
            : "Utilisateur"}
        </Text>
        <Text className="text-white/70 text-sm mt-1">
          {currentUser?.email ?? "utilisateur@email.com"}
        </Text>
      </View>

      <View className="flex-1 px-6 py-6">
        {/* Account Section */}
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Compte
        </Text>
        <View className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
          <TouchableOpacity
            onPress={() => router.push("/account/personal-info")}
            activeOpacity={0.7}
            className="flex-row items-center px-4 py-4 border-b border-gray-100"
          >
            <View className="w-9 h-9 rounded-full bg-primary/10 items-center justify-center mr-3">
              <Ionicons name="person-outline" size={18} color="#10b981" />
            </View>
            <Text className="flex-1 text-base text-foreground">
              Informations personnelles
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(auth)/change-password")}
            activeOpacity={0.7}
            className="flex-row items-center px-4 py-4 border-b border-gray-100"
          >
            <View className="w-9 h-9 rounded-full bg-primary/10 items-center justify-center mr-3">
              <Ionicons name="lock-closed-outline" size={18} color="#10b981" />
            </View>
            <Text className="flex-1 text-base text-foreground">
              Changer le mot de passe
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/account/notifications")}
            activeOpacity={0.7}
            className="flex-row items-center px-4 py-4"
          >
            <View className="w-9 h-9 rounded-full bg-primary/10 items-center justify-center mr-3">
              <Ionicons
                name="notifications-outline"
                size={18}
                color="#10b981"
              />
            </View>
            <Text className="flex-1 text-base text-foreground">
              Notifications
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Support
        </Text>
        <View className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
          <TouchableOpacity
            onPress={() => router.push("/support/help")}
            activeOpacity={0.7}
            className="flex-row items-center px-4 py-4 border-b border-gray-100"
          >
            <View className="w-9 h-9 rounded-full bg-primary/10 items-center justify-center mr-3">
              <Ionicons name="help-circle-outline" size={18} color="#10b981" />
            </View>
            <Text className="flex-1 text-base text-foreground">Aide</Text>
            <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/support/terms")}
            activeOpacity={0.7}
            className="flex-row items-center px-4 py-4"
          >
            <View className="w-9 h-9 rounded-full bg-primary/10 items-center justify-center mr-3">
              <Ionicons
                name="document-text-outline"
                size={18}
                color="#10b981"
              />
            </View>
            <Text className="flex-1 text-base text-foreground">
              Conditions d&apos;utilisation
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.8}
          className="flex-row items-center justify-center bg-red-50 border border-red-200 rounded-2xl py-4"
        >
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text className="text-red-500 font-semibold text-base ml-2">
            Se déconnecter
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
