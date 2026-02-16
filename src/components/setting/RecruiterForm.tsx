import React from "react";
import FormInput from "@/components/ui/FormInput";
import FormButton from "@/components/ui/FormButton";
import { View, Text } from "react-native";

export default function RecruiterForm({
  editMode = false,
}: {
  editMode?: boolean;
}) {
  return (
    <View className="bg-card rounded-2xl p-6 shadow-md">
      <FormInput
        label="Nom de l'entreprise / ferme"
        value="Ferme AGS Sénégal"
        editable={editMode}
      />
      <FormInput
        label="Nom du contact"
        value="Mamadou Ndiaye"
        editable={editMode}
      />
      <FormInput label="Email" value="recruteur@ags.com" editable={editMode} />
      <FormInput
        label="Téléphone"
        value="+221 77 123 45 67"
        editable={editMode}
      />
      <FormInput
        label="Localisation (Région, Adresse)"
        value="Dakar, Sénégal"
        editable={editMode}
      />
      <FormInput
        label="Description de l'entreprise"
        value="Entreprise agricole spécialisée dans la production maraîchère et l'innovation durable."
        editable={editMode}
        multiline
      />
      <FormInput
        label="Changer le mot de passe"
        value="********"
        editable={editMode}
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
  );
}
