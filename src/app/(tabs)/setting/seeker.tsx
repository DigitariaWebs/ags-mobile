import FormInput from "@/components/ui/FormInput";
import FormButton from "@/components/ui/FormButton";
import { ScrollView, View, Text } from "react-native";

export default function JobSeekerSettingsScreen() {
  return (
    <ScrollView
      className="flex-1 bg-background px-4 py-8"
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <Text className="text-2xl font-bold text-foreground mb-8 text-center">
        Paramètres du Chercheur d'Emploi
      </Text>
      <View className="bg-card rounded-2xl p-6 shadow-md">
        <FormInput label="Nom complet" value="Fatou Diop" edit />
        <FormInput label="Email" value="fatou.diop@email.com" edit />
        <FormInput label="Téléphone" value="+221 77 987 65 43" edit />
        <FormInput
          label="Adresse (Région, Département)"
          value="Thiès, Thiès"
          edit
        />
        <FormInput
          label="Niveau d'éducation"
          value="Licence en Agronomie"
          edit
        />
        <FormInput
          label="Expérience professionnelle"
          value="2 ans - Ouvrière agricole"
          edit
          multiline
        />
        <FormInput label="Poste souhaité" value="Technicien de ferme" edit />
        <FormInput
          label="Changer le mot de passe"
          value="********"
          edit
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
    </ScrollView>
  );
}
