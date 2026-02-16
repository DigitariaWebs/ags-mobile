import React from "react";
import FormInput from "@/components/ui/FormInput";
import FormButton from "@/components/ui/FormButton";
import { View, Text } from "react-native";

export default function SeekerForm({
  editMode = false,
}: {
  editMode?: boolean;
}) {
  return (
    <View className="bg-card rounded-2xl p-6 shadow-md">
      <FormInput label="Nom complet" value="Fatou Diop" editable={editMode} />
      <FormInput
        label="Email"
        value="fatou.diop@email.com"
        editable={editMode}
      />
      <FormInput
        label="Téléphone"
        value="+221 77 987 65 43"
        editable={editMode}
      />
      <FormInput
        label="Adresse (Région, Département)"
        value="Thiès, Thiès"
        editable={editMode}
      />
      <FormInput
        label="Niveau d'éducation"
        value="Licence en Agronomie"
        editable={editMode}
      />
      <FormInput
        label="Expérience professionnelle"
        value="2 ans - Ouvrière agricole"
        editable={editMode}
        multiline
      />
      <FormInput
        label="Poste souhaité"
        value="Technicien de ferme"
        editable={editMode}
      />
      <FormInput
        label="Changer le mot de passe"
        value="********"
        editable={editMode}
        secureTextEntry
      />
      <View className="mt-6">
        <Text className="text-base font-semibold text-primary mb-2">
          Voir mes candidatures
        </Text>
        <FormButton
          title="Voir les candidatures (bientôt)"
          onPress={() => {}}
          disabled
          variant="secondary"
        />
      </View>
    </View>
  );
}
