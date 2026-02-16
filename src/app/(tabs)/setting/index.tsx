import React, { useState } from "react";
import { View, Text, Image, ScrollView, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import FormButton from "@/components/ui/FormButton";
import RecruiterForm from "../../../components/setting/RecruiterForm";
import SeekerForm from "../../../components/setting/SeekerForm";

// Enhanced user data
const IS_RECRUITER = false;
const user = IS_RECRUITER
  ? {
      name: "Mamadou Ndiaye",
      email: "recruteur@ags.com",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      role: "Recruteur Senior",
      roleIcon: "👨‍💼",
    }
  : {
      name: "Fatou Diop",
      email: "fatou.diop@email.com",
      avatar:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      role: "Technicienne Agricole",
      roleIcon: "🌾",
    };

export default function SettingIndex() {
  const [editMode, setEditMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-gray-900">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: 40,
          paddingHorizontal: 20,
          paddingTop: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View className="items-center mb-8">
          <View className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <View className="bg-gradient-to-r from-blue-500 to-purple-600 h-28" />
            <View className="-mt-20 items-center px-6 pb-8">
              <View className="bg-white dark:bg-gray-900 rounded-full p-1 shadow-2xl border-4 border-white dark:border-gray-800">
                <Image
                  source={{ uri: user.avatar }}
                  className="w-24 h-24 rounded-full shadow-2xl"
                />
              </View>
              <Text className="text-2xl font-black text-gray-900 dark:text-white mt-4 mb-1 tracking-tight">
                {user.name}
              </Text>
              <View className="flex-row items-center bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full mb-6">
                <Text className="text-green-600 dark:text-green-400 text-xl mr-2">
                  {user.roleIcon}
                </Text>
                <Text className="text-green-600 dark:text-green-400 font-semibold">
                  {user.role}
                </Text>
              </View>
              <Text className="text-gray-600 dark:text-gray-300 text-center text-sm mb-8 leading-relaxed px-4">
                {IS_RECRUITER
                  ? "Recruteur expérimenté dans le secteur agricole et la gestion de main-d'œuvre rurale."
                  : "Passionnée par l'innovation agricole, la technologie et le développement rural au Sénégal."}
              </Text>
            </View>
          </View>
        </View>

        {/* Edit Form - Appears ABOVE buttons when active */}
        {editMode && (
          <View className="mb-8 w-full">
            <View className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 w-full">
              <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center tracking-tight w-full">
                📝 Modifier votre profil
              </Text>
              {IS_RECRUITER ? (
                <RecruiterForm editMode />
              ) : (
                <SeekerForm editMode />
              )}
            </View>
          </View>
        )}

        {/* Action Buttons Grid - Always at bottom */}
        <View className="flex-row flex-wrap justify-center gap-4 px-4">
          <View className="flex-1 min-w-[140px]">
            <FormButton
              title={editMode ? "❌ Annuler" : "✏️ Modifier"}
              onPress={() => setEditMode((v) => !v)}
              variant={editMode ? "secondary" : "primary"}
              className="py-4 shadow-xl rounded-2xl"
            />
          </View>
          <View className="flex-1 min-w-[140px]">
            <FormButton
              title={darkMode ? "☀️ Clair" : "🌙 Sombre"}
              onPress={() => setDarkMode((v) => !v)}
              variant="outline"
              className="py-4 shadow-xl rounded-2xl border-2"
            />
          </View>
          <View className="flex-1 min-w-[140px]">
            <FormButton
              title="🚪 Déconnexion"
              onPress={() => router.replace("/(auth)/login")}
              variant="danger"
              className="py-4 shadow-xl rounded-2xl bg-red-500/90"
            />
          </View>
        </View>
        {/* Additional Settings Sections */}
        <View className="mt-12 space-y-8">
          {/* Language Selection */}
          <View>
            <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Langue
            </Text>
            <View className="flex-row gap-3">
              <View className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
                <Text className="text-gray-700 dark:text-gray-200">
                  Français
                </Text>
              </View>
              <View className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full opacity-60">
                <Text className="text-gray-400 dark:text-gray-500">
                  English
                </Text>
              </View>
            </View>
          </View>

          {/* Notification Preferences */}
          <View>
            <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Notifications
            </Text>
            <View className="flex-row items-center justify-between bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl">
              <Text className="text-gray-700 dark:text-gray-200">
                Recevoir les notifications
              </Text>
              <View className="w-10 h-6 bg-green-400/60 rounded-full items-end justify-center p-1">
                <View className="w-4 h-4 bg-white rounded-full" />
              </View>
            </View>
          </View>

          {/* Privacy & Security */}
          <View>
            <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Confidentialité & Sécurité
            </Text>
            <View className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl mb-2">
              <Text className="text-gray-700 dark:text-gray-200">
                Changer le mot de passe
              </Text>
            </View>
            <View className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl">
              <Text className="text-gray-700 dark:text-gray-200">
                Supprimer mon compte
              </Text>
            </View>
          </View>

          {/* App Info */}
          <View>
            <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              À propos de l'application
            </Text>
            <View className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl mb-2">
              <Text className="text-gray-700 dark:text-gray-200">
                Version 1.0.0
              </Text>
            </View>
            <View className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl">
              <Text className="text-gray-700 dark:text-gray-200">
                Dernière mise à jour : 16 février 2026
              </Text>
            </View>
          </View>

          {/* Help & Support */}
          <View>
            <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Aide & Support
            </Text>
            <View className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl mb-2">
              <Text className="text-gray-700 dark:text-gray-200">FAQ</Text>
            </View>
            <View className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl">
              <Text className="text-gray-700 dark:text-gray-200">
                Contactez-nous
              </Text>
            </View>
          </View>

          {/* Legal Links */}
          <View>
            <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Légal
            </Text>
            <View className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl mb-2">
              <Text className="text-gray-700 dark:text-gray-200">
                Conditions d'utilisation
              </Text>
            </View>
            <View className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl">
              <Text className="text-gray-700 dark:text-gray-200">
                Politique de confidentialité
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
