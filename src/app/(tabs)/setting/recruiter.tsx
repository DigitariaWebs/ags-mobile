import React from "react";
import { View, Text, ScrollView } from "react-native";
import FormInput from "@/components/ui/FormInput";
import FormButton from "@/components/ui/FormButton";

export default function RecruiterSettingsScreen() {
  return (
    <ScrollView
      className="flex-1 bg-background px-4 py-8"
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <Text className="text-2xl font-bold text-foreground mb-8 text-center">
        Paramètres du Recruteur
      </Text>
      <View className="bg-card rounded-2xl p-6 shadow-md">
        <FormInput
          label="Nom de l'entreprise / ferme"
          value="Ferme AGS Sénégal"
          edit
        />
        <FormInput label="Nom du contact" value="Mamadou Ndiaye" edit />
        <FormInput label="Email" value="recruteur@ags.com" edit />
        <FormInput label="Téléphone" value="+221 77 123 45 67" edit />
        <FormInput
          label="Localisation (Région, Adresse)"
          value="Dakar, Sénégal"
          edit
        />
        <FormInput
          label="Description de l'entreprise"
          value="Entreprise agricole spécialisée dans la production maraîchère et l'innovation durable."
          edit
          multiline
        />
        <FormInput
          label="Changer le mot de passe"
          value="********"
          edit
          secureTextEntry
        />
        <View className="mt-6">
          <Text className="text-base font-semibold text-primary mb-2">
            Gérer les offres d'emploi
          </Text>
          <FormButton
            title="Voir les offres (bientôt)"
            onPress={() => {}}
            disabled
            variant="secondary"
          />
        </View>
      </View>
    </ScrollView>
  );
}
